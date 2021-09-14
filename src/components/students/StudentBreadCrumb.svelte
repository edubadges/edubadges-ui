<script>

</script>
<style lang="scss">
  :global(div.student-bread-crumb) {
    padding: var(--ver-padding-m) var(--hor-padding-m);
    min-height: 47px;
    display: flex;
    align-items: center;
  }

  :global(div.student-bread-crumb span.icon) {
    height: 14px;
    width: 14px;
    margin: auto 4px;
  }

  :global(div.student-bread-crumb a) {
    color: var(--text-grey-dark);
    text-decoration: underline;
  }

  :global(div.student-bread-crumb span.current) {
    font-weight: bold;
  }


</style>
<div class="student-bread-crumb">
  <slot/>
</div>
