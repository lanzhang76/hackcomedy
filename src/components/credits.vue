<template>
  <div class="comedian-module">
    <!-- <h4 style="color:#9770EA">About</h4> -->
    <div class="output_box">
      The virtual comedians are built with n-gram/Markov Chains model and comedians’ transcripts Lan scraped from the internet.
      You can learn more about her process
      <a
        href="https://www.notion.so/Hack-Comedy-2c610dde29eb48cebd6f8f5c0cfdf961"
        target="”_blank”"
      >here</a> and the technical repo
      <a
        href="https://github.com/lanzhang76/hackcomedy"
        target="”_blank”"
      >here</a>.
    </div>
    <span class="caption" id="intro">The site is built with Vue.js</span>
  </div>
</template>
<script>
export default {
  name: "credits"
};
</script>

<style>
.caption {
  line-height: 1.5;
}

#intro {
  line-height: 0.2;
}

.output_box a {
  color: #9770ea;
  text-decoration: none;
}
</style>