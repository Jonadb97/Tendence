<template>
  <div id="root-component" class="grid grid-cols-2 m-0 p-0">
    <div id="admin-nav" class="w-4/12 flex-col h-max">
      <br class="my-4">
      <b-button
      type="is-dark"
      inverted 
      class="my-2 mx-12"
      icon-left="home"
      ><NuxtLink to="/Dash/DashPage">Panel Principal</NuxtLink></b-button>
      <b-button
      type="is-dark"
      inverted 
      class="my-2 mx-12"
      pack="mdi"
      icon-left="calendar"
      ><NuxtLink to="/Dash/DashCalendar">Calendario</NuxtLink></b-button>
      <b-button
      type="is-dark"
      inverted 
      class="my-2 mx-12"
      icon-left="account-cash"
      ><NuxtLink to="/Dash/DashServices">Gestión de Servicios</NuxtLink></b-button>
      <b-button
      type="is-dark"
      inverted 
      class="my-2 mx-12"
      icon-left="account-group"
      ><NuxtLink to="/Dash/DashEmpleados">Gestión de Empleados</NuxtLink></b-button>
      <b-button
      type="is-dark"
      inverted 
      class="my-2 mx-12"
      icon-left="alarm"
      ><NuxtLink to="/Dash/DashHorarios">Gestión de Horarios</NuxtLink></b-button>
    </div>
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
