<template>
  <div class="comedian-module">
    <button v-on:click="cleanOutput" class="tooltip">
      🗑
      <span class="tooltiptext">clean</span>
    </button>

    <h4 ref="comedian_code">{{comedian_name}}</h4>
    <div class="output_box">
      <p>
        <span v-for="({input, output},key) in conversationChain" :key="key">
          <span style="color:#9770EA">{{" " + input}}<span style="color:black">{{output}}</span>
          </span>
        </span>
      </p>
    </div>
    <textarea
      ref="textinput"
      @keydown.enter.prevent="init"
      cols="40"
      rows="1"
      placeholder="'I want a','bunnies like','my passion is'"
    ></textarea>

    <sourceCaption v-show="captionWanted" v-bind:comcap="this.comedian_name"></sourceCaption>
  </div>
</template>


<script>
import { bus } from "../main";
// import { generateEnd } from "./Markov.js";
import { generateEnd } from "./ngram.js";
import { rant } from "./rant.js";
import sourceCaption from "./sourceCaption.vue";
import aziz from "raw-loader!../assets/aziz.txt";
import jerry from "raw-loader!../assets/jerry.txt";
import amy from "raw-loader!../assets/amy.txt";
import bill from "raw-loader!../assets/bill.txt";
import ali from "raw-loader!../assets/ali.txt";
import louis from "raw-loader!../assets/louis.txt";
import kevin from "raw-loader!../assets/kevin.txt";

export default {
  name: "comModule",
  props: {
    comedian_name: {
      type: String,
      default: ""
    },
    captionWanted: {
      type: Boolean,
      default: true
    }
  },
  components: {
    sourceCaption
  },
  data() {
    return {
      // battleCompilation: [{ battleOut: "some" }],
      text_label: this.comedian_name,
      show_captions: this.captionWanted,
      conversationChain: [
        {
          input: "",
          output: ""
        }
      ]
    };
  },
  watch: {
    // This would be called anytime the value of title changes
    // toWatchSomeValue(newValue, oldValue) {
    //   //do stuff with newValue and oldValue
    // }
  },
  methods: {
    nameCheck: function(label) {
      if (label == "Aziz Ansari") {
        return aziz;
      } else if (label == "Jerry Seinfeld") {
        return jerry;
      } else if (label == "Amy Schumer") {
        return amy;
      } else if (label == "Bill Maher") {
        return bill;
      } else if (label == "Ali Wong") {
        return ali;
      } else if (label == "Louis C.K.") {
        return louis;
      } else if (label == "Kevin Hart") {
        return kevin;
      }
    },
    init: function() {
      let current_sentence = this.$refs.textinput.value;
      current_sentence =
        current_sentence[0] + current_sentence.slice(1).toLowerCase();
      let selected_corpus = this.nameCheck(this.text_label);
      let sentence = generateEnd(current_sentence, selected_corpus);
      this.$refs.textinput.value = "";
      this.appendToConversation(sentence[0], sentence[1]);
      this.scrollBottom();
    },
    appendToConversation(input1, input2) {
      this.conversationChain.push({
        input: input1,
        output: input2.replace(input1, "")
      });
    },
    init_byKey: function(e) {
      if (e.keyCode === 13 && !e.shiftKey) {
        e.preventDefault();
        this.init();
      }
    },
    battleToText: function(battleIn) {
      let current_battleIn = battleIn;
      current_battleIn =
        current_battleIn[0] + current_battleIn.slice(1).toLowerCase();
      let selected_corpus = this.nameCheck(this.text_label);
      let sentence = generateEnd(current_battleIn, selected_corpus);
      this.appendToConversation(sentence[0], sentence[1]);
      this.scrollBottom();
    },
    // ranting mode
    rantToText: function(rantIn) {
      let rant_length = rantIn;
      let selected_corpus = this.nameCheck(this.text_label);

      var txt = rant(selected_corpus, rant_length).trim();
      this.rantTXT(txt);
    },
    rantTXT: function(txt) {
      var l = txt.split(" ");

      var self = this.conversationChain;
      var i = 0;
      setInterval(function spl() {
        if (i < l.length) {
          self.push({
            input: "",
            output: l[i]
          });
        }
        i++;
        this.scrollBottom();
      }, 300);
    },
    scrollBottom: function() {
      var container = this.$el.querySelector(".output_box");
      container.scrollTop = container.scrollHeight + 10;
    },
    cleanOutput: function() {
      this.conversationChain = [];
    }
  },
  created() {
    bus.$on("battleF", this.battleToText);
    bus.$on("clean", this.cleanOutput);
    bus.$on("rantM", this.rantToText);
  }
};
</script>


<style scoped>
@import url(https://fonts.googleapis.com/css?family=Roboto+Mono&display=swap);
.comedian-module {
  display: inline-block;
  vertical-align: top;
  text-align: left;
  padding: 20px;
  background-color: white;
  border: 1px solid black;
  border-radius: 5px;
  width: 270px;
  margin: 0 auto;
}

textarea {
  font-family: "Roboto Mono", monospace;
  font-size: 0.6em;
  outline: none;
  padding: 5px;
  box-sizing: border-box;
  width: 100%;
}

.output_box {
  margin-top: 10px;
  margin-bottom: 10px;
  padding-bottom: 10px;
  max-height: 340px;
  overflow-y: auto;
}

.output_box span {
  font-size: 1em;
}

.comedian-module button {
  float: right;
  color: gray;
  outline: none;
  border: none;
}

.tooltip {
  position: relative;
  display: inline-block;
  border-bottom: 1px dotted black;
}

.tooltip .tooltiptext {
  visibility: hidden;
  width: 40px;
  font-size: 0.8em;
  background-color: gray;
  border: 1px solid gray;
  color: white;
  text-align: center;
  border-radius: 2px;
  padding: 1px;

  /* Position the tooltip */
  position: absolute;
  z-index: 1;
}
.tooltip:hover .tooltiptext {
  visibility: visible;
}
</style>