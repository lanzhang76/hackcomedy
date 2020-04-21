<template>
  <div>
    <span>
      Current Mode:
      <b>{{ picked }}</b>
    </span>
    <br />
    <br />
    <div class="sub-mode">
      <input type="radio" id="one" value="Write" v-model="picked" @click="checkBattle('write')" />
      <label for="one">Write</label>
      <p
        v-show="writeBool"
        class="caption"
      >Inside each comedian module, type words or phrases in the text box. After you hit 'ENTER', the virtual comedian will complete your sentence.</p>
    </div>
    <div class="sub-mode">
      <input
        type="radio"
        id="two"
        value="Group Improv"
        v-model="picked"
        @click="checkBattle('group')"
      />
      <label for="two">Group Improv</label>
      <battle v-show="groupBool"></battle>
    </div>
    <div class="sub-mode">
      <input type="radio" id="three" value="Rant" v-model="picked" @click="checkBattle('rant')" />
      <label for="two">Rant</label>
      <rantMode v-show="rantBool"></rantMode>
      <!-- <div class="caption"  id="rant_box">
        <input type="text" id="rant_length" placeholder="Output word-length" />
        <br />
        <button onclick="dothis()">Start</button>
      </div>-->
    </div>
    <!-- <div class="sub-mode">
      <battle v-show="strikeBool"></battle>
      <input
        type="radio"
        id="three"
        value="Connect & Conduct"
        v-model="picked"
        @click="checkBattle('strike')"
      />
      <label for="two">
        <strike>Connect & Conduct</strike>
      </label>
      <p v-show="strikeBool" class="caption">Connect with other machines</p>
    </div>-->
  </div>
</template>>

<script>
import battle from "./battle";
import rantMode from "./rantMode";

export default {
  name: "modes",
  components: {
    battle,
    rantMode
  },
  data() {
    return {
      picked: "Write",

      writeBool: true,
      groupBool: false,
      rantBool: false
    };
  },
  methods: {
    checkBattle: function(tag) {
      if (tag == "write") {
        this.writeBool = true;
        this.groupBool = this.rantBool = false;
      } else if (tag == "group") {
        this.groupBool = true;
        this.writeBool = this.rantBool = false;
      } else if (tag == "rant") {
        this.rantBool = true;
        this.writeBool = this.groupBool = false;
      }
    }
  }
};
</script>

<style scoped>
.caption {
  font-size: 0.5em;
  color: gray;
  padding: 2px;
}
</style>