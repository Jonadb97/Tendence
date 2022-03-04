<template>
    <div id="header-container" class="inline-flex">
        <NuxtLink to="/" class=" inline-flex my-auto mx-1"><div ><TendenceLogo id="LOGO" class="flex my-4"  /></div> <img id="BT" src="../static/svg/BarberTendenceTextWhite.svg" alt="Barber Tendence" class="my-auto py-auto"></NuxtLink>
        <div id="nav-container" class="absolute inset-y-8 right-4">
        <b-button type="is-dark"><NuxtLink id="nav-link" to="/">Home</NuxtLink></b-button>
         <b-button type="is-dark"><NuxtLink id="nav-link" to="/login-page">Login</NuxtLink></b-button>
        <!--<NuxtLink class="my-auto text-white place-content-end" to="/perfil-page">Perfil</NuxtLink> 
        <NuxtLink id="nav-link" class="my-auto text-white place-content-end" to="/turnos-page">Turnos</NuxtLink> -->
        <b-button type="is-dark"><NuxtLink id="nav-link" class="my-auto text-white place-content-end" to="/nuevoTurno-page">Nuevo Turno</NuxtLink></b-button>
        </div>
    </div>
</template>

<style>
#LOGO {
    /* TOP | RIGHT | BOTTOM | LEFT */
    margin: 0 0 0.5rem 2rem;
}

#BT {
    height: 6rem;
    /* TOP | RIGHT | BOTTOM | LEFT */
    margin: 0 2rem 0 0;

}

#nav-link {
    margin-left: 0.5rem;
    margin-right: 0.5rem;
}

#nav-link:hover {
    color: white;
}

#nav-container {
    /* TOP | RIGHT | BOTTOM | LEFT */
    margin: auto 2rem auto auto;
}

#header-container {
    background-image: linear-gradient(to right ,rgb(40, 40, 40), rgb(20, 20, 20));
    width: 100%;
    
}
</style>