<script lang="ts">
    import { clientApplication } from "../../clientApplication";
</script>
<main class="h-full w-full flex flex-col items-center justify-evenly p-3 text-center" on:click={()=>clientApplication.start()}>
    <h1 class="text-primary sm:text-4xl text-lg">Le jeu du clivage</h1>
    <p class="text-primary w-full md:w-1/2 p-3 sm:text-lg text-sm  font-light text-justify">Un jeu open source et gratuit inspiré du jeu réalisé par Usul et Ostpolitik de l'émission Mediapart - Ouvrez Les Guillemets nommé "Le jeu du clivage".</p>
    <h2 class="text-primary sm:text-2xl text-xs font-light animate-pulse ">{"<<<"} cliquer n'importe où pour lancer le jeu {">>>"}</h2>
</main>