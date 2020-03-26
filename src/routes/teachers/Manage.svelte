<script>
  import { Router, Route, navigate } from "svelte-routing";
  import { Redirect } from "../../components";
  import { Institution, Faculty } from "../../components/teachers";

  export let mainEntity;

  $: if (!mainEntity) navigate("/manage/institution", { replace: true });
</script>

<Router>
  <Route path="/institution/*subEntity" component={Institution} />
  <Route path="/faculty/:entityId/*subEntity" component={Faculty} />
</Router>
