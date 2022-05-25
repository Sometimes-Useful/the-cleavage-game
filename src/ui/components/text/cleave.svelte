<script lang="ts">
    import { beforeUpdate } from "svelte";
    import CleaveChoiceReadOnly from "./cleaveChoiceReadOnly.svelte";
    export let text:string = ""
    export let cleave:number
    export let totalCleave:number
    export let color :"Red"|"Blue"
    export let choiceType: "Left"|"Right"
    let cleavePercentageText:string
    beforeUpdate(()=> {
        const cleavePercentage = totalCleave === 0 ? 0 : cleave / totalCleave *100
        cleavePercentageText = cleavePercentage % 1 === 0 ? cleavePercentage.toString() : (Math.round(cleavePercentage * 100) / 100).toFixed(2);
    })
</script>
<div class="flex flex-col w-full">
    <CleaveChoiceReadOnly choiceName={text} choicePercentageText={cleavePercentageText} {choiceType} {color}/>
</div>
