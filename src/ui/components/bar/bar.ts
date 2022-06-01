import { clientApplication } from '../../../clientApplication'
type BarHtmlElements = {
    pixi: HTMLElement
    cleavageHud: HTMLElement
    commandHud: HTMLElement
}
export const pixiHtmlElementId = 'pixi'
export const onBarComponentMount = (pixiHtmlElementId:string, cleavageHudId:string, commandHudId:string, interval:NodeJS.Timeout|undefined) => {
    const htmlElements = barHtmlElements(pixiHtmlElementId, cleavageHudId, commandHudId)
    clientApplication.addingViewToDom(htmlElements.pixi).then(() => resizePixi(pixiHtmlElementId, cleavageHudId, commandHudId))
    new ResizeObserver(onResize(interval, () => resizePixi(pixiHtmlElementId, cleavageHudId, commandHudId))).observe(htmlElements.pixi)
}
const barHtmlElements = (pixiHtmlElementId:string, cleavageHudId:string, commandHudId:string):BarHtmlElements => {
    const pixi = document.getElementById(pixiHtmlElementId)
    const cleavageHud = document.getElementById(cleavageHudId)
    const commandHud = document.getElementById(commandHudId)
    if (!pixi) throw new Error(missingHtmlElement(pixiHtmlElementId))
    if (!cleavageHud) throw new Error(missingHtmlElement(cleavageHudId))
    if (!commandHud) throw new Error(missingHtmlElement(commandHudId))
    return { pixi, cleavageHud, commandHud }
}
const resizePixi = (pixiHtmlElementId:string, cleavageHudId:string, commandHudId:string) => {
    const htmlElements = barHtmlElements(pixiHtmlElementId, cleavageHudId, commandHudId)
    clientApplication.changeResolution({
        width: window.innerWidth,
        height: window.innerHeight - htmlElements.cleavageHud.clientHeight - htmlElements.commandHud.clientHeight
    })
}
const missingHtmlElement = (pixiHtmlElementId: string): string => `Missing ${pixiHtmlElementId} HTML element`
const onResize = (interval:NodeJS.Timeout|undefined, callback: () => void) => () => {
    if (interval) clearTimeout(interval)
    interval = setTimeout(callback, 100)
}
