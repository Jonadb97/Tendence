<template>
  <div id="root-component" class="">
    <div
      id="main-content"
      class="flex flex-col justify-center items-center text-center"
    >
      <h1 class="text-white my-8 font-bold text-lg">Gestión de horarios:</h1>

      <!--- Tabla de horarios -->
      <!--- Desktop version -->
      <div id="horarios-desktop" media="(max-width: 800px)">
        <div id="tab-bar" class="bg-white w-screen" style="margin-bottom: 50%">
          <b-tabs id="nav-tab-bar" type="is-small" class="w-96" expanded>
            <b-tab-item
              label="Turnos de hoy"
              pack="mdi"
              size="is-small"
              icon="calendar-alert"
              @click="activeTab = 0"
            >
              

            </b-tab-item>

            <b-tab-item
              label="Próximos turnos"
              pack="mdi"
              size="is-small"
              icon="calendar-clock"
              @click="activeTab = 1"
            >
            </b-tab-item>
            <b-tab-item
              label="Turnos finalizados"
              pack="mdi"
              size="is-small"
              icon="calendar-multiple-check"
              @click="activeTab = 2"
            >
            </b-tab-item>
          </b-tabs>
        </div>


        <div class="inline-flex m-2 p-2">
          <b-dropdown aria-role="list">
            <template #trigger="{ active }">
              <b-button
                v-model="diaHorario"
                label="Día de la semana"
                type="is-primary"
                class="m-2 p-2"
                style="transform: translateY(2.5rem)"
                :icon-right="active ? 'menu-up' : 'menu-down'"
              />
            </template>

            <b-dropdown-item aria-role="listitem" value="Lunes">Lunes</b-dropdown-item>
            <b-dropdown-item aria-role="listitem" value="Martes">Martes</b-dropdown-item>
            <b-dropdown-item aria-role="listitem" value="Miércoles">Miércoles</b-dropdown-item>
            <b-dropdown-item aria-role="listitem" value="Jueves">Jueves</b-dropdown-item>
            <b-dropdown-item aria-role="listitem" value="Viernes">Viernes</b-dropdown-item>
            <b-dropdown-item aria-role="listitem" value="Sábado">Sábado</b-dropdown-item>
          </b-dropdown>
          <b-field label="Hora de inicio">
            <b-timepicker
              v-model="horaInicio"
              size="is-small"
              class="m-2 p-2"
              inline>
              </b-timepicker>
          </b-field>
          <b-field label="Hora de fin">
            <b-timepicker
              v-model="horaFin"
              size="is-small"
              class="m-2 p-2"
              inline>
            </b-timepicker>
          </b-field>
          <b-button
            label="Agregar horario"
            type="is-success"
            class="m-2 p-2"
            style="transform: translateY(2.3rem)"
            outlined
            icon-right="check-bold"
            pack="mdi"
            size="is-medium">
            </b-button>
        </div>
      </div>
      <!--- Mobile version -->

      <div
        id="horarios-mobile"
        media="(min-width: 600px)"
        class="w-96"
        style="border-radius: 5px">
        <b-tabs
          type="is-toggle"
          size="is-small"
          class="bg-white"
          style="border-radius: 5px"
          expanded>
          <b-tab-item type="is-dark" label="Lunes">
            <!-- Horarios acá  -->
          </b-tab-item>
          <b-tab-item type="is-dark" label="Martes">
            <!-- Horarios acá  -->
          </b-tab-item>
          <b-tab-item type="is-dark" label="Miércoles">
            <!-- Horarios acá  -->
          </b-tab-item>
          <b-tab-item type="is-dark" label="Jueves">
            <!-- Horarios acá  -->
          </b-tab-item>
          <b-tab-item type="is-dark" label="Viernes">
            <!-- Horarios acá  -->
          </b-tab-item>
          <b-tab-item type="is-dark" label="Sábado">
            <!-- Horarios acá  -->
          </b-tab-item>
        </b-tabs>
        <div class="flex flex-col justify-center items-center m-2 p-2">
          <b-dropdown aria-role="list">
            <template #trigger="{ active }">
              <b-button
                v-model="diaHorario"
                label="Día de la semana"
                type="is-primary"
                class="m-6 p-4 justify-evenly justify-center"
                style="transform: translateY(2.5rem)"
                :icon-right="active ? 'menu-up' : 'menu-down'"
              />
            </template>

            <b-dropdown-item aria-role="listitem" value="Lunes"
              >Lunes</b-dropdown-item
            >
            <b-dropdown-item aria-role="listitem" value="Martes"
              >Martes</b-dropdown-item
            >
            <b-dropdown-item aria-role="listitem" value="Miércoles"
              >Miércoles</b-dropdown-item
            >
            <b-dropdown-item aria-role="listitem" value="Jueves"
              >Jueves</b-dropdown-item
            >
            <b-dropdown-item aria-role="listitem" value="Viernes"
              >Viernes</b-dropdown-item
            >
            <b-dropdown-item aria-role="listitem" value="Sábado"
              >Sábado</b-dropdown-item
            >
          </b-dropdown>
          <br />
          <b-field label="Hora de inicio">
            <b-timepicker
              v-model="horaInicio"
              size="is-small"
              class=""
              inline
              mobile-native
            ></b-timepicker>
          </b-field>
          <b-field label="Hora de fin">
            <b-timepicker
              v-model="horaFin"
              size="is-small"
              class=""
              inline
              mobile-native
            ></b-timepicker>
          </b-field>
          <b-button
            label="Agregar horario"
            type="is-success"
            class="m-2 p-2"
            style="transform: translateY(2.3rem)"
            outlined
            icon-right="check-bold"
            pack="mdi"
            size="is-medium"
          ></b-button>
        </div>
      </div>
    </div>
    <div class="my-60"></div>
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
      url:this.$auth.$storage.getLocalStorage('url'),
      open: true,
      overlay: false,
      fullheight: true,
      fullwidth: false,
      horaInicio: '',
      horaFin: '',
      diaHorario: '',
      activeTab: 0,
      schedule:[],
      isLoading: true,
    }
  },
  mounted(){
    this.fetchTimetable()
  },
  methods:{
    fetchTimetable(){
      axios.post(this.url + '/appointment',{}).then((response) => 
      {
        if (response.status === 200){
          this.$buefy.toast.open({
            message: 'Turno confirmado!',
            type: 'is-dark',
          })
          const router = window.$nuxt.$router
          router.push('/TurnosPage')
        }
      })
    }
  }
}
</script>

<style>
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

#card-turno-actual {
  margin: 2rem;
}

#root-container {
  z-index: 3;
}

.card {
  min-width: 15rem;
  width: 15rem;
  border-radius: 2rem;
}

.card-header-title {
  text-align: center;
  justify-content: center;
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
