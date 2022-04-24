<template>
<div id="MainContainer">
  <h1 id="home-heading" class="m-0 p-0">Home</h1>
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