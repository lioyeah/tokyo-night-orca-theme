/** @type {import('stylelint').Config} */
module.exports = {
  ignoreFiles: ["dist/**", "node_modules/**", "public/tokyo-night.css"],
  rules: {
    "block-no-empty": true,
    "color-no-invalid-hex": true,
    "declaration-block-no-duplicate-properties": [
      true,
      {
        ignore: ["consecutive-duplicates-with-different-values"],
      },
    ],
    "font-family-no-duplicate-names": true,
    "keyframe-block-no-duplicate-selectors": true,
    "no-invalid-double-slash-comments": true,
    "property-no-unknown": [
      true,
      {
        ignoreProperties: [/^--/],
      },
    ],
    "selector-pseudo-class-no-unknown": [
      true,
      {
        ignorePseudoClasses: ["global"],
      },
    ],
    "selector-pseudo-element-no-unknown": true,
    "unit-no-unknown": true,
  },
};
