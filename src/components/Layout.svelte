<style global lang="scss">
  :root {
    /* Sizes */
    --width-app: 1090px;
    --width-side-bar: 220px;

    /* Spacing */
    --ver-padding-s: 6px;
    --ver-padding-m: 13px;
    --ver-padding-l: 20px;

    --hor-padding-s: 13px;
    --hor-padding-m: 20px;

    /*Colors*/
    --text-green: #009f4d;
    --text-green-hover: #006f22;

    --color-primary-purple: #772583;
    --color-primary-blue: #0061b0;
    --color-primary-green: #008738;
    --color-primary-black: #202020;
    --color-primary-red: #d00000;
    --color-primary-yellow: #fef594;
    --color-primary-purple: #772482;

    --color-background-grey-dark: #d8d8d8;
    --color-background-grey-medium: #e9e9e9;
    --color-background-grey-light: #f4f6f8;
    --color-background-blue: #173552;
    --color-background-red: #ffebe7;

    --black: #212121;
    --color-text-grey: #5e6873;
    --color-text-light-grey: #989797;
    --color-text-blue: #39b8df;
    --color-text-red: #f50000;

    /* Cards */
    --card-border: solid 1px #dfe3e8;

    --card-border-radius: 8px;
    --card-shadow: 0 3px 0 2px #dfe3e8;

    /* Keyboard accessible */
    --outline-blue: #3262be;
    --outline-fallback: 1px solid var(--outline-blue);
    --outline: -webkit-focus-ring-color auto 5px;

    /* Buttons */
    --button-border-radius: 2px;
    --button-background-disabled: var(--color-background-grey-dark);

    /* Form field regular */
    --field-outline-shadow: 1px 1px 3px var(--outline-blue),
      -1px -1px 3px var(--outline-blue);

    --field-max-width: 360px;
    --field-background: white;
    --field-cursor: text;

    --field-font-size: 1rem;
    --field-color: var(--color-text-grey);

    --field-border-radius: 4px;
    --field-border-width: 1px;
    --field-border-style: solid;
    --field-border-color: var(--color-text-grey);
    --field-border: var(--field-border-width) var(--field-border-style)
      var(--field-border-color);

    /* Form field with error */
    --field-background-error: var(--color-background-red);
    --field-border-color-error: var(--color-text-red);
    --field-border-error: var(--field-border-width) var(--field-border-style)
      var(--field-border-color-error);

    /* Form field disabled */
    --field-color-disabled: var(--color-text-light-grey);
    --field-cursor-disabled: not-allowed;
    --field-border-color-disabled: var(--color-text-light-grey);
    --field-border-disabled: var(--field-border-width) var(--field-border-style)
      var(--field-border-color-disabled);
  }

  a,
  .link,
  .green {
    color: var(--text-green);
    cursor: pointer;

    &:hover {
      color: var(--text-green-hover);
    }
  }

  .purple {
    color: var(--color-primary-purple);
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    color: var(--color-primary-purple);
  }

  .text-black {
    color: var(--black);
  }
</style>
