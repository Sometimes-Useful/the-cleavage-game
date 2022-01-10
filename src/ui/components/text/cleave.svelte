<script lang="ts">
    export let text:string = ""
    export let percentage:number
    export let color :"Red"|"Blue"
    export let rotate: "+"|"-"
</script>
<p class= "p-2 m-50 font-sans font-bold {rotate === "-" ? "-rotate-45" : "rotate-45" }  text-5xl text-center {color === "Red" ? "text-[#FF1616]" : "text-[#0003FF]" }">
    {text}<br>{percentage.toPrecision(3)}%
</p>