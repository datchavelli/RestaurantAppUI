<!-- eslint-disable prettier/prettier -->
<template>
  <div class="text-input form-group" style="width: 200px">
    <div>
      <label class="label">{{ label }} </label>
      <input
        class="form-control"
        :type="type"
        :value="value"
        @input="$emit('input', $event.target.value)"
      />
    </div>
    <div>
      <div></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "a-input",
  props: {
    value: {
      required: true,
      type: String,
    },
    label: {
      required: false,
      type: String,
    },
    type: {
      required: false,
      type: String,
    },
  },
  data() {
    return {};
  },
  computed: {
    inputCount() {
      return this.value.length;
    },
  },
};
</script>

<style lang="stylus" scoped>
.text-input {
  label {
    display: block;
    color: white;
  }

  div:first-child {
    text-align: left;
  }
}

input {
  display: block;
  width: 100%;
}

.invalid {
  color: red;

  input {
    border: 1px solid red;
  }
}

.valid {
  color: green;

  input {
    border: 1px solid green;
  }
}
</style>
