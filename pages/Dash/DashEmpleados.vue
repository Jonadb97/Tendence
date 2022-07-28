/* eslint-disable vue/v-on-style */
<template>
  <div id="root-component" class="">
    <div
      id="main-content"
      class="flex flex-col justify-center items-center text-center"
    >
      <!-- <h1 class="font-bold text-2xl my-6 text-white">{{ $auth.user }}</h1>  -->
      <!-- Card turnos para hoy -->
      <h1
        class="flex flex-col font-bold text-xl text-white text-center justify-self-start my-6"
      >
        EMPLEADOS:
      </h1>
      <div class="h-fit" :style="'width:' + carouselEmployeesWidth + 'rem;'">
        <b-carousel-list
          v-model="slideSetEmployee"
          :data="employees"
          :items-to-show="slidesToShowEmployees"
          :arrow="true"
          :arrow-hover="false"
        >
          <template #item="employee">
            <div class="p-4 m-4 flex justify-center">
              <button
                :id="'employee-slide-' + employee.id"
                class="bg-cover bg-center content-end rounded-lg shadow-lg grayscale transform transition duration-500 hover:scale-110 hover:grayscale-0 hover:"
                :style="
                  'background-image: url(' +
                  url +
                  employee.imageroute +
                  '); height:24rem; width:18rem; '
                "
                @click="editEmployee(employee.id)"
              >
                <div class="p-2 absolute bottom-0 left-0">
                  <h5
                    class="text-white bm-4 font-bold text-left"
                    style="
                      font-size: xx-large;
                      font-family: Mortend bold;
                      text-transform: uppercase;
                    "
                  >
                    {{ employee.name }}
                  </h5>
                </div>
              </button>
            </div>
          </template>
        </b-carousel-list>
      </div>
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
          style="border-width: 3px; border-radius: 24px"
          @click="showModal"
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
            <b-field label="Nombre del barbero" type="is-dark" class="">
              <b-input
                v-model="newEmployeeName"
                type="text; is-dark"
                width="150px"
                :value="newEmployeeName"
                placeholder="Nombre..."
                required
              >
              </b-input>
            </b-field>

            <b-field
              label="Servicios que puede hacer el barbero"
              type="is-dark"
            >
              <!-- Dropdown de servicios y agregar servicio -->
              <b-dropdown
                v-model="newEmployeeServices"
                multiple
                aria-role="list"
              >
                <template #trigger>
                  <b-button type="is-primary" icon-right="menu-down">
                    Seleccione los servicios
                  </b-button>
                </template>

                <b-dropdown-item
                  v-for="service in services"
                  :key="service.id"
                  :value="service.id"
                  aria-role="listitem"
                >
                  <span>{{ service.servicename }}</span>
                </b-dropdown-item>
              </b-dropdown>
            </b-field>

            <b-field>
              <b-image
                v-if="generatedUrl != undefined"
                :src="generatedUrl"
                alt="A random image"
                ratio="6by4"
              ></b-image>
            </b-field>

            <b-field label="Foto de perfil" type="is-dark">
              <b-upload
                v-model="imageFile"
                accept=".jpg,.png"
                drag-drop
                expanded
                required
                validation-message="Seleccione un archivo .png o .jpg"
                @input="imageUploaded"
              >
                <section class="section">
                  <div class="content has-text-centered">
                    <p>
                      <b-icon icon="upload" size="is-large"></b-icon>
                    </p>
                    <p>Haz clic o arrastra la imagen..</p>
                  </div>
                </section>
              </b-upload>
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
            <b-button
              v-if="employeeIdToEdit !== undefined"
              class="button"
              type="is-danger"
              @click="deleteEmployee"
            >
              Eliminar barbero
            </b-button>
            <button class="button is-primary" @click="confirm">
              Confirmar
            </button>
          </footer>
        </div>
      </b-modal>
    </div>
    <FooterComp
      class="w-screen bottom-0"
      style="width: 100%; position: absolute; bottom: 0"
    ></FooterComp>
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
      url: this.$auth.$storage.getLocalStorage('url'),
      employees: [],
      services: [],
      window: this.window,
      slideSetEmployee: 0,
      selectedEmployee: null,
      slidesToShowEmployees: 1,
      carouselEmployeesWidth: 20,

      isComponentModalActive: false,
      imageFile: undefined,
      generatedUrl: undefined,
      newEmployeeName: '',
      newEmployeeServices: [],
      employeeIdToEdit: undefined,
    }
  },
  mounted() {
    window.addEventListener('resize', this.onResize)
    this.fetchEmployees()
    this.fetchServices()
  },
  methods: {
    onResize() {
      const windowWidth = document.documentElement.clientWidth
      const rems = windowWidth / 16
      const posibleSlides = Math.max(Math.trunc((rems * 0.8) / 20), 1)

      if (this.employees.length > 0) {
        this.slidesToShowEmployees = Math.min(
          posibleSlides,
          Math.min(4, this.employees.length)
        )
        this.carouselEmployeesWidth = this.slidesToShowEmployees * 20
      }
    },
    showModal() {
      this.isComponentModalActive = true
      this.imageFile = undefined
      this.generatedUrl = undefined
      this.newEmployeeName = ''
      this.newEmployeeServices = []
      this.employeeIdToEdit = undefined
    },
    fetchEmployees() {
      axios.get(this.url + '/employee').then(this.updateEmployees)
    },
    updateEmployees(response) {
      if (response.status === 200) {
        this.employees = response.data
        console.log(response.data)
        this.onResize()
      }
    },
    fetchServices() {
      axios.get(this.url + '/services').then(this.updateServices)
    },
    updateServices(response) {
      if (response.status === 200) {
        this.services = response.data
      }
    },
    imageUploaded(file) {
      this.generatedUrl = URL.createObjectURL(this.imageFile)
    },
    editEmployee(id) {
      const employee = this.employees.find((employee) => {
        return employee.id === id
      })
      this.employeeIdToEdit = id
      this.newEmployeeName = employee.name
      this.newEmployeeServices = []
      employee.services.forEach((service) => {
        this.newEmployeeServices.push(service.id)
      })
      this.generatedUrl = this.url + employee.imageroute
      this.isComponentModalActive = true
    },
    confirm() {
      const auxServices = []
      this.newEmployeeServices.forEach((service) => {
        auxServices.push(parseInt(service))
      })
      if (this.employeeIdToEdit === undefined) {
        const formData = new FormData()
        formData.append('file', this.imageFile)
        axios.post(this.url + '/upload', formData)

        axios
          .post(this.url + '/employee', {
            name: this.newEmployeeName,
            services: auxServices,
          })
          .then((response) => {
            if (response.status === 200) {
              this.isComponentModalActive = false
              this.$buefy.toast.open({
                message: 'Empleado Creado',
                type: 'is-dark',
              })
              this.fetchEmployees()
            }
          })
      }
    },
    deleteEmployee() {
      console.log('eliminando empleado')
      console.log(this.employeeIdToEdit)
      this.$buefy.dialog.confirm({
        message: 'Esta seguro?',
        type: 'is-dark',
        onConfirm: () => {
          axios
            .delete(this.url + '/employee/' + this.employeeIdToEdit, {
              headers: {
                auth: this.$auth.$storage.getLocalStorage('token'),
              },
            })
            .then((response) => {
              console.log(response.status)

              if (response.status === 200) {
                this.isComponentModalActive = false
                this.fetchEmployees()
                this.$buefy.toast.open({
                  message: 'Eliminado correctamente',
                  type: 'is-dark',
                })
              } else {
                this.$buefy.toast.open({
                  message: 'Error al eliminar',
                  type: 'is-dark',
                })
              }
            })
        },
      })
    },
  },
}
</script>

<style>
#card-turno-actual {
  margin: 2px;
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
</style>
