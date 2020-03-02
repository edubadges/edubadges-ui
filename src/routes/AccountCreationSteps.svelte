<script>
    import Step from "../components/Step.svelte";

    const stepData = [
        {stepText: "asdf 1 "},
        {stepText: "asdf 2 "},
        {stepText: "asdf 3 "}
    ]
</script>

<style>
    .account-creation-steps {
        display: flex;
        justify-content: space-around;
    }

    .account-creation-step {
        width: 20%;
    }
</style>

<div class="account-creation-steps">
    {#each stepData as step, i}
        <div class="account-creation-step">
            <Step stepText={step['stepText']} stepNumber={i + 1} />
        </div>
    {/each}
</div>