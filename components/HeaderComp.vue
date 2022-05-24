<template>
  <!-- Desktop version -->
  <div id="root-container" class="hero">
    <div
      id="HeaderContainerDesktop"
      class="inline-flex"
      media="(max-width: 800px)"
    >
      <NuxtLink to="/" class="inline-flex my-1 mx-1"
        ><div><TendenceLogo id="LOGO" class="flex my-4" /></div>
        <img
          id="BT"
          src="../static/svg/BarberTendenceTextWhite.svg"
          alt="Barber Tendence"
          class="my-auto py-auto"
      /></NuxtLink>
      <div id="NavContainer" class="inset-y-8 right-4">
        <b-tag
          v-if="auth.loggedIn"
          id="user-tag"
          class="px-2 h-4"
          type="is-success"
          >{{ auth.user }}</b-tag
        >
        <b-tag
          v-else
          id="user-tag-non"
          class="my-auto px-2 translate-y-1 h-4"
          type="is-primary"
          >{{ auth.user }}</b-tag
        >
        <b-button v-if="userRole == 'admin'" type="is-dark"
          ><NuxtLink
            id="NavLink"
            class="my-auto text-white place-content-end"
            to="/Dash/DashPage"
          >
            <b-icon icon="clipboard" size="is-small"></b-icon> </NuxtLink
        ></b-button>
        <b-button v-if="userRole == 'admin'" type="is-dark"
          ><NuxtLink id="NavLink" to="/Login/ValidacionPage"
            >Validacion</NuxtLink
          ></b-button
        >
        <b-button type="is-dark"
          ><NuxtLink id="NavLink" to="/">Home</NuxtLink></b-button
        >
        <b-button v-if="userRole == 'user'" type="is-dark"
          ><NuxtLink
            id="NavLink"
            class="my-auto text-white place-content-end"
            to="/NuevoTurnoPage"
            >Nuevo Turno</NuxtLink
          ></b-button
        >
        <b-button v-if="userRole == 'user'" type="is-dark"
          ><NuxtLink id="NavLink" to="/TurnosPage"
            >Mis Turnos</NuxtLink
          ></b-button
        >
        <b-button v-if="auth.loggedIn" type="is-dark" @click="confirmLogout()"
          ><NuxtLink id="NavLink" to="/"> Logout </NuxtLink></b-button
        >
        <b-button v-else type="is-dark"
          ><NuxtLink id="NavLink" to="/Login/LoginPage"
            >Login</NuxtLink
          ></b-button
        >
        <!-- Admin Dash Nav Bar Check -->
        <div
          v-if="showDash"
          id="admin-nav"
          class="my-1 flex flex-wrap justify-center text-align-left"
        >
          <br class="" />
          <b-button
            size="is-small"
            type="is-dark"
            inverted
            class="m-1"
            icon-left="home"
            ><NuxtLink to="/Dash/DashPage">Panel Principal</NuxtLink></b-button
          >
          <b-button
            type="is-dark"
            size="is-small"
            inverted
            class="m-1"
            pack="mdi"
            icon-left="calendar"
            ><NuxtLink to="/Dash/DashCalendar">Calendario</NuxtLink></b-button
          >
          <b-button
            size="is-small"
            type="is-dark"
            inverted
            class="m-1"
            icon-left="account-details"
            ><NuxtLink to="/Dash/DashServices"
              >Gestión de Servicios</NuxtLink
            ></b-button
          >
          <b-button
            type="is-dark"
            size="is-small"
            inverted
            class="m-1"
            icon-left="account-group"
            ><NuxtLink to="/Dash/DashEmpleados"
              >Gestión de Empleados</NuxtLink
            ></b-button
          >
          <b-button
            size="is-small"
            type="is-dark"
            inverted
            class="m-1"
            icon-left="alarm"
            ><NuxtLink to="/Dash/DashHorarios"
              >Gestión de Horarios</NuxtLink
            ></b-button
          >
        </div>
      </div>
    </div>
    <!-- Mobile version -->
    <div id="HeaderContainerMobile">
      <section class="flex flex-row-reverse">
        <b-sidebar
          v-model="open"
          class="flex"
          type="is-dark"
          :fullheight="fullheight"
          :fullwidth="fullwidth"
          :overlay="overlay"
          :right="false"
        >
          <div class="p-1">
            <NuxtLink to="/" class="my-auto" @click="open = false"
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
                <b-tag
                  v-if="auth.loggedIn"
                  id="user-tag"
                  class="px-2 h-4"
                  type="is-success"
                  >{{ auth.user }}</b-tag
                >
                <b-tag
                  v-else
                  id="user-tag-non"
                  class="my-auto px-2 translate-y-1 h-4"
                  type="is-primary"
                  >{{ auth.user }}</b-tag
                >
                <b-button
                  v-if="userRole == 'admin'"
                  type="is-dark"
                  @click="open = false"
                  ><NuxtLink
                    id="NavLink"
                    class="my-auto text-white place-content-end"
                    to="/Dash/DashPage"
                    @click="open = false"
                  >
                    <b-icon
                      icon="clipboard"
                      size="is-small"
                    ></b-icon> </NuxtLink
                ></b-button>
                <b-button type="is-dark" @click="open = false"
                  ><NuxtLink id="NavLink" to="/">Home</NuxtLink></b-button
                >
                <b-button
                  v-if="userRole == 'user'"
                  type="is-dark"
                  @click="open = false"
                  ><NuxtLink
                    id="NavLink"
                    class="my-auto text-white place-content-end"
                    to="/NuevoTurnoPage"
                    >Nuevo Turno</NuxtLink
                  ></b-button
                >
                <b-button
                  v-if="userRole == 'user'"
                  type="is-dark"
                  @click="open = false"
                  ><NuxtLink id="NavLink" to="/TurnosPage"
                    >Mis Turnos</NuxtLink
                  ></b-button
                >
                <b-button
                  v-if="auth.loggedIn"
                  type="is-dark"
                  @click="confirmLogout(), (open = false)"
                  ><NuxtLink id="NavLink" to="/"> Logout </NuxtLink></b-button
                >
                <b-button v-else type="is-dark" @click="open = false"
                  ><NuxtLink id="NavLink" to="/Login/LoginPage"
                    >Login</NuxtLink
                  ></b-button
                >
                <br class="" />
                <b-button
                  v-if="showDash"
                  size="is-small"
                  type="is-dark"
                  inverted
                  class="m-1"
                  icon-left="home"
                  @click="open = false"
                  ><NuxtLink to="/Dash/DashPage"
                    >Panel Principal</NuxtLink
                  ></b-button
                >
                <b-button
                  v-if="showDash"
                  type="is-dark"
                  size="is-small"
                  inverted
                  class="m-1"
                  pack="mdi"
                  icon-left="calendar"
                  @click="open = false"
                  ><NuxtLink to="/Dash/DashCalendar"
                    >Calendario</NuxtLink
                  ></b-button
                >
                <b-button
                  v-if="showDash"
                  size="is-small"
                  type="is-dark"
                  inverted
                  class="m-1"
                  icon-left="account-details"
                  @click="open = false"
                  ><NuxtLink to="/Dash/DashServices"
                    >Gestión de Servicios</NuxtLink
                  ></b-button
                >
                <b-button
                  v-if="showDash"
                  type="is-dark"
                  size="is-small"
                  inverted
                  class="m-1"
                  icon-left="account-group"
                  @click="open = false"
                  ><NuxtLink to="/Dash/DashEmpleados"
                    >Gestión de Empleados</NuxtLink
                  ></b-button
                >
                <b-button
                  v-if="showDash"
                  size="is-small"
                  type="is-dark"
                  inverted
                  class="m-1"
                  icon-left="alarm"
                  @click="open = false"
                  ><NuxtLink to="/Dash/DashHorarios"
                    >Gestión de Horarios</NuxtLink
                  ></b-button
                >
              </b-menu-list>
            </b-menu>
          </div>
        </b-sidebar>
        <b-button
          id="nav-button"
          type="is-dark"
          class="font-extrabold"
          @click="open = true"
          >|||</b-button
        >
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
      userRole: '',
      currentPath: [],
      showDash: false,
    }
  },
  watch: {
    $route() {
      console.log('route changed', this.$route.path)
      this.currentPath = this.$route.path
      this.watchNavDashAndUpdate()
      console.log(this.showDash)
    },
  },
  mounted() {
    this.currentPath = this.$route.path
    console.log(this.currentPath)
    this.$auth.setUser(this.$auth.$storage.getLocalStorage('user'))
    this.userRole = this.$auth.$storage.getLocalStorage('role')
  },

  updated() {},
  methods: {
    watchNavDashAndUpdate() {
      const string = this.$route.path
      const substring = '/Dash'
      if (string.includes(substring)) {
        this.showDash = true
      } else {
        this.showDash = false
      }
    },
    confirmLogout() {
      this.$buefy.dialog.confirm({
        message: 'Deseas salir de la sesión?',
        type: 'is-dark',
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
        type: 'is-dark',
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
  transform: translateY(-0.01rem);
}

#nav-button {
  background-color: rgb(20, 20, 20);
}
</style>
