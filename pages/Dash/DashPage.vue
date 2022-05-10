<template>
  <div id="root-component" class="">
    <div
      id="main-content"
      class="flex flex-col justify-center items-center text-center"
    >
      <h1 class="font-bold text-2xl my-6 text-white">{{ $auth.user }}</h1>

      <!-- Card turnos para hoy -->
      <h1
        class="flex flex-col font-bold text-xl text-white text-center object-center self-center align-center"
      >
        Próximos Turnos Hoy:
      </h1>
      <br />
      <div class="grid-card-container">
        <div class="row">
          <div class="column">
            <div class="grid-card">
              <h2>Card Title</h2>
              <h2>Cliente</h2>
              <h2>Barbero</h2>
              <h2>A las: HH - MM</h2>
            </div>
          </div>
          <div class="column">
            <div class="grid-card">
              <h2>Card Title</h2>
              <h2>Cliente</h2>
              <h2>Barbero</h2>
              <h2>A las: HH - MM</h2>
            </div>
          </div>
          <div class="column">
            <div class="grid-card">
              <h2>Card Title</h2>
              <h2>Cliente</h2>
              <h2>Barbero</h2>
              <h2>A las: HH - MM</h2>
            </div>
          </div>
          <div class="column">
            <div class="grid-card">
              <h2>Card Title</h2>
              <h2>Cliente</h2>
              <h2>Barbero</h2>
              <h2>A las: HH - MM</h2>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="column">
            <div class="grid-card">
              <h2>Card Title</h2>
              <h2>Cliente</h2>
              <h2>Barbero</h2>
              <h2>A las: HH - MM</h2>
            </div>
          </div>
          <div class="column">
            <div class="grid-card">
              <h2>Card Title</h2>
              <h2>Cliente</h2>
              <h2>Barbero</h2>
              <h2>A las: HH - MM</h2>
            </div>
          </div>
          <div class="column">
            <div class="grid-card">
              <h2>Card Title</h2>
              <h2>Cliente</h2>
              <h2>Barbero</h2>
              <h2>A las: HH - MM</h2>
            </div>
          </div>
          <div class="column">
            <div class="grid-card">
              <h2>Card Title</h2>
              <h2>Cliente</h2>
              <h2>Barbero</h2>
              <h2>A las: HH - MM</h2>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="column">
            <div class="grid-card">
              <h2>Card Title</h2>
              <h2>Cliente</h2>
              <h2>Barbero</h2>
              <h2>A las: HH - MM</h2>
            </div>
          </div>
          <div class="column">
            <div class="grid-card">
              <h2>Card Title</h2>
              <h2>Cliente</h2>
              <h2>Barbero</h2>
              <h2>A las: HH - MM</h2>
            </div>
          </div>
          <div class="column">
            <div class="grid-card">
              <h2>Card Title</h2>
              <h2>Cliente</h2>
              <h2>Barbero</h2>
              <h2>A las: HH - MM</h2>
            </div>
          </div>
          <div class="column">
            <div class="grid-card">
              <h2>Card Title</h2>
              <h2>Cliente</h2>
              <h2>Barbero</h2>
              <h2>A las: HH - MM</h2>
            </div>
          </div>
        </div>
      </div>

      <ul class="inline-flex h-64">
        <li v-for="appointment in nextappointments" :key="appointment.id">
          <div id="card-turnos-siguientes" class="card">
            <div class="flex align-content-center items-center">
              <img
                id="service-img"
                class="w-1/2 rounded-full m-2 mx-auto"
                :src="url + appointment.service.imageroute"
                alt="Pelo"
              />
            </div>

            <header class="card-header">
              <p class="card-header-title">
                {{ appointment.service.servicename }}
              </p>
            </header>

            <div class="card-content">
              <h2 class="font-bold my-1">Nombre de empleado:</h2>
              <p id="hora-turno" class="my-1">
                {{ appointment.employee.name }}
              </p>
              <h2 class="my-1 font-bold">Fecha:</h2>
              <p id="fecha-turno" class="my-1">{{ appointment.date }}</p>
              <h2 class="font-bold my-1">Hora:</h2>
              <p id="hora-turno" class="my-1">{{ appointment.time }}</p>
            </div>
          </div>
        </li>
      </ul>

      <!-- Carrousel turnos recientes -->

      <h1 class="my-6 font-bold text-xl text-white">Turnos recientes:</h1>

      <div class="h-fit w-9/12">
        <b-carousel-list
          v-model="slideSetPreviousAppointments"
          :data="previousappointments"
          :items-to-show="3"
        >
          <template #item="appointment">
            <div class="p-4 m-4 flex justify-center">
              <button
                :id="'appointment-slide-' + appointment.id"
                class="bg-cover bg-center content-end rounded-lg shadow-lg grayscale transform transition duration-500 hover:scale-110 hover:grayscale-0 hover:"
                :style="
                  'background-image: url(' +
                  url +
                  appointment.service.imageroute +
                  '); height:20vw; width:15vw;'
                "
              >
                <div class="p-2 absolute bottom-0 left-0">
                  <h5
                    class="text-white bm-4 font-bold text-left"
                    style="font-size: 1.6vw"
                  >
                    {{ appointment.service.servicename }}
                  </h5>
                  <p class="text-white text-left" style="font-size: 1.3vw">
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

