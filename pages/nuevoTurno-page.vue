<template>
    <div id="main-container">
      <head> <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.2.0/css/all.css"></head>
        <h2 id="tab">Nuevo Turno</h2> 
        <br>
        <div id="page-container" class="flex flex-row my-72 justify-center items-center">
          <span><i class="mx-2 my-auto fa-3x far fa-calendar-check"></i></span>
          <NuxtLink to="/nuevoTurno/tipoCorte"><b-button
          label="Agendar nuevo turno" 
          size="is-large"
          type="is-dark"
          >
          </b-button>
          </NuxtLink>
        </div>

        

    </div>
</template>

<script>
export default {
  name: 'NuevoTurnoPage',
  layout: 'default-lay',

}
</script>

<style>
.fa-calendar-check {
  color: rgb(34, 34, 34);
}

#firstForm {
  margin: 6rem;
}

@keyframes buttonanimation {
    from {size: 0;}
    to {size: 150%;}
}

#page-container:hover{
    animation-name: buttonanimation;
    animation-duration: 0.5s;
    animation-timing-function: ease-in-out;
    animation-direction: reverse;
}

</style>