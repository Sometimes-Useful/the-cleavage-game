<script lang="ts">
    import { currentCleavageStore } from "../../stores/stores";
    import CleavageModule from "../cleavage/cleavageModule.svelte";
    import Subtitle from "../text/subtitle.svelte";
    import Title from "../text/title.svelte";
</script>
<div class="flex flex-col px-2 pt-2 w-full items-center">
    {#if $currentCleavageStore}
        <Title title={$currentCleavageStore.title} rotate={false}/>
        <CleavageModule cleaveLeftChoice={$currentCleavageStore.leftChoice} cleaveRightChoice={$currentCleavageStore.rightChoice} players={$currentCleavageStore.players.length}/>
    {:else}
        <Title/>
        <Subtitle subtitle={"Préparation du nouveau clivage"}/>
    {/if}
</div>