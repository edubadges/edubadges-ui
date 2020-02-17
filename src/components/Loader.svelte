<style>
  .loader:empty,
  .loader:empty:after {
    border-radius: 50%;
    width: 10em;
    height: 10em;
  }

  .loader:empty {
    margin: 60px auto;
    font-size: 10px;
    position: relative;
    text-indent: -9999em;
    border: 1.1em solid white;
    border-top-color: var(--color-primary-green);
    border-bottom-color: var(--color-primary-blue);
    -webkit-transform: translateZ(0);
    -ms-transform: translateZ(0);
    transform: translateZ(0);
    -webkit-animation: load8 1.5s infinite linear;
    animation: load8 1.5s infinite linear;
  }

  @-webkit-keyframes load8 {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }

  @keyframes load8 {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
</style>

<div class="loader" />
