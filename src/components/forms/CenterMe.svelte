<style>
  div.parent {
    display: flex;
  }

  div.child {
    margin: auto;
  }
</style>
<div class="parent">
  <div class="child">
    <slot/>
  </div>
</div>
