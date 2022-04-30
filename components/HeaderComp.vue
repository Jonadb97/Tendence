<template>
  <!-- Desktop version -->
  <div id="root-container" class="hero">
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
      <div id="NavContainer" class="inset-y-8 right-4">
        <b-tag v-if="auth.loggedIn" id="user-tag" class="px-2 h-4" type="is-success">{{ auth.user }}</b-tag>
        <b-tag v-else id="user-tag-non" class="my-auto px-2 translate-y-1 h-4" type="is-primary">{{ auth.user }}</b-tag>
        <b-button v-if="auth.loggedIn" type="is-dark"
          ><NuxtLink
            id="NavLink"
            class="my-auto text-white place-content-end"
            to="/Dash/DashPage"
            > <b-icon
            icon="clipboard"
            size="is-small"
            ></b-icon> </NuxtLink
          ></b-button
        >
        <b-button type="is-dark"
          ><NuxtLink id="NavLink" to="/">Home</NuxtLink></b-button
        >
        <!-- <b-button  type="is-dark" @click="showauth()"><NuxtLink id="NavLink" to="/">Test</NuxtLink></b-button> -->
        <b-button v-if="auth.loggedIn" type="is-dark"
          ><NuxtLink
            id="NavLink"
            class="my-auto text-white place-content-end"
            to="/NuevoTurnoPage"
            >Nuevo Turno</NuxtLink
          ></b-button
        >
        <b-button v-if="auth.loggedIn" type="is-dark"
          ><NuxtLink id="NavLink" to="/TurnosPage"
            >Mis Turnos</NuxtLink
          ></b-button
        >
        <b-button
          v-if="auth.loggedIn"
          type="is-dark"
          @click="confirmLogout()"
          ><NuxtLink id="NavLink" to="/">
            Logout
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
      auth: this.$auth,
      userName: '',
      userRole: ''
    }
  },
  mounted() {
    this.$auth.setUser(this.$auth.$storage.getLocalStorage('user'))
    this.$auth.role = this.$auth.$storage.getLocalStorage('role')

  },
  methods: {
     confirmLogout() {
      this.$buefy.dialog.confirm({
        message: 'Deseas salir de la sesión?',
        onConfirm: () => this.logOut(),
      })
    },
    logOut() {
      const router = window.$nuxt.$router
      this.$auth.$storage.removeLocalStorage('token')
      this.$auth.$storage.removeLocalStorage('user')
      this.$auth.$storage.removeLocalStorage('role')
      this.auth.setUser('')
      window.location.reload(true)
      router.push('/')
      this.$buefy.toast.open({
        message: 'Has salido de tu sesión!',
        type: 'is-dark'
      })
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
  height: 6rem;
  transform: translateY(-0.5rem);
}

#BT {
  height: 8rem;
  /* TOP | RIGHT | BOTTOM | LEFT */
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
  margin: 0;
  padding: 0;
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

#root-container {
  background-image: linear-gradient(to right, rgb(40, 40, 40), rgb(20, 20, 20));
  z-index: 3;
}

@media (min-width: 800px) {
  #HeaderContainerMobile {
    display: none;
    margin: 0;
    padding: 0;
  }
}

.hero {
  padding-top: 0rem;
  padding-bottom: 0rem;
  padding-left: 0rem;
  padding-right: 0rem;
}

#user-tag {
  height: 38px;
  font-size: 16px;
  font-weight: bold;
  transform: translateY(-0.01rem)
}

</style>
