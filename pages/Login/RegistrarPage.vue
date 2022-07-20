<template>
  <div id="MainContainer">
    <div id="Layout" class="flex flex-col">
      <!-- Logo -->
      <TendenceLogo id="TendenceLogo" class="flex mx-auto my-2" />
      <!-- Gottta add v-model to all the inputs -->
      <v-app v-if="!loading">
      
      <div class="flex-row mx-auto">
        <b-field 
          label="Nombre"
          :type="nameType"
          :message="nameMessage">
          <b-input
            id="name"
            v-model="logindata.userName"
            type="text"
            maxlength="20"
            rounded
            expanded
            @blur="checkName"
          ></b-input>
        </b-field>

        <b-field 
          label="Apellido"
          :type="lastnameType"
          :message="lastnameMessage">
          <b-input
            id="lastname"
            v-model="logindata.userLastname"
            type="text"
            maxlength="20"
            rounded
            expanded
            @blur="checkLastname"
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
              editable
            >
            </b-datepicker>
          </no-ssr>
        </b-field>

        <b-field 
        grouped
        expanded
        label="Número de teléfono"
        :type="phoneType"
        :message="phoneMessage">
          <b-field :type="phoneType">
            <b-input
              id="localcod"
              v-model="logindata.codArea"
              maxlength="4"
              rounded
              expanded
              @blur="checkPhone"
            ></b-input>
          </b-field>
          <b-field>
            <p class="my-auto mx-2">15</p>
          </b-field>
          <b-field  :type="phoneType">
            <b-input
              id="numerotel"
              v-model="logindata.numTel"
              maxlength="7"
              rounded
              expanded
              @blur="checkPhone"
            ></b-input>
          </b-field>
        </b-field>
        <b-field 
          label="Email"
          :type="emailType"
          :message="emailMessage">
          <b-input
            v-model="logindata.userEmail"
            type="email"
            maxlength="30"
            rounded
            :loading="emailLoading"
            @blur="checkEmail"
          >
          </b-input>
        </b-field>

        <b-field 
          label="Contraseña"
          :type="passwordType">
          <b-input
            v-model="logindata.inputPassword"
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
            v-model="passwordRepeat"
            type="password" 
            password-reveal 
            max-length="25" 
            rounded
            @blur="checkPassword">
          </b-input>
        </b-field>

        <div
          class="flex-row text-center justify-center items-center mx-auto py-4"
        >
        <p v-if="disabledRegisterButton" class="animation-pulse m-2" style="color: #f05b5b; font-weight: 700;">¡Debes completar los datos antes de clickear en registrarse!</p>
          <b-button
            label="Registrarse"
            type="is-success is-large"
            icon-right="check"
            outlined
            style="border-width: 3px;border-radius: 24px;"
            :disabled="disabledRegisterButton"
            @click="register()"
          >
          </b-button>
        </div>
      </div>
      </v-app>
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
      loading:true,
      url: this.$auth.$storage.getLocalStorage('url'),
      nameMessage:"",
      nameType:"",
      validName:false,
      lastnameMessage:"",
      lastnameType:"",
      validLastname:false,
      emailMessage:"",
      emailType:"",
      emailLoading:false,
      freeEmail:false,

      phoneMessage:"",
      phoneType:"",
      phoneLoading:false,
      freePhone:false,

      passwordType:"",
      passwordMessage:"",
      disabledRegisterButton:true,
      passwordRepeat:undefined,
      validPassword:false,
      logindata: {
        userName: '',
        userLastname:'',
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
  created() {
    this.$nextTick(function() {
      this.loading = false
    })
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
      axios.post(this.url + '/users', body).then(this.initiateLogin).catch(
        (error) => {
        // eslint-disable-next-line no-console
        console.log(error)
      })
    },

    initiateLogin(response) {
      const router = window.$nuxt.$router
      const auth = this.$auth
      const body = {
        phonenumber:
          this.$data.logindata.codArea + '' + this.$data.logindata.numTel,
        password: this.$data.logindata.inputPassword,
      }
      
      if (response.status === 200) {
        axios.post(this.url + '/auth/login', body).then(
          function (response) {  
            if (response.status === 200) {
              auth.isLogged = true
              auth.$storage.setLocalStorage('token', response.data.token)
              auth.$storage.setLocalStorage('user', response.data.username)
              auth.$storage.setLocalStorage('role', response.data.role)
              auth.$storage.setLocalStorage('id', response.data.id)
              window.location.reload(true)
              router.push('/TurnosPage')
            }
            else{
              this.$toast.open({
                message: 'Ups algo salio mal',
                type: 'is-dark',
              })
            }
          })
          .catch((error) => {
            console.log(error)
          })
      }
      
      
    },
    checkEmail(){
      const mail = this.$data.logindata.userEmail
      const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

      if(!mail.match(validRegex)) {
        this.emailType="is-danger"
        this.emailMessage="Email no válido"
        this.emailLoading = false
      }
      else{
        this.emailLoading = true
        axios
        .get(this.url + '/users/checkemail/'+mail)
        .then(this.emailValidation)
        .catch((error) => {
            console.log(error)
        })
        
      }

    },
    emailValidation(response){
      this.emailLoading = false
      if (response.status === 200 ) {
        this.freeEmail = response.data.freeEmail
        if(response.data.freeEmail){
          this.emailType="is-success"
          this.emailMessage=""
          this.emailLoading = false
        }
        else{
          this.emailType="is-danger"
          this.emailMessage="La cuenta de email ya está siendo usada"
        }
      }
      else{
        this.emailType="is-danger"
        this.emailMessage="error en la verificación intente nuevamente"
      }
      this.validateForm()
          
    },
    checkPhone(){
      const num = this.$data.logindata.codArea+""+this.$data.logindata.numTel
      if(this.$data.logindata.codArea.length>=3 && this.$data.logindata.numTel.length>=5){
        axios
        .get(this.url + '/users/checkphone/'+num)
        .then(this.phoneValidation)
        .catch((error) => {
            console.log(error)
        })
      }
    },
    phoneValidation(response){
      this.phoneLoading = false
      if (response.status === 200 ) {
        this.freePhone = response.data.freePhoneNumber
        if(response.data.freePhoneNumber){
          this.phoneType="is-success"
          this.phoneMessage=""
          this.phoneLoading = false
        }
        else{
          this.phoneType="is-danger"
          this.phoneMessage="El numero de teléfono ya está siendo usado"
        }
        this.validateForm()
      }
      else{
        this.phoneType="is-danger"
        this.phoneMessage="error en la verificación intente nuevamente"
      }
    },
    checkPassword(){
      if(this.passwordRepeat !== undefined){
        if(this.$data.logindata.inputPassword === this.passwordRepeat){
          this.passwordType= "is-success"
          this.passwordMessage=""
          this.validPassword = true
        }
        else{
          this.passwordType="is-danger"
          this.passwordMessage="Las contraseñas deben ser iguales"
          this.validPassword = false
        }
        this.validateForm()
      }
    },
    validateForm(){
      this.disabledRegisterButton = 
      !this.freeEmail || 
      !this.freePhone || 
      !this.validPassword ||
      !this.validName ||
      !this.validLastname
    },
    checkName(){
      if(this.$data.logindata.userName.length > 2){
        this.nameType= "is-success"
        this.nameMessage=""
        this.validName = true
      }
      else{
        this.nameType="is-danger"
        this.nameMessage="Su nombre debe tener al menos 3 caracteres"
        this.validName = false
      }
      this.validateForm()
    },
    checkLastname(){
      if(this.$data.logindata.userLastname.length > 2){
        this.lastnameType= "is-success"
        this.lastnameMessage=""
        this.validLastname = true
      }
      else{
        this.lastnameType="is-danger"
        this.lastnameMessage="Su apellido debe tener al menos 3 caracteres"
        this.validLastname = false
      }
      this.validateForm()
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
