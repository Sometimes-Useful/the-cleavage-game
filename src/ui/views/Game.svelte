<script lang="ts">
    import { Cleavage } from "../../domain/entities/Cleavage";
    import Bar from "../components/bar/bar.svelte";
    import CleavageHud from "../components/hud/cleavageHud.svelte"
    import CommandsHud from "../components/hud/commandsHud.svelte"
    import { currentCleavageStore } from "../stores/stores";
    const defaultCleavage = () => new Cleavage({title:"",leftChoice:{name:"Gôche",players:[]},rightChoice: {name:"Drouate",players:[]},players:[]})
    let newCleavage:Cleavage
    currentCleavageStore.subscribe(currentCleavage =>  {
        console.log("UPDATED CURRENT CLEAVAGE STORE")
        newCleavage = currentCleavage ? currentCleavage :defaultCleavage()
    })
</script>
<CleavageHud {newCleavage}/>
<Bar/>
<CommandsHud {newCleavage}/>