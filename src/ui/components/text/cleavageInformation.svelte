<script lang="ts">
    import { beforeUpdate } from "svelte";
    import type { Choice } from "../../../domain/entities/Choice";
    import { GamePhase } from "../../../domain/entities/GamePhase";
    import { gamePhaseStore } from "../../stores/stores";
    import Subtitle from "../text/subtitle.svelte";
    export let cleaveLeftChoice:Choice
    export let cleaveRightChoice:Choice
    export let players:number
    let totalCleave:number
    beforeUpdate(()=> {
        totalCleave = cleaveLeftChoice.players.length + cleaveRightChoice.players.length
    })
</script>
<div class="flex flex-col w-full">
    {#if $gamePhaseStore === GamePhase.NEW_CLEAVAGE}
        <Subtitle subtitle={"Préparation du nouveau clivage"}/>
    {/if}
    {#if $gamePhaseStore === GamePhase.CLEAVING}
        <Subtitle subtitle={`${totalCleave}/${players} joueurs ont clivés`}/>
    {/if}
</div>

