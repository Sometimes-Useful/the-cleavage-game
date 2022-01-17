<script lang="ts">
import { applicationStart } from "../../app";
const onClick = () => applicationStart()
</script>
<div class="flex flex-col w-full h-full items-center justify-evenly p-3 text-center" on:click={onClick}>
    <div class="flex flex-col " >
        <p class="text-white sm:text-lg text-sm  font-light">A game by</p>
        <h1 class="text-white sm:text-5xl text-2xl sm:my-5 my-1">SOMETIMES USEFUL</h1>
    </div>
    <p class="text-white sm:text-lg text-sm  font-light">Inspired by Usul's game named "Le jeu du clivage".</p>
    <h2 class="text-white sm:text-2xl text-xs font-light">{"<<<"} Click Anywhere to launch the game {">>>"}</h2>
</div>
