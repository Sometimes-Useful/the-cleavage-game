<script lang="ts">
    import NewCleavage from "./views/NewCleavage.svelte"
    import ConnectChat from "./views/ConnectChat.svelte"
    import CurrentCleavage from "./views/CurrentCleavage.svelte"
    import { InterfaceView } from "../domain/entities/InterfaceView";
    import { NewCleavageEvent } from "../domain/events/newCleavage/NewCleavageEvent";
    import { onDestroy, onMount } from 'svelte';
    import { applicationStart } from "../app";
    import { applicationEventStore, interfaceViewStore } from "./stores/stores";
import { DisconnectChatEvent } from "../domain/events/disconnectChat.spec.ts/DisconnectChatEvent";
    onMount(() => {
        applicationStart()
		$applicationEventStore =new NewCleavageEvent()
	});
    onDestroy(()=>$applicationEventStore = new DisconnectChatEvent())
</script>

<main class="bg-black h-full w-full flex flex-col justify-evenly">
    {#if $interfaceViewStore === InterfaceView.CONNECT_CHAT} 
	    <ConnectChat/>
    {:else if $interfaceViewStore === InterfaceView.CURRENT_CLEAVAGE}
        <CurrentCleavage/>
    {:else if $interfaceViewStore === InterfaceView.NEW_CLEAVAGE}
        <NewCleavage/>
    {/if}
</main>

<style lang="postcss" global>
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
  </style>