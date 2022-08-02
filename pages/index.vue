<template>
  <div id="MainContainer" style="margin-top: 6rem; height: 100vh;" class="justify-center items-center flex-col flex">
    <TendenceLogo v-if="auth.loggedIn" id="LOGO" class="items-center justify-center self-center" style="height: 15rem;" />
    <TendenceLogo v-else id="LOGO" class="items-center justify-center self-center" style="height: 15rem; " />
    <img
      id="BT-home"
      src="../static/svg/BarberTendenceTextWhite.svg"
      alt="Barber Tendence"
      class="object-center items-center justify-center"
    />
    
    <b-button
      v-if="!auth.loggedIn"
      type="is-success"
      outlined
      size="is-large"
      pack="mdi"
      icon-right="arrow-right"
      class="items-center self-center justify-center place-content-center hover:scale-105"
      style="border-width: 3px; border-radius: 24px;"
      ><NuxtLink to="/Login/LoginPage" class=" hover:text-white"
        >Comenzar</NuxtLink
      ></b-button>

            <nuxt-link to="/NuevoTurno/NuevoTurnoForm">
        <b-button
          v-show="auth.loggedIn && $device.isDesktop"
          class="flex mx-auto py-2 my-4"
          type="is-success"
          pack="mdi"
          size="is-large"
          outlined
          icon-left="clipboard-plus-outline"
          icon-right="plus"
          label="Agendar nuevo turno"
          style="border-width: 3px; border-radius: 24px"
        />
        <b-button
          v-show="auth.loggedIn && $device.isMobile"
          class="flex mx-auto py-2 my-4"
          type="is-success"
          pack="mdi"
          size="is-medium"
          outlined
          icon-left="clipboard-plus-outline"
          icon-right="plus"
          label="Agendar nuevo turno"
          style="border-width: 3px; border-radius: 24px"
        />
      </nuxt-link>
    <FooterComp class="p-10 mt-auto w-full"></FooterComp>
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


// URL FRONT PROD: https://tendence.herokuapp.com
// URL FRONT DEV: http://192.168.0.6:3000
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
