<template>
  <!-- Desktop version -->
  <div>
    <div
      id="HeaderContainerDesktop"
      class="inline-flex"
      media="(max-width: 800px)"
    >
      <NuxtLink to="/" class="inline-flex my-auto mx-1"
        ><div><TendenceLogo id="LOGO" class="flex my-4" /></div>
        <img
          id="BT"
          src="../static/svg/BarberTendenceTextWhite.svg"
          alt="Barber Tendence"
          class="my-auto py-auto"
      /></NuxtLink>
      <div id="NavContainer" class="absolute inset-y-8 right-4">
        <b-button type="is-dark"
          ><NuxtLink id="NavLink" to="/">Home</NuxtLink></b-button
        >
        <!-- <b-button  type="is-dark" @click="showauth()"><NuxtLink id="NavLink" to="/">Test</NuxtLink></b-button> -->
        <b-button v-if="$auth.user && $auth.user != 'anon' " type="is-dark"
          ><NuxtLink
            id="NavLink"
            class="my-auto text-white place-content-end"
            to="/NuevoTurnoPage"
            >Nuevo Turno</NuxtLink
          ></b-button
        >
        <b-button v-if="$auth.user || userName" type="is-dark"
          ><NuxtLink id="NavLink" to="/TurnosPage"
            >Mis Turnos</NuxtLink
          ></b-button
        >
        <b-button v-if="$auth.user || userName" type="is-dark" @click="confirmLogout()"
          ><NuxtLink id="NavLink" to="/">
            {{ $auth.user }} | Logout
          </NuxtLink></b-button
        >
        <b-button v-else type="is-dark"
          ><NuxtLink id="NavLink" to="/Login/LoginPage"
            >Login</NuxtLink
          ></b-button
        >

        <!--<NuxtLink class="my-auto text-white place-content-end" to="/perfil-page">Perfil</NuxtLink> 
            <NuxtLink id="NavLink" class="my-auto text-white place-content-end" to="/turnos-page">Turnos</NuxtLink> -->
      </div>
    </div>
    <!-- Mobile version -->
    <!--       <div id="HeaderContainerMobile" class="inline-flex" media="(min-width: 800px)">
            <NuxtLink to="/" class=" inline-flex my-auto mx-1"><div ><TendenceLogo id="LOGO" class="flex my-4"  /></div> <img id="BT" src="../static/svg/BarberTendenceTextWhite.svg" alt="Barber Tendence" class="my-auto py-auto"></NuxtLink>
            <div id="NavContainer" class="absolute inset-y-8 right-4">
            <b-button type="is-dark"><NuxtLink id="NavLink" to="/">Home</NuxtLink></b-button>
            <b-button type="is-dark"><NuxtLink id="NavLink" to="/LoginPage">Login</NuxtLink></b-button>
            <b-button type="is-dark"><NuxtLink id="NavLink" class="my-auto text-white place-content-end" to="/NuevoTurnoPage">Nuevo Turno</NuxtLink></b-button>
            </div>
        </div> -->
    <div id="HeaderContainerMobile">
      <section>
        <b-sidebar
          v-model="open"
          type="is-light"
          :fullheight="fullheight"
          :fullwidth="fullwidth"
          :overlay="overlay"
          :right="right"
        >
          <div class="p-1">
            <NuxtLink to="/" class="my-auto"
              ><div
                class="flex flex-row justify-center align-center items-center"
              >
                <TendenceLogo
                  id="LOGO"
                  class="mx-auto my-0 p-0 float-bottom position-bottom"
                />
              </div>
              <img
                id="BTMobile"
                src="../static/svg/BarberTendenceTextWhite.svg"
                alt="Barber Tendence"
                class="m-0 p-0"
            /></NuxtLink>
            <b-menu>
              <b-menu-list label="Menu">
                <b-button type="is-dark"
                  ><NuxtLink id="NavLink" to="/">Home</NuxtLink></b-button
                >
                <b-button type="is-dark"
                  ><NuxtLink id="NavLink" to="/Login/LoginPage"
                    >Login</NuxtLink
                  ></b-button
                >
                <b-button type="is-dark"
                  ><NuxtLink
                    id="NavLink"
                    class="my-auto text-white place-content-end"
                    to="/NuevoTurnoPage"
                    >Nuevo Turno</NuxtLink
                  ></b-button
                >
              </b-menu-list>
            </b-menu>
          </div>
        </b-sidebar>
        <b-button type="is-dark" @click="open = true">|||</b-button>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      open: false,
      overlay: true,
      fullheight: true,
      fullwidth: false,
      right: false,
      userName: ''
    }
  },
  methods: {
    checkIfLogged() {
      if (localStorage.isLogged) {
        this.$auth.user = localStorage.userName
        this.data.userName = localStorage.userName
        this.isLogged = true
        return {}
      }
    },
    Mounted() {
      this.checkIfLogged()
      console.log(this.userName)
    },
    showauth() {
      const auth = window.$nuxt.$auth
      const log = auth.isLogged
      console.log(log)
      return {}
    },
    isLogged() {
      if (localStorage) {
        const user = localStorage.userName
        this.data.userName = localStorage.userName
        this.$auth.user = user
        this.data.userName = user
        return { user }
      }
    },
    confirmLogout() {
      this.$buefy.dialog.confirm({
        message: 'Deseas salir de la sesión?',
        onConfirm: () => this.logOut()
      })
      
    },
    logOut() {
      const auth = window.$nuxt.$auth

      if (auth.user) {
        auth.setUser('anon')
        auth.isLogged = false
        localStorage.isLogged = false
        localStorage.userName = 'anon'
        this.$buefy.toast.open('Has salido de tu sesión!')
        window.location.reload(true)
      }
    },
  },
}
</script>

// #216CB4 #8A2184
<style>
#colored-line {
  background-image: linear-gradient(to right, #216cb4, #8a2184);
  height: 3rem;
}

.menu-list {
  display: flex;
  flex-direction: column;
}

.p-1 {
  padding: 1em;
  background-color: rgb(46, 46, 46);
}

#LOGO {
  /* TOP | RIGHT | BOTTOM | LEFT */
  margin: 0 0 0.5rem 2rem;
}

#BT {
  height: 6rem;
  /* TOP | RIGHT | BOTTOM | LEFT */
  margin: 0 2rem 0 0;
}

.a {
  margin-left: 0.5rem;
  margin-right: 0.5rem;
  color: white;
  width: 100%;
}

#NavLink {
  margin-left: 0.5rem;
  margin-right: 0.5rem;
  color: white;
  width: 100%;
}

#NavLink:hover {
  color: white;
  background-color: #2f2f2f;
}

#NavContainer {
  /* TOP | RIGHT | BOTTOM | LEFT */
  margin: auto 2rem auto auto;
}

#HeaderContainerDesktop {
  background-image: linear-gradient(to right, rgb(40, 40, 40), rgb(20, 20, 20));
  width: 100%;
  border-bottom: 12rem;
  border-color: linear-gradient(to right, #216cb4, #8a2184);
}

#HeaderContainerMobile {
  background-image: linear-gradient(to right, rgb(40, 40, 40), rgb(20, 20, 20));
  width: 100%;
}

@media (max-width: 800px) {
  #HeaderContainerDesktop {
    display: none;
  }
}

@media (min-width: 800px) {
  #HeaderContainerMobile {
    display: none;
  }
}
</style>
