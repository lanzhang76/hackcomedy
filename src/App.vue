<template>
  <div id="app">
    <div class="container">
      <div class="item" id="menu">
        <div class="sub-item">
          <h2>
            <span style="color:#9770ea">Hack</span>(Comedy)
          </h2>
          <p>Explore the condensed identities and themes of the American stand-up comedy landscape</p>
        </div>
        <div class="sub-item" id="comedian_labels">
          <hr />
          <h4>1. Select Comedians</h4>

          <div
            id="ck-button"
            class="check_box"
            v-for="({comedian_name},key) in comedians"
            :key="key"
          >
            <label>
              <input v-model="selected" v-bind:value="comedian_name" type="checkbox" />
              <span>{{comedian_name}}</span>
            </label>
          </div>
        </div>
        <div class="sub-item check_box">
          <hr />
          <h4>2. Select Modes</h4>
          <modes />
        </div>
        <hr />
        <div class="sub-item check_box" id="reference_box">
          <h4>3. Everything else</h4>
          <input v-model="caption_wanted" type="checkbox" />
          <label>Show source: {{caption_wanted}}</label>
          <br />
          <input v-model="about" type="checkbox" />
          <label>About Hack(Comedy)</label>
          <br />
          <input v-model="credits" type="checkbox" />
          <label>Behind the scene</label>
        </div>
        <div class="sub-item" id="credits">Lan Zhang | computational comedy | 2020</div>
      </div>

      <div class="item" id="main">
        <logo />
        <div class="modules" v-for="(i,key) in selected" :key="key">
          <comModule v-bind:comedian_name="i" v-bind:captionWanted="caption_wanted" />
        </div>
        <about class="modules" v-show="about" />
        <credits class="modules" v-show="credits" />
      </div>
    </div>
  </div>
</template>

<script>
import comModule from "./components/comModule.vue";
import modes from "./components/modes";
import logo from "./components/logo";
import about from "./components/about";
import credits from "./components/credits";

export default {
  name: "app",
  components: {
    comModule,
    modes,
    logo,
    about,
    credits
  },
  data() {
    return {
      comedians: [
        { comedian_name: "Aziz Ansari" },
        { comedian_name: "Amy Schumer" },
        { comedian_name: "Bill Maher" },
        { comedian_name: "Jerry Seinfeld" },
        { comedian_name: "Ali Wong" },
        { comedian_name: "Louis C.K." },
        { comedian_name: "Kevin Hart" }
      ],
      selected: [],
      caption_wanted: false,
      about: false,
      credits: false
    };
  }
};
</script>

<style>
@import url(https://fonts.googleapis.com/css?family=Roboto+Mono&display=swap);
body {
  overflow: hidden;
  margin: 0;
}

.container {
  display: grid;
  grid-template-columns: 300px auto;
  /* grid-column-gap: 20px; */
  grid-template-rows: auto;
  grid-template-areas: "menu main";
}

.item {
  height: 98vh;
}
.sub-item {
  display: inline-block;
  margin-bottom: 20px;
}
#menu {
  grid-area: menu;
  padding: 30px;
  background-color: #f0f0f0;
  font-size: 0.7em;
}
#main {
  padding: 20px;
  grid-area: main;
  background-color: #edecee;
  overflow-y: scroll;
}

#app {
  font-family: "Roboto Mono", monospace;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.modules {
  margin-top: 15px;
  margin-right: 0px;
  margin-left: 20px;
  display: inline-block;
}

#ck-button {
  margin: 1px;
  background-color: #efefef;
  border-radius: 2px;
  border: 1px solid #d0d0d0;
  float: left;
}

#ck-button label span {
  text-align: center;
  padding: 4px;
  display: block;
}

#ck-button label input {
  position: absolute;
  top: -20px;
}

#ck-button input:checked + span {
  background-color: #9770ea;
  color: #fff;
}

#credits {
  position: fixed;
  bottom: 0px;
  left: 25px;
  font-size: 0.3em;
  color: gray;
}
</style>
