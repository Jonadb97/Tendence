<template>
    <div id="MainContainer">
      <head> <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.2.0/css/all.css"></head>
        <h2 id="tab">Nuevo Turno</h2> 
        <br>
        <div id="PageContainer" class="flex flex-row my-72 justify-center items-center">
          <NuxtLink to="/NuevoTurno/NuevoTurnoForm">
          <b-button
              class="flex mx-auto py-2"
              type="is-light"
              pack="mdi"
              size="is-large"
              outlined icon-right="clipboard-plus-outline"
              label="Agendar turno"
              style="border-width: 3px;"
              />
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

#FirstForm {
  margin: 6rem;
}

@keyframes buttonanimation {
    from {size: 0;}
    to {size: 150%;}
}

#PageContainer:hover{
    animation-name: buttonanimation;
    animation-duration: 0.5s;
    animation-timing-function: ease-in-out;
    animation-direction: reverse;
}

</style>