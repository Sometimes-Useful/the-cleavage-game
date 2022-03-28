<script lang="ts">
    import Bar from "../components/bar/bar.svelte";
    import CleavageHud from "../components/hud/cleavageHud.svelte"
    import CommandsHud from "../components/hud/commandsHud.svelte"
</script>
<main class="bg-dark-background h-full w-full flex flex-col justify-between">
    <CleavageHud/>
    <Bar/>
    <CommandsHud/>
</main>