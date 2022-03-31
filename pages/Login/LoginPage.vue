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
            v-model="codArea"
            type="phone"
            value="291"
            maxlength="3"
            rounded
            expanded="0"
          ></b-input>
          <p class="my-auto mx-2">15</p>
          <b-input
            id="numerotel"
            v-model="numTel"
            type="phone"
            value=""
            maxlength="7"
            rounded
            expanded="0"
          ></b-input>
        </b-field>

        <!--- Pass  -->
        <div class="flex-row mx-auto">
          <b-field label="Contraseña">
            <b-input
              v-model="varPassword"
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
            @click="methods.login()"
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
      </div>
    </div>
  </div>
</template>

// 291 4448626 - 7 carácteres

//const body = 'body: { 
                'phonenumber': this.codArea + '' + this.numTel,
                'password' : this.inputPassword
                
            }';

<script>
import axios from 'axios'
import TendenceLogo from '~/components/TendenceLogo.vue'
export default {
  name: 'LoginPage',
  components: { TendenceLogo },
  layout: 'default-lay',

  


  data: () => ({
    LoginForm: {
      codArea: '',
      numTel: '',
      inputPassword: '',
      url: 'http://localhost:3000',
      body: "{'phonenumber': 123000001, 'password': userpassword}"
    },
    methods: {
      login() {
        axios.post('http://localhost:3000' + '/auth/login', this.body,
        {
        }).then(function (response) {
    console.log(response);
})
      },
    },
  }),
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
