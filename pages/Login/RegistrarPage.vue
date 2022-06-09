<template>
  <div id="MainContainer">
    <h2>Registrarse</h2>
    <div id="Layout" class="flex flex-col">
      <!-- Logo -->
      <TendenceLogo id="TendenceLogo" class="flex mx-auto my-12" />
      <!-- Gottta add v-model to all the inputs -->
      <div class="flex-row mx-auto">
        <b-field label="Nombre">
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
        <!-- type="is-danger"
     message="Este mail no es válido"> -->
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
      <!-- LoginPage
          
              <div class="flex-row mx-auto">
              <b-field label="Número de teléfono">
              <b-input id="localcod" type="phone" value="291" maxlength="3" rounded expanded="0"></b-input>
              <p class="my-auto mx-2">15</p>
              <b-input id ="numerotel" type="phone" value="" maxlength="7" rounded expanded="0"></b-input>
               </b-field>

          
              <div class="flex-row mx-auto">
              <b-field label="Contraseña">
                <b-input type="password" value="Thisisapasswordlolxd" password-reveal></b-input>
              </b-field>
              </div>

              <div class="flex-row items-center justify-center self-center mx-auto py-4">
              <b-button class="flex mx-auto py-2" type="is-success" outlined icon-right="check">
              Ingresar
              </b-button>
              </div>

    
            <div class="flex-row text-center mx-auto py-4">
              <p>No tenés cuenta? Registrate <NuxtLink class="text-blue-600 font-bold" to="/Login/RegistrarPage">acá</NuxtLink></p>
            </div>
              </div>
              -->
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
      ),
    }
  },
  mounted() {
    const auth = this.$auth
    auth.$storage.setLocalStorage(
      'url',
      'https://api-tendence-testing.herokuapp.com'
    )
    console.log(auth.$storage.getLocalStorage('url'))
  },
  methods: {
    checkIfEnter() {
      if (event.keyCode === 13) {
        this.register()
      }
    },
    register() {
      const body = {
        username: this.$data.logindata.userName,
        birthday:
          String(this.logindata.selectedDate.getFullYear()).padStart(2, '0') +
          '-' +
          String(this.logindata.selectedDate.getMonth() + 1).padStart(2, '0') +
          '-' +
          this.logindata.selectedDate.getDate(),
        email: this.$data.logindata.userEmail,
        password: this.$data.logindata.inputPassword,
        phonenumber: this.$data.logindata.codArea + '' + this.$data.logindata.numTel,
        codArea: this.$data.logindata.codArea,
      }
      console.log(body)
      const router = window.$nuxt.$router

      axios
        .post(this.url + '/users', body)
        .then(function (response) {
          if (response.status === 200) {
            this.$buefy.toast.open({
              message: '¡Bienvenido!',
              type: 'is-dark',
            })
            this.$buefy.toast.open({
              message: 'Iniciando sesión',
              type: 'is-dark',
            })
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
            auth.setUser(response.data.username)
            auth.role = response.data.role
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
            this.$buefy.toast.open({
              message: 'Ups algo salio mal',
              type: 'is-dark',
            })
          }
        })
        .catch((error) => {
          console.log(error)
          this.$buefy.toast.open({
              message: 'Contraseña/Usuario Incorrectos',
              type: 'is-dark',
          })
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
