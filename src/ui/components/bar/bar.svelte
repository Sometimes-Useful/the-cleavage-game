<script lang="ts">
    import { GamePhase } from "../../../domain/entities/GamePhase";
    import { gamePhaseStore } from "../../stores/stores";
    import Smileys from "../text/smileys.svelte";
    import {currentCleavageStore} from "../../stores/stores"
</script>
<div class="pixi flex flex-row w-full h-full items-center justify-between">
    {#if $gamePhaseStore === GamePhase.CLEAVING && $currentCleavageStore}
        <Smileys qty={$currentCleavageStore.leftChoice.players.length}/>
        <Smileys qty={$currentCleavageStore.players.length - ($currentCleavageStore.leftChoice.players.length + $currentCleavageStore.rightChoice.players.length)}/>
        <Smileys qty={$currentCleavageStore.rightChoice.players.length}/>
    {/if}
</div>