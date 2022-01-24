
<script lang="ts">
    import { beforeUpdate } from "svelte";
        export let notCleave:number
        let smilleys:string
        beforeUpdate(()=>{
            smilleys = ""
            for (let index = 1; index <= notCleave; index++) {
                smilleys = smilleys +"😀"
            }
        })
    </script>
    <div class="flex flex-col">
        <p class= "p-2 font-sans font-bold text-center">{smilleys}</p>
    </div>
 