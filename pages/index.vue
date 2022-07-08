<template>
<div id="MainContainer">
  <img
          id="BT-home"
          src="../static/svg/BarberTendenceTextWhite.svg"
          alt="Barber Tendence"
          class="object-center my-64 mx-auto py-auto"
      />
</div>
</template>

<script>
export default {
  name: 'IndexPage',
  layout: 'default-lay',

  mounted() {
    const auth = this.$auth
    auth.$storage.setLocalStorage('url', 'https://api-tendence-testing.herokuapp.com')
    console.log("url seteada")
  },
  methods: {
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