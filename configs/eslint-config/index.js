module.exports = {
    extends: ['turbo', 'prettier', 'plugin:astro/recommended'],
    ignorePatterns: ['node_modules', 'dist'],
    parserOptions: {
        babelOptions: {
            presets: [require.resolve('next/babel')],
        },
    },
    overrides: [
        {
            // Define the configuration for `.astro` file.
            files: ["*.astro"],
            // Allows Astro components to be parsed.
            parser: "astro/client-side-ts",
            // Parse the script in `.astro` as TypeScript by adding the following configuration.
            // It's the setting you need when using TypeScript.
            parserOptions: {
                parser: "@typescript-eslint/parser",
                extraFileExtensions: [".astro"],
            },
            rules: {
                // override/add rules settings here, such as:
                // "astro/no-set-html-directive": "error"
            },
        },
        // ...
    ],
};