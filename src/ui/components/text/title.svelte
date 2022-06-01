<script lang="ts">
    export let title = "Le jeu du clivage"
    export let rotate = true
    const rotatizer = rotate ? Math.random() * 100 : 0
</script>
<h1 class= "my-3 {rotatizer < 33 ? "" : rotatizer < 66 ? "rotate-3" : "-rotate-3" } text-center text-6xl font-sans font-bold text-primary-variant">{title}</h1>
