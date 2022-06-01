<script lang="ts">
    import { GamePhase } from "../../domain/entities/GamePhase";
    import Bar from "../components/bar/bar.svelte";
    import CleavageHud from "../components/hud/cleavageHud.svelte"
    import CommandsHud from "../components/hud/commandsHud.svelte"
    import YouTubePlayer from "../components/youtubePlayer/youtubePlayer.svelte"
    import { gamePhaseStore } from "../stores/stores";
</script>
<main class="
    h-full
    w-full
    flex flex-col
    justify-between
">
    {#if $gamePhaseStore === GamePhase.PLAY_VIDEO}
        <YouTubePlayer/>
    {:else}
        <CleavageHud/>
        <Bar/>
        <CommandsHud/>
    {/if}
</main>