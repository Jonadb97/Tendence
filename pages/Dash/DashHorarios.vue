<template>
  <div id="root-component" class="">
    <div
      id="main-content"
      class="flex flex-col justify-center items-center text-center"
    >
      <h1 class="text-white my-8 font-bold text-lg">GESTION DE HORARIOS:</h1>

      <!--- Tabla de horarios -->
      <!--- Desktop version -->
      <div id="horarios-desktop" media="(max-width: 800px)">
        <div id="tab-bar" class="bg-white w-screen" style="margin-bottom: 40%">
          <b-tabs id="nav-tab-bar" type="is-small" class="w-96" expanded>
            <b-tab-item
              label="Horarios"
              pack="mdi"
              size="is-large"
              icon="calendar-alert"
              @click="activeTab = 0"
            >
              <b-table
                hoverable
                :data="timetable"
                :loading="isLoadingTimetable"
                :sticky-header="stickyHeaders"
              >
                <b-table-column v-slot="props" field="day" label="Día" centered >
                  <span 
                  name="dayTag"
                  class="tag" style="font-family: Mortend bold">
                    {{ props.row.day }}
                  </span>
                </b-table-column>

                <b-table-column
                  v-slot="props"
                  field="startofshift"
                  label="Inicio"
                  centered
                >
                  {{ props.row.startofshift }}
                </b-table-column>

                <b-table-column
                  v-slot="props"
                  field="endofshift"
                  label="Fin"
                  centered
                >
                  {{ props.row.endofshift }}
                </b-table-column>

                <b-table-column v-slot="props" width="40" centered>
                  <b-button
                    type="is-danger"
                    icon-right="delete"
                    @click="deleteTimetable(props.row.id)"
                  />
                </b-table-column>
              </b-table>
              <br />
              <b-button
                label="Agregar nuevo horario"
                type="is-success"
                outlined
                style='border-width: 3px; border-radius: 24px'
                pack="mdi"
                icon-left="clock"
                icon-right="plus"
                size="is-large"
                @click="isModalTimetableActive = true"
              />

              <b-modal
                v-model="isModalTimetableActive"
                has-modal-card
                trap-focus
                :destroy-on-hide="false"
                aria-role="dialog"
                aria-label="Example Modal"
                close-button-aria-label="Close"
                aria-modal
              >
                <template>
                  <div class="modal-card" style="width: auto">
                    <header class="modal-card-head">
                      <p class="modal-card-title">Agregar Nuevo Horario</p>
                    </header>
                    <section class="modal-card-body">
                      <b-field label="Hasta">
                        <b-dropdown aria-role="list">
                          <template #trigger="{ active }">
                            <b-button
                              type="is-primary"
                              :icon-right="active ? 'menu-up' : 'menu-down'"
                            >
                              {{ selectedDay }}
                            </b-button>
                          </template>
                          <b-dropdown-item
                            v-for="day in days"
                            :key="day"
                            aria-role="listitem"
                            @click="selectedDay = day"
                          >
                            {{ day }}
                          </b-dropdown-item>
                        </b-dropdown>
                      </b-field>
                      <b-field label="Desde">
                        <b-timepicker v-model="startTime" inline></b-timepicker>
                      </b-field>

                      <b-field label="Hasta">
                        <b-timepicker v-model="endTime" inline></b-timepicker>
                      </b-field>
                    </section>
                    <footer class="modal-card-foot">
                      <b-button
                        label="Cancelar"
                        @click="isModalTimetableActive = false"
                      />
                      <b-button
                        label="Guardar"
                        type="is-primary"
                        @click="createTimetable"
                      />
                    </footer>
                  </div>
                </template>
              </b-modal>
            </b-tab-item>

            <b-tab-item
              label="Dias no laborables"
              pack="mdi"
              size="is-large"
              icon="calendar-clock"
              @click="activeTab = 1"
            >
              <b-table hoverable :data="holidays" :loading="isLoadingHolidays">
                <b-table-column
                  v-slot="props"
                  field="date"
                  label="Fecha"
                  centered
                >
                  <span class="tag">
                    {{ props.row.date }}
                  </span>
                </b-table-column>

                <b-table-column
                  v-slot="props"
                  field="ocassion"
                  label="Motivo"
                  centered
                >
                  {{ props.row.ocassion }}
                </b-table-column>

                <b-table-column v-slot="props" width="40" centered>
                  <b-button
                    type="is-danger"
                    icon-right="delete"
                    @click="deleteHoliday(props.row.date)"
                  />
                </b-table-column>
              </b-table>

              <br />
              <b-button
                label="Agregar nuevo horario"
                class="my-6"
                type="is-success"
                outlined
                style='border-width: 3px; border-radius: 24px;;'
                pack="mdi"
                icon-left="clock"
                icon-right="plus"
                size="is-large"
                @click="isModalHolidaysActive = true"
              />

              <b-modal
                v-model="isModalHolidaysActive"
                has-modal-card
                trap-focus
                :destroy-on-hide="false"
                aria-role="dialog"
                aria-label="Example Modal"
                close-button-aria-label="Close"
                aria-modal
              >
                <template>
                  <div class="modal-card" style="width: auto">
                    <header class="modal-card-head">
                      <p class="modal-card-title">Agregar Nuevo Horario</p>
                    </header>
                    <section class="modal-card-body">
                      <b-field label="Hasta">
                        <b-field label="Select a date">
                          <b-datepicker
                            v-model="selectedDate"
                            inline
                            placeholder="Click to select..."
                            icon="calendar-today"
                            :icon-right="selectedDate ? 'close-circle' : ''"
                            icon-right-clickable
                            trap-focus
                          >
                          </b-datepicker>
                        </b-field>
                      </b-field>
                      <b-field label="Motivo">
                        <b-input v-model="ocassion" type="textarea"></b-input>
                      </b-field>
                      <b-field>
                        <b-checkbox>Repetir anualmente</b-checkbox>
                      </b-field>
                    </section>
                    <footer class="modal-card-foot">
                      <b-button
                        label="Cancelar"
                        @click="isModalHolidaysActive = false"
                      />
                      <b-button
                        label="Guardar"
                        type="is-primary"
                        @click="createHoliday()"
                      />
                    </footer>
                  </div>
                </template>
              </b-modal>
            </b-tab-item>
            <b-tab-item
              label="Licencias"
              pack="mdi"
              size="is-large"
              icon="calendar-multiple-check"
              @click="activeTab = 2"
            >
            </b-tab-item>
          </b-tabs>
        </div>
      </div>
      <FooterComp class="w-screen"></FooterComp>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'DashHorarios',
  layout: 'default-lay',

  // Hay que fetchear la fecha y hora para ponerlos reactivos en el card de turnos pendientes y los anteriores
  data() {
    return {
      url: this.$auth.$storage.getLocalStorage('url'),
      urlFrontDash: this.$auth.$storage.getLocalStorage('urlFront') + '/Dash/DashHorarios',
      open: true,
      overlay: false,
      fullheight: true,
      fullwidth: false,
      horaInicio: '',
      horaFin: '',
      diaHorario: '',
      activeTab: 0,
      schedule: [],
      isLoadingTimetable: true,
      timetable: [],
      stickyHeaders: true,
      columnsTimetable: [
        {
          field: 'day',
          label: 'Día',
          centered: true,
        },
        {
          field: 'startofshift',
          label: 'Desde',
          centered: true,
        },
        {
          field: 'endofshift',
          label: 'Hasta',
          centered: true,
        },
      ],
      isModalTimetableActive: false,
      selectedDay: 'Seleccione un día',
      startTime: new Date(),
      endTime: new Date(),
      days: [
        'Domingo',
        'Lunes',
        'Martes',
        'Miercoles',
        'Jueves',
        'Viernes',
        'Sabado',
      ],
      holidays: [],
      isModalHolidaysActive: false,
      selectedDate: new Date(),
      ocassion: '',
      isLoadingHolidays: true,
    }
  },
  mounted() {
    this.fetchTimetable()
    this.fetchHolidays()
    this.getTags()
  },
  methods: {
     pushDash() {
      const router = window.$nuxt.$router
      router.push('/Dash/DashHorarios')
      this.$nuxt.refresh()
      this.$forceUpdate()
      window.location.assign(this.urlFrontDash)
    },
    fetchTimetable() {
      axios.get(this.url + '/timetable', {}).then((response) => {
        if (response.status === 200) {
          this.isLoadingTimetable = false
          this.timetable = response.data

          this.timetable.sort(function (a, b) {
            return a.day - b.day
          })
          this.timetable = this.timetable.map(function (a) {
            const days = [
              'Domingo',
              'Lunes',
              'Martes',
              'Miercoles',
              'Jueves',
              'Viernes',
              'Sabado',
            ]
            const day = {
              id: a.id,
              day: days[parseInt(a.day)],
              startofshift: a.startofshift,
              endofshift: a.endofshift,
              color: '#' + parseInt(a.day),
            }

            return day
          })
        }
      })
    },
    getTags() {
      const tagElements = document.getElementsByName('dayTag')
      console.log(tagElements)
    },
    fetchHolidays() {
      axios.get(this.url + '/holiday', {}).then((response) => {
        if (response.status === 200) {
          this.isLoadingHolidays = false
          this.holidays = response.data
        }
      })
    },
    createTimetable() {
      const dayIndex = this.days.indexOf(this.selectedDay)
      const start =
        String(this.startTime.getHours()).padStart(2, '0') +
        ':' +
        String(this.startTime.getMinutes()).padStart(2, '0') +
        ':00'
      const end =
        String(this.endTime.getHours()).padStart(2, '0') +
        ':' +
        String(this.endTime.getMinutes()).padStart(2, '0') +
        ':00'

      axios
        .post(this.url + '/timetable', {
          day: dayIndex,
          startofshift: start,
          endofshift: end,
        })
        .then((response) => {
          if (response.status === 200) {
            this.isLoadingTimetable = true
            this.isModalTimetableActive = false
            this.fetchTimetable()
            this.pushDash()
          }
        })
    },
    createHoliday() {
      const date = this.selectedDate
      const finalDate =
        String(date.getFullYear()).padStart(2, '0') +
        '-' +
        String(date.getMonth() + 1).padStart(2, '0') +
        '-' +
        String(date.getDate()).padStart(2, '0')

      this.$buefy.dialog.confirm({
      message: '¿Desea definir este horario?',
      type: 'is-dark',
      onConfirm: () => 
      axios
        .post(this.url + '/holiday', {
          date: finalDate,
          ocassion: this.ocassion + '',
        })
        
        .then((response) => {
          if (response.status === 200) {
            this.isLoadingHolidays = true
            this.isModalHolidaysActive = false
            this.fetchHolidays()
            this.pushDash()
            
          }
        }),
        })
    },
    deleteHoliday(value) {
      this.$buefy.dialog.confirm({
        message: '¿Está seguro?',
        type: 'is-dark',
        onConfirm: () => {
          axios
            .delete(this.url + '/holiday', {
              data: {
                date: value,
              },
              
            })
            .then((response) => {
              if (response.status === 200) {
                this.$toast.show('Eliminado correctamente', { duration: 3000 })
                this.isLoadingHolidays = true
                this.fetchHolidays()
                this.pushDash()
              } else {
                this.$toast.show('Error al eliminar', { duration: 3000 })
              }
            })
        },
      })
    },
    deleteTimetable(id) {
      this.$buefy.dialog.confirm({
        message: 'Esta seguro?',
        type: 'is-dark',
        onConfirm: () => {
          axios
            .delete(this.url + '/timetable', {
              data: {
                id,
              },
            })
            .then((response) => {
              if (response.status === 200) {
                this.$buefy.toast.open({
                  message: 'Eliminado correctamente',
                  type: 'is-dark',
                })
                this.isLoadingTimetable = true
                this.fetchTimetable()
                this.pushDash()
              } else {
                this.$buefy.toast.open({
                  message: 'Error al eliminar',
                  type: 'is-dark',
                })
              }
            })
        },
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

#root-container {
  z-index: 3;
}

.card {
  min-width: 15rem;
  width: 15rem;
  border-radius: 2rem;
}

@media (max-width: 800px) {
  #horarios-desktop {
    display: none;
  }
}

@media (min-width: 600px) {
  #horarios-mobile {
    display: none;
  }
}
</style>
