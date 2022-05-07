<template>
  <div id="admin-nav" class="flex flex-wrap justify-center">
    <br class="my-4" />
    <b-button type="is-dark" inverted class="m-1" icon-left="home"
      ><NuxtLink to="/Dash/DashPage">Panel Principal</NuxtLink></b-button
    >
    <b-button
      type="is-dark"
      inverted
      class="m-1"
      pack="mdi"
      icon-left="calendar"
      ><NuxtLink to="/Dash/DashCalendar">Calendario</NuxtLink></b-button
    >
    <b-button type="is-dark" inverted class="m-1" icon-left="account-cash"
      ><NuxtLink to="/Dash/DashServices"
        >Gestión de Servicios</NuxtLink
      ></b-button
    >
    <b-button type="is-dark" inverted class="m-1" icon-left="account-group"
      ><NuxtLink to="/Dash/DashEmpleados"
        >Gestión de Empleados</NuxtLink
      ></b-button
    >
    <b-button type="is-dark" inverted class="m-1" icon-left="alarm"
      ><NuxtLink to="/Dash/DashHorarios"
        >Gestión de Horarios</NuxtLink
      ></b-button
    >
  </div>
</template>
