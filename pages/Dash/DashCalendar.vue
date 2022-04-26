<template>
  <div id="root-component" class="grid grid-cols-2 m-0 p-0">
    <div id="admin-nav" class="w-4/12 flex-col h-max">
      <br class="my-4">
      <b-button
      type="is-dark"
      inverted 
      class="my-2 mx-12"
      icon-left="home"
      ><NuxtLink to="/Dash/DashPage">Panel Principal</NuxtLink></b-button>
      <b-button
      type="is-dark"
      inverted 
      class="my-2 mx-12"
      pack="mdi"
      icon-left="calendar"
      ><NuxtLink to="/Dash/DashCalendar">Calendario</NuxtLink></b-button>
      <b-button
      type="is-dark"
      inverted 
      class="my-2 mx-12"
      icon-left="account-cash"
      ><NuxtLink to="/Dash/DashServices">Gestión de Servicios</NuxtLink></b-button>
      <b-button
      type="is-dark"
      inverted 
      class="my-2 mx-12"
      icon-left="account-group"
      ><NuxtLink to="/Dash/DashEmpleados">Gestión de Empleados</NuxtLink></b-button>
      <b-button
      type="is-dark"
      inverted 
      class="my-2 mx-12"
      icon-left="alarm"
      ><NuxtLink to="/Dash/DashHorarios">Gestión de Horarios</NuxtLink></b-button>
    </div>
    <div
      id="main-content"
      class="flex flex-col justify-center items-center text-center m-6 p-6"
    >
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
      right: false
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
  font-weight:500;

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
