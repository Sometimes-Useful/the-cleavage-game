<script lang="ts">
    export let subtitle:string = ""
</script>
<h2 class= "my-3 text-xl font-sans text-center text-primary">{@html subtitle.replaceAll('\n',"<br>")}</h2>
