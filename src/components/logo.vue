<template>
  <div id="logo">
    <img src="../assets/comcom_logo.png" />
  </div>
</template>

<script>
export default {
  name: "logo",
  data() {
    return {};
  }
};
</script>


<style scoped>
#logo {
  overflow: hidden;
}
#logo img {
  position: fixed;
  z-index: 1000;
  overflow: hidden;
  right: -30px;
  top: 0px;
  float: right;
  width: 100px;
  height: 100px;
  margin: -30px 0 0 -30px;
  -webkit-animation: spin 8s linear infinite;
  -moz-animation: spin 8s linear infinite;
  animation: spin 8s linear infinite;
}

@-moz-keyframes spin {
  100% {
    -moz-transform: rotate(360deg);
  }
}
@-webkit-keyframes spin {
  100% {
    -webkit-transform: rotate(360deg);
  }
}
@keyframes spin {
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
</style>