<script lang="ts">
    export let text:string
    export let center:boolean = false
    export let emphasis:"low"|"medium"|"high"
    const rotatizer = Math.random() * 100
</script>

<p  class="
    font-sans 
    {emphasis === "low" ? "text-primary":"" }
    {emphasis === "medium" ? "text-primary":"" }
    {emphasis === "high" ? "text-primary-variant":"" }
    {center ? "text-center" : "text-justify"} 
    w-full md:w-2/3 lg:w-1/2 
    {rotatizer < 33 ? "" : rotatizer < 66 ? "rotate-1" : "-rotate-1" } 
    p-3
">{@html text}</p>