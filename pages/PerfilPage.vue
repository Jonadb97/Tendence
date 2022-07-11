<template>
  <div id="MainContainer">
    <div id="Layout" class="flex flex-col">
      <!-- Logo -->
      <TendenceLogo id="TendenceLogo" class="flex mx-auto my-2" />
      <!-- Gottta add v-model to all the inputs -->
      <div class="flex-row mx-auto">
        <b-field label="Nombre" :type="nameType" :message="nameMessage">
          <b-input
            id="name"
            v-model="logindata.userName"
            type="text"
            maxlength="20"
            rounded
            expanded
            :disabled="true"
            @blur="checkName"
          ></b-input>
        </b-field>

        <b-field
          label="Apellido"
          :type="lastnameType"
          :message="lastnameMessage"
        >
          <b-input
            id="lastname"
            v-model="logindata.userLastname"
            type="text"
            maxlength="20"
            rounded
            expanded
            :disabled="true"
            @blur="checkLastname"
          ></b-input>
        </b-field>

        <b-field grouped>
          <b-field label="Numero de teléfono">
            <b-input
              id="lastname"
              v-model="logindata.fullPhonenumber"
              type="text"
              maxlength="20"
              rounded
              expanded
              :disabled="true"
            ></b-input>
            <b-field>
              <b-button
                label="Cambiar"
                type="is-primary"
                @click="isOpenPhonenumber = !isOpenPhonenumber"
              />
            </b-field>
          </b-field>
        </b-field>
        <b-collapse
          v-model="isOpenPhonenumber"
          aria-id="contentIdForA11y2"
          class="panel"
          animation="slide"
        >
          <b-field
            grouped
            expanded
            label="Ingrese su nuevo número de teléfono"
            :type="phoneType"
          >
            <b-field :type="phoneType">
              <b-input
                id="localcod"
                v-model="logindata.codArea"
                maxlength="4"
                type="number"
                rounded
                expanded
                @blur="checkPhone"
              >
              </b-input>
            </b-field>
            <b-field>
              <p class="my-auto" is-medium>15</p>
            </b-field>
            <b-field :type="phoneType">
              <b-input
                id="numerotel"
                v-model="logindata.numTel"
                maxlength="7"
                type="number"
                rounded
                expanded
                @blur="checkPhone"
              ></b-input>
            </b-field>
          </b-field>
          <b-field is-centered>
            <b-button
              label="Guardar"
              type="is-success"
              icon-right="check"
              outlined
              :disabled="!freePhone"
              @click="openPhonePromt"
            >
            </b-button>
          </b-field>
        </b-collapse>

        <b-field label="Email" :type="emailType">
          <b-input
            v-model="logindata.userEmail"
            type="email"
            maxlength="30"
            rounded
            :disabled="true"
          >
          </b-input>

          <b-button
            label="Cambiar"
            type="is-primary"
            @click="isOpenEmail = !isOpenEmail"
          />
        </b-field>

        <b-collapse
          v-model="isOpenEmail"
          aria-id="contentIdForA11y2"
          class="panel"
          animation="slide"
        >
          <b-field
            label="Ingrese su nuevo email"
            :type="emailType"
            :message="emailMessage"
          >
            <b-input
              v-model="logindata.newEmail"
              type="email"
              maxlength="30"
              rounded
              :loading="emailLoading"
              @blur="checkEmail"
            >
            </b-input>
          </b-field>
          <b-field is-centered>
            <b-button
              label="Guardar"
              type="is-success"
              icon-right="check"
              outlined
              :disabled="!isValidEmail"
              @click="openEmailPromt"
            >
            </b-button>
          </b-field>
        </b-collapse>

        <b-field label="Contraseña" :type="passwordType">
          <b-input
            v-model="logindata.inputPassword"
            type="password"
            password-reveal
            max-length="25"
            rounded
            @blur="checkPassword"
          >
          </b-input>
        </b-field>
        <b-field
          label="Confirmar Contraseña"
          :type="passwordType"
          :message="passwordMessage"
        >
          <b-input
            v-model="passwordRepeat"
            type="password"
            password-reveal
            max-length="25"
            rounded
            @blur="checkPassword"
          >
          </b-input>
        </b-field>

        <div
          class="flex-row text-center justify-center items-center mx-auto py-4"
        >
          <b-button
            label="Guardar cambios"
            type="is-success is-large"
            icon-right="check"
            outlined
            style="border-width: 5px"
            :disabled="disabledRegisterButton"
            @click="saveProfile"
          >
          </b-button>
        </div>
      </div>
    </div>
  </div>
