/* eslint-disable vue/no-template-shadow */
<template>
  <div
    id="main-form-container"
    class="text-white flex flex-col justify-center items-center text-center"
  >
    <!-- Servicios -->
    <h1 id="top" class="font-bold inline-flex flex-row my-2 text-xl">
      Que te vas a hacer?
    </h1>
    <no-ssr>
      <div id="service-carrousel" class="h-fit" :style="'width:' + carouselServicesWidth + 'rem;'">
       <b-skeleton height="22rem" width="18rem" :active="isLoadingServices"></b-skeleton>
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
                  '); width:18rem; height:22rem; '
                "
                @click="selectService(service.id)"
              >
                <div class="p-2 absolute bottom-0 left-0">
                  <h5
                    class="text-white bm-4 font-bold text-left"
                    style="font-size: xx-large"
                  >
                    {{ service.servicename }}
                  </h5>
                  <p
                    class="text-white text-left"
                    style="font-size: x-large; font-family: sans-serif;"
                  ><b-icon
                      pack="mdi"
                      icon="clock"
                      class="clock text-white text-center"
                    ></b-icon>
                    {{ service.duration }} Minutos
                  </p>
                              <p
                    class="text-white text-left font-bold"
                    style="font-size: x-large; font-family: sans-serif;"
                  ><b-icon
                      pack="mdi"
                      icon="cash-multiple"
                      class=" text-white text-center"
                    ></b-icon>
                    {{ service.price }}
                  </p>
                </div>
              </button>
            </div>
          </template>
        </b-carousel-list>
      </div>
    </no-ssr>

    <br />

    <!--  Barberos  -->
    <h1 class="font-bold inline-flex flex-row my-2 text-xl">Con quién?</h1>
    <no-ssr>
      <div id="employee-carrousel" class="h-fit" :style="'width:' + carouselEmployeesWidth + 'rem;'">
      <b-skeleton height="22rem" width="18rem" :active="isLoadingEmployees"></b-skeleton>
        <b-carousel-list
          v-model="slideSetEmployee"
          :data="employees"
          :items-to-show="slidesToShowEmployees"
        >
          <template #item="employee">
            <div class="p-4 m-4 flex justify-center">
              <button
                :id="'employee-slide-' + employee.id"
                class="bg-cover bg-center content-end rounded-lg shadow-lg grayscale transform transition duration-500 hover:scale-110 hover:grayscale-0 hover:"
                :style="
                  'background-image: url(' +
                  url +
                  employee.imageroute +
                  '); height:24rem; width:18rem;'
                "
                @click="selectEmployee(employee.id)"
              >
                <div class="p-2 absolute bottom-0 left-0">
                  <h5
                    class="text-white bm-4 font-bold text-left"
                    style="font-size: xx-large"
                  >
                    {{ employee.name }}
                  </h5>
                </div>
              </button>
            </div>
          </template>
        </b-carousel-list>
      </div>
    </no-ssr>
    <!-- Componentes calendar -->

    <br />

    <h1 class="font-bold inline-flex flex-row my-2 text-xl">Para cuando?</h1>
    <no-ssr>
      <div id="calendar-component w-1/2">
        <b-datepicker
          v-model="selectedDate"
          inline
          size="is-medium"
          :unselectable-days-of-week="unselectableDaysOfWeek"
          :unselectable-dates="unselectableDates"
          :min-date="startDate"
          :max-date="endDate"
          :editable="false"
          @input="getDayAppointments"
          @week-number-click="scrollToHour"
        >
        </b-datepicker>
      </div>
    </no-ssr>
    <br />

    <h1 class="font-bold inline-flex flex-row my-2 text-xl">A que hora?</h1>
    <section class="inline-flex">

      <b-select 
        id="hourSelect"
        v-model="selectedHour" 
        placeholder="HH" 
        size="is-medium"
        :disabled="isDisabledTimepicker"
        :loading="isLoadingTimepicker"
        @input="hourSelected" >
          <option
              v-for="hour in hours"
              :key="hour"
              :value="hour"
              >
              {{ hour }}
          </option>
      </b-select>

      <p class="font-bold inline-flex flex-row px-2.5 my-2 text-xl">:</p>

      <b-select 
        v-model="selectedMinutes" 
        placeholder="MM" 
        size="is-medium"
        :disabled="isDisabledTimepicker"
        :loading="isLoadingTimepicker">
          <option
              v-for="minute in minutes"
              :key="minute"
              :value="minute"
              @click="scrollToOk"
              >
              {{ minute }}
          </option>
      </b-select>

    </section>
    <br />
    <b-button
    rounded
    style="border-width: 3px; margin: 32px;"
    @click="scrollToTop"
    >
    <b-icon
    pack="mdi"
    class="my-2"
    type="is-white"
    icon="chevron-up"
    ></b-icon>
    </b-button>
    <div class="flex-row items-center justify-center self-center mx-auto py-4">
      <b-button
        id="confirmarTurno"
        class="flex mx-auto py-2"
        type="is-success"
        outlined
        size="is-large"
        icon-right="book-check"
        label="Agendar turno"
        style="border-width: 3px;"
        @click="confirm"
      />
    </div>
    <div class="flex-row items-center justify-center self-center mx-auto py-4">
      <b-button
        class="flex mx-auto py-2"
        type="is-danger"
        outlined
        size="is-large"
        icon-right="book-cancel"
        label="Cancelar"
        style="border-width: 3px;"
        @click="redirectHome"
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
      allEmployees: [],
      employees: [],
      services: [],
      freeSchedules: [],
      url: this.$auth.$storage.getLocalStorage('url'),
      carousel: 0,
      carousels: [],
      isScrollable: true,
      maxHeight: 200,
      selectedMinutes: undefined,
      selectedHour: undefined,
      hours: [],
      minutes: [],
      isLoadingServices: true,
      isLoadingEmployees: true,
      carouselServicesWidth: 20,
      carouselEmployeesWidth: 20,
      slidesToShowServices: 1,
      slidesToShowEmployees: 1,
      slideSetEmployee: 0,
      slideSetServices: 0,
      selectedEmployee: undefined,
      selectedService: undefined,
      selectedDate: new Date(),
      startDate: undefined,
      endDate: undefined,
      availableDays: undefined,
      holidays: [],
      unselectableDaysOfWeek: [],
      isDisabledTimepicker: true,
      isLoadingTimepicker: false
    }
  },
  mounted() {
    window.addEventListener('resize', this.onResize)
    this.onResize()
    this.fetchEmployees()
    this.fetchServices()
    this.fetchSelectableDates()
  },
  methods: {
    scrollToHour(){
      const el = document.getElementById('hourSelect');
      el.scrollIntoView({behavior: "smooth"});
    },
    scrollToOk(){
      const el = document.getElementById('confirmarTurno');
      el.scrollIntoView({behavior: "smooth"});
    },
    scrollToTop() {
      window.scrollTo(0,0)
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
        this.slidesToShowEmployees = Math.min(
          posibleSlides,
          Math.min(4, this.employees.length)
        )
        this.carouselEmployeesWidth = this.slidesToShowEmployees * 20
        this.carouselServicesWidth = this.slidesToShowServices * 20
      }

    },
    confirm() {
      this.$buefy.dialog.confirm({
        message: 'Deseas confirmar el turno?',
        type: 'is-dark',

        onConfirm: () => {
          const date = this.selectedDate
          const finalDate =
            String(date.getFullYear()).padStart(2, '0') +
            '-' +
            String(date.getMonth() + 1).padStart(2, '0') +
            '-' +
            String(date.getDate()).padStart(2, '0')

          axios
            .post(
              this.url + '/appointment',
              {
                date: finalDate,
                time: this.selectedHour + ':' + this.selectedMinutes + ':00',
                employeeId: this.selectedEmployee.id,
                serviceId: this.selectedService.id,
                userId: this.$auth.$storage.getLocalStorage('id'),
              },
              {
                headers: {
                  auth: this.$auth.$storage.getLocalStorage('token'),
                },
              }
            )
            .then((response) => {
              if (response.status === 200) {
                this.$buefy.toast.open({
                  message: 'Turno confirmado!',
                  type: 'is-dark',
                })
                const router = window.$nuxt.$router
                router.push('/TurnosPage')
              }
            })
        },
      })
    },
    fetchEmployees() {
      axios.get(this.url + '/employee').then((response) => {
        if (response.status === 200) {
          this.employees = response.data
          this.allEmployees = response.data
          this.isLoadingEmployees = false
        }
        this.onResize()
      })
    },
    fetchServices() {
      axios.get(this.url + '/services').then((response) => {
        if (response.status === 200) {
          this.services = response.data
          this.isLoadingServices = false
        }
        this.onResize()
      })
    },
    fetchSelectableDates() {
      axios.get(this.url + '/timetable/dateRange').then((response) => {
        const allDays = [0,1,2,3,4,5,6]
        if (response.status === 200) {
          this.startDate = new Date(response.data.startDate)
          this.endDate = new Date(response.data.endDate)
          this.unselectableDaysOfWeek = allDays.filter(dia => !(response.data.availableDays.includes(dia+"")));
          this.holidays = response.data.holidays.map(
            function(d){
              return d.date
          })
          console.log(this.holidays)
        }
      })
    },
    selectService(id) {
      // animation for carrousel 
      if (this.selectedService !== undefined) {
        const previousSlide = document.getElementById(
          'service-slide-' + this.selectedService.id
        )
        previousSlide.style.filter = 'grayscale(100%)'
        // para el gradiente= background: linear-gradient(to bottom,#ffffff 80%, #000000);
      }
      const slide = document.getElementById('service-slide-' + id)
      slide.style.filter = 'grayscale(0)'
      this.selectedService = this.services.find(service=>service.id===id)
      const el = document.getElementById('employee-carrousel');
      el.scrollIntoView({behavior: "smooth"});

      // filter employees


      this.clearSelectedEmployee()
      this.employees = this.allEmployees.filter((employee)=>{
        const services = employee.services.map((service)=>{return service.id})
        return services.includes(this.selectedService.id)
        })
    },
    selectEmployee(id) {
      this.clearSelectedEmployee()
      const slide = document.getElementById('employee-slide-' + id)
      slide.style.filter = 'grayscale(0%)'
      this.selectedEmployee = this.allEmployees.find(employee=>employee.id === id)
      const el = document.getElementById('calendar-component w-1/2');
      el.scrollIntoView({behavior: "smooth"});
    },
    clearSelectedEmployee(){
      if (this.selectedEmployee !== undefined) {
        const previousSlide = document.getElementById(
          'employee-slide-' + this.selectedEmployee.id
        )
        previousSlide.style.filter = 'grayscale(100%)'
        this.selectedEmployee = undefined
      }
    },

    getDayAppointments(date) {
      if(this.selectedEmployee !== undefined && this.selectedService !== undefined){
        this.isDisabledTimepicker = true
        this.isLoadingTimepicker = true
        this.selectedHour = undefined
        this.selectedMinutes = undefined
        const selectedDate =
        String(date.getFullYear()).padStart(2, '0') +
        '-' +
        String(date.getMonth() + 1).padStart(2, '0') +
        '-' +
        String(date.getDate()).padStart(2,'0')

        axios.post(this.url + '/timetable/freeschedules', 
      {
        date: selectedDate,
        serviceDuration: this.selectedService.duration,
        employeeId: this.selectedEmployee.id
      }).then((response) => 
      {
        if (response.status === 200) {
          this.freeSchedules = response.data
          const newHours = []
          this.freeSchedules.forEach((element) => {
          newHours.push((element.hour + '').padStart(2, '0'))
          })
          this.hours = [...new Set(newHours)]
          this.isLoadingTimepicker = false
          this.isDisabledTimepicker = false
        }
      })
      }
      
    },

    unselectableDates(day){
      const date =
        String(day.getFullYear()).padStart(2, '0') +
        '-' +
        String(day.getMonth() + 1).padStart(2, '0') +
        '-' +
        String(day.getDate()).padStart(2, '0')
      
      return this.holidays.includes(date)
    },
    hourSelected(value) {
      const auxTime = this.freeSchedules.filter((element) => (element.hour + '').padStart(2,'0') === value + '')
      this.minutes = auxTime.map(time=>{
        return String(time.minutes).padStart(2, '0')
      })
    },
    confirmAppointment() {},
    redirectHome() {
      const router = window.$nuxt.$router
      router.push('/')
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

</style>
