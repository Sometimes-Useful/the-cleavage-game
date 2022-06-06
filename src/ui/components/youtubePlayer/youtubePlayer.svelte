<script lang="ts">
    import { onMount } from "svelte";
    import {onYoutubeComponentMount, youtubeHtmlElementId} from "./youtubePlayer";
    onMount(onYoutubeComponentMount)
</script>
<style>
    #youtube{
        pointer-events: none; /* Disable any user interaction at all */
    }
</style>
<div class="flex flex-row w-full h-full items-center justify-center p-5">
    <div id={youtubeHtmlElementId}></div>
</div>