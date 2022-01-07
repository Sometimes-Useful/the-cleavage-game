<script lang="ts">
    import NewCleavage from "./views/NewCleavage.svelte"
    import ConnectChat from "./views/ConnectChat.svelte"
    import CurrentCleavage from "./views/CurrentCleavage.svelte"
    import { InterfaceView } from "../domain/entities/InterfaceView";
    import { NewCleavageEvent } from "../domain/events/newCleavage/NewCleavageEvent";
    import { onMount } from 'svelte';
    import { applicationStart } from "../app";
    import { applicationEventStore, interfaceViewStore } from "./stores/stores";
    onMount(() => {
        applicationStart()
		$applicationEventStore =new NewCleavageEvent()
	}); 
</script>

<main>
    {#if $interfaceViewStore === InterfaceView.CONNECT_CHAT}
	    <ConnectChat/>
    {:else if $interfaceViewStore === InterfaceView.CURRENT_CLEAVAGE}
        <CurrentCleavage/>
    {:else if $interfaceViewStore === InterfaceView.NEW_CLEAVAGE}
        <NewCleavage/>
    {/if}
</main>

<style>

</style>