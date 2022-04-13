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

#MainContainer {
  /* TOP | RIGHT | BOTTOM | LEFT */
  background-image: url('../static/img/barberbackground.jpg');
  background-size: 100%;
  background-repeat: repeat-y;
  transform: translateX(-8rem);
  height: 1080px;
  width: 100%;

}

#BT-home {
  width: 720px;
}


</style>