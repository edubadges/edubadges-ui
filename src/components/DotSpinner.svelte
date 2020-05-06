<style>
  .loader {
    border: 6px solid #ffffff;
    border-top: 6px solid var(--purple); /* Blue */
    border-radius: 50%;
    width: 35px;
    height: 35px;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>
<div class="loader"/>