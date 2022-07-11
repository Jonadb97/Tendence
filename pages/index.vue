<template>
  <div id="MainContainer" class="m-auto place-content-center justify-items-center flex">
    <TendenceLogo v-if="auth.loggedIn" id="LOGO" class="my-auto mx-0" style="height: 15rem; transform:translateX(240px)" />
    <TendenceLogo v-else id="LOGO" class="my-auto mx-0" style="height: 15rem; " />
    <img
      id="BT-home"
      src="../static/svg/BarberTendenceTextWhite.svg"
      alt="Barber Tendence"
      class="object-center my-64 mx-auto py-auto"
    />
    
    <b-button
      v-if="!auth.loggedIn"
      type="is-success"
      outlined
      size="is-large"
      pack="mdi"
      icon-right="arrow-right"
      class="m-auto place-content-center hover:scale-105"
      style="border-width: 5px; margin-bottom: 10px;"
      ><NuxtLink to="/Login/LoginPage" class=" hover:text-white"
        >Registrarse / Iniciar sesión</NuxtLink
      ></b-button
    >
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  layout: 'default-lay',
  data() {
    return {
      auth: this.$auth,
    }
  },

  mounted() {
    const auth = this.$auth
    auth.$storage.setLocalStorage(
      'url',
      'https://api-tendence-testing.herokuapp.com'
    )
    auth.$storage.setLocalStorage('urlFront', 'https://tendence.herokuapp.com')
  },
  methods: {},
}
</script>

<style>
@font-face {
  font-family: 'Akira';
  src: url('../static/fonts/AkiraExpandedDemo.otf') format('otf');
}

#home-heading {
  color: white;
}

body,
html {
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
