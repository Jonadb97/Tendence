<template>
  <div id="root-component" class="">
    <div
      id="main-content"
      class="flex flex-col justify-center items-center text-center"
    >
      <h1 class="font-bold text-2xl my-6 text-white">{{ $auth.user }}</h1>

      <!-- Carrousel turnos recientes -->

      <h1 class="my-6 font-bold text-xl text-white">Servicios:</h1>
      <div class="h-fit" :style="'width:' + carouselServicesWidth + 'rem;'">
        <b-carousel-list
          v-model="slideSetServices"
          :data="services"
          :items-to-show="slidesToShowServices"
        >
          <template #item="service">
            <div class="p-4 m-4 flex justify-center">
              <button
                :id="'service-slide-' + service.id"
                class="bg-cover bg-center content-end rounded-lg shadow-lg grayscale transform transition duration-500 hover:scale-110 hover:grayscale-0 hover:"
                :style="
                  'background-image: url(' +
                  url +
                  service.imageroute +
                  '); height:24rem; width:18rem;'
                "
                @click="editService(service.id)"
              >
                <div class="p-2 absolute bottom-0 left-0">
                  <h5
                    class="text-white bm-4 font-bold text-left"
                    style="font-size: xx-large"
                  >
                    {{ service.servicename }}
                  </h5>
                </div>
              </button>
            </div>
          </template>
        </b-carousel-list>
      </div>
      <br />
      <section>
        <b-button
          type="is-success"
          size="is-large"
          pack="mdi"
          icon-right="plus"
          icon-left="account-cash"
          outlined
          class="button is-primary is-medium m-4"
          @click="isComponentModalActive = true"
        >
          Nuevo servicio
        </b-button>

        <b-modal
          :active.sync="isComponentModalActive"
          has-modal-card
          type="is-dark"
        >
          <form action="">
            <div class="modal-card" style="width: auto">
              <header
                class="modal-card-head"
                style="background-color: rgb(46, 46, 46)"
              >
                <p class="modal-card-title" style="color: white">
                  Agregar nuevo servicio
                </p>
              </header>
              <section
                class="modal-card-body"
                style="background-color: rgb(46, 46, 46)"
              >
                <b-field label="Nombre del servicio" type="is-dark">
                  <b-input
                    type="text; is-dark"
                    :value="serviceName"
                    placeholder="Servicio"
                    required
                  >
                  </b-input>
                </b-field>

                <b-field
                  label="Descripción del servicio"
                  type="is-dark"
                  class="text-black"
                >
                  <b-input
                    type="textarea"
                    maxlength="200"
                    :value="serviceDescription"
                    placeholder="Descripción"
                    required
                  >
                  </b-input>
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
      </section>
      <!--
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
      <br />
      <div
        v-if="showServiceModal"
        id="modal-newservice"
        class="absolute flex object-center bg-white m-4 p-4 drop-shadow-lg"
      >
        <b-button
          label=""
          class="m-1 left-0 top-0"
          pack="mdi"
          icon-right="arrow-left-circle"
          type="is-primary"
          v-on:click="closeModal()"
        ></b-button>
        <div class="justify-center">
          <h2 id="nombre-servicio" class="text-black my-auto mx-4">
            <b-field
              label="Nombre del servicio"
              class="color-black"
              icon-left="account"
            >
              <b-input
                v-model="serviceName"
                placeholder="Nombre del servicio"
              ></b-input>
            </b-field>
          </h2>
        </div>
        <br />
        <div class="justify-center">
          <b-field label="Descripción del servicio">
            <b-input
              v-model="serviceDescription"
              placeholder="Descripción del servicio"
              maxlength="200"
              type="textarea"
            ></b-input>
          </b-field>
        </div>
        <b-button
          label=""
          class="mx-2 m-1 py-1 my-auto"
          pack="mdi"
          icon-right="check-bold"
          type="is-primary"
        ></b-button>
      </div> 
      -->
    </div>
  </div>
</template>

<script>
import axios from 'axios'

if (process.browser) {
  require('vue-carousel')
}

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
      right: false,
      url: 'http://localhost:3000',
      employees: [],
      services: [],
      window: this.window,
      slideSetServices: 0,
      selectedService: null,
      slidesToShowServices: 1,
      carouselServicesWidth: 20,
      serviceName: '',
      serviceDescription: '',
      isComponentModalActive: false,
      imageFile: undefined,
      generatedUrl: undefined,
      newServiceName: '',
      newServiceServices: [],
      serviceIdToEdit: undefined,
    }
  },
  mounted() {
    this.fetchServices()
  },
  methods: {
    fetchServices() {
      axios.get(this.url + '/services').then(this.updateServices)
    },
    updateServices(response) {
      if (response.status === 200) {
        this.services = response.data
        console.log(response.data)
      }
    },
    onResize() {
      const windowWidth = document.documentElement.clientWidth
      const rems = windowWidth / 16
      const posibleSlides = Math.max(Math.trunc((rems * 0.8) / 20), 1)

      if (this.services.length > 0) {
        this.slidesToShowServices = Math.min(
          posibleSlides,
          Math.min(4, this.services.length)
        )
        this.carouselServicesWidth = this.slidesToShowServices * 20
      }
    },
    showModal() {
      this.isComponentModalActive = true
      this.imageFile = undefined
      this.generatedUrl = undefined
      this.newServiceName = ''
      this.newServiceServices = []
      this.serviceIdToEdit = undefined
    },
    imageUploaded(file) {
      this.generatedUrl = URL.createObjectURL(this.imageFile)
    },
    editService(id) {
      const service = this.services.find((service) => {
        return service.id === id
      })
      this.serviceIdToEdit = id
      this.newServicesName = service.name
      service.services.forEach((service) => {
        this.newServicesServices.push(service.id)
      })
      this.generatedUrl = this.url + service.imageroute
      this.isComponentModalActive = true
    },
    confirm() {
      const auxServices = []
      this.newServiceServices.forEach((service) => {
        auxServices.push(parseInt(service))
      })
      if (this.serviceIdToEdit === undefined) {
        axios
          .post(this.url + '/employee', {
            name: this.newServiceName,
            services: auxServices,
          })
          .then((response) => {
            if (response.status === 200) {
              this.$buefy.toast.open({
                message: 'Empleado Creado',
                type: 'is-dark',
              })
              this.fetchServices()
            }
          })
      }
    },
    deleteService() {
      console.log('eliminar')
    },
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
  margin: 2rem;
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
