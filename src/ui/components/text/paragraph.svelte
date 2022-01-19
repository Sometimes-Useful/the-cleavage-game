<script lang="ts">
    export let text:string
    const rotatizer = Math.random() * 100
</script>

<p  class="font-sans text-[#fbff00] {rotatizer < 33 ? "" : rotatizer < 66 ? "rotate-3" : "-rotate-3" }">{text}</p>