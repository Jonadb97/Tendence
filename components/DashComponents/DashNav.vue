<template>
<div id="admin-nav" class="w-4/12 flex-col h-max">
      <br class="my-4" />
      <b-button type="is-dark" inverted class="my-2 mx-12" icon-left="home"
        ><NuxtLink to="/Dash/DashPage">Panel Principal</NuxtLink></b-button
      >
      <b-button
        type="is-dark"
        inverted
        class="my-2 mx-12"
        pack="mdi"
        icon-left="calendar"
        ><NuxtLink to="/Dash/DashCalendar">Calendario</NuxtLink></b-button
      >
      <b-button
        type="is-dark"
        inverted
        class="my-2 mx-12"
        icon-left="account-cash"
        ><NuxtLink to="/Dash/DashServices"
          >Gestión de Servicios</NuxtLink
        ></b-button
      >
      <b-button
        type="is-dark"
        inverted
        class="my-2 mx-12"
        icon-left="account-group"
        ><NuxtLink to="/Dash/DashEmpleados"
          >Gestión de Empleados</NuxtLink
        ></b-button
      >
      <b-button type="is-dark" inverted class="my-2 mx-12" icon-left="alarm"
        ><NuxtLink to="/Dash/DashHorarios"
          >Gestión de Horarios</NuxtLink
        ></b-button
      >
    </div>
</template>