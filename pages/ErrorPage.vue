<template>
<div id="MainContainer">
  <img
          id="BT-error"
          src="../static/svg/BarberTendenceTextWhite.svg"
          alt="Barber Tendence"
          class="object-center my-auto mx-auto py-auto"
      />
      <h1 class="text-center mx-auto py-auto text-white text-6xl font-bold">Oops!</h1>
      <h2 class="text-center mx-auto py-auto text-white text-6xl">Algo ha salido mal</h2>
      <b-icon
      pack="mdi"
      icon="hand-pointing-down"
      size="is-large"
      class="object-center my-3 mx-auto text-center p-2 text-white flex animate-bounce"
      ></b-icon>
      <br>
      <NuxtLink to="/"><b-button
      class="object-center my-3 mx-auto text-center p-4 text-white flex hover:text-blue-500"
      size="is-large"
      pack="mdi"
      icon-left="home"
      >Redireccionar a inicio</b-button></NuxtLink>
</div>
</template>

<script>
export default {
  name: 'ErrorPage',
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

#home-heading {
  color: white;
}

body, html {
  background-image: url('../static/img/barberbackground.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: repeat-y;
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
}

#BT-home {
  width: 720px;
}


</style>