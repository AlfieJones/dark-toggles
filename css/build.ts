import { mkdir, readFile, readdir, rm, writeFile } from "node:fs/promises";
import { compileString } from "sass";
import { transform } from "lightningcss";
import { join } from "node:path";
import { format } from "prettier";
import { build } from "esbuild";
import { execSync } from "node:child_process";

function kebabToCamel(kebab: string) {
  return kebab.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
}

function formatTS(content: string) {
  return format(content, {
    parser: "typescript",
  });
}

const files = (await readdir("./src/toggles")).map((file) =>
  file.replace(".scss", "")
);

const variants = (await readdir("./src/variants")).map((file) =>
  file.replace(".scss", "")
);

async function generateToggleVariantCSS(toggle: string, variant: string) {
  const combinedCSS = await Promise.all([
    readFile(`./src/variants/${variant}.scss`, "utf-8"),
    readFile(`./src/global/shared.scss`, "utf-8"),
    readFile(`./src/toggles/${toggle}.scss`, "utf-8"),
  ]).then((values) => values.join("\n"));

  const variables = await readFile(`./src/variables.scss`, "utf-8");
  const utils = await readFile(`./src/utils.scss`, "utf-8");

  const { css } = compileString(combinedCSS, {
    importers: [
      {
        canonicalize(url) {
          if (url.endsWith("variables.scss") || url.endsWith("utils.scss")) {
            return new URL(url, import.meta.url);
          }
          return null;
        },
        load(url) {
          if (url.pathname.endsWith("variables.scss")) {
            return { syntax: "scss", contents: variables };
          } else if (url.pathname.endsWith("utils.scss")) {
            return { syntax: "scss", contents: utils };
          }
          return null;
        },
      },
    ],
  });

  return new TextDecoder().decode(
    transform({
      code: new TextEncoder().encode(css),
      filename: `${variant}/${toggle}.css`,
      minify: true,
    }).code
  );
}

async function generateTSExport(name: string, variant: string, css: string) {
  const filename =
    kebabToCamel(name) + variant.charAt(0).toUpperCase() + variant.slice(1);

  const contents = `export const ${filename}: string = \`${css}\`;`;

  await writeFile(join("./temp", `${filename}.ts`), await formatTS(contents));
}

async function generateIndexTs() {
  const imports = variants
    .flatMap((variant) =>
      files.map(
        (file) =>
          kebabToCamel(file) +
          variant.charAt(0).toUpperCase() +
          variant.slice(1)
      )
    )
    .map((name) => `import { ${name} } from "./${name}";`)
    .join("\n");

  const exports = variants.flatMap((variant) =>
    files.map(
      (file) =>
        kebabToCamel(file) + variant.charAt(0).toUpperCase() + variant.slice(1)
    )
  );

  const contents = `${imports}

    export {
        ${exports.join(",\n  ")}
    };
    `;
  await writeFile(join("./temp", `index.ts`), await formatTS(contents));
}

async function generateCSS() {
  for (const variant of variants) {
    await mkdir(`./dist/${variant}`, { recursive: true });
    for (const toggle of files) {
      const css = await generateToggleVariantCSS(toggle, variant);
      await writeFile(`./dist/${variant}/${toggle}.css`, css);
      await generateTSExport(toggle, variant, css);
    }
  }

  await generateIndexTs();
}

async function generateTypescriptDist() {
  const distDir = "./dist";
  await mkdir(distDir, { recursive: true });

  await build({
    entryPoints: [join("./temp", "index.ts")],
    outdir: distDir,
    bundle: true,
    format: "esm",
  });
}

async function init() {
  await rm("./dist", { recursive: true }).catch(() => {});
  await rm("./temp", { recursive: true }).catch(() => {});

  await mkdir("./temp", { recursive: true });
}

async function cleanUp() {
  await rm("./temp", { recursive: true });
}

function generateTypes() {
  execSync(
    "pnpm tsc ./temp/index.ts --emitDeclarationOnly --outDir ./dist --declaration"
  );
}

await init();
await generateCSS();
await generateTypescriptDist();
generateTypes();
await cleanUp();
