<script>
    import { generators } from "../generators/generators";
    import { getData, saveData } from "../data.service";
    import { createEventDispatcher, onMount } from "svelte";

    const dispatch = createEventDispatcher();

    const template = `{
        "label": "",
        "url": "",
        "formHandle": "",
        "inputs": [
            { "handle": "", "value": "" }
        ]
    }`;

    export let text;

    onMount(() => {
       if(!text) {
           text = template;
       }
    });

    async function save() {
        const obj = JSON.parse(text);
        let items = await getData('items');
        items = items.filter(i => i.label !== obj.label);
        items = [...items, obj];
        saveData("items", items);
        dispatch('templateAdded', obj);
    }
</script>

<div>
    <textarea bind:value={text} id="editor" class="form-control"></textarea>
    <button class="btn btn-outline-primary mt-1" on:click={save}>Save</button>
    <h2 class="heading-secondary">Generators</h2>
    <ul>
        {#each generators as generator}
            <li>{`{${generator.key}}`}</li>
        {/each}
    </ul>
</div>

<style>
    textarea {
        height: 300px;
    }
</style>