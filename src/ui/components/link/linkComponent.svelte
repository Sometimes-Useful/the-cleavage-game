<script lang="ts">
    export let text:string
    export let href:string
    export let newTab:boolean = false
    const rotatizer = Math.random() * 100
</script>
<a class="
        text-center
        font-sans
        underline 
        text-primary hover:text-primary-variant visited:text-secondary-variant
        {rotatizer < 33 ? "" : rotatizer < 66 ? "rotate-3" : "-rotate-3" }
    "
    {href}
    target={newTab ? "_blank" : "_self"}
>{text}</a>