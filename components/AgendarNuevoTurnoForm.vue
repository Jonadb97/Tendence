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
                      icon="far fa-clock"
                      class="far fa-clock text-white text-center"
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
          :unselectable-days-of-week="[0]"
          :min-date="startDate"
          :max-date="endDate"
          @input="getDayAppointments"
        >
        </b-datepicker>
      </div>
    </no-ssr>
    <br />

    <h1 class="font-bold inline-flex flex-row my-2 text-xl">A que hora?</h1>
    <section>
      <b-dropdown
        v-model="selectedHour"
        :scrollable="isScrollable"
        :max-height="maxHeight"
        aria-role="list"
        @change="hourSelected"
      >
        <template #trigger>
          <b-button
            :label="selectedHour"
            type="is-light"
            icon-right="menu-down"
          />
        </template>

        <b-dropdown-item
          v-for="hour in hours"
          :key="hour"
          :value="hour"
          aria-role="listitem"
        >
          <div class="media">
            <div class="media-content">
              <h3>{{ hour }}</h3>
            </div>
          </div>
        </b-dropdown-item>
      </b-dropdown>

      <p class="font-bold inline-flex flex-row my-2 text-xl">:</p>

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
            icon-right="menu-down"
          />
        </template>

        <b-dropdown-item
          v-for="minute in minutes"
          :key="minute"
          :value="minute"
          aria-role="listitem"
        >
          <div class="media">
            <div class="media-content">
              <h3>{{ minute }}</h3>
            </div>
          </div>
        </b-dropdown-item>
      </b-dropdown>
    </section>
    <br />
    <b-button
    rounded
    style="border-width: 3px;"
    @click="scrollToTop"
    >
    <b-icon
    pack="mdi"
    type="is-white"
    icon="chevron-up"
    ></b-icon>
    </b-button>
    <div class="flex-row items-center justify-center self-center mx-auto py-4">
      <b-button
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

  <!--  
      Scrolling script


      const el = document.getElementById('item');
      el.scrollIntoView({behavior: "smooth"});

  -->
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
      freeSchedules: [],
      url: 'http://localhost:3000',
      carousel: 0,
      carousels: [],
      isScrollable: true,
      maxHeight: 200,
      selectedMinutes: '--',
      selectedHour: '--',
      hours: [],
      minutes: [],
      carouselServicesWidth: 20,
      carouselEmployeesWidth: 20,
      slidesToShowServices: 1,
      slidesToShowEmployees: 1,
      slideSetEmployee: 0,
      slideSetServices: 0,
      selectedEmployee: null,
      selectedService: null,
      selectedDate: new Date(),
      startDate: null,
      endDate: null,
    }
  },
  mounted() {
    window.addEventListener('resize', this.onResize)
    this.onResize()
    this.fetchEmployees()
    this.fetchServices()
    this.fetchDateRange()
  },
  methods: {
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

      console.log(this.services.length)
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
            date.getDate()
          console.log('employee: ' + this.selectedEmployee)
          console.log('service: ' + this.selectedService)
          console.log('date: ' + finalDate)
          console.log(
            'time: ' + this.selectedHour + ':' + this.selectedMinutes + ':00'
          )
          console.log('user: ' + this.$auth.$storage.getLocalStorage('id'))

          axios
            .post(
              this.url + '/appointment',
              {
                date: finalDate,
                time: this.selectedHour + ':' + this.selectedMinutes + ':00',
                employeeId: this.selectedEmployee,
                serviceId: this.selectedService,
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
        }
        this.onResize()
      })
    },
    fetchServices() {
      axios.get(this.url + '/services').then((response) => {
        if (response.status === 200) {
          this.services = response.data
          console.log(response.data)
        }
        this.onResize()
      })
    },
    fetchDateRange() {
      axios.get(this.url + '/timetable/dateRange').then((response) => {
        if (response.status === 200) {
          this.startDate = new Date(response.data.startDate)
          this.endDate = new Date(response.data.endDate)
        }
      })
    },
    selectService(id) {
      if (this.selectedService != null) {
        const previousSlide = document.getElementById(
          'service-slide-' + this.selectedService
        )
        previousSlide.style.filter = 'grayscale(100%)'
        // para el gradiente= background: linear-gradient(to bottom,#ffffff 80%, #000000);
      }
      const slide = document.getElementById('service-slide-' + id)
      slide.style.filter = 'grayscale(0)'
      this.selectedService = id
      const el = document.getElementById('employee-carrousel');
      el.scrollIntoView({behavior: "smooth"});

    },
    selectEmployee(id) {
      if (this.selectedEmployee != null) {
        const previousSlide = document.getElementById(
          'employee-slide-' + this.selectedEmployee
        )
        previousSlide.style.filter = 'grayscale(100%)'
      }
      const slide = document.getElementById('employee-slide-' + id)
      slide.style.filter = 'grayscale(0%)'
      this.selectedEmployee = id
      const el = document.getElementById('calendar-component w-1/2');
      el.scrollIntoView({behavior: "smooth"});
    },

    getDayAppointments(date) {
      date =
        String(date.getFullYear()).padStart(2, '0') +
        '-' +
        String(date.getMonth() + 1).padStart(2, '0') +
        '-' +
        date.getDate()
      axios
        .post(this.url + '/timetable/freeschedules', {
          date: date + '',
          serviceDuration: 15,
        })
        .then((response) => {
          if (response.status === 200) {
            this.freeSchedules = response.data
            const newHours = []
            this.freeSchedules.forEach((element) => {
              newHours.push((element.hour + '').padStart(2, '0'))
            })

            this.hours = [...new Set(newHours)]
          }
        })
    },
    hourSelected(value) {
      const newMinutes = []
      this.freeSchedules.forEach((element) => {
        // jshint eqeqeq: false
        if (element.hour + '' === value + '') {
          newMinutes.push((element.minutes + '').padStart(2, '0'))
        }
      })
      this.minutes = newMinutes
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
