<template>
    <div id="main-container">
        <h2 id="tab"> Tipo de Corte </h2>
        <br>
        <div id="page-container" class="flex flex-row justify-center items-center">
            <NuxtLink to="/nuevoTurno/conQuien"><button><div class="p-4 m-4"><img class="w-96" src="../../static/img/cortePelo.png" alt="Pelo"> <br> <h2 class="flex flex-row justify-center items-center">Corte de pelo</h2></div></button></NuxtLink>
            <NuxtLink to="/nuevoTurno/conQuien"><button><div class="p-4 m-4"><img class="w-96" src="../../static/img/cortePeloyBarba.png" alt="Pelo y Barba"> <br> <h2 class="flex flex-row justify-center items-center">Corte de Pelo y Barba</h2></div></button></NuxtLink>
        </div>
    </div>
</template>

<script>
export default {
  name: 'TipoCorte',
  layout: 'default-lay',

}
</script>

<style>
img {
    border-radius: 24px;
}

button:hover{
    color: darkgrey;
}

@keyframes imganimation {
    from {width: 384px;
    height: 384px;}
    to {width: 400px;
    height: 400px;}
}

button > div > img:hover{
    animation-name: imganimation;
    animation-duration: 0.5s;
    animation-timing-function: ease-in-out;
    animation-direction: reverse;
}
</style>