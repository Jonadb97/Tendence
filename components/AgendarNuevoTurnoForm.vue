/* eslint-disable vue/no-template-shadow */
<template>
  <div
    id="main-form-container"
    class="text-white flex flex-col justify-center items-center text-center"
  >
    <!-- Servicios -->

    <div id="service-main-container" class="flex-col flex">
      <h1 class="font-bold inline-flex flex-row flex my-2 text-xl text-white">Qué te gustaría hacerte?</h1>
      <ul id="service-list-container" class="flex flex-row text-white">

        <li v-for="service in services" id="service-item" :key="service">
          <button class="hover:animate-pulse text-black">
            <div class="p-4 m-4">
              <img class="w-32 rounded-full mx-auto" :src="url + service.imageroute" />
              <br />
              <p
                class="flex flex-row justify-center font-bold items-center text-center text-lg text-white"
              >
                {{ service.servicename }}
              </p>
              <p
                class="flex flex-row justify-center font-bold items-center text-gray-400 text-center text-xs"
              >
                {{ service.description }}
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
        <b-carousel-item v-for="(carousel, i) in carousels" :key='i'>
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
            :min-date="new Date()"
            :max-date="new Date().setDate(new Date().getDate() + 7)"
            :valid-hours="[16, 17, 18, 19, 20]"
            :minute-increment="60"
            color="purple"
            show-caps
            is24hr
          />
        </no-ssr>
      </div>
    <br>

    <h1 class="font-bold inline-flex flex-row flex my-2 text-xl">A que hora?</h1>
    <section>
      <b-dropdown
            :scrollable="isScrollable"
            :max-height="maxHeight"
            v-model="selectedMinutes"
            aria-role="list"
        >
            <template #trigger>
                <b-button
                    :label="selectedHour"
                    type="is-light" 
                    icon-right="menu-down"/>
            </template>

            <b-dropdown-item
                v-for="(hour) in hours"
                :key="hour"
                :value="menu" aria-role="listitem">
                <div class="media">
                    <div class="media-content">
                        <h3>{{hour}}</h3>
                    </div>
                </div>
            </b-dropdown-item>
      </b-dropdown>
      <p class="font-bold inline-flex flex-row flex my-2 text-xl">:</p>
      <b-dropdown
            :scrollable="isScrollable"
            :max-height="maxHeight"
            v-model="selectedMinutes"
            aria-role="list"
        >
            <template #trigger>
                <b-button
                    :label="selectedMinutes"
                    type="is-light" 
                    icon-right="menu-down"/>
            </template>

            <b-dropdown-item
                v-for="minute in minutes"
                :key="minute"
                :value="menu" aria-role="listitem">
                <div class="media">
                    <div class="media-content">
                        <h3>{{minute}}</h3>
                    </div>
                </div>
            </b-dropdown-item>
        </b-dropdown>
    </section>
    
    <div class="flex-row items-center justify-center self-center mx-auto py-4">
      <b-button
        class="flex mx-auto py-2"
        type="is-light"
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


export default {
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
      isScrollable: true,
      maxHeight: 200,
      selectedMinutes: "--",
      selectedHour: "--",
      hours:["08","09","10","11"],
      minutes:["00","15","30","45"],
      
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
        type: 'is-dark',
        onConfirm: () => this.$buefy.toast.open({
          message: 'Turno confirmado!',
          type: 'is-dark'
        }),
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

#tab {
  color: white;
}

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
