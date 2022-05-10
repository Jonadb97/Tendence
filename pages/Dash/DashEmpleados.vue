/* eslint-disable vue/v-on-style */
<template>
  <div id="root-component" class="">

    <div
      id="main-content"
      class="flex flex-col justify-center items-center text-center max-w-xl"
    >
      <h1 class="font-bold text-2xl my-6 text-white">{{ $auth.user }}</h1>
      <!-- Card turnos para hoy -->
      <h1
        class="flex flex-col font-bold text-xl text-white text-center justify-self-start"
      >
        Empleados:
      </h1>
      <b-carousel-list
        v-model="slideSetEmployee"
        :data="empleados"
        :items-to-show="3"
        style="30vw"
      >
        <template #item="employee">
          <div class="p-4 m-4 flex justify-center" style="width:10vw">
            <button
              :id="'employee-slide-' + employee.id"
              class="bg-cover bg-center content-end rounded-lg shadow-lg grayscale transform transition duration-500 hover:scale-110 hover:grayscale-0 hover:"
              :style="
                'background-image: url(' +
                url +
                employee.imageroute +
                '); height:20vw; width:25vw;'
              "
              @click="selectEmployee(employee.id)"
            >
              <div class="p-2 absolute bottom-0 left-0">
                <h5
                  class="text-white bm-4 font-bold text-left"
                  style="font-size: 1.6vw"
                >
                  {{ employee.name }}
                </h5>
              </div>
            </button>
          </div>
        </template>
      </b-carousel-list>
      <!--
      <ul id="lista-empleados" class="justify-center max-w-screen">
        <li v-for="empleado in empleados" id="empleado-item" :key="empleado.id">
          <div id="card-turno-actual" class="card">
            <div
              class="flex align-content-center items-center text-white max-h-20"
            >
              <img
                id="empleado-img"
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
                <li
                  v-for="servicio in empleado.empleados"
                  id="servicios-empleados"
                  :key="servicio.id"
                  class="my-1 text-xs"
                >
                  <p>{{ servicio.empleadoname }}</p>
                </li>
              </ul>
            </div>
            <b-button type="is-dark" class="m-4 p-4">Editar</b-button>
          </div>
        </li>
      </ul>
    -->
      <!--
      <ul id="empleado-list-container" class="flex flex-row text-white">

        <li v-for="empleado in empleados" id="empleado-item" :key="empleado">
          <button class="hover:animate-pulse text-black">
            <div class="p-4 m-4">
              <img class="w-32 rounded-full mx-auto" :src="url + empleado.imageroute" />
              <br />
              <p
                class="flex flex-row justify-center font-bold items-center text-center text-lg text-white"
              >
                {{ empleado.empleadoname }}
              </p>
              <p
                class="flex flex-row justify-center font-bold items-center text-gray-400 text-center text-xs"
              >
                {{ empleado.description }}
              </p>
              <p
                class="flex flex-row justify-center items-center text-center -translatey-6 text-xs text-white"
              >
                {{ empleado.duration }} min.
              </p>
            </div>
          </button>
        </li>
        
      </ul>
