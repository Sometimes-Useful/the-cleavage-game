<script lang="ts">
    import { onMount } from "svelte";
    import type { VideoExtract } from "../../../domain/entities/VideoExtract";
    import { VideoExtractStopEvent } from "../../../domain/events/videoExtractEnd/VideoExtractStopEvent";
    import { applicationEventStore, videoExtractStore, videoExtractVolumeStore } from "../../stores/stores";
    const youtubeHtmlElementId= 'youtube'
    const loadYouTubeIFrameApiScript = (youtubeIframeApiUrl: string, onYouTubeIframeAPIReadyCallback:()=>void) => {
        console.log("loadYoutTubeScript");
        const scriptElement=document.createElement('script');
        scriptElement.src=youtubeIframeApiUrl;
        const firstScriptTag=document.getElementsByTagName('script')[0];
        if(!firstScriptTag.parentNode) throw( new Error(`Parent node of ${firstScriptTag.tagName} not found.`))
        firstScriptTag.parentNode.insertBefore(scriptElement,firstScriptTag);
        (window as any).onYouTubeIframeAPIReady=onYouTubeIframeAPIReadyCallback;
    }
    let playerTimeoutToPlayVideoExtract :NodeJS.Timeout|undefined
    const events:YT.Events = {
        onReady(event: YT.PlayerEvent) {
            console.log("YT Player On Ready")
            playerTimeoutToPlayVideoExtract = setTimeout(()=>onStop(event.target),5000)
            if($videoExtractStore) onVideoExtract($videoExtractStore,event.target)
        },
        onStateChange(event: YT.OnStateChangeEvent) {
            console.log(`YT Player On State Change ${event.data}`)
            if (event.data === YT.PlayerState.UNSTARTED) {
                if(playerTimeoutToPlayVideoExtract) clearTimeout(playerTimeoutToPlayVideoExtract)
                event.target.setVolume($videoExtractVolumeStore)
                event.target.playVideo();
            }
            if (event.data === YT.PlayerState.ENDED) onStop(event.target)
        },
        onPlaybackQualityChange(event: YT.OnPlaybackQualityChangeEvent) { console.log(`YT Player On Playback Quality Change ${event.data}`) },
        onPlaybackRateChange(event: YT.OnPlaybackRateChangeEvent) { console.log(`YT Player On Playback Rate Change ${event.data}`) },
        onError(event: YT.OnErrorEvent) { 
            console.log(`YT Player On Error : ${event.data}`) 
            setTimeout(()=>onStop(event.target),2000) 
        },
        onApiChange(event: YT.PlayerEvent) { console.log("YT Player On API Change",event) },
    }
    const onVideoExtract = (videoExtract:VideoExtract,targetPlayer:YT.Player) => {
        const videoByIdSettings:YT.VideoByIdSettings = {
            videoId: videoExtract.youtubeVideoId, 
            startSeconds:videoExtract.startExtractSeconds,
            endSeconds:videoExtract.endExtractSeconds,
        }
        console.log(`Load video '${JSON.stringify(videoByIdSettings)}'`)
        targetPlayer.loadVideoById(videoByIdSettings)
    }
    const onStop = (targetPlayer: YT.Player): void => {
        console.log("YT Player On Stop")
        targetPlayer.destroy()
        $applicationEventStore = new VideoExtractStopEvent()
    }
    const isExternalScriptLoaded = (url:string) => [...document.getElementsByTagName("script")].some(script => script.src === url)
    const playerVars:YT.PlayerVars = { 
        autoplay: 0, 
        controls: 1, 
        // cc_load_policy:0, 
        disablekb:1, 
        fs:0 , 
        //iv_load_policy:3, 
        modestbranding:1, 
        // showinfo:0 deprecated
    }
    const createYouTubePlayer = () => new YT.Player(youtubeHtmlElementId, { height: '100%', width: '100%', playerVars, events })
    onMount(()=>{
        const youtubeIframeApiUrl = "https://www.youtube.com/iframe_api";
        isExternalScriptLoaded(youtubeIframeApiUrl) ? createYouTubePlayer() : loadYouTubeIFrameApiScript(youtubeIframeApiUrl,createYouTubePlayer)        
    })
</script>
<style>
    #youtube{
        pointer-events: none; /* Disable any user interaction at all */
    }
</style>
<div class="flex flex-row w-full h-full items-center justify-center p-5">
    <div id={youtubeHtmlElementId}></div>
</div>