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
            type="text"
            value="Fulanito"
            maxlength="20"
            rounded
            expanded
          ></b-input>
        </b-field>

        <b-field label="Número de teléfono">
          <b-input
            id="localcod"
            v-model="login.areaCode"
            type="phone"
            value="291"
            maxlength="3"
            rounded
            expanded
          ></b-input>
          <p class="my-auto mx-2">15</p>
          <b-input
            id="numerotel"
            v-model="login.numTel"
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
            type="email"
            value="fulanito@gmail.com"
            maxlength="30"
            rounded
          >
          </b-input>
        </b-field>

        <b-field label="Contraseña">
          <b-input
            type="password"
            v-model="logindata.inputPassowrd"
            value="contraseñaocultalolxD"
            password-reveal
            min-length="8"
            rounded
          >
          </b-input>
        </b-field>
        <b-field label="Confirmar Contraseña">
          <b-input
            type="password"
            value="contraseñaocultalolxD"
            password-reveal
            min-length="8"
            rounded
          >
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
            v-on:click="login()"
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
import axios from "@nuxtjs/axios"
import TendenceLogo from "~/components/TendenceLogo.vue";
export default {
    name: "RegisterPage",
    components: { TendenceLogo },
    layout: "default-lay",
  data() {
    return {
      why: '',
      logindata: {
        codArea: '',
        numTel: '',
        inputPassword: '',
        url: 'http://localhost:3000',
      }
    }
  },
  methods: {
    login() {
      const body = {
        phonenumber: this.$data.logindata.codArea + '' + this.$data.logindata.numTel,
        password: this.$data.logindata.inputPassword,
      }
      console.log(body)

      axios
        .post('http://localhost:3000' + '/auth/login', body)
        .then(function (response) {
          console.log(response)
          if(response.status === 200) {
            console.log(response)
          }

        })
      console.log(this.url)
    },

  }
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
