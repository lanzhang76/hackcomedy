<template>
  <div class="caption" id="rant_box">
    <input
      @keydown.enter.prevent="submit_rant"
      type="text"
      id="rant_length"
      ref="rantLengthInput"
      placeholder="Output word-length"
    />
    <br />
    <button v-on:click="submit_rant">Start</button>
    <button v-on:click="clean">Clean all outputs</button>
  </div>
</template>

<script>
import { bus } from "../main";

export default {
  name: "rantMode",
  data() {
    return {};
  },
  methods: {
    init_byKey: function(e) {
      if (e.keyCode === 13) {
        console.log("battle submitted");
        this.submit_rant();
      }
    },
    submit_rant: function() {
      let rant_length = this.$refs.rantLengthInput.value;
      bus.$emit("rantM", rant_length);
      this.$refs.rantLengthInput.value = "";
    },
    clean: function() {
      bus.$emit("clean");
    }
  }
};
</script>

<style scoped>
#rant_box {
  padding: 10px;
}

#rant_box input {
  font-family: "Roboto Mono", monospace;
  font-size: 0.7em;
  background: transparent;
  color: black;
  outline: none;
  padding: 2px;
  margin-bottom: 5px;
  box-sizing: border-box;
  width: 100%;
}

#rant_box button {
  font-size: 0.4em;
  color: white;
  background-color: black;
  outline: none;
}
</style>