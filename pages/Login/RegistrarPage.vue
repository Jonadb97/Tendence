<template>
  <div id="MainContainer">
    <div id="Layout" class="flex flex-col">
      <!-- Logo -->
      <TendenceLogo id="TendenceLogo" class="flex mx-auto my-2" />
      <!-- Gottta add v-model to all the inputs -->
      <div class="flex-row mx-auto">
        <b-field label="Nombre y apellido">
          <b-input
            id="name"
            v-model="logindata.userName"
            type="text"
            maxlength="20"
            rounded
            expanded
          ></b-input>
        </b-field>

        <b-field label="Fecha de nacimiento">
          <no-ssr>
            <b-datepicker
              v-model="logindata.selectedDate"
              :min-date="minDate"
              :max-date="maxDate"
              rounded
              placeholder="Click to select..."
              icon="calendar-today"
              trap-focus
              focusable
              @click='pickerClick'
            >
            </b-datepicker>
          </no-ssr>
        </b-field>

        <b-field label="Número de teléfono">
          <b-input
            id="localcod"
            v-model="logindata.codArea"
            type="phone"
            maxlength="4"
            rounded
            expanded
          ></b-input>
          <p class="my-auto mx-2">15</p>
          <b-input
            id="numerotel"
            v-model="logindata.numTel"
            type="phone"
            value=""
            maxlength="7"
            rounded
            expanded
          ></b-input>
        </b-field>
        <b-field label="Email">
          <b-input
            v-model="logindata.userEmail"
            type="email"
            maxlength="30"
            rounded
          >
          </b-input>
        </b-field>

        <b-field label="Contraseña">
          <b-input
            v-model="logindata.inputPassword"
            type="password"
            password-reveal
            min-length="8"
            rounded
          >
          </b-input>
        </b-field>
        <b-field label="Confirmar Contraseña">
          <b-input type="password" password-reveal min-length="8" rounded>
          </b-input>
        </b-field>

        <div
          class="flex-row text-center justify-center items-center mx-auto py-4"
        >
          <b-button
            label="Registrarse"
            type="is-success"
            icon-right="check"
            outlined
            @click="register()"
          >
          </b-button>
        </div>
      </div>
    </div>
  </div>
</template>

// 291 4448626 - 7 carácteres

<script>
import axios from 'axios'
import TendenceLogo from '~/components/TendenceLogo.vue'
export default {
  name: 'RegisterPage',
  components: { TendenceLogo },
  layout: 'default-lay',
  data() {
    const today = new Date()
    return {
      url: this.$auth.$storage.getLocalStorage('url'),
      logindata: {
        userName: '',
        userEmail: '',
        codArea: '',
        numTel: '',
        inputPassword: '',
        selectedDate: undefined,
      },
      maxDate: today,
      minDate: new Date(
        today.getFullYear() - 100,
        today.getMonth(),
        today.getDate()
      )
    }
  },
  methods: {
    pickerClick() {
      this.console.log('Hola :)')
    },
    checkIfEnter() {
      if (event.keyCode === 13) {
        this.register()
      }
    },
    register() {
      const body = {
        username: this.$data.logindata.userName,
        email: this.$data.logindata.userEmail,
        password: this.$data.logindata.inputPassword,
        birthday:
          String(this.logindata.selectedDate.getFullYear()).padStart(2, '0') +
          '-' +
          String(this.logindata.selectedDate.getMonth() + 1).padStart(2, '0') +
          '-' +
          String(this.logindata.selectedDate.getDate()).padStart(2, '0'),       
        phonenumber: this.$data.logindata.numTel,
        areacode: this.$data.logindata.codArea,
      }
      console.log(body)
      const router = window.$nuxt.$router

      axios
        .post(this.url + '/users', body)
        .then(function (response) {
          if (response.status === 200) {

            this.$toast.show('¡Bienvenido!')
            this.$toast.show('Iniciando sesión...')
            this.initiateLogin()
            router.push('/') // /Login/ValidacionPage
          }
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.log(error)
        })
      console.log(this.url)
    },
    initiateLogin() {
      const router = window.$nuxt.$router
      const auth = this.$auth
      const body = {
        phonenumber:
          this.$data.logindata.codArea + '' + this.$data.logindata.numTel,
        password: this.$data.logindata.inputPassword,
      }
      axios
        .post(this.$data.logindata.url + '/auth/login', body)
        .then(function (response) {
          
          if (response.status === 200) {
            auth.isLogged = true
            auth.$storage.setLocalStorage('token', response.data.token)
            auth.$storage.setLocalStorage('user', response.data.username)
            auth.$storage.setLocalStorage('role', response.data.role)
            auth.$storage.setLocalStorage('id', response.data.id)
            window.location.reload(true) && router.push('/TurnosPage')
            console.log(response)
          }
          else{
            console.log(response)
            this.$toast.open({
              message: 'Ups algo salio mal',
              type: 'is-dark',
            })
          }
        })
        .catch((error) => {
          console.log(error)
        })
      
      
    },
  },
}
</script>

<style>
#TendenceLogo {
  height: 15rem;
}

#localcod {
  width: 5rem;
  margin: 0;
}

#numerotel {
  width: 10rem;
  margin: 0;
}
</style>
