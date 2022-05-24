/* eslint-disable no-console */
<template>
  <div id="MainContainer">
    <h2>Validación</h2>
    <div id="Layout" class="flex flex-col">
      <!-- Logo -->

      <div class="justify-center">
        <TendenceLogo id="TendenceLogo" class="flex mx-auto my-12" />
        <h1 class="text-2xl font-bold text-center self-center">
          Gracias por registrarte!
        </h1>
        <br />
        <b-icon
          class="flex justify-center self-center mx-auto align-middle m-2 p-2"
          pack="mdi"
          icon="check-bold"
          custom-size="mdi-48px"
        ></b-icon>
        <p class="text-center">
          Te enviamos un whatsapp con un código para poder validar tu número
          ingresalo aquí abajo para poder continuar
        </p>
        <div class="flex justify-center mx-2 my-4">
          <b-field>
            <b-input 
            
              v-for="index in 6"
              :key="index"
              v-model="code[index]" 
              :id="'numInput' + index"
              class="mx-2 text-center w-12"
              size="is-large"
              type="text"
              maxlength="1"
              :controls="false"
              :has-counter="false"
              :expanded="false"
              @input="focusNext"
              @focus="selectedInput=index"
            ></b-input>
          </b-field>
        </div>
        <div class="flex justify-center mx-2 my-4">
          <b-button
            label="Cambiar número"
            type="is-primary"
            class="m-2 p-2"
            pack="mdi"
            icon-right="cellphone"
          >
          </b-button>
          <b-button
            label="Reenviar"
            type="is-primary"
            class="m-2 p-2"
            pack="mdi"
            icon-right="email-send-outline"
          >
          </b-button>
        </div>
      </div>
    </div>
  </div>
</template>

// 291 4448626 - 7 carácteres //const body = 'body: { 'phonenumber':
this.codArea + '' + this.numTel, 'password' : this.inputPassword }'; // login()
const body = { 'phonenumber': this.$data.codArea + '' + this.$data.numTel,
'password': this.$data.inputPassword }

<script>
// import axios from 'axios'
// import Vue from 'vue'
// import VueRouter from 'vue-router'
import TendenceLogo from '~/components/TendenceLogo.vue'
// const app = Vue;
// const router = new VueRouter;

export default {
  name: 'ValidacionPage',
  components: { TendenceLogo },
  layout: 'default-lay',

  data() {
    return {
      why: '',
      code: [undefined, undefined, undefined, undefined, undefined, undefined],
      selectedInput: 0,

      logindata: {
        codArea: '',
        numTel: '',
        inputPassword: '',
        url: 'http://localhost:3000',
      },
    }
  },
  methods: {
        focusNext(e) {
      document.getElementById('numInput' + Math.min((this.selectedInput + 1), 6)).focus()
      let fullCode = ''
      let codeCompleted = true
      this.code.forEach(
        num => {
          codeCompleted = codeCompleted && num !== undefined
          if(num !== undefined){
          fullCode = fullCode + num 
          }
        }
      )
      console.log(this.fullCode)
      if(codeCompleted){
        console.log('codigo completado')
      }
    }
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

#numInput {
  width: 48px;
  height: 64px;
}
</style>
