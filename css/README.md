# @theme-toggles/css

This package contains the SCSS files for the theme toggles.

## Adding a new toggle

To add a new toggle, just create a new SCSS file under `./src/toggles`.

We provide some helper SCSS functions to make it easier to create new toggles. A good starting template for a new toggle is the following:

```scss
@import "./../variables.scss";
@import "./../utils.scss";

// Creates our css variables
$variable: #{getVar(TOGGLE_NAME)};

// Allows people to flip the toggle. This isn't always needed / works properly depending on the toggle
@include generic(TOGGLE_NAME, flip-x);

.theme-toggle__TOGGLE_NAME {
  // Add the styles for the default state here
}

@include toggledSelector(TOGGLE_NAME) {
  // Add the styles for the toggled state here
}
```

## Building

We have a build script `build.ts` that bundles up our SCSS files into our different variants. To run this script, you can use the following command:

`pnpm build`
