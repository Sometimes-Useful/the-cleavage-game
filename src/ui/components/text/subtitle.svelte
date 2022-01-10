<script lang="ts">
    export let subtitle:string = ""
    const rotatizer = Math.random() * 100
</script>
<h2 class= "p-2 m-5 {rotatizer < 33 ? "" : rotatizer < 66 ? "rotate-3" : "-rotate-3" } text-xl font-sans text-[#2eff12]">{subtitle}</h2>
