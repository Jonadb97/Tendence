<template>
  <div id="root-component">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.10.6/moment.js"></script>
    <div
      id="main-content-turnospage"
      class="flex flex-col justify-left items-center text-left"
    >
      <!-- <h1 class="font-bold text-2xl my-6 text-white"> {{ $auth.user + " - " + $auth.$storage.getLocalStorage('id')}} </h1> -->
      <!-- Card turno pendiente actual -->
      <h1
        class="font-bold text-xl text-white"
        style="margin-top: 24px; font-family: 'Mortend bold'"
      >
        TURNOS PENDIENTES:
      </h1>

      <div class="h-fit" :style="'width:' + carouselWidth + 'rem;'">
        <b-carousel-list
          v-model="slideSetAppointments"
          :data="appointments"
          :items-to-show="slidesToShow"
          :arrow="true"
          :arrow-hover="false"
        >
          <template #item="appointment">
            <div class="p-4 m-4 flex justify-left">
              <button
                :id="'service-slide-' + appointment.id"
                class="bg-cover bg-center content-end rounded-lg shadow-lg grayscale transform transition duration-500 hover:scale-110 hover:grayscale-0"
                :style="
                  'background-image: url(' +
                  url +
                  appointment.service.imageroute +
                  '); width:18rem; height:22rem; font-family: Mortend bold; '
                "
                @click="showModal(appointment)"
              >
                <div
                  :id="'info-description'"
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
                      font-family: Mazzard;
                      position: absolute;
                      top: 2rem;
                      right: 0px;
                      background-color: #212121;
                      color: #f7f7f7;
                      padding: 4px;
                      border-radius: 5px;
                    "
                  >
                    {{ appointment.service.description }}
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
                    {{ appointment.service.servicename }}
                  </h5>
                  <p
                    class="text-left text-white font-bold"
                    style="
                      font-size: 1.5rem;
                      font-family: sans-serif;
                      text-align: left;
                      font-family: Mazzard;
                    "
                  >
                    con {{ appointment.employee.name }}
                  </p>

                  <p
                    class="text-left text-white font-bold"
                    style="
                      font-size: 1.5rem;
                      font-family: Mazzard;
                      text-align: left;
                    "
                  >
                    <b-icon
                      pack="mdi"
                      icon="cash-multiple"
                      class="text-white text-left"
                    ></b-icon>
                    {{ appointment.service.price }}
                  </p>
                  <p
                    class="text-white text-left font-bold"
                    style="font-size: 1.2rem; font-family: Mazzard"
                  >
                    <b-icon
                      pack="mdi"
                      icon="calendar"
                      class="text-white text-left font-bold"
                    ></b-icon>
                    {{ formatDate(appointment.date) }}
                  </p>
                  <p
                    class="text-white text-left font-bold"
                    style="font-size: 1.2rem; font-family: Mazzard"
                  >
                    <b-icon
                      pack="mdi"
                      icon="clock"
                      class="text-white text-left font-bold"
                    ></b-icon>

                    {{ formatTime(appointment.time) }}
                  </p>
                </div>
              </button>
            </div>
          </template>
        </b-carousel-list>
      </div>

      <!-- Botón nuevo turno -->
      <nuxt-link to="/NuevoTurno/NuevoTurnoForm">
        <b-button
          class="flex mx-auto py-2 my-4"
          type="is-success"
          pack="mdi"
          size="is-large"
          outlined
          icon-left="clipboard-plus-outline"
          icon-right="plus"
          label="Agendar nuevo turno"
          style="border-width: 3px; border-radius: 24px"
        />
      </nuxt-link>

      <!-- Carrousel turnos anteriores -->

      <h1
        class="my-6 font-bold text-white text-xl"
        style="font-family: Mortend bold"
      >
        TURNOS ANTERIORES:
      </h1>

      <div class="h-fit" :style="'width:' + carouselWidth + 'rem;'">
        <b-carousel-list
          v-model="slideSetRecord"
          :data="record"
          :items-to-show="slidesToShow"
          :arrow="true"
          :arrow-hover="false"
        >
          <template #item="appointment">
            <div class="p-4 m-4 flex justify-center">
              <p class="text-white font-bold text-left my-2">
                <button
                  :id="'service-slide-' + appointment.id"
                  class="opacity-75 bg-cover bg-center content-end rounded-lg shadow-lg grayscale transform transition duration-500 hover:scale-110 hover:grayscale-0 hover:opacity-100"
                  :style="
                    'background-image: url(' +
                    url +
                    appointment.service.imageroute +
                    '); width:16rem; height:22rem; font-family: Mortend bold; text-transform: uppercase;'
                  "
                >
                  <div class="p-2 absolute bottom-0 left-0">
                    <b-icon
                      icon="check-bold"
                      pack="mdi"
                      size="is-large"
                      class="m-auto scale-150 animate-bounce"
                    ></b-icon>
                    <h5
                      class="text-white bm-4 font-bold text-left"
                      style="
                        font-size: 1.5rem;
                        font-family: sans-serif;
                        text-align: left;
                      "
                    >
                      {{ appointment.service.servicename }}
                    </h5>
                    <b-icon
                      pack="mdi"
                      icon="clock"
                      class="text-white text-left font-bold"
                    ></b-icon>

                    {{ formatDate(appointment.date) }}
                  </div>
                </button>
              </p>
            </div>
          </template>
        </b-carousel-list>
      </div>
    </div>
    <no-ssr>
      <section>
        <b-modal :active.sync="isCardModalActive" has-modal-card type="is-dark">
          <div
            v-if="modalAppointment !== undefined"
            class="modal-card"
            style="width: auto"
          >
            <header
              class="modal-card-head"
              style="background-color: rgb(46, 46, 46)"
            >
              <p
                class="modal-card-title"
                style="color: white; font-family: Mortend Bold; text-transform: uppercase;"
              >
                TENES UN {{ modalAppointment.service.servicename }}
              </p>
            </header>

            <section
              class="modal-card-body"
              style="background-color: rgb(46, 46, 46)"
            >
            <b-field>
              <p class="subtitle is-4" style="color: white">
                {{ modalAppointment.service.description }}

              </p>
            </b-field>
              <b-field>
                <p class="subtitle is-4" style="color: white">
                  Con: {{ modalAppointment.employee.name }}
                </p>
              </b-field>
              <b-field>
                <p class="subtitle is-4" style="color: white">
                  A las: {{ modalAppointment.time }} HS
                </p>
              </b-field>
            </section>
            <footer
              class="modal-card-foot"
              style="background-color: rgb(46, 46, 46); color: white"
            >
              <button class="button is-danger" pack="mdi" icon-right="exclamation-thick" @click="cancelAppointment">
                Cancelar turno
              </button>
              <button
                class="button"
                type="button; is-dark"
                @click="isCardModalActive = false, clearModal()"
              >
                Volver
              </button>
              <button class="button is-primary" pack="mdi" icon-right="check-bold" @click="confirmAppointment">
                Confirmar
              </button>
            </footer>
          </div>
        </b-modal>
      </section>
    </no-ssr>
  </div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'

