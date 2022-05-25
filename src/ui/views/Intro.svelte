<script lang="ts">
    import { clientApplication } from "../../clientApplication";
    let applicationStarted:boolean = false
    const start = (): Promise<void> => {
        return applicationStarted
            ? Promise.resolve()    
            : onStart()
    }
    const onStart = (): Promise<void>  => {
        applicationStarted = true
        return clientApplication.start()
            .then(() => Promise.resolve())
            .catch(error => {
                applicationStarted=false;
                return Promise.reject(error);
            });
    }
</script>
<main class="bg-dark-background h-full w-full flex flex-col items-center justify-evenly p-3 text-center" on:click={start}>
    <h1 class="text-no-emphasis sm:text-4xl text-lg">Le jeu du clivage</h1>
    <p class="text-no-emphasis w-full md:w-1/2 p-3 sm:text-lg text-sm  font-light">Un jeu open source et gratuit inspiré du jeu d'Usul et Cotentin de l'émission Mediapart - Ouvrez Les Guillemets nommé "Le jeu du clivage".</p>
    <h2 class="text-no-emphasis sm:text-2xl text-xs font-light animate-pulse ">{"<<<"} cliquer n'importe où pour lancer le jeu {">>>"}</h2>
</main>