<script lang="ts">
    export let text:string
    export let href:string
    export let newTab:boolean = false
</script>
<a class="
        text-center
        font-sans
        underline 
        text-primary hover:text-primary-variant visited:text-secondary-variant
    "
    {href}
    target={newTab ? "_blank" : "_self"}
>{text}</a>