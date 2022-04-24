<template>
  <div id="root-component" class="grid grid-cols-2 m-0 p-0">
    <div id="admin-nav" class="w-4/12 flex-col rounded-lg">
      <br class="my-4">
      <b-button
      type="is-dark"
      inverted 
      class="my-2 mx-12"
      icon-left="home"
      >Panel Principal</b-button>
      <b-button
      type="is-dark"
      inverted 
      class="my-2 mx-12"
      pack="mdi"
      icon-left="calendar"
      >Calendario</b-button>
      <b-button
      type="is-dark"
      inverted 
      class="my-2 mx-12"
      icon-left="account-cash"
      >Gestión de Servicios</b-button>
      <b-button
      type="is-dark"
      inverted 
      class="my-2 mx-12"
      icon-left="account-group"
      >Gestión de Empleados</b-button>
      <b-button
      type="is-dark"
      inverted 
      class="my-2 mx-12"
      icon-left="alarm"
      >Gestión de Horarios</b-button>
      <b-button
      type="is-dark"
      inverted 
      class="my-2 mx-12"
      icon-left="account"
      >Mi Perfil</b-button>
    </div>
    <div
      id="main-content"
      class="flex flex-col justify-center items-center text-center"
    >
      <h1 class="font-bold text-2xl my-6 text-white">{{ $auth.user }}</h1>
      <!-- Card turnos para hoy -->
      <h1 class="flex flex-col font-bold text-xl text-white text-center object-center self-center align-center">Próximos Turnos Hoy:</h1>

      <div id="card-turno-actual" class="card">
        <div class="flex align-content-center items-center">
          <img
            id="service-img"
            class="w-1/2 rounded-full m-2 mx-auto"
            src="../../static/img/cortePelo.png"
            alt="Pelo"
          />
        </div>

        <header class="card-header">
          <p class="card-header-title">Corte de pelo</p>
        </header>

        <div class="card-content">
          <h2 class="my-1 font-bold">Fecha:</h2>
          <p id="fecha-turno" class="my-1">23-4-2022</p>
          <h2 class="font-bold my-1">Hora:</h2>
          <p id="hora-turno" class="my-1">18:00</p>
        </div>
        <b-button type="is-dark" class="m-4 p-4"
          >Editar</b-button
        >
      </div>

      <!-- Carrousel turnos recientes -->

      <h1 class="my-6 font-bold text-xl text-white">Turnos recientes:</h1>

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
              <h2 class="my-1 font-bold">Fecha:</h2>
              <p id="fecha-turno" class="my-1">12-3-2022</p>
              <h2 class="font-bold my-1">Hora:</h2>
              <p id="hora-turno" class="my-1">20:00</p>
            </div>
            <b-button type="is-success" class="m-4 p-4" icon-right="check"
              >Confirmar</b-button
            >
          </div>
        </li>
        <li>
          <div id="card-turno-actual" class="card">
            <div class="flex align-content-center items-center">
              <img
                id="service-img"
                class="w-1/2 rounded-full m-2 mx-auto"
                src="../../static/img/cortePeloyBarba.png"
                alt="Pelo"
              />
            </div>
            <header class="card-header">
              <p class="card-header-title">Corte de pelo y barba</p>
            </header>

            <div class="card-content">
              <h2 class="my-1 font-bold">Fecha:</h2>
              <p id="fecha-turno" class="my-1">10-2-2022</p>
              <h2 class="font-bold my-1">Hora:</h2>
              <p id="hora-turno" class="my-1">19:00</p>
            </div>
            <b-button type="is-success" class="m-4 p-4" icon-right="check"
              >Confirmar</b-button
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
              <h2 class="my-1 font-bold">Fecha:</h2>
              <p id="fecha-turno" class="my-1">16-3-2022</p>
              <h2 class="font-bold my-1">Hora:</h2>
              <p id="hora-turno" class="my-1">19:00</p>
            </div>
            <b-button type="is-success" class="m-4 p-4" icon-right="check"
              >Confirmar</b-button
            >
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DashPage',
  layout: 'default-lay',

  // Hay que fetchear la fecha y hora para ponerlos reactivos en el card de turnos pendientes y los anteriores

  data() {
    return {
      open: true,
      overlay: false,
      fullheight: true,
      fullwidth: false,
      right: false
    }
  },
}
</script>

<style>
#main-content {
  margin-right: 32rem;
}

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

#root-component {
  margin: 0.5rem 8rem 2rem 8rem;
}

#sidebar {
  z-index: -1;
}

#root-container {
  z-index: 3;
}

.card {
  width: 15rem;
  border-radius: 2rem;
}

.card-header-title {
  text-align: center;
  justify-content: center;
}

#admin-nav {
  box-shadow: 5px 5px 20px rgba(0, 0, 0, 0.486);
  background-color: #363636;
  margin-top: 5%;
  margin-left: 5%;
  height: 31%;
  max-height: 100%;

}



</style>
