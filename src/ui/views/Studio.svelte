<script lang="ts">
    import { applicationStart } from "../../app";
</script>
<div class="flex flex-col items-center w-full h-full justify-evenly p-3 text-center" on:click={() => applicationStart()}>
    <h1 class="text-white sm:text-4xl text-lg">Le jeu du clivage</h1>
    <p class="text-white sm:text-lg text-sm  font-light">A free open source game inspired by Usul's game named "Le jeu du clivage".</p>
    <h2 class="text-white sm:text-2xl text-xs font-light animate-pulse ">{"<<<"} Click Anywhere to launch the game {">>>"}</h2>
</div>
