/* eslint-disable no-console */
<template>
  <div id="MainContainer">
    <div id="Layout" class="flex flex-col">
      <!-- Logo -->
      <TendenceLogo id="TendenceLogo" class="flex mx-auto my-2" />
      <!-- Gottta add v-model to all the inputs -->

      <!-- Tel  -->
      <div class="mx-auto text-white w-96">
        <b-field label="Ingrese su numero de teléfono" type="is-light">
          <b-input
            id="0"
            type="phone"
            class="pr-1 w-fit"
            maxlength="1"
            value="0"
            size="is-medium"
            disabled
            rounded
          ></b-input>
          <b-input
            id="localcod"
            v-model="codArea"
            class="w-36"
            type="phone"
            maxlength="4"
            size="is-medium"
            rounded
            expanded
            @keyup.enter="sendResetPassword"
          ></b-input>
          <b-input
            id="15"
            type="phone"
            class="px-1 w-fit"
            maxlength="1"
            size="is-medium"
            value="15"
            disabled
          ></b-input>
          <b-input
            id="numerotel"
            v-model="numTel"
            type="phone"
            maxlength="8"
            size="is-medium"
            rounded
            expanded
          ></b-input>
        </b-field>

        

        <!-- Ingresar -->
        <div
          class="flex-row items-center justify-center self-center mx-auto pb-4 text-white"
        >
          <div>
               Enviaremos un mail con las instrucciones, al correo que ingreses. ¡No olvides revisar tu bandeja de spam! 
          </div>
          <b-field>
            <b-button
              class="flex mx-auto text-white"
              type="is-light"
              pack="mdi"
              outlined
              icon-right="account-arrow-right"
              size="is-medium"
              style="border-width: 5px"
              @click="sendResetPassword()">
              Recuperar Contraseña
            </b-button>
          </b-field>
          <b-loading v-model="isLoading" :is-full-page="true"></b-loading>
        </div>
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
      numTel:'',
      codArea:'',
    }
  },
  mounted() {
    window.addEventListener('keypress', this.checkIfEnter)
  },
  methods: {
    checkIfEnter() {
      if (event.keyCode === 13) {
        this.sendResetPassword()
      }
    },
    sendResetPassword() {
      this.isLoading = true
      axios
        .post(this.url + '/auth/reset-password', 
          {
            phonenumber:this.codArea + '' + this.numTel,
          })
        .then(this.mailSended)
        .catch((error) => {
          this.$toast.show('El numero de teléfono no está registrado', {
            duration: 3000,
          })
          this.isLoading = false
          console.log(error)
        })
    },
    mailSended(){
      this.isLoading = false
      this.$toast.show('Mail enviado, revise su correo electronico', {
            duration: 3000,
          })
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
