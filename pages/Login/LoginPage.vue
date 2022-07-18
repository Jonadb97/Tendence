/* eslint-disable no-console */
<template>
  <div id="MainContainer">
    <div id="Layout" class="flex flex-col">
      <!-- Logo -->
      <TendenceLogo id="TendenceLogo" class="flex mx-auto my-2" />
      <!-- Gottta add v-model to all the inputs -->

      <!-- Tel  -->
      <div class="mx-auto text-white w-96">
        <b-field label="Número de teléfono" type="is-light">
          <b-input
            id="0"
            type="phone"
            class="w-fit px-2"
            maxlength="1"
            value="0"
            size="is-medium"
            disabled
            rounded
          ></b-input>
          <b-input
            id="localcod"
            v-model="logindata.codArea"
            class="w-16"
            type="phone"
            maxlength="4"
            size="is-medium"
            rounded
            expanded
            @keyup.enter="login"
          ></b-input>
          <b-input
            id="15"
            type="phone"
            class="w-fit px-2"
            maxlength="1"
            size="is-medium"
            value="15"
            disabled
          ></b-input>
          <b-input
            id="numerotel"
            v-model="logindata.numTel"
            type="phone"
            maxlength="8"
            size="is-medium"
            rounded
            expanded
          ></b-input>
        </b-field>

        <b-field label="Contraseña">
          <b-input
            v-model="logindata.inputPassword"
            type="password"
            password-reveal
            maxlength="20"
            size="is-medium"
            rounded
            expanded
          ></b-input>
        </b-field>
        

        <!-- Ingresar -->
        <div
          class="flex-row items-center justify-center self-center mx-auto pb-4 text-white"
        >
          <b-button
            class="flex mx-auto text-white"
            type="is-light"
            pack="mdi"
            outlined
            icon-right="account-arrow-right"
            size="is-medium"

            style="border-width: 3px;border-radius: 24px;"
            @click="login()"
          >
            Ingresar
          </b-button>
          <b-loading v-model="isLoading" :is-full-page="true"></b-loading>
          <NuxtLink to="#" class="flex items-center justify-center hover:scale-110" style="color: #f05b5b;padding: 2px;font-weight: 700;">¡Olvidé mi contraseña!</NuxtLink>
        </div>

        <!--No tienes cuenta? Registrar-->
        <div class="flex-row text-center mx-auto py-4" style="font-size: 24px">
          <p>No tenés cuenta?</p>
          <NuxtLink to="/Login/RegistrarPage">
            <b-button
              class="flex mx-auto py-2 text-white"
              type="is-success"
              size="is-large"
              pack="mdi"
              style="border-width: 3px; border-radius: 24px;"
              icon-right="account-plus"
              outlined
            >
              ¡Registrate!
            </b-button>
          </NuxtLink>
        </div>
        <br />
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import TendenceLogo from '~/components/TendenceLogo.vue'

export default {
  name: 'LoginPage',
  components: { TendenceLogo },
  layout: 'default-lay',

  data() {
    return {
      isLoading: false,
      isFullPage: true,
      url: this.$auth.$storage.getLocalStorage('url'),
      urlFront: this.$auth.$storage.getLocalStorage('urlFront'),
      logindata: {
        codArea: '',
        numTel: '',
        inputPassword: '',
      },
    }
  },
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
      this.isLoading = true
      const body = {
        phonenumber:
          this.$data.logindata.codArea + '' + this.$data.logindata.numTel,
        password: this.$data.logindata.inputPassword,
      }
      axios
        .post(this.url + '/auth/login', body)
        .then(this.initiateLogin)
        .catch((error) => {
          this.$toast.show('¡Contraseña/usuario incorrecto!', {
            duration: 3000,
          })
          this.isLoading = false
          console.log(error)
        })
    },
    initiateLogin(response) {
      const auth = this.$auth
      this.isLoading = false
      if (response.status === 200) {
        auth.setUser(response.data.username)
        auth.role = response.data.role
        auth.isLogged = true
        auth.$storage.setLocalStorage('token', response.data.token)
        auth.$storage.setLocalStorage('user', response.data.username)
        auth.$storage.setLocalStorage('role', response.data.role)
        auth.$storage.setLocalStorage('id', response.data.id)

        // window.location.reload(true, this.$toast.show('¡Bienvenido!'))
        if (auth.$storage.getLocalStorage('role') === 'admin') {
          this.$toast.show('¡Bienvenido, Administrador!', { duration: 3000 })
          window.location.reload(true, window.location.assign(this.urlFront + '/Dash/DashPage'))
          // Reemplazar URL con URL del sitio cuando se suba
        } else {
          this.$toast.show('¡Bienvenido!', { duration: 3000 })
          window.location.reload(true, window.location.assign(this.urlFront + '/'))
        }
      } else {
        this.$toast.show('¡Oops! Algo salió mal...', { duration: 3000 })
      }
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
</style>
