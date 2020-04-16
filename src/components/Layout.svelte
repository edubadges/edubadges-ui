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
    --purple-1: #ebceff;
    --purple-2: #cea0e5;
    --purple-3: #b171cb;
    --purple-4: #9858b2;
    --purple-5: #843d9b;
    --purple-6: #772583;
    --purple-7: #540b6c;
    --purple-8: #45075d;
    --purple-9: #37044f;
    --purple-10: #280040;
    --purple: var(--purple-6);

    --grey-1: #f9fafb;
    --grey-2: #f4f6f8;
    --grey-3: #dfe3e8;
    --grey-4: #c4cdd5;
    --grey-5: #abb4bd;
    --grey-6: #919ba4;
    --grey-7: #78818c;
    --grey-8: #5e6873;
    --grey-9: #454f5b;
    --grey-10: #212121;
    --black: var(--grey-10);
    --text-grey-dark: var(--grey-8);
    --text-grey-light: var(--grey-6);

    --green-light: #53d07a;
    --green-medium: #009f4d;
    --green-dark: #006f22;

    --yellow-light: #fef695;
    --yellow-medium: #fedb00;
    --yellow-dark: #c6aa00;

    --red-light: #ffebe7;
    --red-medium: #ff685c;
    --red-dark: #f50000;

    --blue-medium: #173552;

    /* Cards */
    --card-border: solid 1px var(--grey-3);
    --card-border-radius: 8px;
    --card-shadow: 0 3px 0 2px var(--grey-3);

    /* Keyboard accessible */
    --outline-blue: #3262be;
    --outline-fallback: 1px solid var(--outline-blue);
    --outline: -webkit-focus-ring-color auto 5px;

    /* Buttons */
    --button-border-radius: 2px;
    --button-background-disabled: var(--grey-3);

    /* Form field regular */
    --field-outline-shadow: 1px 1px 3px var(--outline-blue),
      -1px -1px 3px var(--outline-blue);

    --field-max-width: 360px;
    --field-background: white;
    --field-cursor: text;

    --field-font-size: 1rem;
    --field-color: var(--text-grey-dark);

    --field-border-radius: 4px;
    --field-border-width: 1px;
    --field-border-style: solid;
    --field-border-color: var(--text-grey-dark);
    --field-border: var(--field-border-width) var(--field-border-style)
      var(--field-border-color);

    /* Form field with error */
    --field-background-error: var(--red-light);
    --field-border-color-error: var(--red-dark);
    --field-border-error: var(--field-border-width) var(--field-border-style)
      var(--field-border-color-error);

    /* Form field disabled */
    --field-color-disabled: var(--text-grey-light);
    --field-cursor-disabled: not-allowed;
    --field-border-color-disabled: var(--text-grey-light);
    --field-border-disabled: var(--field-border-width) var(--field-border-style)
      var(--field-border-color-disabled);
  }

  a,
  .link {
    color: var(--green-medium);
    cursor: pointer;

    &:hover {
      color: var(--green-dark);
    }
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    color: var(--purple);
  }

  .sub-text {
    font-size: smaller;
    color: var(--text-grey-light);
  }
</style>
