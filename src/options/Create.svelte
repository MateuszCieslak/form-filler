<script>
    import { generators } from "../generators/generators";
    import { getData, saveData } from "../data.service";
    import { createEventDispatcher, onMount } from "svelte";
    import { object, string, array } from 'yup';
    import { setLocale } from "yup";
    import { guid } from "../generators/guid";
    import { addPopertyByPath } from "../object.helper";

    setLocale({
        mixed: {
            default: 'Default',
            required: 'Field is required'
        }
    });

    const schema = object().shape({
        label: string().required(),
        url: string().required(),
        formHandle: string().required(),
        inputs: array().required().min(1).of(
            object().shape({
                handle: string().required(),
                value: string().required()
            })
        )
    });

    const dispatch = createEventDispatcher();

    export let template;
    let form = {
        id: guid(),
        label: "",
        url: "",
        formHandle: "",
        inputs: [
            {
                handle: "",
                value: ""
            }
        ]
    };
    let _errors = {};
    $: errors = _errors;
    $: isValid = schema.isValid(form);

    const addInput = () => form.inputs = [...form.inputs, { handle: "", value: "" }];
    const removeInput = i => () => form.inputs = form.inputs.filter((val, index) => index !== i);

    async function submit() {
        console.log(form);
        let items = await getData('items');
        items = items.filter(i => i.id !== form.id);
        items = [...items, form];
        saveData("items", items);
        dispatch('templateAdded', form);
    }

    onMount(async () => {
        if(template) {
           form = Object.assign(form, template);
        }
    });

    function validate(e) {
        schema.validateAt(e.target.name, form)
            .then(() => _errors = addPopertyByPath(_errors, e.target.name, undefined))
            .catch(err => _errors = addPopertyByPath(_errors, e.target.name, err.errors[0]))
    }
</script>

<div class="d-flex">
    <section class="flex-grow-1">
        <h2 class="heading-secondary mb-4">Template data</h2>

        <form class="form" on:submit|preventDefault={submit}>
            <div class="form-group row">
                <div class="col-6">
                    <input
                      class="form-control"
                      type="text"
                      name="label"
                      bind:value={form.label}
                      on:keyup={validate}
                      on:blur={validate}
                    />
                    {#if errors.label}
                        <small class="text-danger">{errors.label}</small>
                    {/if}
                </div>
                <div class="col-6">
                    <input
                      class="form-control"
                      type="text"
                      name="formHandle"
                      bind:value={form.formHandle}
                      on:keyup={validate}
                      on:blur={validate}
                    />
                    {#if errors.formHandle}
                        <small class="text-danger">{errors.formHandle}</small>
                    {/if}
                </div>
            </div>

            <div class="form-group">
                <input
                  class="form-control"
                  type="text"
                  name="url"
                  bind:value={form.url}
                  on:keyup={validate}
                  on:blur={validate}
                />
                {#if errors.url}
                    <small class="text-danger">{errors.url}</small>
                {/if}
            </div>

            {#each form.inputs as input, j}
                <div class="d-flex form-group">
                    <div class="flex-grow-1">
                        <div class="row">
                            <div class="col-6">
                                <input
                                  class="form-control"
                                  bind:value={input.handle}
                                  name="{'inputs['+ j +'].handle'}"
                                  placeholder="Input selector - use css selector"
                                  on:keyup={validate}
                                  on:blur={validate}
                                />
                                {#if errors.inputs && errors.inputs[j]?.handle}
                                    <small class="text-danger">{errors.inputs[j]?.handle}</small>
                                {/if}
                            </div>

                            <div class="col-6">
                                <input
                                  class="form-control"
                                  placeholder="Input value"
                                  name="{'inputs['+ j +'].value'}"
                                  bind:value={input.value}
                                  on:keyup={validate}
                                  on:blur={validate}
                                />
                                {#if errors.inputs && errors.inputs[j]?.value}
                                    <small class="text-danger">{errors.inputs[j].value}</small>
                                {/if}
                            </div>
                        </div>
                    </div>

                    <div class="ms-1">
                        {#if form.inputs.length !== 1}
                            <button class="btn btn-outline-primary" type="button" on:click={removeInput(j)}>-</button>
                        {/if}
                    </div>
                </div>
            {/each}

            <div class="d-block text-end">
                <button class="btn btn-outline-primary" type="button" on:click={addInput}>
                    Add input
                </button>
                {#await isValid then valid}
                    <button type="submit" class="btn btn-outline-primary" disabled="{!valid}">Save</button>
                {/await}
            </div>
        </form>
    </section>

    <section class="flex-fixed-col">
        <div class="px-4">
            <h2 class="heading-secondary">Generators</h2>
            <ul>
                {#each generators as generator}
                    <li>{`{${ generator.key }}`}</li>
                {/each}
            </ul>
        </div>
    </section>
</div>

<style>
    .form-group {
        margin-bottom: 1rem;
    }

    .flex-fixed-col {
        flex: 0 0 250px
    }
</style>