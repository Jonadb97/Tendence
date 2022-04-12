/* eslint-disable vue/no-template-shadow */
<template>
  <div
    id="main-form-container"
    class="flex flex-col justify-center items-center text-center"
  >
    <!-- Servicios -->

    <div id="service-main-container" class="flex-col flex">
      <h1 class="font-bold inline-flex flex-row flex my-2 text-xl">Qué te gustaría hacerte?</h1>
      <ul id="service-list-container" class="flex flex-row text-black">

        <li v-for="service in services" id="service-item" :key="service">
          <button class="hover:animate-pulse text-black">
            <div class="p-4 m-4">
              <img class="w-32 rounded-full mx-auto" :src="url + service.imageroute" />
              <br />
              <p
                class="flex flex-row justify-center font-bold items-center text-center text-lg"
              >
                {{ service.servicename }}
              </p>
              <p
                class="flex flex-row justify-center font-bold items-center text-gray-700 text-center text-xs"
              >
                {{ service.description }}
              </p>
              <p
                class="flex flex-row justify-center items-center text-center text-black -translatey-6 text-xs"
              >
                {{ service.duration }} min.
              </p>
            </div>
          </button>
        </li>
        
      </ul>
    </div>
    <br />

    <!--  Barberos  -->
    <h1 class="font-bold inline-flex flex-row flex my-2 text-xl">Con quién?</h1>
    <div class="h-64 w-64">
      <b-carousel
        v-model="carousel"
        :animated="animated"
        :has-drag="drag"
        :autoplay="autoPlay"
        :pause-hover="pauseHover"
        :pause-info="pauseInfo"
        :pause-info-type="pauseType"
        :interval="interval"
        :repeat="repeat"
      >
        <b-carousel-item v-for="(carousel, i) in carousels" :key="i">
          <b-image class="rounded-lg image" :src="carousel.image"></b-image>
          <div class="hero-body has-text-centered absolute">
            <a
              ><p
                class="border mx-auto px-1 translate-x-6 rounded-md text-white -translate-y-24 object-center"
              >
                {{ carousel.title }}
              </p></a
            >
          </div>
        </b-carousel-item>
      </b-carousel>
    </div>

    <!-- Componentes calendar -->

    <br>
    <h1 class="font-bold inline-flex flex-row flex my-2 text-xl">Para cuando?</h1>
    <div id="calendar-component">
    <no-ssr>
      <v-date-picker
        v-model="selectedDate"
        mode="dateTime"
        :min-date="new Date()"
        :max-date="new Date().setDate(new Date().getDate() + 7)"
        :valid-hours="[16, 17, 18, 19, 20]"
        :minute-increment="60"
        color="purple"
        show-caps
        is24hr
        is-dark
      />
    </no-ssr>
  </div>
  <br>
  <div>
    <h1>Calendar Test</h1>
    <p> {{ selectedDate }} </p>

  </div>


    <!-- Old Calendar
    <div class="flex-col flex">
      <h1 class="font-bold flex-row flex my-4">Cuándo?</h1>
    </div>

    <div class="field">
      <div class="CalendarCheckBox">
        <div v-if="HoySeen || !OtroDiaSeen" id="HoyDiv" class="inline-flex">
          <label class="checkbox">
            <input id="Hoy" v-model="HoySeen" type="checkbox" />
            Hoy
            <HoraComponent />
          </label>
        </div>

        <div v-if="OtroDiaSeen || !HoySeen" id="OtroDiaDiv" class="inline-flex">
          <label class="checkbox">
            <input id="OtroDia" v-model="OtroDiaSeen" type="checkbox" />
            Otro día
            <CalendarComponent />
          </label>
        </div>
      </div>
    </div>

    -->




    <!-- Botón agendar turno -->

    <div class="flex-row items-center justify-center self-center mx-auto py-4">
      <b-button
        class="flex mx-auto py-2"
        type="is-dark"
        outlined
        icon-right="check"
        label="Agendar turno"
        @click="confirm"
      />
    </div>

    <!-- Separador para que haya espacio y se vea lindo -->
    <div id="footer-space" class="h-48"></div>
  </div>

</template>

<script>
import axios from 'axios'
// import CalendarComponent from './FormComponents/CalendarComponent.vue'
// import HoraComponent from './FormComponents/HoraComponent.vue'


export default {
  // components: { CalendarComponent, HoraComponent },

  // Habría que fetchear la data y ponerla en esos arrays para mandarla a los componentes
  data() {
    return {
      maxDate: null,
      selectedDate: null,
      empleados: [],
      services: [],
      url: 'http://localhost:3000',
      fechaTurno: '',
      HoySeen: false,
      OtroDiaSeen: false,
      carousel: 0,
      animated: 'slide',
      drag: true,
      autoPlay: false,
      pauseHover: false,
      pauseInfo: false,
      repeat: false,
      pauseType: 'is-primary',
      interval: 3000,
      carousels: [],
    }
  },
  mounted() {
    this.fetchEmployees()
    this.fetchServices()
  },
  methods: {
    confirm() {
      this.$buefy.dialog.confirm({
        message: 'Deseas confirmar el turno?',
        onConfirm: () => this.$buefy.toast.open('Turno confirmado!'),
      })
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
        this.empleados.forEach((empleado) => {
          this.carousels.push({
            title: empleado.name,
            image: this.url + empleado.imageroute,
          })
        })
      }
      console.log(this.empleados)
    },
    fetchServices() {
      axios.get(this.url + '/services').then(this.asignarservices)
    },
    asignarservices(response) {
      console.log(response)
      this.services = response.data
      if (response.status === 200) {
        console.log('aca estoy entrando')
        this.services = response.data
      }
      console.log(this.empleados)
    },
  },
}
</script>

<style>

#service-list-item {
  height: 32px;
}

#carrousel-barberos {
  width: 50%;
}

/*
#TurnoFlotador {
    margin-right: 20%;
    border-color: rgb(48, 48, 48);
    background-color: #2E2E2E;
    color: white;
}

.TurnoForm {
    margin-top: 3.5rem;
}

#NombreLabel {
    width: 15rem;
}

.CalendarCheckBox {
    padding: 0.5rem;
    font-size: 1.5rem;
}

label > input {
    height: 1.2rem;
    width: 1.2rem;
}

button {
     color: rgb(49, 25, 25);
}

button:hover{
    color: rgb(44, 44, 44);
}

@keyframes imganimation {
    from {width: 8rem;
    height: 8rem;}
    to {width: 10rem;
    height: 10rem;}
}

button > div > img:hover{
    animation-name: imganimation;
    animation-duration: 0.5s;
    animation-timing-function: ease-in-out;
    animation-direction: reverse;
}

*/
</style>
