<script>
    import {onMount} from "svelte";
    import Spinner from "../../Spinner.svelte";
    import {authToken, userLoggedIn, userRole} from "../../../stores/user";
    import {navigate} from "svelte-routing";
    import {ltiContext} from "../../../stores/lti";
    import {role} from "../../../util/role";
    import {getLTIContext} from "../../../api";
import JSONTree from 'svelte-json-tree';
    let context;
    let course;
    let grades;
    let members;

    let loaded;

    onMount(() => {
        getLTIContext($ltiContext.launchId).then(res => {
            context = res;
            loaded = true;
            debugger;
        });
    });

</script>

<style lang="scss">
  .page-container {
    display: flex;
    flex: 1;
  }

  .content {
    padding: 40px;
  }

  h3 {
    color: var(--grey-9);
    font-size: 22px;
    margin: 35px 0 20px 0;
  }

</style>
<div class="page-container">
    {#if loaded}
        <div class="content">
            <h3>LTI message launch</h3>
            <JSONTree value={context} />
<!--            <h3>LTI course information</h3>-->
<!--            <JSONTree value={context} />-->
<!--            <h3>LTI members</h3>-->
<!--            <JSONTree value={context} />-->
<!--            <h3>LTI grades</h3>-->
<!--            <JSONTree value={context} />-->
        </div>
    {:else}
        <Spinner/>
    {/if}
</div>



