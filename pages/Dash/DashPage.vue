<template>
  <div id="root-component" class="">
    <div
      id="main-content"
      class="flex flex-col justify-center items-center text-center"
    >
    <h1 class="font-bold text-2xl my-2 text-white">{{ $auth.user }}</h1>
      <div id="serach-bar" class="m-2">
        <b-input pack="mdi" icon-right="magnify" class="m-2"></b-input><b-button pack="mdi" icon-right="account-search" class="m-2" type="is-primary">Barberos</b-button ><b-button class="m-2" type="is-primary" pack="mdi" icon-right="account-details">Servicios</b-button><b-button type="is-info" class="m-2" pack="mdi" icon-left="magnify">Buscar</b-button>
      </div>
      <div id="tab-bar" class="bg-white w-screen" style="margin-bottom: 50%;">
        <b-tabs id="nav-tab-bar" type="is-small" class="w-96 " expanded>
        
          <b-tab-item
            label="Turnos de hoy"
            pack="mdi"
            size="is-small"
            icon="calendar-alert"
            @click="activeTab = 0"
          >
            <div class="grid-card-container">
              <div class="row">
                <div class="column">
                  <div class="grid-card">
                    <h2>Card Title Hoy</h2>
                    <h2>Cliente</h2>
                    <h2>Barbero</h2>
                    <h2>A las: HH - MM</h2>
                  </div>
                </div>
                <div class="column">
                  <div class="grid-card">
                    <h2>Card Title Hoy</h2>
                    <h2>Cliente</h2>
                    <h2>Barbero</h2>
                    <h2>A las: HH - MM</h2>
                  </div>
                </div>
                <div class="column">
                  <div class="grid-card">
                    <h2>Card Title Hoy</h2>
                    <h2>Cliente</h2>
                    <h2>Barbero</h2>
                    <h2>A las: HH - MM</h2>
                  </div>
                </div>
                <div class="column">
                  <div class="grid-card">
                    <h2>Card Title Hoy</h2>
                    <h2>Cliente</h2>
                    <h2>Barbero</h2>
                    <h2>A las: HH - MM</h2>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="column">
                  <div class="grid-card">
                    <h2>Card Title Hoy</h2>
                    <h2>Cliente</h2>
                    <h2>Barbero</h2>
                    <h2>A las: HH - MM</h2>
                  </div>
                </div>
                <div class="column">
                  <div class="grid-card">
                    <h2>Card Title Hoy</h2>
                    <h2>Cliente</h2>
                    <h2>Barbero</h2>
                    <h2>A las: HH - MM</h2>
                  </div>
                </div>
                <div class="column">
                  <div class="grid-card">
                    <h2>Card Title Hoy</h2>
                    <h2>Cliente</h2>
                    <h2>Barbero</h2>
                    <h2>A las: HH - MM</h2>
                  </div>
                </div>
                <div class="column">
                  <div class="grid-card">
                    <h2>Card Title Hoy</h2>
                    <h2>Cliente</h2>
                    <h2>Barbero</h2>
                    <h2>A las: HH - MM</h2>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="column">
                  <div class="grid-card">
                    <h2>Card Title Hoy</h2>
                    <h2>Cliente</h2>
                    <h2>Barbero</h2>
                    <h2>A las: HH - MM</h2>
                  </div>
                </div>
                <div class="column">
                  <div class="grid-card">
                    <h2>Card Title Hoy</h2>
                    <h2>Cliente</h2>
                    <h2>Barbero</h2>
                    <h2>A las: HH - MM</h2>
                  </div>
                </div>
                <div class="column">
                  <div class="grid-card">
                    <h2>Card Title Hoy</h2>
                    <h2>Cliente</h2>
                    <h2>Barbero</h2>
                    <h2>A las: HH - MM</h2>
                  </div>
                </div>
                <div class="column">
                  <div class="grid-card">
                    <h2>Card Title Hoy</h2>
                    <h2>Cliente</h2>
                    <h2>Barbero</h2>
                    <h2>A las: HH - MM</h2>
                  </div>
                </div>
              </div>
            </div>
          </b-tab-item>
          <b-tab-item
            label="Próximos turnos"
            pack="mdi"
            size="is-small"
            icon="calendar-clock"
            @click="activeTab = 1"
          >
            <div class="grid-card-container">
              <div class="row">
                <div class="column">
                  <div class="grid-card">
                    <h2>Card Title Prox</h2>
                    <h2>Cliente</h2>
                    <h2>Barbero</h2>
                    <h2>A las: HH - MM</h2>
                  </div>
                </div>
                <div class="column">
                  <div class="grid-card">
                    <h2>Card Title Prox</h2>
                    <h2>Cliente</h2>
                    <h2>Barbero</h2>
                    <h2>A las: HH - MM</h2>
                  </div>
                </div>
                <div class="column">
                  <div class="grid-card">
                    <h2>Card Title Prox</h2>
                    <h2>Cliente</h2>
                    <h2>Barbero</h2>
                    <h2>A las: HH - MM</h2>
                  </div>
                </div>
                <div class="column">
                  <div class="grid-card">
                    <h2>Card Title Prox</h2>
                    <h2>Cliente</h2>
                    <h2>Barbero</h2>
                    <h2>A las: HH - MM</h2>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="column">
                  <div class="grid-card">
                    <h2>Card Title Prox</h2>
                    <h2>Cliente</h2>
                    <h2>Barbero</h2>
                    <h2>A las: HH - MM</h2>
                  </div>
                </div>
                <div class="column">
                  <div class="grid-card">
                    <h2>Card Title Prox</h2>
                    <h2>Cliente</h2>
                    <h2>Barbero</h2>
                    <h2>A las: HH - MM</h2>
                  </div>
                </div>
                <div class="column">
                  <div class="grid-card">
                    <h2>Card Title Prox</h2>
                    <h2>Cliente</h2>
                    <h2>Barbero</h2>
                    <h2>A las: HH - MM</h2>
                  </div>
                </div>
                <div class="column">
                  <div class="grid-card">
                    <h2>Card Title Prox</h2>
                    <h2>Cliente</h2>
                    <h2>Barbero</h2>
                    <h2>A las: HH - MM</h2>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="column">
                  <div class="grid-card">
                    <h2>Card Title Prox</h2>
                    <h2>Cliente</h2>
                    <h2>Barbero</h2>
                    <h2>A las: HH - MM</h2>
                  </div>
                </div>
                <div class="column">
                  <div class="grid-card">
                    <h2>Card Title Prox</h2>
                    <h2>Cliente</h2>
                    <h2>Barbero</h2>
                    <h2>A las: HH - MM</h2>
                  </div>
                </div>
                <div class="column">
                  <div class="grid-card">
                    <h2>Card Title Prox</h2>
                    <h2>Cliente</h2>
                    <h2>Barbero</h2>
                    <h2>A las: HH - MM</h2>
                  </div>
                </div>
                <div class="column">
                  <div class="grid-card">
                    <h2>Card Title Prox</h2>
                    <h2>Cliente</h2>
                    <h2>Barbero</h2>
                    <h2>A las: HH - MM</h2>
                  </div>
                </div>
              </div>
            </div>
          </b-tab-item>
          <b-tab-item
            label="Turnos confirmados"
            pack="mdi"
            size="is-small"
            icon="calendar-multiple-check"
            @click="activeTab = 2"
          >
            <div class="grid-card-container">
              <div class="row">
                <div class="column">
                  <div class="grid-card">
                    <h2>Card Title Conf</h2>
                    <h2>Cliente</h2>
                    <h2>Barbero</h2>
                    <h2>A las: HH - MM</h2>
                  </div>
                </div>
                <div class="column">
                  <div class="grid-card">
                    <h2>Card Title Conf</h2>
                    <h2>Cliente</h2>
                    <h2>Barbero</h2>
                    <h2>A las: HH - MM</h2>
                  </div>
                </div>
                <div class="column">
                  <div class="grid-card">
                    <h2>Card Title Conf</h2>
                    <h2>Cliente</h2>
                    <h2>Barbero</h2>
                    <h2>A las: HH - MM</h2>
                  </div>
                </div>
                <div class="column">
                  <div class="grid-card">
                    <h2>Card Title Conf</h2>
                    <h2>Cliente</h2>
                    <h2>Barbero</h2>
                    <h2>A las: HH - MM</h2>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="column">
                  <div class="grid-card">
                    <h2>Card Title Conf</h2>
                    <h2>Cliente</h2>
                    <h2>Barbero</h2>
                    <h2>A las: HH - MM</h2>
                  </div>
                </div>
                <div class="column">
                  <div class="grid-card">
                    <h2>Card Title Conf</h2>
                    <h2>Cliente</h2>
                    <h2>Barbero</h2>
                    <h2>A las: HH - MM</h2>
                  </div>
                </div>
                <div class="column">
                  <div class="grid-card">
                    <h2>Card Title Conf</h2>
                    <h2>Cliente</h2>
                    <h2>Barbero</h2>
                    <h2>A las: HH - MM</h2>
                  </div>
                </div>
                <div class="column">
                  <div class="grid-card">
                    <h2>Card Title Conf</h2>
                    <h2>Cliente</h2>
                    <h2>Barbero</h2>
                    <h2>A las: HH - MM</h2>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="column">
                  <div class="grid-card">
                    <h2>Card Title Conf</h2>
                    <h2>Cliente</h2>
                    <h2>Barbero</h2>
                    <h2>A las: HH - MM</h2>
                  </div>
                </div>
                <div class="column">
                  <div class="grid-card">
                    <h2>Card Title Conf</h2>
                    <h2>Cliente</h2>
                    <h2>Barbero</h2>
                    <h2>A las: HH - MM</h2>
                  </div>
                </div>
                <div class="column">
                  <div class="grid-card">
                    <h2>Card Title Conf</h2>
                    <h2>Cliente</h2>
                    <h2>Barbero</h2>
                    <h2>A las: HH - MM</h2>
                  </div>
                </div>
                <div class="column">
                  <div class="grid-card">
                    <h2>Card Title Conf</h2>
                    <h2>Cliente</h2>
                    <h2>Barbero</h2>
                    <h2>A las: HH - MM</h2>
                  </div>
                </div>
              </div>
            </div>
          </b-tab-item>
        </b-tabs>
      </div>
       
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
.row {
  margin: 1rem -5px;
}

/* Clear floats after the columns */
.row:after {
  content: '';
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

  #nav-tab-bar > span {
    font-size: 10px;
  }

  .footer {
    margin-top: auto;
    display: none;
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

#tab-bar {
  height: 42px;
  border: 1px solid #4444;
  border-radius: 5px;
}

@media (max-width: 800px) {
  #search-bar{
    display: inline-flex;
    flex-direction: row;
  }
  }


@media (min-width: 600px) {
  #search-bar{
    width: 60%;
    display: flex;
    flex-direction: column;
  }
}
</style>
<!-- 
  -webkit-filter: blur(5px);
  -moz-filter: blur(5px);
  -o-filter: blur(5px);
  -ms-filter: blur(5px);
  -->
