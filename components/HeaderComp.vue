<template>
  <!-- Desktop version, hola prueba heroku  -->
  <div id="root-container" class="hero">
    <div
      id="HeaderContainerDesktop"
      class="inline-flex"
      style="font-family: 'Mazzard'"
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
      <div id="NavContainer">
        <b-button
              v-if="auth.role == 'admin'"
              type="is-dark"
              size="is-small"
              class="my-2 rounded-md ml-8"
              icon-left="clipboard"
              style="border-radius: 24px"
              ><NuxtLink to="/Dash/DashPage"
                >Panel Principal</NuxtLink
              ></b-button
            >
        <b-dropdown :triggers="['hover']" aria-role="list">
          <template #trigger>
            <b-button
              v-if="auth.role == 'admin'"
              type="is-dark"
              size="is-small"
              class="my-2 rounded-md ml-4"
              icon-right="arrow-down"
              style="border-radius: 24px"
              >Gestión</b-button
            >
          </template>

          <b-dropdown-item
            aria-role="listitem"
            size="is-small"
            pack="mdi"
            class="text-black"
            icon-right="calendar"
            ><NuxtLink to="/Dash/DashCalendar"
              >Calendario</NuxtLink
            ></b-dropdown-item
          >

          <b-dropdown-item
            aria-role="listitem"
            size="is-small"
            pack="mdi"
            class="text-black"
            icon-right="calendar"
            ><NuxtLink to="/Dash/DashServices"
              >Servicios</NuxtLink
            ></b-dropdown-item
          >

          <b-dropdown-item
            aria-role="listitem"
            size="is-small"
            pack="mdi"
            class="text-black"
            icon-right="calendar"
            ><NuxtLink to="/Dash/DashEmpleados"
              >Empleados</NuxtLink
            ></b-dropdown-item
          >

          <b-dropdown-item
            aria-role="listitem"
            size="is-small"
            pack="mdi"
            class="text-black"
            icon-right="calendar"
            ><NuxtLink to="/Dash/DashHorarios"
              >Horarios</NuxtLink
            ></b-dropdown-item
          >
        </b-dropdown>

        <b-button
          v-show="false"
          v-if="auth.role == 'admin'"
          type="is-dark"
          size="is-small"
          class="my-2 rounded-md hover:scale-105"
          style="border-radius: 24px"
          ><NuxtLink id="NavLink" to="/Login/ValidacionPage"
            >Validacion</NuxtLink
          ></b-button
        >
        <b-button
          v-show="false"
          type="is-danger"
          size="is-small"
          class="my-2 hover:scale-105 bg-red-500"
          style="border-radius: 24px"
        >
          <NuxtLink
            id="NavLink"
            to="/ErrorPage"
            class="hover:scale-105 bg-red-500"
          >
            Error
          </NuxtLink>
        </b-button>
        <b-button
          v-if="auth.role == 'user'"
          type="is-dark"
          size="is-small"
          class="my-2 rounded-full hover:scale-105"
          style="border-radius: 24px"
        >
          <NuxtLink
            id="NavLink"
            class="my-auto text-white place-content-end"
            to="/NuevoTurno/NuevoTurnoForm"
          >
            Nuevo Turno
          </NuxtLink>
        </b-button>
        <b-button
          v-if="auth.role == 'user'"
          type="is-dark"
          size="is-small"
          class="rounded-full my-2 hover:scale-105"
          style="border-radius: 24px"
        >
          <NuxtLink id="NavLink" to="/TurnosPage"> Mis Turnos </NuxtLink>
        </b-button>

        <b-button
          v-if="auth.role == 'user'"
          type="is-dark"
          size="is-small"
          class="my-2 hover:scale-105"
          style="border-radius: 24px"
        >
          <NuxtLink id="NavLink" to="/PerfilPage"> Mi Perfil </NuxtLink>
        </b-button>

        <b-button
          v-if="auth.loggedIn"
          type="is-dark"
          size="is-small"
          class="my-2 hover:scale-105"
          style="border-radius: 24px"
          @click="confirmLogout()"
        >
          <NuxtLink id="NavLink" to="#"> Cerrar sesión </NuxtLink>
        </b-button>
        <b-button
          v-if="!auth.loggedIn"
          type="is-dark"
          size="is-small"
          class="my-2 hover:scale-105"
          style="border-radius: 24px"
        >
          <NuxtLink id="NavLink" to="/Login/LoginPage">
            Iniciar sesión
          </NuxtLink>
        </b-button>
        <b-button
          v-if="!auth.loggedIn"
          type="is-dark"
          size="is-small"
          class="my-2 hover:scale-105"
          style="border-radius: 24px"
        >
          <NuxtLink id="NavLink" to="/Login/RegistrarPage">
            Registrarse
          </NuxtLink>
        </b-button>

        <b-tag
          v-if="auth.loggedIn"
          id="user-tag"
          type="is-success"
          size="is-small"
          class="my-2 pl-4 ml-4"
          style="font-size: 12px; height: 30px; border-radius: 24px"
        >
          <p style="transform: translateX(-1.5px)">{{ auth.user }}</p>
        </b-tag>
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
            <NuxtLink to="/" class="my-auto" @click="closeSidebar()"
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

                <b-dropdown :mobile-modal="false" :expanded="false">
                  <template #trigger="{ active }">
                    <b-button
                      label="Administración"
                      class="px-2 max-w-fit"
                      width="8rem"
                      type="is-dark"
                      icon-left="clipboard"
                      :icon-right="active ? 'menu-up' : 'menu-down'"
                    />
                  </template>

                  <NuxtLink
                    class="text-black"
                    style="text-color: black; color: black"
                    icon-left="clipboard"
                    to="/Dash/DashPage"
                    @click="closeSidebar()"
                    >Gestión</NuxtLink
                  >
                  <NuxtLink
                    v-show="auth.role == 'user'"
                    id="NavLink"
                    to="/NuevoTurno/NuevoTurnoForm"
                    >Nuevo Turno</NuxtLink
                  >
                  <NuxtLink
                    v-show="auth.role == 'user'"
                    id="NavLink"
                    to="/TurnosPage"
                    @click="closeSidebar()"
                    >Mis Turnos</NuxtLink
                  >

                  <NuxtLink
                    v-show="auth.role == 'user'"
                    id="NavLink"
                    to="/PerfilPage"
                    @click="closeSidebar()"
                    >Mi perfil</NuxtLink
                  >

                  <NuxtLink
                    to="/Dash/DashCalendar"
                    pack="mdi"
                    icon-left="calendar"
                    style="color: black; text-align: left"
                    @click="closeSidebar()"
                    >Calendario</NuxtLink
                  >

                  <NuxtLink
                    to="/Dash/DashServices"
                    style="color: black; text-align: left"
                    @click="closeSidebar()"
                    >Gestión de Servicios</NuxtLink
                  >

                  <NuxtLink
                    to="/Dash/DashEmpleados"
                    style="color: black; text-align: left"
                    @click="closeSidebar()"
                    >Gestión de Empleados</NuxtLink
                  >

                  <NuxtLink
                    to="/Dash/DashHorarios"
                    style="color: black; text-align: left"
                    @click="closeSidebar()"
                    >Gestión de Horarios</NuxtLink
                  >

                  <NuxtLink
                    v-show="auth.loggedIn"
                    id="NavLink"
                    to="/"
                    @click="confirmLogout(), (closeSidebar())"
                  >
                    Cerrar sesión
                  </NuxtLink>

                  <NuxtLink
                    v-show="!auth.loggedIn"
                    to="/Login/LoginPage"
                    @click="closeSidebar()"
                    >Registrarse / Iniciar sesión</NuxtLink
                  >
                </b-dropdown>
              </b-menu-list>
            </b-menu>
          </div>
        </b-sidebar>
        <b-button
          id="nav-button"
          type="is-dark"
          class="font-extrabold"
          @click="open = true"
          ><p style="transform: rotate(90deg)">|||</p></b-button
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
      currentPath: [],
      showDash: false,
    }
  },
  watch: {
    $route() {
      this.currentPath = this.$route.path
      this.watchNavDashAndUpdate()
    },
  },
  mounted() {
    this.currentPath = this.$route.path
    this.$auth.setUser(this.$auth.$storage.getLocalStorage('user'))
    this.$auth.role = this.$auth.$storage.getLocalStorage('role')
  },

  updated() {},
  methods: {
    PushHome() {
      const router = window.$nuxt.$router
      router.push('/')
      this.$nuxt.refresh()
      this.$forceUpdate()
      window.location.assign(this.auth.$storage.getLocalStorage('urlFront'))
    },
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
      this.$auth.$storage.removeLocalStorage('token')
      this.$auth.$storage.removeLocalStorage('user')
      this.$auth.$storage.removeLocalStorage('role')
      this.auth.setUser('')
      this.$toast.show('Has salido de tu sesión!', { duration: 3000 })
      this.PushHome()
    },
    closeSidebar() {
      this.$buefy.$sidebar.open('false')
    }
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

#NavContainer {
  /* TOP | RIGHT | BOTTOM | LEFT */
  margin: auto 2rem auto auto;
}

#HeaderContainerDesktop {
  background-image: linear-gradient(to right, rgb(40, 40, 40), rgb(20, 20, 20));
  width: 100%;
  border-bottom: 12rem;
  margin: 0;
  padding: 0;
}

#HeaderContainerMobile {
  background-image: linear-gradient(to right, rgb(40, 40, 40), rgb(20, 20, 20));
  width: 100%;
  border-bottom: 1px solid white;
}

@media (max-width: 800px) {
  #HeaderContainerDesktop {
    display: none;
    border-bottom: 1px solid white;
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
    border-bottom: 1px solid white;
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

@keyframes example {
  from {
    color: white;
  }
  to {
    color: rgb(153, 0, 255);
  }
}

a.nuxt-link-active {
  font-weight: bold;
  animation-name: example;
  animation-duration: 1s;
  animation-iteration-count: infinite;
  animation-direction: alternate-reverse;
  animation-timing-function: ease-in-out;
}
/* exact link will show the primary color for only the exact matching link */
a.nuxt-link-exact-active {
  color: #00c58e;
  border-color: #00c58e;
}
</style>