</template>

// 291 4448626 - 7 carácteres

<script>
import axios from 'axios'
import TendenceLogo from '~/components/TendenceLogo.vue'
export default {
  name: 'PerfilPage',
  components: { TendenceLogo },
  layout: 'default-lay',
  data() {
    const today = new Date()
    return {
      url: this.$auth.$storage.getLocalStorage('url'),
      nameMessage: '',
      nameType: '',
      validName: false,
      lastnameMessage: '',
      lastnameType: '',
      validLastname: false,
      emailMessage: '',
      emailType: '',
      emailLoading: false,
      isValidEmail: false,
      freeEmail: false,
      isOpenEmail: false,

      phoneMessage: '',
      phoneType: '',
      phoneLoading: false,
      freePhone: false,
      isOpenPhonenumber: false,

      passwordType: '',
      passwordMessage: '',
      disabledRegisterButton: true,
      passwordRepeat: undefined,
      validPassword: false,
      logindata: {
        userName: '',
        userLastname: '',
        userEmail: '',
        codArea: '',
        numTel: '',
        fullPhonenumber: '',
        inputPassword: '',
        selectedDate: undefined,
        newEmail: '',
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
    this.fetchUserInfo()
  },
  methods: {
    checkIfEnter() {
      if (event.keyCode === 13) {
        this.register()
      }
    },
    fetchUserInfo() {
      axios
        .get(this.url + '/users/' + this.$auth.$storage.getLocalStorage('id'), {
          headers: {
            auth: this.$auth.$storage.getLocalStorage('token'),
          },
        })
        .then((response) => {
          if (response.status === 200) {
            console.log(response.data)
            const data = response.data

            this.$data.logindata.userName = data.username
            this.$data.logindata.userEmail = data.email
            this.$data.logindata.fullPhonenumber = data.phonenumber
          }
        })
    },
    saveProfile() {
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
      axios
        .post(this.url + '/users', body)
        .then(this.initiateLogin)
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.log(error)
        })
    },
    checkEmail() {
      const mail = this.$data.logindata.newEmail
      const validRegex =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

      if (!mail.match(validRegex)) {
        this.emailType = 'is-danger'
        this.emailMessage = 'Email no válido'
        this.emailLoading = false
        this.isValidEmail = false
      } else {
        this.emailLoading = true
        axios
          .get(this.url + '/users/checkemail/' + mail)
          .then(this.emailValidation)
          .catch((error) => {
            console.log(error)
          })
      }
    },
    emailValidation(response) {
      this.emailLoading = false
      if (response.status === 200) {
        this.freeEmail = response.data.freeEmail
        if (response.data.freeEmail) {
          this.emailType = 'is-success'
          this.emailMessage = ''
          this.emailLoading = false
          this.isValidEmail = true
        } else {
          this.emailType = 'is-danger'
          this.emailMessage = 'La cuenta de email ya está siendo usada'
        }
      } else {
        this.emailType = 'is-danger'
        this.emailMessage = 'error en la verificación intente nuevamente'
      }
      this.validateForm()
    },
    checkPhone() {
      const num =
        this.$data.logindata.codArea + '' + this.$data.logindata.numTel
      if (
        this.$data.logindata.codArea.length >= 3 &&
        this.$data.logindata.numTel.length >= 5
      ) {
        axios
          .get(this.url + '/users/checkphone/' + num)
          .then(this.phoneValidation)
          .catch((error) => {
            console.log(error)
          })
      }
    },
    openEmailPromt() {
      this.$buefy.dialog.prompt({
        message: `Por favor ingrese su contraseña para continuar`,
        inputAttrs: {
          placeholder: '',
          maxlength: 25,
          type: 'password',
        },
        trapFocus: true,
        onConfirm: this.changeEmail,
      })
    },
    changeEmail(password) {
      const body = {
        phonenumber: this.$data.logindata.fullPhonenumber,
        password,
        newEmail: this.$data.logindata.newEmail,
      }

      axios
        .post(this.url + '/users/changeEmail', body)
        .then(this.updateEmail)
        .catch((error) => {
          console.log(error)
        })
    },
    updateEmail(response) {
      if (response.status === 200) {
        console.log(response.data)
        this.$toast.show('Email cambiado con Exito')
      } else {
        this.$toast.show('Ups algo salió mal, intenta nuevamente')
      }
    },
    openPhonePromt() {
      this.$buefy.dialog.prompt({
        message: `Por favor ingrese su contraseña para continuar`,
        inputAttrs: {
          placeholder: '',
          maxlength: 25,
          type: 'password',
        },
        trapFocus: true,
        onConfirm: this.changePhone,
      })
    },

    changePhone(password) {
      const body = {
        phonenumber: this.$data.logindata.fullPhonenumber,
        password,
        newPhonenumber:
          this.$data.logindata.codArea + '' + this.$data.logindata.numTel,
      }

      axios
        .post(this.url + '/users/changePhone', body)
        .then(this.updatePhone)
        .catch((error) => {
          console.log(error)
        })
    },
    updatePhone(response) {
      if (response.status === 200) {
        this.$data.logindata.fullPhonenumber =
          this.$data.logindata.codArea + '' + this.$data.logindata.numTel
        this.$toast.show('Teléfono actualizado con Exito')
      } else {
        this.$toast.show('Ups algo salió mal, intenta nuevamente')
      }
    },
    phoneValidation(response) {
      this.phoneLoading = false
      if (response.status === 200) {
        this.freePhone = response.data.freePhoneNumber
        if (response.data.freePhoneNumber) {
          this.phoneType = 'is-success'
          this.phoneMessage = ''
          this.phoneLoading = false
        } else {
          this.phoneType = 'is-danger'
          this.phoneMessage = 'El numero de teléfono ya está siendo usado'
        }
        this.validateForm()
      } else {
        this.phoneType = 'is-danger'
        this.phoneMessage = 'error en la verificación intente nuevamente'
      }
    },
    checkPassword() {
      if (this.passwordRepeat !== undefined) {
        if (this.$data.logindata.inputPassword === this.passwordRepeat) {
          this.passwordType = 'is-success'
          this.passwordMessage = ''
          this.validPassword = true
        } else {
          this.passwordType = 'is-danger'
          this.passwordMessage = 'Las contraseñas deben ser iguales'
          this.validPassword = false
        }
        this.validateForm()
      }
    },
    validateForm() {
      this.disabledRegisterButton =
        !this.freeEmail ||
        !this.freePhone ||
        !this.validPassword ||
        !this.validName ||
        !this.validLastname
    },
    checkName() {
      if (this.$data.logindata.userName.length > 2) {
        this.nameType = 'is-success'
        this.nameMessage = ''
        this.validName = true
      } else {
        this.nameType = 'is-danger'
        this.nameMessage = 'Su nombre debe tener al menos 3 caracteres'
        this.validName = false
      }
      this.validateForm()
    },
    checkLastname() {
      if (this.$data.logindata.userLastname.length > 2) {
        this.lastnameType = 'is-success'
        this.lastnameMessage = ''
        this.validLastname = true
      } else {
        this.lastnameType = 'is-danger'
        this.lastnameMessage = 'Su apellido debe tener al menos 3 caracteres'
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
