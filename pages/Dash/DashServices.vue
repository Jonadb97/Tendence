<template>
  <div id="root-component" class="">
    <div
      id="main-content"
      class="flex flex-col justify-center items-center text-center"
    >
      <!-- Carrousel turnos recientes -->

      <h1
        class="my-6 font-bold text-xl text-white"
        style="font-family: Mortend bold"
      >
        SERVICIOS:
      </h1>
      <div class="h-fit" :style="'width:' + carouselServicesWidth + 'rem;'">
        <b-carousel-list
          v-model="slideSetServices"
          :data="services"
          :items-to-show="slidesToShowServices"
          :arrow="true"
          :arrow-hover="false"
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
                  '); height:24rem; width:18rem; font-family: Mortend bold;'
                "
                @click="editService(service.id)"
              >
                <div
                  id="info-description"
                  @mouseenter="infoHover = true"
                  @mouseleave="infoHover = false"
                >
                  <b-icon
                    pack="mdi"
                    icon="information"
                    type="is-light"
                    class="m-2 hover:scale-150"
                    style="position: absolute; top: 0px; right: 0px"
                  ></b-icon>
                  <div
                    v-show="infoHover"
                    style="
                      position: absolute;
                      top: 2rem;
                      right: 0px;
                      background-color: #212121;
                      color: #f7f7f7;
                      padding: 4px;
                      border-radius: 5px;
                      font-family: Mazzard;
                    "
                  >
                    {{ service.description }}
                  </div>
                </div>
                <div class="p-2 absolute bottom-0 left-0">
                  <h5
                    class="text-white bm-4 font-bold text-left"
                    style="
                      font-size: xx-large;
                      font-family: Mortend bold;
                      text-transform: uppercase;
                    "
                  >
                    {{ service.servicename }}
                  </h5>

                  <p
                    class="text-white text-left font-bold m-2"
                    style="font-size: 1.2rem; font-family: Mazzard"
                  >
                    <b-icon
                      pack="mdi"
                      icon="cash-multiple"
                      class="text-white text-left"
                    ></b-icon>
                    {{ service.price }}
                  </p>
                  <p
                    class="text-white text-left font-bold m-2"
                    style="font-size: 1.2rem; font-family: Mazzard"
                  >
                    <b-icon
                      pack="mdi"
                      icon="clock"
                      class="text-white text-left font-bold"
                    ></b-icon>
                    {{ service.duration }} min.
                  </p>
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
          style="border-width: 3px; border-radius: 24px; font-family: Mazzard"
          @click="isComponentModalActive = true"
        >
          Nuevo servicio
        </b-button>

        <b-modal
          :active.sync="isComponentModalActive"
          has-modal-card
          type="is-dark"
        >
          <div class="modal-card" style="width: auto; font-family: Mazzard">
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
              style="background-color: rgb(46, 46, 46); color: white"
            >
              <b-field
                label="Nombre del servicio"
                type="is-light"
                class="text-white"
              >
                <b-input
                  v-model="newServiceName"
                  type="text is-light"
                  :value="newServiceName"
                  placeholder="Servicio"
                  required
                >
                </b-input>
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

              <b-field
                label="Precio del servicio"
                type="is-light"
                class="text-white"
              >
                <b-icon
                  pack="mdi"
                  type="is-light"
                  icon="cash"
                  size="is-medium"
                  class="m-2"
                  style="margin-bottom: 8px"
                ></b-icon>
                <b-numberinput
                  v-model="newServicePrice"
                  type="number; is-light"
                  step="100"
                  placeholder="Precio"
                  required
                  :min="0"
                >
                </b-numberinput>
              </b-field>
              <b-field
                label="Duración del servicio en minutos"
                type="is-light"
                class="text-white font-bold m-2"
              >
                <b-icon
                  pack="mdi"
                  class="m-2"
                  type="is-light"
                  icon="clock"
                  size="is-medium"
                  style="margin-bottom: 8px"
                ></b-icon>
                <b-numberinput
                  v-model="newServiceDuration"
                  type="number; is-light"
                  :value="newServiceDuration"
                  maxlength="2"
                  step="10"
                  placeholder="Duración"
                  :min="0"
                  required
                >
                </b-numberinput>
                Min.
              </b-field>
              <b-field
                label="Descripción del servicio"
                type="is-light"
                class="text-white"
              >
                <b-input
                  v-model="newServiceDescription"
                  type="textarea"
                  maxlength="100"
                  :value="newServiceDescription"
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
                type="button; is-light"
                @click="isComponentModalActive = false"
              >
                Volver
              </button>
              <b-button
                v-if="serviceIdToEdit !== undefined"
                class="button"
                type="is-danger"
                @click="deleteService"
              >
                Eliminar servicio
              </b-button>

              <button
                class="button is-primary"
                :disabled="disabledConfirmButton"
                :loading="disabledConfirmButton"
                @click="finish"
              >
                Confirmar
              </button>
            </footer>
          </div>
        </b-modal>
      </section>
      <FooterComp
        class="w-screen bottom-0"
        style="width: 100%; position: absolute; bottom: 0"
      ></FooterComp>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'DashServices',
  layout: 'default-lay',

  // Hay que fetchear la fecha y hora para ponerlos reactivos en el card de turnos pendientes y los anteriores

  data() {
    return {
      isLoading: false,
      infoHover: false,
      showServiceModal: false,
      open: true,
      overlay: false,
      fullheight: true,
      fullwidth: false,
      right: false,
      url: this.$auth.$storage.getLocalStorage('url'),
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
      newServiceDuration: 0,
      newServicePrice: 0,
      newServiceDescription: '',
      newImageRoute: '',
      newServiceServices: [],
      serviceIdToEdit: undefined,
      disabledConfirmButton: false,
    }
  },
  created() {
    this.$nextTick(function () {
      this.loading = false
    })
  },
  mounted() {
    this.fetchServices()
    console.log(this.url)
    window.addEventListener('resize', this.onResize)
  },
  methods: {
    fetchServices() {
      axios.get(this.url + '/services').then(this.updateServices)
    },
    updateServices(response) {
      if (response.status === 200) {
        this.services = response.data
        this.onResize()
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
      this.newServiceName = service.servicename
      this.newServiceDescription = service.description
      this.newServicePrice = service.price
      this.newServiceDuration = service.duration
      this.generatedUrl = this.url + service.imageroute
      this.isComponentModalActive = true
    },
    finish() {
      console.log(this.newServiceName)
      console.log(this.newServiceDescription)
      console.log(this.newServiceDuration)
      console.log(this.newServicePrice)
      this.disabledConfirmButton = true
      axios
        .post(
          this.url + '/services',
          {
            servicename: this.newServiceName,
            description: this.newServiceDescription,
            duration: this.newServiceDuration,
            price: this.newServicePrice,
          },
          {
            headers: {
              auth: this.$auth.$storage.getLocalStorage('token'),
            },
          }
        )
        .then((response) => {
          this.disabledConfirmButton = false
          if (response.status === 200) {
            this.isComponentModalActive = false
            this.$toast.show('¡Servicio creado!')
            this.fetchServices()
          } else {
            console.log(response)
            this.$toast.show('¡Oops! algo salió mal')
          }
        })
    },
    deleteService(id) {
      this.$buefy.dialog.confirm({
        message: 'Esta seguro?',
        type: 'is-dark',
        onConfirm: () => {
          axios
            .delete(this.url + '/services/' + this.serviceIdToEdit, {
              headers: {
                auth: this.$auth.$storage.getLocalStorage('token'),
              },
            })
            .then((response) => {
              if (response.status === 200) {
                this.fetchServices()
                this.isComponentModalActive = false
                this.$buefy.toast.open({
                  message: 'Eliminado correctamente',
                  type: 'is-dark',
                })
                window.location.reload(true)
              } else {
                this.$buefy.toast.open({
                  message: 'Error al eliminar',
                  type: 'is-dark',
                })
                window.location.reload(true)
              }
            })
        },
      })
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
