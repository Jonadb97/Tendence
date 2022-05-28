/* eslint-disable no-console */
<template>
  <div id="MainContainer">
    <h2>Login</h2>
    <div id="Layout" class="flex flex-col">
      <!-- Logo -->
      <TendenceLogo id="TendenceLogo" class="flex mx-auto my-12" />
      <!-- Gottta add v-model to all the inputs -->

      <!-- Tel  -->
      <div class="flex-row mx-auto text-white">
        <b-field label="Número de teléfono" type="is-light">
          <b-input
            id="localcod"
            v-model="logindata.codArea"
            type="phone"
            value="291"
            maxlength="4"
            rounded
            expanded
            @keyup.enter="login"
          ></b-input>
          <p class="my-auto mx-2 text-white">15</p>
          <b-input
            id="numerotel"
            v-model="logindata.numTel"
            class="text-white"
            type="phone"
            value=""
            maxlength="7"
            rounded
            expanded
          ></b-input>
        </b-field>

        <!--- Pass  -->
        <div class="flex-row mx-auto text-white">
          <b-field class="text-white" label="Contraseña">
            <b-input
              v-model="logindata.inputPassword"
              class="text-white"
              type="password"
              value="Thisisapasswordlolxd"
              password-reveal
            ></b-input>
          </b-field>
        </div>

        <!-- Ingresar -->
        <div
          class="flex-row items-center justify-center self-center mx-auto py-4 text-white"
        >
          <b-button
            class="flex mx-auto py-2 text-white"
            type="is-light"
            pack="mdi"
            outlined
            icon-right="account-arrow-right"
            @click="login()"
          >
            Ingresar
          </b-button>
        </div>

        <!--No tienes cuenta? Registrar-->
        <div class="flex-row text-center mx-auto py-4" style="font-size:24px;">
          <p>No tenés cuenta? Registrate</p>
          <NuxtLink
            class="text-blue-600 font-bold text-lg"
            to="/Login/RegistrarPage"
            style="font-size:30px;"
            >acá
          </NuxtLink>
        </div>
        <br />
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
  watch: {},
  mounted() {
    window.addEventListener('keypress', this.checkIfEnter)
  },
  methods: {
    checkIfEnter() {
      if (event.keyCode === 13) {
        this.login()
      }
    },
    login() {
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
            auth.strategy.token.set(response.data.token)
            this.$buefy.toast.open({
              message: 'Has iniciado sesión!',
              type: 'is-dark',
            })
            console.log(response)
          }
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.log(error)
        })
      window.location.reload(true) && router.push('/TurnosPage')
      
    },
    beforeMount() {
      this.checkIfLogged()
    },
  },
}
</script>

<style>
body,
html {
  color: white;
}

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
