import { format } from "prettier";
import { readdir, readFile, writeFile, mkdir, rm } from "node:fs/promises";
import { join } from "node:path";
import { build } from "esbuild";
import { execSync } from "node:child_process";

const tempDir = "./temp";

function kebabToCamel(kebab: string) {
  return kebab.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
}

function formatTS(content: string) {
  return format(content, {
    parser: "typescript",
  });
}

function generateSVGCode(name: string, content: string) {
  const file = `export const ${name}: string = \`${content}\`;`;

  return formatTS(file);
}

function generateIndexCode(names: string[]) {
  const imports = names
    .map((name) => `import { ${name} } from "./${name}";`)
    .join("\n");
  const exports = names.map((name) => `  ${name},`).join("\n");

  const file = `${imports}

    export {
        ${exports}
    };
    `;

  return formatTS(file);
}

function readSVGs(): Promise<{ name: string; content: string }[]> {
  const dir = "./files";

  return readdir(dir).then((files) =>
    Promise.all(
      files.map(async (file) => {
        const content = await readFile(join(dir, file), "utf-8");
        return { name: kebabToCamel(file.replace(".svg", "")), content };
      })
    )
  );
}

async function compileSVGs() {
  const svgs = await readSVGs();

  const names = await Promise.all(
    svgs.map(async ({ name, content }) => {
      const code = await generateSVGCode(name, content);
      return { name, code };
    })
  );

  const index = await generateIndexCode(names.map(({ name }) => name));

  const dir = join(tempDir, "toggles");

  await mkdir(dir, { recursive: true });

  await Promise.all([
    ...names.map(({ name, code }) => writeFile(join(dir, `${name}.ts`), code)),
    writeFile(join(dir, "index.ts"), index),
  ]);
}

async function generateDist() {
  const distDir = "./dist";
  await mkdir(distDir, { recursive: true });

  await build({
    entryPoints: [join(tempDir, "toggles", "index.ts")],
    outdir: distDir,
    bundle: true,
    format: "esm",
  });
}

async function init() {
  await Promise.all([
    rm(tempDir, { recursive: true }).catch(() => {}),
    rm("./dist", { recursive: true }).catch(() => {}),
  ]);

  await mkdir(tempDir);
}

async function cleanUp() {
  await rm(tempDir, { recursive: true });
}

function generateTypes() {
  execSync(
    "pnpm tsc ./temp/toggles/index.ts --emitDeclarationOnly --outDir ./dist --declaration"
  );
}

await init();
await compileSVGs();
await generateDist();
generateTypes();
await cleanUp();
