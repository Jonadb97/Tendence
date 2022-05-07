<template>
  <div id="root-component" class="">
    <DashNav />
    <div
      id="main-content"
      class="flex flex-col justify-center items-center text-center m-6 p-6"
    >
      <h1 class="text-white font-bold">Calendario:</h1>
      <no-ssr>
        <v-date-picker
          v-model="selectedDate"
          class="m-32"
          is-expanded
          mode="date"
          color="purple"
          show-caps
          is24hr
        />
      </no-ssr>
    </div>
  </div>
</template>

<script>
if (process.browser) {
  require('vue-carousel')
}
export default {
  name: 'DashCalendar',
  layout: 'default-lay',

  // Hay que fetchear la fecha y hora para ponerlos reactivos en el card de turnos pendientes y los anteriores

  data() {
    return {
      open: true,
      overlay: false,
      fullheight: true,
      fullwidth: false,
      right: false,
      selectedDate: '',
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

#sidebar {
  z-index: -1;
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
