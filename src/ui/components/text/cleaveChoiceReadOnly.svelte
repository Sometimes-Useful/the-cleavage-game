<script lang="ts">
    import { GamePhase } from "../../../domain/entities/GamePhase";
    import { gamePhaseStore } from "../../stores/stores";
    export let choiceType:"Left"|"Right"
    export let choiceName:string
    export let choicePercentageText:string
</script>
<p class= "p-2 font-sans font-bold break-all text-5xl text-center text-secondary">
    {#if $gamePhaseStore === GamePhase.CLEAVING}
        {#if choiceType === "Left"}{choiceName} {choicePercentageText}%{/if}
        {#if choiceType === "Right"}{choicePercentageText}% {choiceName}{/if}
    {/if}
    {#if $gamePhaseStore === GamePhase.NEW_CLEAVAGE}{choiceName}{/if}
</p>