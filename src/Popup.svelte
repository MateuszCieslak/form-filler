<script>
    import { onMount } from "svelte";
    import { getData } from "./data.service";
    import { generators } from "./generators/generators";

    let items = [];
    let generated = '';

    onMount(async () => {
        const currentUrl = window.chrome.tabs
            ? (await window.chrome.tabs.query({ active: true, currentWindow: true }))[0].url
            : window.location.href;
        items = (await getData('items')).filter(item => currentUrl.indexOf(item.url) >= 0);
    })

    async function useTemplate(template) {
        let [tab] = await window.chrome.tabs.query({ active: true, currentWindow: true });

        const clone = Object.assign({}, template);
        clone.inputs = template.inputs.map(x => Object.assign({}, x));
        clone.inputs.forEach(input => {
            generators.forEach(r => {
                input.value = input.value.replace(`{${r.key}}`, r.func())
            });
        });
        window.chrome.scripting.executeScript({
            target: { tabId: tab.id },
            function: adjustForm,
            args: [clone]
        });
    }

    const adjustForm = (itemData, replacments) => {
        const form = document.querySelector(itemData.formHandle);
        itemData.inputs.forEach(inputData => {
            const input = form.querySelector(inputData.handle);
            if(!input) {
                console.error(`Control with handle ${inputData.handle} not found`);
                return;
            }
            input.value = inputData.value;
            const changeEvent = new Event(input.localName === "select" ? "change" : "input");
            input.dispatchEvent(changeEvent);
        });
    }

    function setGeneratedValue(value) {
        generated = value;
        setToFocusedElement(value);
    }

    function setToFocusedElement(value) {
        window.chrome.tabs.query({ active: true, currentWindow: true })
            .then((x) => {
                window.chrome.scripting.executeScript({
                    target: { tabId: x[0].id },
                    function: (val) => {
                        document.activeElement.value = val;
                        const changeEvent = new Event("input");
                        document.activeElement.dispatchEvent(changeEvent);
                    },
                    args: [value]
                });
            });
    }
</script>

<main>
    <h2 class="heading-secondary">Available templates</h2>
    <div class="pb-2">
        {#if items.length > 0}
            {#each items as item}
                <button class="btn btn-outline-primary m-1" on:click={useTemplate(item)}>{item.label}</button>
            {/each}
        {:else}
            <div class="alert alert-warning">No available templates.</div>
        {/if}
    </div>

    <h2 class="heading-secondary">Generators</h2>
    <div>
        {#each generators as g}
            <button class="btn btn-outline-primary m-1" on:click={() => setGeneratedValue(g.func())}>{g.key}</button>
        {/each}
    </div>
    {#if generated}
        <div class="pb-2">
            <span>Generated value</span>
            <input class="form-control" readonly bind:value={generated} />
        </div>
    {/if}
</main>

<style>
    main {
        width: 300px;
    }
</style>