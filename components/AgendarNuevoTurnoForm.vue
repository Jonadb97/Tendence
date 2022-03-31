<template>
  <div id="main-form-container" class="flex flex-col justify-center items-center text-center">
    <!-- Servicios -->

    <div id="service-main-container" class="flex-col flex">
      <h1 class="font-bold">Qué te gustaría hacerte?</h1>
      <ul id="service-list-container" class="flex flex-row text-black">
        <li id="service-item">
        <button class="hover:animate-jump text-black">
          <div class="p-4 m-4">
            <img
              class="w-32 rounded-full"
              src="../static/img/cortePelo.png"
              alt="Pelo"
            />
            <br />
            <p
              class="flex flex-row justify-center items-center text-center text-xs"
            >
              Corte de pelo
            </p>
          </div>
        </button>
        </li>

        <li id="service-item">
        <button class="animate-none hover:animate-pulse text-black">
          <div class="p-4 m-4">
            <img
              class="w-32 rounded-full"
              src="../static/img/cortePeloyBarba.png"
              alt="Pelo y Barba"
            />
            <br />
            <p
              class="flex flex-row justify-center items-center text-center text-xs"
            >
              Corte de Pelo y Barba
            </p>
          </div>
        </button>
        </li>

        <li id="service-item">
        <button class="animate-none hover:animate-pulse text-black">
          <div class="p-4 m-4">
            <img
              class="w-32 rounded-full"
              src="../static/img/cortePeloyBarbaConBrillito.png"
              alt="Pelo y Barba"
            />
            <br />
            <p
              class="flex flex-row justify-center items-center text-center text-xs"
            >
              Shot de Keratina
            </p>
          </div>
        </button>
        </li>

      </ul>
    </div>
    <br />

    <!--  Barberos  -->

    <h1 class="font-bold inline-flex flex-row flex my-2">Con quién?</h1>
    <div class="flex-row inline-flex flex">
      <button class="flex flex-row">
        <div class="p-2 m-2">
          <img
            class="w-64 rounded-lg"
            src="../static/img/barberos/bombin.png"
            alt="Pelo y Barba"
          />
          <br />
          <p
            class="flex flex-row justify-center items-center text-center text-xl text-white font-bold transform -translate-y-16"
          >
            EL DEL BOMBÍN
          </p>
        </div>
      </button>

      <button class="flex flex-row">
        <div class="p-2 m-2">
          <img
            class="w-64 rounded-lg"
            src="../static/img/barberos/elnegro.png"
            alt="Pelo y Barba"
          />
          <br />
          <p
            class="flex flex-row justify-center items-center text-center text-xl text-white font-bold transform -translate-y-16"
          >
            EL NEGRO
          </p>
        </div>
      </button>

      <button class="flex flex-row">
        <div class="p-2 m-2">
          <img
            class="w-64 rounded-lg"
            src="../static/img/barberos/juan.png"
            alt="Pelo y Barba"
          />
          <br />
          <p
            class="flex flex-row justify-center items-center text-center text-xl text-white font-bold transform -translate-y-16"
          >
            JUANCITO
          </p>
        </div>
      </button>

      <button class="flex flex-row">
        <div class="p-2 m-2">
          <img
            class="w-64 rounded-lg"
            src="../static/img/barberos/manuel.png"
            alt="Pelo y Barba"
          />
          <br />
          <p
            class="flex flex-row justify-center items-center text-center text-xl text-white font-bold transform -translate-y-16"
          >
            MANU
          </p>
        </div>
      </button>

      <button class="flex flex-row">
        <div class="p-2 m-2">
          <img
            class="w-64 rounded-lg"
            src="../static/img/barberos/martincito.png"
            alt="Pelo y Barba"
          />
          <br />
          <p
            class="flex flex-row justify-center items-center text-center text-xl text-white font-bold transform -translate-y-16"
          >
            MARTINCITO
          </p>
        </div>
      </button>

      <button class="flex flex-row">
        <div class="p-2 m-2">
          <img
            class="w-64 rounded-lg"
            src="../static/img/barberos/pancho.png"
            alt="Pelo y Barba"
          />
          <br />
          <p
            class="flex flex-row justify-center items-center text-center text-xl text-white font-bold transform -translate-y-16"
          >
            PANCHO
          </p>
        </div>
      </button>
    </div>

    <!-- Componentes calendar -->

    <div class="flex-col flex">
      <h1 class="font-bold flex-row flex">Cuándo?</h1>
    </div>

    <div class="field">
      <div class="CalendarCheckBox">
        <div v-if="HoySeen || !OtroDiaSeen" id="HoyDiv" class="inline-flex">
          <label class="checkbox">
            <input id="Hoy" v-model="HoySeen" type="checkbox" />
            Hoy
            <HoraComponent />
          </label>
        </div>

        <div v-if="OtroDiaSeen || !HoySeen" id="OtroDiaDiv" class="inline-flex">
          <label class="checkbox">
            <input id="OtroDia" v-model="OtroDiaSeen" type="checkbox" />
            Otro día
            <CalendarComponent />
          </label>
        </div>
      </div>
    </div>

    <!-- Botón agendar turno -->

    <div class="flex-row items-center justify-center self-center mx-auto py-4">
              <b-button
              class="flex mx-auto py-2"
              type="is-dark"
              outlined icon-right="check"
              label="Agendar turno"
              @click="confirm"
              />
    </div>

    <!-- Separador para que haya espacio y se vea lindo -->
    <div id="footer-space" class="h-48"></div>


  </div>
</template>

<script>
import CalendarComponent from './FormComponents/CalendarComponent.vue'
import HoraComponent from './FormComponents/HoraComponent.vue'

export default {
  components: { CalendarComponent, HoraComponent },

  // Habría que fetchear la data y ponerla en esos arrays para mandarla a los componentes
  
  data: () => ({
    TurnoForm: {
      FechaTurno: '',
      Empleados: [],
      Servicios: [],
    },
    HoySeen: false,
    OtroDiaSeen: false,
  }),
    async fetch() {
    this.Empleados = await this.$http.$get('https://api.nuxtjs.dev/posts')
  },
  methods: {
      confirm() {
        this.$buefy.dialog.confirm({
          message: 'Deseas confirmar el turno?',
          onConfirm: () => this.$buefy.toast.open('Turno confirmado!')
        })
      }
  },

}
</script>

<style>



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