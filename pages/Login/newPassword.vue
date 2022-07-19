/* eslint-disable no-console */
<template>
  <div id="MainContainer">
    <div id="Layout" class="flex flex-col">
      <!-- Logo -->
      <TendenceLogo id="TendenceLogo" class="flex mx-auto my-2" />
      <!-- Gottta add v-model to all the inputs -->

      <!-- Tel  -->
      <div class="mx-auto text-white w-96">
        <b-field 
          label="Contraseña"
          :type="passwordType">
          <b-input
            v-model="newPassword"
            type="password"
            password-reveal
            max-length="25"
            rounded
            @blur="checkPassword">
          </b-input>
        </b-field>
        <b-field 
          label="Confirmar Contraseña"
          :type="passwordType"
          :message="passwordMessage">
          <b-input 
            v-model="newPasswordRepeat"
            type="password" 
            password-reveal 
            max-length="25" 
            rounded
            @blur="checkPassword">
          </b-input>
        </b-field>

        

        <!-- Ingresar -->
        <div
          class="flex-row items-center justify-center self-center mx-auto pb-4 text-white"
        >
          <b-field>
            <b-button
              class="flex mx-auto text-white"
              type="is-light"
              pack="mdi"
              outlined
              size="is-medium"
              style="border-width: 5px"
              :disabled="buttonDisabled"
              @click="sendResetPassword()">
              Confirmar
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
      buttonDisabled:true,
      newPassword:undefined,
      newPasswordRepeat:undefined,
      passwordType:'',
      passwordMessage:'',
    }
  },
  mounted() {
    console.log("parametro: ")
    console.log(this.$route.query.token);
    window.addEventListener('keypress', this.checkIfEnter)
  },
  methods: {
    checkIfEnter() {
      if (event.keyCode === 13) {
        this.sendResetPassword()
      }
    },
    sendNewPassword() {
      this.isLoading = true
      this.buttonDisabled = true
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
          this.buttonDisabled = false
          console.log(error)
        })
    },
    mailSended(){
      this.isLoading = false
      this.$toast.show('Mail enviado, revise su correo electronico', {
            duration: 3000,
          })
    },
    checkPassword(){
      if(this.newPasswordRepeat!== undefined){
        if(this.newPassword === this.newPasswordRepeat){
          this.passwordType= "is-success"
          this.passwordMessage=""
          this.buttonDisabled = false
        }
        else{
          this.passwordType="is-danger"
          this.passwordMessage="Las contraseñas deben ser iguales"
          this.button = true
        }
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
