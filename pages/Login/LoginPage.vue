/* eslint-disable no-console */
<template>
  <div id="MainContainer">
    <h2>Login</h2>
    <div id="Layout" class="flex flex-col">
      <!-- Logo -->
      <TendenceLogo id="TendenceLogo" class="flex mx-auto my-12" />
      <!-- Gottta add v-model to all the inputs -->

      <!-- Tel  -->
      <div class="flex-row mx-auto">
        <b-field label="Número de teléfono">
          <b-input
            id="localcod"
            v-model="logindata.codArea"
            type="phone"
            value="291"
            maxlength="3"
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

        <!--- Pass  -->
        <div class="flex-row mx-auto">
          <b-field label="Contraseña">
            <b-input
              v-model="logindata.inputPassword"
              type="password"
              value="Thisisapasswordlolxd"
              password-reveal
            ></b-input>
          </b-field>
        </div>

        <!-- Ingresar -->
        <div
          class="flex-row items-center justify-center self-center mx-auto py-4"
        >
          <b-button
            class="flex mx-auto py-2"
            type="is-dark"
            pack="mdi"
            outlined
            icon-right="account-arrow-right"
            @click="login(), confirm()"
          >
            Ingresar
          </b-button>
        </div>

        <!--No tienes cuenta? Registrar-->
        <div class="flex-row text-center mx-auto py-4">
          <p>
            No tenés cuenta? Registrate
            <NuxtLink class="text-blue-600 font-bold" to="/Login/RegistrarPage"
              >acá</NuxtLink
            >
          </p>
        </div>

        <b-field label="Prueba de reactividad">
          <b-input
            id="why"
            v-model="why"
            type="phone"
            value="000"
            maxlength="100"
            rounded
            expanded
          ></b-input> </b-field
        ><br />
        <p>{{ why }}</p>
      </div>
    </div>
  </div>
</template>

// 291 4448626 - 7 carácteres //const body = 'body: { 'phonenumber':
this.codArea + '' + this.numTel, 'password' : this.inputPassword }'; // login()
{ const body = { 'phonenumber': this.$data.codArea + '' + this.$data.numTel,
'password': this.$data.inputPassword }

<script>
import axios from 'axios'
// import Vue from 'vue'
// import VueRouter from 'vue-router'
import TendenceLogo from '~/components/TendenceLogo.vue'
// const app = Vue;
// const router = new VueRouter;

export default {
  name: 'LoginPage',
  components: { TendenceLogo },
  layout: 'default-lay',

  data() {
    return {
      why: '',
      logindata: {
        codArea: '',
        numTel: '',
        inputPassword: '',
        url: 'http://localhost:3000',
      },
    }
  },
  methods: {
    checkIfLogged() {
      if (localStorage.isLogged) {
        this.isLogged = true
        this.userName = this.localStorage.username
        return { value: 'true' }
      }
    },
    confirm() {
      this.$buefy.toast.open('Login exitoso!')
    },
    login() {
      const router = window.$nuxt.$router
      const auth = window.$nuxt.$auth

      const body = {
        phonenumber:
          this.$data.logindata.codArea + '' + this.$data.logindata.numTel,
        password: this.$data.logindata.inputPassword,
      }
      axios
        .post(this.$data.logindata.url + '/auth/login', body)
        .then(function (response) {
          if (response.status === 200) {
            localStorage.setItem('userName', response.data.username)
            localStorage.setItem('userToken', response.data.token)
            localStorage.setItem('isLogged', 'true')
            auth.isLogged = true

            auth.setUser(response.data.username)

            router.push('/TurnosPage')
            console.log(response)
          }
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.log(error)
        })
    },
    beforeMount() {
     this.checkIfLogged()
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
