<script>
    import { onMount } from 'svelte';
    import { getData, saveData } from "../data.service";
    import Create from "./Create.svelte";
    import { cubicOut } from "svelte/easing";
    import ImportTemplates from "./ImportTemplates.svelte";

    let items = [];
    let currentItem;
    let importOpen = false;

    onMount(async () => {
        items = await getData('items');
        if(!items) {
            items = [];
        }
    });

    function remove(id) {
        items = items.filter(i => i.id !== id);
        saveData('items', items);
    }

    let createMode = false;

    function spin(node, { delay = 0, duration = 400, easing = cubicOut, x = 0, y = 0, opacity = 0 } = {}) {
        const style = getComputedStyle(node);
        const target_opacity = +style.opacity;
        const transform = style.transform === 'none' ? '' : style.transform;
        const od = target_opacity * (1 - opacity);
        return {
            delay,
            duration,
            easing,
            css: (t, u) => `
			    transform: ${transform} translate(${(1 - t) * x}px, ${(1 - t) * y}px);
			    opacity: ${target_opacity - (od * u)};
			    position: absolute;
			    width: 100%;
			`
        };
    }

    function onAddClick() {
        createMode = true;
    }

    function onEdit(item) {
        createMode = true;
        currentItem = item;
    }

    function close() {
        createMode = false;
        currentItem = undefined;
    }

    function handleTemplateAdded(event) {
        items = items.filter(i => i.id !== event.detail.id);
        items = [...items, event.detail];
        close();
    }

    function exportTemplates() {
        const blob = new Blob([JSON.stringify(items)], {type: 'text/json'});
        const elem = window.document.createElement('a');
        elem.href = window.URL.createObjectURL(blob);
        elem.download = "export.json";
        document.body.appendChild(elem);
        elem.click();
        document.body.removeChild(elem);
    }

    function importFinished(data) {
        items = data.detail;
        importOpen = false;
    }
</script>

<main class="container">
    <h1 class="heading-primary">Options</h1>

    {#if createMode}
        <div in:spin="{{ x: 200, duration: 1000 }}" out:spin="{{ x: -200, duration: 1000 }}">
            <div class="text-end">
                <button class="btn btn-link" on:click={close}>
                    <span class="material-icons">close</span>
                </button>
            </div>
            <Create template={currentItem} on:templateAdded={handleTemplateAdded}></Create>
        </div>
    {/if}

    {#if !createMode}
        <div in:spin="{{ x:200, duration: 1000 }}" out:spin="{{ x: -200, duration: 1000 }}">
            <div class="d-flex justify-content-between">
                <div>
                    <button class="btn btn-outline-primary" on:click={onAddClick}>Add template</button>
                </div>
                <div>
                    <button class="btn btn-outline-secondary" on:click={() => importOpen = true}>Import</button>
                    <button class="btn btn-outline-secondary" on:click={exportTemplates}>Export</button>
                </div>
            </div>

            <h2 class="heading-secondary mb-4">Templates list</h2>
            {#if items.length > 0}
                <table class="table table-bordered">
                    <tr>
                        <th>Label</th>
                        <th class="fit-col">Actions</th>
                    </tr>
                    {#each items as item}
                        <tr>
                            <td>{ item.label }</td>
                            <td class="fit-col">
                                <button class="btn btn-sm btn-link" on:click={onEdit(item)}>
                                    <span class="material-icons">mode_edit</span>
                                </button>
                                <button class="btn btn-sm btn-link" on:click={remove(item.id)}>
                                    <span class="material-icons">delete</span>
                                </button>
                            </td>
                        </tr>
                    {/each}
                </table>
            {:else}
                <div class="alert alert-warning">Empty list</div>
            {/if}
        </div>
    {/if}

    {#if importOpen}
        <ImportTemplates on:templatesImported={importFinished}></ImportTemplates>
    {/if}
</main>

<style>
    main {
        position: relative;
    }

    .fit-col {
        white-space: nowrap;
        width: 1%;
    }
</style>