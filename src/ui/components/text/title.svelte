<script lang="ts">
import { afterUpdate } from "svelte";


    export let title = "Le jeu du clivage"
    let size = "text-6xl"
    afterUpdate(()=>{
        if(title.length <= 50) size = "text-6xl"
        if(title.length > 50) size = "text-5xl"
        if(title.length > 100) size = "text-4xl"
        if(title.length > 150) size = "text-3xl"
        if(title.length > 200) size = "text-2xl"
        if(title.length > 250) size = "text-xl"
    })
</script>
<h1 class= "my-3 text-center {size} font-sans font-bold text-primary-variant">{title}</h1>
