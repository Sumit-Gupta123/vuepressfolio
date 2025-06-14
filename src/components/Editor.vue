<template>
  <textarea
    v-model="content"
    rows="15"
    placeholder="Write Markdown here..."
  ></textarea>
</template>

<script>
export default {
  props: ['modelValue'],
  emits: ['update:modelValue'],
  computed: {
    content: {
      get() {
        return this.modelValue;
      },
      set(val) {
        this.$emit('update:modelValue', val);
      }
    }
  }
};
</script>

<style scoped>
textarea {
  width: 100%;
  font-size: 1rem;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #999;
}
</style>

