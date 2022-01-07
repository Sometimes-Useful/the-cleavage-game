<script lang="ts">
    export let onClick:() => void
    export let text:string
</script>
<button type="button" on:click={onClick}>{text}</button>