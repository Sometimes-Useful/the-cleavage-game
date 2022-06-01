<script lang="ts">
    import { onMount } from "svelte";
    import { cleavageHudId } from "../hud/cleavageHud";
    import { commandHudId } from "../hud/commandsHud";
    import { onBarComponentMount,pixiHtmlElementId} from "./bar";
    let interval:NodeJS.Timeout|undefined
    onMount(()=>onBarComponentMount(pixiHtmlElementId,cleavageHudId,commandHudId,interval))
</script>
<div id={pixiHtmlElementId} class="flex flex-row w-full h-full px-1 items-center justify-center"></div>