<script lang="ts">
    import { GamePhase } from "../../../domain/entities/GamePhase";
    import { gamePhaseStore } from "../../stores/stores";
    export let color:"Red"|"Blue"
    export let choiceType:"Left"|"Right"
    export let choiceName:string
    export let choicePercentageText:string
    const rotatizer = Math.random() * 100
</script>
<p class= "p-2 font-sans font-bold {rotatizer < 33 ? "" : rotatizer < 66 ? "rotate-3" : "-rotate-3" } break-all text-5xl text-center {color === "Red" ? "text-cleave-left" : "text-cleave-right" }">
    {#if $gamePhaseStore === GamePhase.CLEAVING}
        {#if choiceType === "Left"}{choiceName} {choicePercentageText}%{/if}
        {#if choiceType === "Right"}{choicePercentageText}% {choiceName}{/if}
    {/if}
    {#if $gamePhaseStore === GamePhase.NEW_CLEAVAGE}{choiceName}{/if}
</p>