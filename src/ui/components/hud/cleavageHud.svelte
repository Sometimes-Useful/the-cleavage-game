<script lang="ts">
    import { currentCleavageStore } from "../../stores/stores";
    import CleavageModule from "../cleavage/cleavageModule.svelte";
    import Subtitle from "../text/subtitle.svelte";
    import Title from "../text/title.svelte";
    import { cleavageHudId } from "./cleavageHud";
</script>
<div id={cleavageHudId} class="flex flex-col p-1 w-full items-center">
    {#if $currentCleavageStore}
        <Title title={$currentCleavageStore.title} rotate={false}/>
        <CleavageModule cleaveLeftChoice={$currentCleavageStore.leftChoice} cleaveRightChoice={$currentCleavageStore.rightChoice} players={$currentCleavageStore.players.length}/>
    {:else}
        <Title/>
        <Subtitle subtitle={"Préparation du nouveau clivage"}/>
    {/if}
</div>