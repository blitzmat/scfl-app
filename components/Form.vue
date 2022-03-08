<template>
    <FormulateForm
    :values="form"
    @submit="submitted"
    >
        <slot name="inputs"></slot>
        <slot name="errors"></slot>
        <slot name="footer"></slot>
    
    </FormulateForm>
</template>

<script>
export default {
    name: 'Form',
    props: {
        form: {
            required: true,
        },
        loading: false
    },
    methods: {
        submitted () {
            this.form.finish = true
            this.$emit('update:form', this.form)
        }
    }
}
</script>