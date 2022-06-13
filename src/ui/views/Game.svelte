<script lang="ts">
import { onMount } from "svelte";

    import { GamePhase } from "../../domain/entities/GamePhase";
    import Bar from "../components/bar/bar.svelte";
    import CleavageHud from "../components/hud/cleavageHud.svelte"
    import CommandsHud from "../components/hud/commandsHud.svelte"
    import YouTubePlayer from "../components/youtubePlayer/youtubePlayer.svelte"
    import { gamePhaseStore, isHelpEnabledStore } from "../stores/stores";
    onMount(()=>{
        isHelpEnabledStore.subscribe(value=>console.log(value))
    })
</script>
<main class="
    h-full
    w-full
    flex flex-row
    items-center
">
    {#if $gamePhaseStore === GamePhase.PLAY_VIDEO}
        <YouTubePlayer/>
    {:else}
        {#if $isHelpEnabledStore !== undefined}
            <div class="text-left text-primary whitespace-nowrap p-1">
                {@html $isHelpEnabledStore.replace("\n","<br>")}
            </div>
        {/if}
        <div class="h-full w-full flex flex-col justify-between">
            <CleavageHud/>
            <Bar/>
            <CommandsHud/>
        </div>
    {/if}
</main>