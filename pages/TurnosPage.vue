<template>
  <div id="root-component">
    <h2 class="my-2">Tus turnos</h2>
    <div
      id="main-content"
      class="flex flex-col justify-center items-center text-center"
    >
      <h1 class="font-bold text-2xl my-6"> {{ $auth.user }} </h1>
      <!-- Card turno pendiente actual -->
      <h1 class="font-bold text-xl">Turno pendiente:</h1>

      <div id="card-turno-actual" class="card">
        <div class="flex align-content-center items-center">
          <img
            id="service-img"
            class="w-1/2 rounded-full m-2 mx-auto"
            src="../static/img/cortePelo.png"
            alt="Pelo"
          />
        </div>
        
        <header class="card-header">
          <p class="card-header-title">Corte de pelo</p>
        </header>

        <div class="card-content">
          <h2 class="my-1 font-bold">Fecha:</h2>
          <p id="fecha-turno" class="my-1">23-4-2022</p>
          <h2 class="font-bold my-1">Hora:</h2>
          <p id="hora-turno" class="my-1">18:00</p>
        </div>

        <div class="card-footer">
          <nuxt-link id="footer-item-style" to="#" class="card-footer-item"
            >Editar</nuxt-link
          >
        </div>
      </div>

      <!-- Botón nuevo turno -->
      <nuxt-link to="/NuevoTurno/NuevoTurnoForm">
        <b-button
          class="flex mx-auto py-2 my-4"
          type="is-dark"
          pack="mdi"
          size="is-large"
          outlined
          icon-right="clipboard-plus-outline"
          label="Agendar nuevo turno"
        />
      </nuxt-link>

      <!-- Carrousel turnos anteriores -->

      <h1 class="my-6 font-bold text-xl">Turnos anteriores:</h1>

      <ul class="inline-flex">
        <li>
          <div id="card-turno-actual" class="card">
            <div class="flex align-content-center items-center">
              <img
                id="service-img"
                class="w-1/2 rounded-full m-2 mx-auto"
                src="../static/img/cortePeloyBarbaConBrillito.png"
                alt="Pelo"
              />
            </div>
            <header class="card-header">
              <p class="card-header-title">Shot keratínico</p>
            </header>

            <div class="card-content">
              <h2 class="my-1 font-bold">Fecha:</h2>
              <p id="fecha-turno" class="my-1">12-3-2022</p>
              <h2 class="font-bold my-1">Hora:</h2>
              <p id="hora-turno" class="my-1">20:00</p>
            </div>
          </div>
        </li>
        <li>
          <div id="card-turno-actual" class="card">
            <div class="flex align-content-center items-center">
              <img
                id="service-img"
                class="w-1/2 rounded-full m-2 mx-auto"
                src="../static/img/cortePeloyBarba.png"
                alt="Pelo"
              />
            </div>
            <header class="card-header">
              <p class="card-header-title">Corte de pelo y barba</p>
            </header>

            <div class="card-content">
              <h2 class="my-1 font-bold">Fecha:</h2>
              <p id="fecha-turno" class="my-1">10-2-2022</p>
              <h2 class="font-bold my-1">Hora:</h2>
              <p id="hora-turno" class="my-1">19:00</p>
            </div>
          </div>
        </li>
        <li>
          <div id="card-turno-actual" class="card">
            <div class="flex align-content-center items-center">
              <img
                id="service-img"
                class="w-1/2 rounded-full m-2 mx-auto"
                src="../static/img/cortePeloyBarbaConBrillito.png"
                alt="Pelo"
              />
            </div>
            <header class="card-header">
              <p class="card-header-title">Shot keratínico</p>
            </header>

            <div class="card-content">
              <h2 class="my-1 font-bold">Fecha:</h2>
              <p id="fecha-turno" class="my-1">16-3-2022</p>
              <h2 class="font-bold my-1">Hora:</h2>
              <p id="hora-turno" class="my-1">19:00</p>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TusTurnosPage',
  layout: 'default-lay',

  // Hay que fetchear la fecha y hora para ponerlos reactivos en el card de turnos pendientes y los anteriores

  data() {
    return {
    }
  },
}
</script>

<style>
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

#root-component {
  margin: 0.5rem 8rem 2rem 8rem;
}

.card {
  width: 15rem;
}

.card-header-title {
  text-align: center;
  justify-content: center;
}
</style>