if (process.browser) {
  require('vue-carousel')
}
export default {
  name: 'DashPage',
  layout: 'default-lay',

  // Hay que fetchear la fecha y hora para ponerlos reactivos en el card de turnos pendientes y los anteriores

  data() {
    return {
      slideSetPreviousAppointments: 0,
      open: true,
      overlay: false,
      fullheight: true,
      fullwidth: false,
      right: false,
      url: 'http://localhost:3000',
      dayappointments: [],
      nextappointments: [],
      previousappointments: [],
    }
  },
  mounted() {
    this.fetchAppointments()
  },
  methods: {
    fetchAppointments() {
      axios.get(this.url + '/appointment/dayappointments').then(this.asignar)
    },
    asignar(response) {
      this.dayappointments = response.data
      if (response.status === 200) {
        this.dayappointments = response.data
        console.log(response.data)
        this.orderAppointments()
      }
    },
    orderAppointments(response) {
      const fechahoy = new Date()
      this.dayappointments.forEach((appointment) => {
        if (fechahoy.toLocaleTimeString() > appointment.time) {
          this.previousappointments.push(appointment)
        } else {
          this.nextappointments.push(appointment)
        }
      })
      console.log(this.previousappointments, this.nextappointments)
    },
  },
}
</script>

<style>

.grid-card-container {
  box-sizing: border-box;
  font-family: Arial, Helvetica, sans-serif;
  color: black;
  font-weight: bold;

}

.grid-card-container {
  box-sizing: border-box;
  font-family: Arial, Helvetica, sans-serif;
  color: black;
  font-weight: bold;
  cursor: pointer;
  
}


/* Float four columns side by side */
.column {
  float: left;
  width: 25%;
  padding: 0 10px;
}

/* Remove extra left and right margins, due to padding in columns */
.row {margin: 1rem -5px;}

/* Clear floats after the columns */
.row:after {
  content: "";
  display: table;
  clear: both;
}

/* Style the counter cards */
.grid-card {
  border-radius: 0;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2); /* this adds the "card" effect */
  padding: 16px;
  text-align: center;
  background-color: #f1f1f1;
}

/* Responsive columns - one column layout (vertical) on small screens */
@media screen and (max-width: 600px) {
  .column {
    width: 100%;
    display: block;
    margin-bottom: 20px;
  }
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

#card-turnos-siguientes {
  margin-left: 2rem;
  margin-right: 2rem;
}

#card-turnos-anteriores {
  margin-left: 2rem;
  margin-right: 2rem;
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
  margin-bottom: 2rem;
  border-radius: 2rem;
}

.card-header-title {
  text-align: center;
  justify-content: center;
}
</style>
