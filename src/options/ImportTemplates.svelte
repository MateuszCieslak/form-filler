<script>
    import {createEventDispatcher} from "svelte";
    import {getData, saveData} from "../data.service";

    const dispatch = createEventDispatcher();
    let dataToImport;
    let importOption = 'override';

    function readFile(e) {
        var file = e.target.files[0];
        if (!file) return;
        var reader = new FileReader();
        reader.onload = function(e) {
            dataToImport = e.target.result;
        }
        reader.readAsText(file)
    }

    async function save() {
        let items = [];
        if(importOption === 'merge') {
            items = await getData('items');
        }
        items = [...items, ...JSON.parse(dataToImport)];
        saveData("items", items);
        dispatch('templatesImported', items)
    }

    function close() {
        dispatch('close')
    }
</script>

<div class="modal fade show" style="display: block" id="exampleModal">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                <button type="button" class="close" on:click={close}>
                    <span aria-hidden="true">×</span>
                </button>
            </div>
            <div class="modal-body">
                <input type="file" on:change={readFile}>
                <div class="pt-3 d-flex justify-content-around">
                    <label>
                        <input type="radio" bind:group={importOption} name="option" value="override" /> Override
                    </label>

                    <label>
                        <input type="radio" bind:group={importOption} name="option" value="merge" /> Merge
                    </label>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" on:click={save}>
                    Save changes
                </button>
            </div>
        </div>
    </div>
</div>
<div class="modal-backdrop fade show" id="backdrop"></div>