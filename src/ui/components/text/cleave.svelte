<script lang="ts">
import { beforeUpdate } from "svelte";


    export let text:string = ""
    export let cleave:number
    export let totalCleave:number
    export let color :"Red"|"Blue"
    export let rotate: "+"|"-"
    let cleavePercentageText:string
    let smilleys:string
    beforeUpdate(()=> {
        const cleavePercentage = totalCleave === 0 ? 0 : cleave / totalCleave *100
        cleavePercentageText = cleavePercentage % 1 === 0 ? cleavePercentage.toString() : (Math.round(cleavePercentage * 100) / 100).toFixed(2);
        smilleys = ""
        for (let index = 1; index <= cleave; index++) {
            smilleys = smilleys +"😀"
        }
    })
    


</script>
<div class="flex flex-col">
    <p class= "p-2 font-sans font-bold {rotate === "-" ? "-rotate-45" : "rotate-45" }  text-5xl text-center {color === "Red" ? "text-[#FF1616]" : "text-[#0003FF]" }">
        {text}<br>{totalCleave > 0 ? `${cleavePercentageText}%` : ""}
    </p>
    <p class= "p-2 m-16 font-sans font-bold text-center">{smilleys}</p>
</div>
