<template>
  <div class="text-input" style="width: 200px">
    <div>
      <label>{{ label }} </label>
      <textarea
        :value="value"
        @input="$emit('input', $event.target.value)"
        ref="textarea"
        @mouseup="onResize"
        :style="resizeStyle"
      ></textarea>
    </div>
    <div v-if="textLimit > 0" class="validation">
      {{ inputCount }}/{{ textLimit }}
    </div>
  </div>
</template>

<script>
export default {
  name: "a-textarea",
  props: {
    label: {
      required: false,
      type: String,
    },
    value: {
      required: true,
      type: String,
    },
    resize: {
      required: false,
      type: String,
    },
    textLimit: {
      required: false,
      type: Number,
    },
    autoResize: {
      required: false,
      type: Boolean,
    },
  },
  methods: {
    onResize() {
      if (this.autoResize) {
        this.$refs.textarea.style.height = "0px";
        this.$refs.textarea.style.height =
          this.$refs.textarea.scrollHeight + "px";
      }
      //   console.dir(this.$refs.textarea);
    },
  },
  computed: {
    resizeStyle() {
      return `resize: $(this.resize)`;
    },
  },
};
</script>

<style lang="stylus" scoped>
label {
  display: block;
}

textarea {
  display: block;
  width: 100%;
}

textarea.valid {
  border: 1px solid green;
}

textarea.invalid {
  border: 1px solid red;
}

.validation {
  text-align: right;
  font-size: 12px;
}
</style>
