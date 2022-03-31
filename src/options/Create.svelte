<script>
    import { generators } from "../generators/generators";
    import { getData, saveData } from "../data.service";
    import { createEventDispatcher, onMount } from "svelte";
    import { createForm } from "svelte-forms-lib";
    import * as yup from "yup";
    import { setLocale } from "yup";
    import { guid } from "../generators/guid";

    setLocale({
        mixed: {
            default: 'Default',
            required: 'Field is required'
        }
    });

    const {
        form,
        errors,
        state,
        handleChange,
        handleSubmit,
        handleReset,
        isValid,
        updateInitialValues
    } = createForm({
        initialValues: {
            id: guid(),
            // label: "",
            // url: "",
            formHandle: "",
            inputs: [
                {
                    handle: "",
                    value: ""
                }
            ]
        },
        validationSchema: yup.object().shape({
            label: yup.string().required(),
            url: yup.string().required(),
            formHandle: yup.string().required(),
            inputs: yup.array().of(
                yup.object().shape({
                    handle: yup.string().required(),
                    value: yup.string().required()
                })
            )
        }),
        onSubmit: async (values) => {
            console.log(values);
            // const obj = values;
            // let items = await getData('items');
            // items = items.filter(i => i.label !== obj.label);
            // items = [...items, obj];
            // saveData("items", items);
            // dispatch('templateAdded', obj);
        }
    });

    const add = () => {
        $form.inputs = $form.inputs.concat({ handle: "", value: "" });
        $errors.inputs = $errors.inputs.concat({ handle: "", value: "" });
    };

    const remove = i => () => {
        $form.inputs = $form.inputs.filter((u, j) => j !== i);
        $errors.inputs = $errors.inputs.filter((u, j) => j !== i);
    };

    const dispatch = createEventDispatcher();
    export let template;

    onMount(() => {
        if(template) {
            updateInitialValues(template);
        }
    });
</script>

<div class="d-flex">
    <section class="flex-grow-1">
        <h2 class="heading-secondary mb-4">Template data</h2>
        <form class="my-4" on:submit={handleSubmit}>
            <div class="form-group row">
                <div class="col-6">
                    <input
                      class="form-control"
                      type="text"
                      name="label"
                      bind:value={$form.label}
                      placeholder="Label - name of Your template"
                      on:change={handleChange}
                      on:keyup={handleChange}
                      on:blur={handleChange}
                    />
                    {#if $errors.label}
                        <small class="text-danger">{$errors.label}</small>
                    {/if}
                </div>
                <div class="col-6">
                    <input
                      class="form-control"
                      type="text"
                      name="formHandle"
                      bind:value={$form.formHandle}
                      placeholder="Form selector - use css selector"
                      on:change={handleChange}
                      on:keyup={handleChange}
                      on:blur={handleChange}
                    />
                    {#if $errors.formHandle}
                        <small class="text-danger">{$errors.formHandle}</small>
                    {/if}
                </div>
            </div>

            <div class="form-group">
                <input
                  class="form-control"
                  type="text"
                  name="url"
                  bind:value={$form.url}
                  placeholder="Url match"
                  on:change={handleChange}
                  on:keyup={handleChange}
                  on:blur={handleChange}
                />
                {#if $errors.url}
                    <small class="text-danger">{$errors.url}</small>
                {/if}
            </div>

            {#each $form.inputs as input, j}
                <div class="d-flex form-group">
                    <div class="flex-grow-1">
                        <div class="row">
                            <div class="col-6">
                                <input
                                  class="form-control"
                                  name={`inputs[${j}].handle`}
                                  placeholder="Input selector - use css selector"
                                  on:change={handleChange}
                                  on:keyup={handleChange}
                                  on:blur={handleChange}
                                  bind:value={$form.inputs[j].handle}
                                />
                                {#if $errors.inputs[j].handle}
                                    <small class="text-danger">{$errors.inputs[j].handle}</small>
                                {/if}
                            </div>

                            <div class="col-6">
                                <input
                                  class="form-control"
                                  placeholder="Value"
                                  name={`inputs[${j}].value`}
                                  on:change={handleChange}
                                  on:keyup={handleChange}
                                  on:blur={handleChange}
                                  bind:value={$form.inputs[j].value}
                                />
                                {#if $errors.inputs[j].value}
                                    <small class="text-danger">{$errors.inputs[j].value}</small>
                                {/if}
                            </div>
                        </div>
                    </div>

                    <div class="ms-1">
                        {#if $form.inputs.length !== 1}
                            <button class="btn btn-outline-primary" type="button" on:click={remove(j)}>-</button>
                        {/if}
                    </div>
                </div>
            {/each}

            <div class="d-block text-end">
                <button class="btn btn-outline-primary" type="button" on:click={add}>
                    Add input
                </button>
                <button class="btn btn-outline-primary" type="button" on:click={handleSubmit} disabled="{!$isValid}">
                    Save
                </button>
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