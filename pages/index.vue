<template>
<div id="MainContainer">
  <h1>Home</h1>
</div>
</template>

<script>
export default {
  name: 'IndexPage',
  layout: 'default-lay',

  beforeMount() {
    this.initLocalStorage();
  },
  methods: {
    initLocalStorage() {
    localStorage.setItem('isLogged', 'false')
    localStorage.setItem('userName', 'anon')
    }
  }
}



</script>

<style>
@font-face {
  font-family: "Akira";
  src: url("../static/fonts/AkiraExpandedDemo.otf")format("otf");
}

#MainContainer {
  /* TOP | RIGHT | BOTTOM | LEFT */
  margin: 0.5rem 8rem 2rem 8rem;
}

</style>