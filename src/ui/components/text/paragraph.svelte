<script lang="ts">
    export let text:string
    export let center:boolean = false
    const rotatizer = Math.random() * 100
</script>

<p  class="font-sans text-[#fbff00] {center ? "text-center" : "text-justify"} w-full md:w-2/3 lg:w-1/2 {rotatizer < 33 ? "" : rotatizer < 66 ? "rotate-1" : "-rotate-1" } p-3">{text}</p>