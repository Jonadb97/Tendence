<template>
<div id="MainContainer">
  <h1>Home</h1>
</div>
</template>

<script>
export default {
  name: 'IndexPage',
  layout: 'default-lay',

  
  methods: {
    checkIfLogged() {
      if (localStorage.isLogged) {
        this.isLogged = true
        this.userName = this.localStorage.username
        return { value: 'true' }
      }
  },
  beforeMount() {
      this.checkIfLogged()
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