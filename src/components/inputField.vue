<template>
  <input
   class="form-control mt-4"
    :type="type"
    :placeholder="placeholder"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
  />
</template>

<script>
export default {
  props: {
    modelValue: String,
    placeholder: String,
    type: String
  }
}
</script>

<style  scoped>

</style>