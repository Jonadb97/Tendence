<template>
  <div id="root-component" class="grid grid-cols-2 m-0 p-0">
    <div id="admin-nav" class="w-4/12  flex-col h-max">
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
      class="flex flex-col justify-center items-center text-center "
    >
      <h1 class="font-bold text-2xl my-6 text-white">{{ $auth.user }}</h1>
      <!-- Card turnos para hoy -->
      <h1 class="flex flex-col font-bold text-xl text-white text-center justify-self-start">Empleados:</h1>


      <ul class="inline-flex">
      <li v-for="empleado in empleados" id="service-item" :key="empleado.id">
      <div id="card-turno-actual" class="card">
        <div class="flex align-content-center items-center text-white">
          <img
            id="service-img"
            class="w-1/2 rounded-full m-2 mx-auto"
            :src="url + empleado.imageroute"
            alt="Pelo"
          />
        </div>

        <header class="card-header">
          <p class="card-header-title">{{ empleado.name }}</p>
        </header>

        <div class="card-content">
          <h2 class="my-1 font-bold">Servicios:</h2>
          <ul>
          <li v-for="servicio in empleado.services" id="servicios-empleados" :key="servicio" class="my-1 text-xs">
          <p> {{ servicio.servicename }} </p>
          </li>
          </ul>
        </div>
        <b-button type="is-dark" class="m-4 p-4"
          >Editar</b-button
        >
      </div>
      </li>
      </ul>

<!--
      <ul id="service-list-container" class="flex flex-row text-white">

        <li v-for="empleado in empleados" id="service-item" :key="empleado">
          <button class="hover:animate-pulse text-black">
            <div class="p-4 m-4">
              <img class="w-32 rounded-full mx-auto" :src="url + empleado.imageroute" />
              <br />
              <p
                class="flex flex-row justify-center font-bold items-center text-center text-lg text-white"
              >
                {{ empleado.servicename }}
              </p>
              <p
                class="flex flex-row justify-center font-bold items-center text-gray-400 text-center text-xs"
              >
                {{ empleado.description }}
              </p>
              <p
                class="flex flex-row justify-center items-center text-center -translatey-6 text-xs text-white"
              >
                {{ service.duration }} min.
              </p>
            </div>
          </button>
        </li>
        
      </ul>
-->
      <div>
        <br>
        <b-button
        type="is-success"
        size="is-large"
        pack="mdi"
        icon-right="plus"
        icon-left="account-group"
        outlined
        class="m-8 p-8 text-lg font-bold"
        >
          Nuevo Empleado
        </b-button>
        <br>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'DashEmpleados',
  layout: 'default-lay',

  // Hay que fetchear la fecha y hora para ponerlos reactivos en el card de turnos pendientes y los anteriores

  data() {
    return {
      open: true,
      overlay: false,
      fullheight: true,
      fullwidth: false,
      right: false,
      url: 'http://localhost:3000',
      empleados: []
    }
  },
  mounted() {
    this.fetchEmployees()
    },
  methods: {
     fetchEmployees() {
      axios.get(this.url + '/employee').then(this.asignar)
     },
      asignar(response) {
      console.log(response)
      this.empleados = response.data
      if (response.status === 200) {
        console.log('aca estoy entrando')
        this.empleados = response.data
      }
      console.log(this.empleados)
    }
  }
}
</script>

<style>

#main-content {
  margin-left: auto;
  margin-right: auto;
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
