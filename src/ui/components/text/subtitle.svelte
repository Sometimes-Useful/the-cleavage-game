<script lang="ts">
    export let subtitle:string = ""
    const rotatizer = Math.random() * 100
</script>
<h2 class= "my-3 {rotatizer < 33 ? "" : rotatizer < 66 ? "rotate-3" : "-rotate-3" } text-xl font-sans text-center text-primary">{@html subtitle.replaceAll('\n',"<br>")}</h2>
