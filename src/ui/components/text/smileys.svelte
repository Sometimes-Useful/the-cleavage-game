
<script lang="ts">
    import { beforeUpdate } from "svelte";
    export let qty:number
    let smilleys:string
    beforeUpdate(()=>{
        smilleys = ""
        for (let index = 0; index < qty; index++) smilleys += "😀"
    })
</script>
<div class="flex flex-col w-full">
    <p class= "p-2 font-sans font-bold text-center">{smilleys}</p>
</div>
 