<template>
  <div class="battle-module">
    <div class="textInput">
      <textarea
        ref="battletextinput"
        @keydown.enter.prevent="submit_sentence"
        cols="40"
        rows="5"
        placeholder="You can type words or phrases here and hit 'ENTER' or press 'Write'."
        required
      ></textarea>
    </div>
    <div class="textInput">
      <button v-on:click="submit_sentence">Write</button>
      <button v-on:click="clean">Clean all outputs</button>
    </div>
  </div>
</template>

<script>
import { bus } from "../main";

export default {
  name: "battle",
  data() {
    return {};
  },
  methods: {
    init_byKey: function(e) {
      if (e.keyCode === 13) {
        console.log("battle submitted");
        this.submit_sentence();
      }
    },
    submit_sentence: function() {
      let current_sentence = this.$refs.battletextinput.value;
      bus.$emit("battleF", current_sentence.replace("\n", ""));
      this.$refs.battletextinput.value = "";
    },
    clean: function() {
      bus.$emit("clean");
    }
  }
};
</script>

<style scoped>
@import url(https://fonts.googleapis.com/css?family=Roboto+Mono&display=swap);
.battle-module {
  text-align: left;
  padding: 10px;
}
.textInput {
  /* width: 600px; */
  display: inline-block;
  vertical-align: middle;
}

.textInput textarea {
  font-family: "Roboto Mono", monospace;
  font-size: 0.7em;
  background: transparent;
  color: black;
  outline: none;
  padding: 5px;
  box-sizing: border-box;
  width: 100%;
}

.textInput button {
  font-size: 0.4em;
  color: white;
  background-color: black;
  outline: none;
}
</style>