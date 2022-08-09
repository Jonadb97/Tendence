<template>
  <div id="root-component" class="">
    <div id="main-content" class="justify-center text-center m-6 p-6">
      <no-ssr>
        <div id="calendar-component w-1/2" style="font-family: Mortend bold">
          <b-datepicker
            v-model="selectedDate"
            size="is-medium"
            :unselectable-days-of-week="unselectableDaysOfWeek"
            :unselectable-dates="unselectableDates"
            :min-date="startDate"
            :max-date="endDate"
            :editable="false"
          >
          </b-datepicker>
        </div>
      </no-ssr>

      <div class="calendar" style="font-family: Mortend bold">
        <div class="timeline">
          <div class="spacer"></div>
          <div v-for="hour in hours" :key="hour" class="time-marker">
            {{ hour }}
          </div>
        </div>
        <div class="days">
          <div v-for="employee in employees" :key="employee.id" class="day">
            <div class="date">
              <p class="date-day" style="font-weight: 700">
                {{ employee.name }}
              </p>
            </div>
            <div class="events">
              <div
                v-for="appointment in appointments"
                :key="appointment.id"
                class="event securities start-2 end-5"
              >
                <p class="title">
                  {{
                    Math.floor(appointment[1] / 6) +
                    ':' +
                    (appointment[1] % 6) * 6 +
                    ' - ' +
                    appointment[2]
                  }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <b-button
        label="Agregar Turno invitado"
        outlined
        pack="mdi"
        type="is-success"
        size="is-large"
        icon-left="calendar"
        icon-right="plus"
        style="border-width: 3px; border-radius: 24px; font-family: Mazzard"
        @click="isModalActive = true"
      />

      <b-modal
        v-model="isModalActive"
        has-modal-card
        trap-focus
        :destroy-on-hide="false"
        aria-role="dialog"
        aria-label="Example Modal"
        close-button-aria-label="Close"
        style="font-family: Mazzard"
        aria-modal
      >
        <template>
          <div class="modal-card" style="width: auto">
            <header class="modal-card-head">
              <p class="modal-card-title">Nuevo turno invitado</p>
            </header>
            <section class="modal-card-body">
              <b-field>
                <b-field label="Nombre del invitado">
                  <b-input v-model="selectedName"></b-input>
                </b-field>
              </b-field>
              <b-field label="Servicio">
                <b-select
                  v-model="selectedService"
                  placeholder="Elija un servicio"
                  size="is-medium"
                >
                  <option
                    v-for="service in services"
                    :key="service.id"
                    :value="service.id"
                    @input="getDayAppointments"
                  >
                    {{ service.servicename }}
                  </option>
                </b-select>
              </b-field>
              <b-field label="Servicio">
                <b-select
                  v-model="selectedEmployee"
                  placeholder="Elija un barbero"
                  size="is-medium"
                >
                  <option
                    v-for="employee in employees"
                    :key="employee.id"
                    :value="employee.id"
                    @input="getDayAppointments"
                  >
                    {{ employee.name }}
                  </option>
                </b-select>
              </b-field>
              <b-field label="Horario">
                <b-select
                  v-model="selectedHour"
                  placeholder="HH"
                  size="is-medium"
                  :disabled="isDisabledTimepicker"
                  :loading="isLoadingTimepicker"
                  @input="hourSelected"
                >
                  <option
                    v-for="hour in selectableHours"
                    :key="hour"
                    :value="hour"
                  >
                    {{ hour }}
                  </option>
                </b-select>

                <p class="font-bold inline-flex flex-row px-2.5 my-2 text-xl">
                  :
                </p>

                <b-select
                  v-model="selectedMinutes"
                  placeholder="MM"
                  size="is-medium"
                  :disabled="isDisabledTimepicker"
                  :loading="isLoadingTimepicker"
                >
                  <option
                    v-for="minute in selectableMinutes"
                    :key="minute"
                    :value="minute"
                  >
                    {{ minute }}
                  </option>
                </b-select>
              </b-field>
            </section>
            <footer class="modal-card-foot">
              <b-button label="Cancelar" @click="isModalActive = false" />
              <b-button label="Guardar" type="is-primary" />
            </footer>
          </div>
        </template>
      </b-modal>
    </div>
    <FooterComp
      class="w-screen bottom-0"
      style="width: 100%; position: absolute; bottom: 0"
    ></FooterComp>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'DashCalendar',
  layout: 'default-lay',

  // Hay que fetchear la fecha y hora para ponerlos reactivos en el card de turnos pendientes y los anteriores

  data() {
    return {
      isLoading: false,
      isModalActive: false,
      url: this.$auth.$storage.getLocalStorage('url'),
      isLoadingTimetable: true,
      timetable: [],
      hours: [],
      selectedDate: new Date(),
      holidays: [],
      unselectableDaysOfWeek: [],
      startDate: undefined,
      endDate: undefined,
      appointments: [],
      employees: [],
      services: [],
      isDisabledTimepicker: true,
      isLoadingTimepicker: false,
      freeSchedules: [],
      selectableHours: [],
      selectableMinutes: [],
      selectedName: undefined,
      selectedHour: undefined,
      selectedMinutes: undefined,
      selectedEmployee: undefined,
      selectedService: undefined,
    }
  },
  computed: {
    getAppointments() {
      return this.appointments
    },
  },
  created() {
    this.$nextTick(function () {
      this.loading = false
    })
  },
  mounted() {
    this.fetchTimetable()
    this.fetchEmployees()

    this.fetchEmployees()
    this.fetchServices()
    this.fetchSelectableDates()
  },
  methods: {
    fetchTimetable() {
      axios.get(this.url + '/timetable', {}).then((response) => {
        if (response.status === 200) {
          this.isLoadingTimetable = false
          this.timetable = response.data
          const day = new Date().getDay() + ''
          const timetable = this.timetable.filter((time) => time.day === day)
          this.timetable = timetable
          timetable.forEach((time) => {
            const hour = parseInt(time.startofshift.split(':')[0])
            const endHour = parseInt(time.endofshift.split(':')[0])
            for (let i = hour; i < endHour; i++) {
              this.hours.push(i)
            }
          })
          document.documentElement.style.setProperty(
            '--numHours',
            this.hours.length
          )
          this.fetchAppointments()
        }
      })
    },
    fetchEmployees() {
      axios.get(this.url + '/employee').then((response) => {
        if (response.status === 200) {
          this.employees = response.data
        }
      })
    },
    fetchServices() {
      axios.get(this.url + '/services').then((response) => {
        if (response.status === 200) {
          this.services = response.data
        }
      })
    },
    fetchAppointments() {
      const date =
        String(this.selectedDate.getFullYear()).padStart(2, '0') +
        '-' +
        String(this.selectedDate.getMonth() + 1).padStart(2, '0') +
        '-' +
        String(this.selectedDate.getDate()).padStart(2, '0')
      axios
        .get(this.url + '/appointment/dayappointments/' + date)
        .then(this.orderAppointments)
    },
    orderAppointments(response) {
      let timetable = this.timetable
      timetable = timetable.reverse()
      if (response.status === 200) {
        const appointments = response.data
        this.appointments = appointments.map(function (appointment) {
          const auxAppointment = []
          const closestShift = timetable.find(function (time) {
            const appointmentHour = parseInt(appointment.time.split(':')[0])
            const timeHour = parseInt(time.startofshift.split(':')[0])

            return appointmentHour >= timeHour
          })

          const closestHour = String(closestShift.startofshift).split(':')[0]
          const startHour = (parseInt(appointment.time.split(':')[0]) - 7) * 6
          const durationHours = Math.floor(
            parseInt(appointment.service.duration) / 60
          )
          const durationMinutes =
            (parseInt(appointment.service.duration) % 60) / 10

          auxAppointment.push(appointment.id)
          auxAppointment.push(startHour)
          auxAppointment.push(startHour + durationHours * 6 + durationMinutes)
          console.log(closestShift + closestHour)
          return auxAppointment
        })
      }
    },
    getDayAppointments(value) {
      console.log('------')
      console.log(this.selectedDate)
      console.log(this.selectedEmployee)
      console.log(this.selectedService)
      console.log(this.selectedName)
      console.log('------')
      if (
        this.selectedEmployee !== undefined &&
        this.selectedService !== undefined &&
        this.selectedName !== undefined
      ) {
        this.isDisabledTimepicker = true
        this.isLoadingTimepicker = true
        const selectedDate =
          String(this.selectedDate.getFullYear()).padStart(2, '0') +
          '-' +
          String(this.selectedDate.getMonth() + 1).padStart(2, '0') +
          '-' +
          String(this.selectedDate.getDate()).padStart(2, '0')

        console.log('------')
        console.log(selectedDate)
        console.log(this.selectedEmployee)
        console.log(this.selectedService)
        console.log(this.selectedName)
        console.log('------')
      }
    },
    hourSelected(value) {
      const auxTime = this.freeSchedules.filter(
        (element) => (element.hour + '').padStart(2, '0') === value + ''
      )
      this.selectableMinutes = auxTime.map((time) => {
        return String(time.minutes).padStart(2, '0')
      })
    },
    fetchSelectableDates() {
      axios.get(this.url + '/timetable/dateRange').then((response) => {
        const allDays = [0, 1, 2, 3, 4, 5, 6]
        if (response.status === 200) {
          this.startDate = new Date(response.data.startDate)
          this.endDate = new Date(response.data.endDate)
          this.unselectableDaysOfWeek = allDays.filter(
            (dia) => !response.data.availableDays.includes(dia + '')
          )
          this.holidays = response.data.holidays.map(function (d) {
            return d.date
          })
        }
      })
    },
    unselectableDates(day) {
      const date =
        String(day.getFullYear()).padStart(2, '0') +
        '-' +
        String(day.getMonth() + 1).padStart(2, '0') +
        '-' +
        String(day.getDate()).padStart(2, '0')

      return this.holidays.includes(date)
    },
  },
}
</script>

