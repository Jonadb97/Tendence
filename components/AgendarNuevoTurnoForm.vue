/* eslint-disable vue/no-template-shadow */
<template>
  <div
    id="main-form-container"
    class="text-white flex flex-col justify-center items-center text-center"
  >
    <!-- Servicios -->

    <h1 class="font-bold inline-flex flex-row flex my-2 text-xl">Que te vas a hacer?</h1>

      <div class="h-fit w-9/12">
      <b-carousel-list v-model="slideSetServices" :data="services" :items-to-show="3">
          <template #item="service">
              <div class="p-4 m-4 flex justify-center" >
                  <button :id="'service-slide-'+service.id" class="bg-cover bg-center content-end rounded-lg shadow-lg grayscale transform transition duration-500 hover:scale-110 hover:grayscale-0 hover: " 
                  :style="'background-image: url(' +url+ service.imageroute+'); height:20vw; width:15vw;'"
                  @click="selectService(service.id)"
                  >
                    <div class="p-2 absolute bottom-0 left-0 ">
                      <h5 
                      class="text-white bm-4 font-bold text-left" 
                      style="font-size:1.6vw;">{{service.servicename}}
                      </h5>
                      <p 
                      class="far fa-clock text-white text-left"
                      style="font-size:1.3vw;"
                      >
                      {{service.duration}} Minutos
                      </p>
                    </div>       
                  </button>
                </div>
          </template>
      </b-carousel-list>
      </div>

    <br />

    <!--  Barberos  -->
    <h1 class="font-bold inline-flex flex-row flex my-2 text-xl">Con quién?</h1>

    <div class="h-fit w-9/12">
      <b-carousel-list v-model="slideSetEmployee" :data="employees" :items-to-show="3">
          <template #item="employee">
              <div class="p-4 m-4 flex justify-center" >
                  <button :id="'employee-slide-'+employee.id" class="bg-cover bg-center content-end rounded-lg shadow-lg grayscale transform transition duration-500 hover:scale-110 hover:grayscale-0 hover: " 
                  :style="'background-image: url(' +url+ employee.imageroute+'); height:20vw; width:15vw;'"
                  @click="selectEmployee(employee.id)"
                  >
                    <div class="p-2 absolute bottom-0 left-0 ">
                      <h5 
                      class="text-white bm-4 font-bold text-left" 
                      style="font-size:1.6vw;">{{employee.name}}
                      </h5>
                    </div>
                  </button>
                </div>
          </template>
      </b-carousel-list>
      </div>
    <!-- Componentes calendar -->

    <br>
    
      <h1 class="font-bold inline-flex flex-row flex my-2 text-xl">Para cuando?</h1>
      <no-ssr>
        <div id="calendar-component w-1/2" >
          <b-datepicker 
            v-model="selectedDate" 
            inline 
            :unselectable-days-of-week="[0]"
            :min-date="startDate"
            :max-date="endDate"
            @input="getDayAppointments"
            >
          </b-datepicker>
        </div>
      </no-ssr>
    <br>

    <h1 class="font-bold inline-flex flex-row flex my-2 text-xl">A que hora?</h1>
    <section>
      <b-dropdown
            v-model="selectedMinutes"
            :scrollable="isScrollable"
            :max-height="maxHeight"
            
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
                :value="hour" aria-role="listitem">
                <div class="media">
                    <div class="media-content">
                        <h3>{{hour}}</h3>
                    </div>
                </div>
            </b-dropdown-item>
      </b-dropdown>
      
      <p class="font-bold inline-flex flex-row flex my-2 text-xl">:</p>

      <b-dropdown
            v-model="selectedMinutes"
            :scrollable="isScrollable"
            :max-height="maxHeight"
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
                :value="minute" aria-role="listitem">
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
// import { Carousel, Slide } from 'vue-carousel';
// import VueSlickCarousel from 'vue-slick-carousel'
 

export default {
  data() {
    return {
      allEmployees: [],
      employees: [],
      services: [],
      url: 'http://localhost:3000',
      carousel: 0,
      carousels: [],
      isScrollable: true,
      maxHeight: 200,
      selectedMinutes: "--",
      selectedHour: "--",
      hours:[],
      minutes:[],
      slideSetEmployee: 0,
      slideSetServices:0,
      selectedEmployee:null,
      selectedService:null,
      selectedDate: new Date(),
      startDate: null,
      endDate: null
    }
  },
  mounted() {
    this.fetchEmployees()
    this.fetchServices()
    this.fetchDateRange()
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
      axios.get(this.url + '/employee').then((response)=>{ 
        if(response.status === 200){
          this.employees = response.data
          this.allEmployees = response.data
        }
        })
    },
    fetchServices() {
      axios.get(this.url + '/services').then((response)=>{
        if (response.status === 200){
          this.services = response.data
        }
        
      })
    },
    fetchDateRange() {
      axios.get(this.url + '/timetable/dateRange').then((response)=>{
        if (response.status === 200){
          this.startDate = new Date(response.data.startDate)
          this.endDate = new Date(response.data.endDate)
        }
      })
    },
    selectService(id){
      if(this.selectedService!=null){
        const previousSlide = document.getElementById("service-slide-"+this.selectedService);
        previousSlide.style.filter="grayscale(100%)"
        // para el gradiente= background: linear-gradient(to bottom,#ffffff 80%, #000000);
      }
      const slide = document.getElementById("service-slide-"+id);
      slide.style.filter="grayscale(0)"
      this.selectedService = id
      
    },
    selectEmployee(id){
      if(this.selectedEmployee!=null){
        const previousSlide = document.getElementById("employee-slide-"+this.selectedEmployee);
        previousSlide.style.filter="grayscale(100%)"
      }
      const slide = document.getElementById("employee-slide-"+id);
      slide.style.filter="grayscale(0%)"
      this.selectedEmployee = id
    },
    getDayAppointments(value){
      axios.get(this.url + '/timetable/freeschedules').then((response)=>{
        if (response.status === 200){
          const timetable = response.data.startDate
          
          timetable.array.forEach(element => {
            
          });
        }
      })
    }
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
