<template>
  <div id="root-component" class="">
    <DashNav />
    <div
      id="main-content"
      class="flex flex-col justify-center items-center text-center"
    >
      <h1 class="text-white my-8 font-bold text-lg">Gestión de horarios:</h1>

      <!--- Tabla de horarios -->

      <b-table
        :data="data"
        :columns="columns"
        class="m-24 p-24"
        size="is-large"
      ></b-table>
    </div>
  </div>
</template>

<script>
if (process.browser) {
  require('vue-carousel')
}
export default {
  name: 'DashHorarios',
  layout: 'default-lay',

  // Hay que fetchear la fecha y hora para ponerlos reactivos en el card de turnos pendientes y los anteriores

  data() {
    return {
      open: true,
      overlay: false,
      fullheight: true,
      fullwidth: false,
      right: false,
      data: [
        {
          Lunes: 'nada',
          Martes: 'nada',
          Miércoles: 'nada',
          Jueves: 'nada',
          Viernes: 'nada',
        },
        {
          Lunes: 'nada',
          Martes: 'nada',
          Miércoles: '3-5-22' + ' ' + '16:00',
          Jueves: 'nada',
          Viernes: 'nada',
        },
        {
          Lunes: 'nada',
          Martes: 'nada',
          Miércoles: 'nada',
          Jueves: 'nada',
          Viernes: 'nada',
        },
        {
          Lunes: '5-5-22' + ' ' + '18:00',
          Martes: 'nada',
          Miércoles: 'nada',
          Jueves: 'nada',
          Viernes: 'nada',
        },
        {
          Lunes: 'nada',
          Martes: 'nada',
          Miércoles: 'nada',
          Jueves: 'nada',
          Viernes: 'nada',
        },
      ],
      columns: [
        {
          label: 'Lunes',
          field: 'Lunes',
          width: '60',
        },
        {
          field: 'Martes',
          label: 'Martes',
          width: '60',
        },
        {
          field: 'Miércoles',
          label: 'Miércoles',
          width: '60',
        },
        {
          field: 'Jueves',
          label: 'Jueves',
          width: '60',
        },
        {
          field: 'Viernes',
          label: 'Viernes',
          width: '60',
        },
      ],
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
