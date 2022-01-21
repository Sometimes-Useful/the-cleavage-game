<script lang="ts">
    import { application } from "../../app";
    let applicationStarted:boolean = false
    const start = (): Promise<void> => {
        return applicationStarted
            ? Promise.resolve()    
            : onStart()
    }
    const onStart = (): Promise<void>  => {
        applicationStarted = true
        return application.start()
            .then(() => Promise.resolve())
            .catch(error => {
                applicationStarted=false;
                return Promise.reject(error);
            });
    }
</script>
<div class="flex flex-col items-center w-full h-full justify-evenly p-3 text-center" on:click={start}>
    <h1 class="text-white sm:text-4xl text-lg">Le jeu du clivage</h1>
    <p class="text-white w-full md:w-1/2 p-3 sm:text-lg text-sm  font-light">Un jeu open source et gratuit inspiré du jeu d'Usul et Cotentin de l'émission Mediapart - Ouvrez Les Guillemets nommé "Le jeu du clivage".</p>
    <h2 class="text-white sm:text-2xl text-xs font-light animate-pulse ">{"<<<"} cliquer n'importe où pour lancer le jeu {">>>"}</h2>
</div>
