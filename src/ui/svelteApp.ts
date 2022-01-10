import SPA from './Main.svelte'

const app = new SPA({
    target: document.body,
    props: {
        name: 'world'
    }
})

export default app
