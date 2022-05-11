<template>
  <div id="root-component" class="">
    <div
      id="main-content"
      class="flex flex-col justify-center items-center text-center"
    >
      <h1 class="font-bold text-2xl my-6 text-white">{{ $auth.user }}</h1>

      <!-- Carrousel turnos recientes -->

      <h1 class="my-6 font-bold text-xl text-white">Servicios:</h1>
      <ul id="servicios-list" class="self-center">
        <li>
          <div id="card-turno-actual" class="card">
            <div class="flex align-content-center items-center">
              <img
                id="service-img"
                class="w-1/2 rounded-full m-2 mx-auto"
                src="../../static/img/cortePeloyBarbaConBrillito.png"
                alt="Pelo"
              />
            </div>
            <header class="card-header">
              <p class="card-header-title">Shot keratínico</p>
            </header>

            <div class="card-content">
              <h2 class="my-1 font-bold">Descripción:</h2>
              <p id="fecha-turno" class="my-1 text-xs">
                Shot de keratina directo a las raíces más profundas de tus pelos
              </p>
            </div>
            <b-button type="is-dark" class="m-4 p-4">Editar</b-button>
          </div>
        </li>
        <li>
          <div id="card-turno-actual" class="card">
            <div class="flex align-content-center items-center">
              <img
                id="service-img"
                class="w-1/2 rounded-full m-2 mx-auto"
                src="../../static/img/cortePeloyBarbaConBrillito.png"
                alt="Pelo"
              />
            </div>
            <header class="card-header">
              <p class="card-header-title">Shot keratínico</p>
            </header>

            <div class="card-content">
              <h2 class="my-1 font-bold">Descripción:</h2>
              <p id="fecha-turno" class="my-1 text-xs">
                Shot de keratina directo a las raíces más profundas de tus pelos
              </p>
            </div>
            <b-button type="is-dark" class="m-4 p-4">Editar</b-button>
          </div>
        </li>
        <li>
          <div id="card-turno-actual" class="card">
            <div class="flex align-content-center items-center">
              <img
                id="service-img"
                class="w-1/2 rounded-full m-2 mx-auto"
                src="../../static/img/cortePeloyBarbaConBrillito.png"
                alt="Pelo"
              />
            </div>
            <header class="card-header">
              <p class="card-header-title">Shot keratínico</p>
            </header>

            <div class="card-content">
              <h2 class="my-1 font-bold">Descripción:</h2>
              <p id="fecha-turno" class="my-1 text-xs">
                Shot de keratina directo a las raíces más profundas de tus pelos
              </p>
            </div>
            <b-button type="is-dark" class="m-4 p-4">Editar</b-button>
          </div>
        </li>
      </ul>
      <br />
      <section>
        <b-button
          type="is-success"
          size="is-large"
          pack="mdi"
          icon-right="plus"
          icon-left="account-cash"
          outlined
          class="button is-primary is-medium m-4"
          @click="isComponentModalActive = true"
        >
          Nuevo servicio
        </b-button>

        <b-modal
          :active.sync="isComponentModalActive"
          has-modal-card
          type="is-dark"
        >
          <form action="">
            <div class="modal-card" style="width: auto;">
              <header class="modal-card-head" style="background-color: rgb(46, 46, 46)">
                <p class="modal-card-title" style="color: white;">Agregar nuevo servicio</p>
              </header>
              <section class="modal-card-body" style="background-color: rgb(46, 46, 46)">
                <b-field label="Nombre del servicio" type="is-dark">
                  <b-input
                    type="text; is-dark"
                    :value="serviceName"
                    placeholder="Servicio"
                    required
                  >
                  </b-input>
                </b-field>

                <b-field label="Descripción del servicio" type="is-dark" class="text-black">
                  <b-input
                    type="textarea"
                    maxlength="200"
                    :value="serviceDescription"
                    placeholder="Descripción"
                    required
                  >
                  </b-input>
                </b-field>

              </section>
              <footer class="modal-card-foot" style="background-color: rgb(46, 46, 46); color: white">
                <button
                  
                  class="button"
                  type="button; is-dark"
                  @click="isComponentModalActive = false"
                >
                  Volver
                </button>
                <button class="button is-primary">Confirmar</button>
              </footer>
            </div>
          </form>
        </b-modal>
      </section>
      <!--
      <b-button
        type="is-success"
        size="is-large"
        pack="mdi"
        icon-right="plus"
        icon-left="account-cash"
        outlined
        class="m-8 p-8 text-lg font-bold"
        v-on:click="showModal()"
      >
        Nuevo Servicio
      </b-button>
      <br />
      <div
        v-if="showServiceModal"
        id="modal-newservice"
        class="absolute flex object-center bg-white m-4 p-4 drop-shadow-lg"
      >
        <b-button
          label=""
          class="m-1 left-0 top-0"
          pack="mdi"
          icon-right="arrow-left-circle"
          type="is-primary"
          v-on:click="closeModal()"
        ></b-button>
        <div class="justify-center">
          <h2 id="nombre-servicio" class="text-black my-auto mx-4">
            <b-field
              label="Nombre del servicio"
              class="color-black"
              icon-left="account"
            >
              <b-input
                v-model="serviceName"
                placeholder="Nombre del servicio"
              ></b-input>
            </b-field>
          </h2>
        </div>
        <br />
        <div class="justify-center">
          <b-field label="Descripción del servicio">
            <b-input
              v-model="serviceDescription"
              placeholder="Descripción del servicio"
              maxlength="200"
              type="textarea"
            ></b-input>
          </b-field>
        </div>
        <b-button
          label=""
          class="mx-2 m-1 py-1 my-auto"
          pack="mdi"
          icon-right="check-bold"
          type="is-primary"
        ></b-button>
      </div> 
      -->
    </div>
  </div>
</template>

<script>

if (process.browser) {
  require('vue-carousel')
}

export default {
  name: 'DashServices',
  layout: 'default-lay',

  // Hay que fetchear la fecha y hora para ponerlos reactivos en el card de turnos pendientes y los anteriores

  data() {
    return {
      showServiceModal: false,
      open: true,
      overlay: false,
      fullheight: true,
      fullwidth: false,
      right: false,
      serviceName: '',
      serviceDescription: '',
      isComponentModalActive: false,
      methods: {},
    }
  },
}
</script>

<style>
.panel-tabs {
  background-color: white;
}

.panel-tabs > a {
  margin-left: 4rem;
  margin-right: 4rem;
  color: black;
  font-weight: 500;
}

#footer-item-style {
  background-color: rgb(46, 46, 46);
  color: white;
}

#footer-item-style:hover {
  background-color: rgb(46, 46, 46);
  color: white;
  font-weight: bold;
}

#card-turno-actual {
  margin: 2rem;
}

#root-container {
  z-index: 3;
}

.card {
  min-width: 15rem;
  width: 15rem;
  border-radius: 2rem;
}

.card-header-title {
  text-align: center;
  justify-content: center;
}

</style>
