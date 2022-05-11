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
          <div class="p-4 m-4 flex justify-center" style="width: 10vw">
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
          @click="isComponentModalActive = true"
        >
          Nuevo Empleado
        </b-button>
        <br />
      </div>

      <!-- Modal Nuevo Empleado -->
      <b-modal
        :active.sync="isComponentModalActive"
        has-modal-card
        type="is-dark"
      >
        <form action="">
          <div class="modal-card" style="width: 1500">
            <header
              class="modal-card-head"
              style="background-color: rgb(46, 46, 46)"
            >
              <p class="modal-card-title" style="color: white">
                Agregar nuevo empleado
              </p>
            </header>
            <section
              class="modal-card-body"
              style="background-color: rgb(46, 46, 46)"
            >
              <b-field label="Nombre del empleado" type="is-dark" class="">
                <b-input
                  type="text; is-dark"
                  width="150px"
                  :value="serviceName"
                  expanded="false"
                  placeholder="Nombre"
                  required
                >
                </b-input>
              </b-field>

              <b-field label="Imagen de perfil" class="h-32 w-32" style="margin-bottom: 5rem;">

                <b-image
                  :src="require('../../static/img/perfil.png')"
                  size="is-small"
                  style='height:48px'
                  alt="Profile pic"
                  ratio="1by1"
                  :rounded="true"
                ></b-image>
              </b-field>

              <b-field>
                <!-- Servicios agregados y que se pueden borrar -->
                <p class="content; text-sm" style="translateY(1rem)"><b style="translateY(1rem)">Seleccionados</b> {{ selectedOptions }}</p>
                <br>
                <b-dropdown v-model="selectedOptions" multiple aria-role="list" style="transform: translateY(-1.2rem)">
                  <template #trigger>
                  <br>
                    <b-button type="is-primary" size="is-small" icon-right="menu-down">
                      ({{ selectedOptions.length }})
                    </b-button>
                  </template>

                  <b-dropdown-item value="service1" aria-role="listitem">
                    <span>Servicio 1</span>
                  </b-dropdown-item>

                  <b-dropdown-item value="service2" aria-role="listitem">
                    <span>Servicio 2</span>
                  </b-dropdown-item>

                  <b-dropdown-item value="service3" aria-role="listitem">
                    <span>Servicio 3</span>
                  </b-dropdown-item>
                </b-dropdown>
              </b-field>
              <button class="button is-primary">Agregar servicios</button>
              <b-field>
                <!-- Dropdown de servicios y agregar servicio -->
              </b-field>
            </section>
            <footer
              class="modal-card-foot"
              style="background-color: rgb(46, 46, 46); color: white"
            >
              <button
                class="button"
                type="button; is-dark"
                @click="isComponentModalActive = false"
              >
                Volver
              </button>
              <button class="button is-primary">Confirmar</button>
            </footer>
          </div>
        </form>
      </b-modal>
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
      isComponentModalActive: false,
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
