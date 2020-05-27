<script>
  import RemoteImage from "../components/RemoteImage.svelte";

</script>
<style>

</style>
<h1>test</h1>

<hr>
<RemoteImage imageUrl="https://api-test.edubadges.nl/media/uploads/institution/surf.png" useToken={true}/>
<hr>
<RemoteImage imageUrl="https://api-test.edubadges.nl/media/uploads/institution/surf.png" useToken={false}/>
<hr>
<img src="https://api-test.edubadges.nl/media/uploads/institution/surf.png">
