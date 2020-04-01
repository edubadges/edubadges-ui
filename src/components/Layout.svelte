<style>
  :global(:root) {
    /* Sizes */
    --width-app: 1244px;
    --width-side-bar: 220px;

    /* Spacing */
    --ver-padding-s: 6px;
    --ver-padding-m: 13px;
    --ver-padding-l: 20px;

    --hor-padding-s: 13px;
    --hor-padding-m: 20px;

    /*Colors*/
    --color-primary-blue: #0061b0;
    --color-primary-green: #008738;
    --color-primary-black: #202020;
    --color-primary-red: #d00000;

    --color-background-grey-dark: #d8d8d8;
    --color-background-grey-medium: #e9e9e9;
    --color-background-grey-light: #f5f4f4;
    --color-background-blue: #173552;
    --color-background-red: #ffebe7;

    --color-text-grey: #585858;
    --color-text-light-grey: #989797;
    --color-text-blue: #39b8df;
    --color-text-red: #f50000;

    /* Cards */
    --card-border: 1px solid #979797;
    --card-border-radius: 2px;
    --card-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);

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
</style>
