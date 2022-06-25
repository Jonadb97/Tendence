<template>
  <div id="root-component">
  <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.10.6/moment.js"></script>
    <div
      id="main-content-turnospage"
      class="flex flex-col justify-left items-center text-left"
    >
      <!-- <h1 class="font-bold text-2xl my-6 text-white"> {{ $auth.user + " - " + $auth.$storage.getLocalStorage('id')}} </h1> -->
      <!-- Card turno pendiente actual -->
      <h1 class="font-bold text-xl text-white">Turno pendiente:</h1>

      <div class="h-fit" :style="'width:' + carouselWidth + 'rem;'">
        <b-carousel-list
          v-model="slideSetAppointments"
          :data="appointments"
          :items-to-show="slidesToShow"
        >
          <template #item="appointment">
            <div class="p-4 m-4 flex justify-left">
              <button
                :id="'service-slide-' + appointment.id"
                class="bg-cover bg-center content-end rounded-lg shadow-lg grayscale transform transition duration-500 hover:scale-110 hover:grayscale-0 hover:"
                :style="
                  'background-image: url(' +
                  url +
                  appointment.service.imageroute +
                  '); width:18rem; height:22rem; font-family: sans-serif;'
                "
              >
                <div class="p-2 absolute bottom-0 left-0">
                  <h5
                    class="text-white bm-4 font-bold text-left"
                    style="font-size: xx-large"
                  >
                    {{ appointment.service.servicename }}
                  </h5>
                  <p
                    class="text-left text-white font-bold"
                    style="
                      font-size: 1.5rem;
                      font-family: sans-serif;
                      text-align: left;
                    "
                  >
                    con {{ appointment.employee.name }}
                  </p>

                  <p
                    class="text-left text-white font-bold"
                    style="
                      font-size: 1.5rem;
                      font-family: sans-serif;
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
                    style="font-size: 1.2rem; font-family: sans-serif"
                  >
                    <b-icon
                      pack="mdi"
                      icon="calendar"
                      class="text-white text-left font-bold"
                    ></b-icon>
                    {{ formatDate(appointment.date) }}
                  <p
                    class="text-white text-left font-bold"
                    style="font-size: 1.2rem; font-family: sans-serif"
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
          type="is-light"
          pack="mdi"
          size="is-large"
          outlined
          icon-right="clipboard-plus-outline"
          label="Agendar nuevo turno"
          style="border-width: 3px;"
        />
      </nuxt-link>

      <!-- Carrousel turnos anteriores -->

      <h1 class="my-6 font-bold text-white text-xl">Turnos anteriores:</h1>

      <div class="h-fit" :style="'width:' + carouselWidth + 'rem;'">
        <b-carousel-list
          v-model="slideSetRecord"
          :data="record"
          :items-to-show="slidesToShow"
        >
          <template #item="appointment">
            <div class="p-4 m-4 flex justify-center">
              <button
                :id="'service-slide-' + appointment.id"
                class="bg-cover bg-center content-end rounded-lg shadow-lg grayscale transform transition duration-500 hover:scale-110 hover:grayscale-0 hover:"
                :style="
                  'background-image: url(' +
                  url +
                  appointment.service.imageroute +
                  '); width:18rem; height:22rem; '
                "
              >
                <div class="p-2 absolute bottom-0 left-0">
                  <h5
                    class="text-white bm-4 font-bold text-left"
                    style="font-size: xx-large"
                  >
                    {{ appointment.service.servicename }}
                  </h5>
                  <p
                    class="far fa-clock text-white text-left"
                    style="font-size: x-large"
                  >
                    {{ appointment.date }}
                  </p>
                </div>
              </button>
            </div>
          </template>
        </b-carousel-list>
      </div>
    </div>
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
      appointments: [],
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
    this.getUserRecord()
  },
  methods: {
    formatDate(value) {
       if (value) {
           return moment(String(value)).format('DD/MM/YYYY')
    }
    },
        formatTime(value) {
       if (value) {
           return moment(value, "HH:mm:ss").format('HH:mm')
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
          this.url + '/appointment/' + this.$auth.$storage.getLocalStorage('id'),
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