export default {
  name: 'TusTurnosPage',
  layout: 'default-lay',

  // Hay que fetchear la fecha y hora para ponerlos reactivos en el card de turnos pendientes y los anteriores

  data() {
    return {
      infoHover: false,
      isCardModalActive: false,
      modalAppointment: undefined,
      appointments: [],
      futureAppointments: [],
      url: this.$auth.$storage.getLocalStorage('url'),
      slidesToShow: 1,
      slideSetAppointments: 0,
      slideSetRecord: 0,
      record: [],
      carouselWidth: 60,
    }
  },
  mounted() {
    window.addEventListener('resize', this.onResize)
    this.onResize()
    this.getUserAppointments()
    this.getFutureAppointments()
    this.getUserRecord()
  },
  methods: {
    cancelAppointment() {
      this.$buefy.dialog.confirm({
      message: '¿Está seguro?',
        type: 'is-dark',
        onConfirm: () => {
         axios
        .post(this.url + '/appointment/finishAppointment', {
          appointmentId: this.modalAppointment.id,
          appointmentState: 'Cancelado',
        })
        .then((response) => {
          if (response.status === 200) {
            this.isCardModalActive = false
            this.$buefy.toast.open({
              message: 'Turno actualizado',
              type: 'is-dark',
            })
            this.fetchAppointments()
            this.fetchConfirmedAppointments()
            this.clearModal()
          }
        })
        },
      })
      
    },
    clearModal() {
      this.isCardModalActive = false
      this.modalAppointment = undefined

    }
    ,
    showModal(appointment) {
      this.modalAppointment = appointment
      this.isCardModalActive = true
    },
    getFutureAppointments() {
      const now = Date.now()
      axios
        .get(
          this.url +
            '/appointment/' +
            this.$auth.$storage.getLocalStorage('id'),
          {
            headers: {
              auth: this.$auth.$storage.getLocalStorage('token'),
            },
          }
        )
        .then((response) => {
          if (response.status === 200) {
            this.appointments = response.data
            console.log(response.data)
            while (this.appointments.date > now) {
              this.futureAppointments.push(this.appointments)
            }
          }
        })
    },
    formatDate(value) {
      if (value) {
        return moment(String(value)).format('DD/MM/YYYY')
      }
    },
    formatTime(value) {
      if (value) {
        return moment(value, 'HH:mm:ss').format('HH:mm')
      }
    },
    onResize() {
      const windowWidth = document.documentElement.clientWidth
      const rems = windowWidth / 16
      const posibleSlides = Math.max(Math.trunc((rems * 0.8) / 20), 1)

      this.slidesToShow = Math.min(posibleSlides, 4)
      this.carouselWidth = this.slidesToShow * 20
    },
    getUserAppointments() {
      axios
        .get(
          this.url +
            '/appointment/' +
            this.$auth.$storage.getLocalStorage('id'),
          {
            headers: {
              auth: this.$auth.$storage.getLocalStorage('token'),
            },
          }
        )
        .then((response) => {
          if (response.status === 200) {
            this.appointments = response.data
            console.log(response.data)
          }
        })
    },
    getUserRecord() {
      axios
        .get(
          this.url +
            '/appointment/record/' +
            this.$auth.$storage.getLocalStorage('id'),
          {
            headers: {
              auth: this.$auth.$storage.getLocalStorage('token'),
            },
          }
        )
        .then((response) => {
          if (response.status === 200) {
            this.record = response.data
          }
        })
    },
  },
}
</script>

<style>
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

.card {
  width: 15rem;
}

.card-header-title {
  text-align: center;
  justify-content: center;
}
</style>
