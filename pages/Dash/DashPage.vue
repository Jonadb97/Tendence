<template>
  <div id="root-component" class="">
    <div
      id="main-content"
      class="flex flex-col justify-center items-center text-center"
    >
    <h1 class="font-bold text-2xl my-2 text-white">{{ $auth.user }}</h1>
      <div id="serach-bar" class="m-2">
        <b-input 
          pack="mdi" 
          icon-right="magnify" 
          class="m-2"
          placeholder="Nombre cliente.."
          maxlength="25"
          @input="filterByName"
        ></b-input>
        <b-dropdown v-model="selectedEmployee" aria-role="list">
            <template #trigger="{ active }">
                <b-button
                  type="is-primary"
                  class="m-2"
                  icon-left="account-search"
                  :icon-right="active ? 'menu-up' : 'menu-down'"
                >
                {{selectedEmployee}}
                </b-button>
            </template>
            <b-dropdown-item 
              aria-role="listitem" 
              value="Todos los servicios" 
              @click="applyFilterEmployees()"
            >
              Todos los Barberos
            </b-dropdown-item>

            <b-dropdown-item 
            v-for="employee in employees" 
            :key="employee.id" 
            aria-role="listitem"
            :value="employee.name" 
            @click="applyFilterEmployees(employee.id)"
            >
              {{employee.name}}
            </b-dropdown-item>
        </b-dropdown>
        <b-dropdown v-model= "selectedService" aria-role="list">
            <template #trigger="{ active }">
                <b-button
                  type="is-primary"
                  class="m-2"
                  icon-left="account-details"
                  :icon-right="active ? 'menu-up' : 'menu-down'"
                >
                {{selectedService}}
                </b-button>
            </template>
            <b-dropdown-item 
              aria-role="listitem" 
              value="Todos los servicios" 
              @click="applyFilterServices()"
            >
              Todos los Servicios
            </b-dropdown-item>

            <b-dropdown-item 
            v-for="service in services" 
            :key="service.id" 
            aria-role="listitem"
            :value="service.servicename"
            @click="applyFilterServices(service.id)"
            >
              {{service.servicename}}
            </b-dropdown-item>
        </b-dropdown>
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
              <div  v-for="(row,index) in previousappointments" :key="index" class="row">
                <div v-for="(appointment) in row" :key="appointment.id" class="column">
                      <div 
                      class="grid-card bg-cover bg-center content-end rounded-lg shadow-lg grayscale transform transition duration-500 hover:scale-110 "
                      @click="showModal(appointment)"
                      >
                        <h2>{{appointment.service.servicename}}</h2>
                        <h2>{{appointment.user.username}}</h2>
                        <h2>{{appointment.employee.name}}</h2>
                        <h2>{{appointment.time}}</h2>

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
              <div  v-for="(row,index) in nextappointments" :key="index" class="row">
                <div v-for="(appointment) in row" :key="appointment.id" class="column">
                      <div 
                      class="grid-card bg-cover bg-center content-end rounded-lg shadow-lg grayscale transform transition duration-500 hover:scale-110 "
                      >
                        <h2>{{appointment.service.servicename}}</h2>
                        <h2>{{appointment.user.username}}</h2>
                        <h2>{{appointment.employee.name}}</h2>
                        <h2>{{appointment.time}}</h2>
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
              <div  v-for="(row,index) in confirmedAppointmentsRows" :key="index" class="row">
                <div v-for="(appointment) in row" :key="appointment.id" class="column">
                      <div 
                      class="grid-card bg-cover bg-center content-end rounded-lg shadow-lg grayscale transform transition duration-500 hover:scale-110 "
                      >
                        <h2>{{appointment.service.servicename}}</h2>
                        <h2>{{appointment.user.username}}</h2>
                        <h2>{{appointment.employee.name}}</h2>
                        <h2>{{appointment.endstate}}</h2>
                      </div>
                </div>
              </div>
            </div>
          </b-tab-item>
        </b-tabs>


      <section>
      <b-modal
        :active.sync="isCardModalActive"
        has-modal-card
        type="is-dark"
      >
          <div v-if= "modalAppointment!==undefined" class="modal-card" style="width: 1000">
          <header class="modal-card-head" style="background-color: rgb(46, 46, 46)">
            <p class="modal-card-title" style="color: white"> {{modalAppointment.service.servicename}} </p>
          </header>

          <section class="modal-card-body" style="background-color: rgb(46, 46, 46)">

            <b-field>
              <b-image
                  :src="url + modalAppointment.service.imageroute"
                  alt="A random image"
                  ratio="6by4"
              ></b-image>
              <p class="subtitle is-4" style="color: white">Con: {{modalAppointment.employee.name}}
              Hora: {{modalAppointment.time}}
              Cliente: {{modalAppointment.user.username}}</p>
            </b-field> 
            <b-field>
                     
            </b-field>
            
            <b-field>
              <b-dropdown v-model= "modalSelectedOptions" aria-role="list">
                  <template #trigger="{ active }">
                      <b-button
                        type="is-primary"
                        class="m-2"
                        value="Elija una opción"
                        :icon-right="active ? 'menu-up' : 'menu-down'"
                      >
                      {{modalSelectedOptions}}
                      </b-button>
                  </template>

                  <b-dropdown-item 
                  v-for="option in modalAppointmentOptions" 
                  :key="option" 
                  aria-role="listitem"
                  :value="option">
                    {{option}}
                  </b-dropdown-item>
              </b-dropdown>
            </b-field>
          </section>
          <footer
            class="modal-card-foot"
            style="background-color: rgb(46, 46, 46); color: white"
          >
            <button 
            class="button" 
            type="button; is-dark" 
            @click="isCardModalActive = false">
              Volver
            </button>
            <button class="button is-primary" >Confirmar</button>
          </footer>
        </div>
      </b-modal>
    </section>

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
      unfilteredAppointments:[],  // todos los turnos del día sin filtros
      dayappointments: [],        // todos los turnos del día con filtros
      nextappointments: [],       // turnos del día apartir de la hora actual
      previousappointments: [],   // turnos del día anteriores a la hora actual
      confirmedAppointments: [],   // turnos del día que ya fueron confirmados
      confirmedAppointmentsRows: [],
      employees:[],
      services:[],
      selectedService: "Todos los servicios",
      selectedEmployee: "Todos los barberos",
      isCardModalActive:false,
      modalAppointment: undefined,
      modalAppointmentOptions: ["No vino", "No vino (Justificado)", "Llego tarde", "Presente"],
      modalSelectedOptions: "Elija una opción",

    }
  },
  mounted() {
    this.fetchAppointments()
    this.fetchConfirmenAppointments()
  },
  methods: {
    fetchAppointments() {
      axios.get(this.url + '/appointment/dayappointments').then(this.updateAppointments)
    },
    fetchConfirmenAppointments(){
      axios.get(this.url + '/appointment/dayfinishedappointments').then(this.updateConfirmedAppointments)
    },
    updateAppointments(response) {
      if (response.status === 200) {
        this.unfilteredAppointments = response.data
        this.dayappointments = response.data
        this.orderAppointments()
        this.addEmployeeFilter()
        this.addServicesFilter()
      }
    },
    updateConfirmedAppointments(response){
      if (response.status === 200) {
        this.confirmedAppointments = response.data
        this.orderConfirmedAppointments()
      }
    },
    orderConfirmedAppointments(){
      let row=[]
      this.confirmedAppointments.forEach(appointment =>{
        row.push(appointment)
        if(row.length === 4){
          this.confirmedAppointmentsRows.push(row)
          row = []
        }
      })
      if(row.length>0){
        this.confirmedAppointmentsRows.push(row)
      }
    }

    ,
    orderAppointments() {
      const fechahoy = new Date()
      let previousRow=[]
      let nextRow=[]
      this.nextappointments=[]
      this.previousappointments=[]

      this.dayappointments.forEach((appointment) => {
        if (fechahoy.toLocaleTimeString() > appointment.time) {
          previousRow.push(appointment)
          if((previousRow.length)%4===0){
            this.previousappointments.push(previousRow)
            previousRow = []
          }
        } else {
          nextRow.push(appointment)
          if((nextRow.length)%4 === 0){
            this.nextappointments.push(nextRow)
            nextRow = []
          }
        }
      })
      if(previousRow.length>0){
        this.previousappointments.push(previousRow)
      }
      if(nextRow.length>0){
        this.nextappointments.push(nextRow)
      }
    },
    addEmployeeFilter(){
      const allEmployees=[]
      this.dayappointments.forEach(appointment=>{
        const employeeSearch = allEmployees.find(employee=>employee.name === appointment.employee.name)
        if( employeeSearch === undefined){
          allEmployees.push(appointment.employee)
        }
      })
      this.employees = [...new Set(allEmployees)]
    },
    addServicesFilter(){
      const allServices=[]
      this.dayappointments.forEach(appointment=>{
        const serviceSearch = allServices.find(service=>service.servicename === appointment.service.servicename)
        if(serviceSearch === undefined){
          allServices.push(appointment.service)
        }
      })
      this.services = [...new Set(allServices)]
    },
    applyFilterServices(id){
      this.dayappointments = this.unfilteredAppointments
      if(id!==undefined){
        this.dayappointments = this.dayappointments.filter(appointment=>{
          return appointment.service.id === id
        })
      }
      this.orderAppointments()
    },
    applyFilterEmployees(id){
      this.dayappointments = this.unfilteredAppointments
      if(id!==undefined){
        this.dayappointments = this.dayappointments.filter(appointment=>{
          return appointment.employee.id === id
        })
      }
      this.orderAppointments()
    },
    filterByName(name){
      console.log(name)
    },
    showModal(appointment){
      this.modalAppointment = appointment
      this.isCardModalActive = true
    }
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
