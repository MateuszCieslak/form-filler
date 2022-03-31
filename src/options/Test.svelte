<script>
    import { createForm } from "svelte-forms-lib";
    import * as yup from "yup";
    import { setLocale } from "yup";

    setLocale({
        mixed: {
            default: 'Default',
            required: 'Field is required'
        }
    });

    const { form, errors, state, handleChange, handleSubmit, isValid } = createForm({
        initialValues: {
            label: "",
            url: "",
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
        onSubmit: values => {
            alert(JSON.stringify(values));
        }
    });
</script>

<form class="m-4 p-4">
    <label for="label">label</label>
    <input
      id="label"
      name="label"
      on:change={handleChange}
      on:blur={handleChange}
      on:keyup={handleChange}
      bind:value={$form.label}
    />
    {#if $errors.label}
        <small>{$errors.label}</small>
    {/if}

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

    <div class="d-block text-right">
        {$isValid}
        {#each Object.keys($errors) as err}
            <div>{err} {$errors[err]}</div>
        {/each}
        <button class="btn btn-outline-primary" type="button" on:click={add}>+</button>
        <button class="btn btn-outline-primary" type="button" on:click={handleSubmit} >
            Save
        </button>
        <button type="button" on:click={test}>Test</button>
    </div>
</form>