<style>
:root {
  --numDays: 5;
  --numHours: 10;
  --timeHeight: 10px;
  --calBgColor: #fff1f8;
  --eventBorderColor: #f2d3d8;
  --eventColor1: #ffd6d1;
  --eventColor2: #fafaa3;
  --eventColor3: #e2f8ff;
  --eventColor4: #d1ffe6;
}

#root-component {
  height: 100vh;
}

.calendar {
  display: grid;
  gap: 10px;
  grid-template-columns: auto 1fr;
  margin: 2rem;
}

.timeline {
  display: grid;
  grid-template-rows: repeat(var(--numHours), calc(var(--timeHeight) * 6));
}

.days {
  display: grid;
  grid-column: 2;
  gap: 5px;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
}

.events {
  display: grid;
  grid-template-rows: repeat(calc(var(--numHours) * 6), var(--timeHeight));
  border-radius: 5px;
  background: var(--calBgColor);
}

.start-10 {
  grid-row-start: 2;
}

.start-12 {
  grid-row-start: 4;
}

.start-1 {
  grid-row-start: 5;
}

.start-2 {
  grid-row-start: 6;
}

.end-12 {
  grid-row-end: 4;
}

.end-1 {
  grid-row-end: 5;
}

.end-3 {
  grid-row-end: 7;
}

.end-4 {
  grid-row-end: 8;
}

.end-5 {
  grid-row-end: 9;
}

.title {
  font-weight: 200;
  font-size: 1rem;
}

.event {
  border: 1px solid var(--eventBorderColor);
  border-radius: 5px;
  padding: 0.5rem;
  margin: 0 0.5rem;
  background: white;
}

.space,
.date {
  height: 60px;
}

body {
  font-family: system-ui, sans-serif;
}

.corp-fi {
  background: var(--eventColor1);
}

.ent-law {
  background: var(--eventColor2);
}

.writing {
  background: var(--eventColor3);
}

.securities {
  background: var(--eventColor4);
}

.date {
  display: flex;
  gap: 1em;
}

.date-num {
  font-size: 1rem;
  font-weight: 600;
  display: inline;
}

.date-day {
  display: inline;
  color: white;
  font-size: 1rem;
  font-weight: 100;
}

.time-marker {
  font-size: 1rem;
  font-weight: 100;
  color: white;
}
</style>
