<template>
  <div id="root-component" class="grid grid-cols-2 m-0 p-0">
    <DashNav />
    <div
      id="main-content"
      class="flex flex-col justify-center items-center text-center"
    >
      <h1 class="font-bold text-2xl my-6 text-white">{{ $auth.user }}</h1>



      <!-- Carrousel turnos recientes -->

      <h1 class="my-6 font-bold text-xl text-white">Servicios:</h1>

      <ul class="inline-flex">
        <li>
          <div id="card-turno-actual" class="card">
            <div class="flex align-content-center items-center">
              <img
                id="service-img"
                class="w-1/2 rounded-full m-2 mx-auto"
                src="../../static/img/cortePeloyBarbaConBrillito.png"
                alt="Pelo"
              />
            </div>
            <header class="card-header">
              <p class="card-header-title">Shot keratínico</p>
            </header>

            <div class="card-content">
              <h2 class="my-1 font-bold">Descripción:</h2>
              <p id="fecha-turno" class="my-1 text-xs">Shot de keratina directo a las raíces más profundas de tus pelos</p>
            </div>
            <b-button type="is-dark" class="m-4 p-4"
              >Editar</b-button
            >
          </div>
        </li>
                <li>
          <div id="card-turno-actual" class="card">
            <div class="flex align-content-center items-center">
              <img
                id="service-img"
                class="w-1/2 rounded-full m-2 mx-auto"
                src="../../static/img/cortePeloyBarbaConBrillito.png"
                alt="Pelo"
              />
            </div>
            <header class="card-header">
              <p class="card-header-title">Shot keratínico</p>
            </header>

            <div class="card-content">
              <h2 class="my-1 font-bold">Descripción:</h2>
              <p id="fecha-turno" class="my-1 text-xs">Shot de keratina directo a las raíces más profundas de tus pelos</p>
            </div>
            <b-button type="is-dark" class="m-4 p-4"
              >Editar</b-button
            >
          </div>
        </li>
                <li>
          <div id="card-turno-actual" class="card">
            <div class="flex align-content-center items-center">
              <img
                id="service-img"
                class="w-1/2 rounded-full m-2 mx-auto"
                src="../../static/img/cortePeloyBarbaConBrillito.png"
                alt="Pelo"
              />
            </div>
            <header class="card-header">
              <p class="card-header-title">Shot keratínico</p>
            </header>

            <div class="card-content">
              <h2 class="my-1 font-bold">Descripción:</h2>
              <p id="fecha-turno" class="my-1 text-xs">Shot de keratina directo a las raíces más profundas de tus pelos</p>
            </div>
            <b-button type="is-dark" class="m-4 p-4"
              >Editar</b-button
            >
            
          </div>
        </li>
      </ul>
              <br>
        <b-button
        type="is-success"
        size="is-large"
        pack="mdi"
        icon-right="plus"
        icon-left="account-cash"
        outlined
        class="m-8 p-8 text-lg font-bold"
        v-on:click="showModal()"
        >
          Nuevo Servicio
        </b-button>
        <br>
        <!-- Modal Nuevo Servicio -->
<div v-if="showServiceModal" id="modal-newservice" class="absolute object-center bg-white m-4 p-4 drop-shadow-lg">
      <b-button
        label=""
        class="m-1 left-0 top-0 -translate-x-24"
        pack="mdi"
        icon-right="arrow-left-circle"
        type="is-primary"
        v-on:click="closeModal()"
        ></b-button>
  <div class="inline-flex"><h2 id="nombre-servicio" class="text-black my-auto mx-4"> Servicio 1 </h2></div>
  <br>
  <div class="inline-flex"><h2 id="nombre-servicio" class="text-black my-auto mx-4"> Descripción del servicio:</h2> <p> Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum id minus doloribus quis facilis corporis laboriosam sapiente enim provident impedit molestiae, est porro. Dolorem reprehenderit iusto sequi vitae neque tenetur? </p>  </div>
        <b-button
        label=""
        class="m-1 my-auto"
        pack="mdi"
        icon-right="check-bold"
        type="is-primary"
        ></b-button>
        </div>
        </div>
  </div>

</template>

<script>
export default {
  name: 'DashServices',
  layout: 'default-lay',

  // Hay que fetchear la fecha y hora para ponerlos reactivos en el card de turnos pendientes y los anteriores

  data() {
    return {
      showServiceModal: false,
      open: true,
      overlay: false,
      fullheight: true,
      fullwidth: false,
      right: false
    }
  },
  methods: {
    closeModal() {
      this.$data.showServiceModal = false
    },
    showModal() {
      this.$data.showServiceModal = true
    }
  }
}
</script>

<style>

.panel-tabs {
  background-color: white;
}

.panel-tabs > a {
  margin-left: 4rem;
  margin-right: 4rem;
  color: black;
  font-weight:500;

}

#footer-item-style {
  background-color: rgb(46, 46, 46);
  color: white;
}

#footer-item-style:hover {
  background-color: rgb(46, 46, 46);
  color: white;
  font-weight: bold;
}

#card-turno-actual {
  margin: 2rem;
}



#sidebar {
  z-index: -1;
}

#root-container {
  z-index: 3;
}


.card {
  min-width: 15rem;
  width: 15rem;
  border-radius: 2rem;
}

.card-header-title {
  text-align: center;
  justify-content: center;
}




</style>