-->
      <!-- Botón nuevo empleado -->
      <div>
        <br />
        <b-button
          type="is-success"
          size="is-large"
          pack="mdi"
          icon-right="plus"
          icon-left="account-group"
          outlined
          class="m-8 p-8 text-lg font-bold"
          v-on:click="showModal()"
        >
          Nuevo Empleado
        </b-button>
        <br />
      </div>
      <!-- Modal Nuevo Empleado -->
      <div
        v-if="showEmployeeModal"
        id="modal-newemployee"
        class="absolute object-center bg-white m-4 p-4 drop-shadow-lg"
        style="height:15vw;width:25vw"
      >
        <b-button
          label=""
          size="is-small"
          class="m-1 left-0 top-0 -translate-x-12"
          pack="mdi"
          icon-right="arrow-left-circle"
          type="is-primary"
          v-on:click="closeModal()"
        ></b-button>
        <div class="inline-flex">
          <h2 id="nombre-empleado" class="text-black my-auto mx-4">
            Jorgelito
          </h2>
          <a href="#">
            <img
              src="../../static/img/cortePelo.png"
              alt="#"
              class="rounded-full h-24 my-auto mx-4 p-2"
            />
          </a>
        </div>
        <br />
        <div class="flex flex-col">
          <ul id="lista-servicios">
            <li class="inline-flex border-2 hover:bg-slate-300 m-1 rounded-lg">
              <p class="my-auto mx-6 text-black">- Servicio 1</p>
              <a href=""
                ><b-icon
                  class="text-red-700 my-auto mx-2"
                  type="is-danger"
                  inverted
                  pack="mdi"
                  size="is-small"
                  icon="delete"
                ></b-icon
              ></a>
            </li>
            <li class="inline-flex border-2 hover:bg-slate-300 m-1 rounded-lg">
              <p class="my-auto mx-6 text-black">- Servicio 2</p>
              <a href=""
                ><b-icon
                  class="text-red-700 my-auto mx-2"
                  type="is-danger"
                  inverted
                  pack="mdi"
                  size="is-small"
                  icon="delete"
                ></b-icon
              ></a>
            </li>
            <li class="inline-flex border-2 hover:bg-slate-300 m-1 rounded-lg">
              <p class="my-auto mx-6 text-black">- Servicio 3</p>
              <a href=""
                ><b-icon
                  class="text-red-700 my-auto mx-2"
                  type="is-danger"
                  inverted
                  pack="mdi"
                  size="is-small"
                  icon="delete"
                ></b-icon
              ></a>
            </li>
          </ul>
          <br />
          <div class="inline-flex">
            <p class="content" size="is-small">
              <b class="text-black">Servicios seleccionados</b>: {{ selectedOptions }}
            </p>
            <b-dropdown
              v-model="selectedOptions"
              multiple
              class="m-2"
              aria-role="list"
            >
              <template #trigger>
                <b-button
                  type="is-primary"
                  class="m-2 text-xs text-black"
                  size="is-small"
                  icon-right="menu-down"
                >
                  Seleccionados: {{ selectedOptions.length }}
                </b-button>
              </template>

              <b-dropdown-item value="Servicio 1" aria-role="listitem">
                <span>Servicio 1</span>
              </b-dropdown-item>

              <b-dropdown-item value="Servicio 2" aria-role="listitem">
                <span>Servicio 2</span>
              </b-dropdown-item>

              <b-dropdown-item value="Servicio 3" aria-role="listitem">
                <span>Servicio 3</span>
              </b-dropdown-item>
            </b-dropdown>
            <br />
            <div class="flex inline-flex">
              <b-button
                type="is-primary"
                label=""
                size="is-small"
                icon-right="plus"
                class="m-4"
              >
              </b-button>
            </div>
            <br />
            <div class="flex inline-flex m-1">
            <br/>
              <b-button
                label=""
                class="m-1 my-auto -translate-y-4 -translate-x-3"
                pack="mdi"
                size="is-small"
                icon-right="check-bold"
                type="is-primary"
              ></b-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'DashEmpleados',
  layout: 'default-lay',
  breakpoints: {
    // default breakpoints - customize this
    sm: 450,
    md: 1250,
    lg: Infinity,
  },

  // Hay que fetchear la fecha y hora para ponerlos reactivos en el card de turnos pendientes y los anteriores
  data() {
    return {
      showEmployeeModal: false,
      selectedOptions: [],
      open: true,
      overlay: false,
      fullheight: true,
      fullwidth: false,
      right: false,
      url: 'http://localhost:3000',
      empleados: [],
      window: this.window,
      slideSetEmployee: 0,
      slideSetServices: 0,
      selectedEmployee: null,
      selectedService: null,
    }
  },
  mounted() {
    this.fetchEmployees()
  },
  methods: {
     selectEmployee(id) {
      if (this.selectedEmployee != null) {
        const previousSlide = document.getElementById(
          'employee-slide-' + this.selectedEmployee
        )
        previousSlide.style.filter = 'grayscale(100%)'
      }
      const slide = document.getElementById('employee-slide-' + id)
      slide.style.filter = 'grayscale(0%)'
      this.selectedEmployee = id
    },
    closeModal() {
      this.$data.showEmployeeModal = false
    },
    showModal() {
      this.$data.showEmployeeModal = true
    },
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
    },
  },
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
  font-weight: 500;
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
  margin: 2px;
}

#root-container {
  z-index: 3;
}

.card {
  border-radius: 2rem;
}

#modal-newemployee {
  padding-right: 24px;
}

.card-header-title {
  text-align: center;
  justify-content: center;
}

#empleado-item {
}
</style>
