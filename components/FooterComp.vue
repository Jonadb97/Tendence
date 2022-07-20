<template>
  <div class="footer">
    <div id="FooterContainer" class="inline-flex w-screen bg-white bottom-0">
      <NuxtLink to="/" class="inline-flex my-auto"
        ><div><TendenceLogo id="LOGOfooter" class="" /></div>
        <img
          id="BT-footer"
          src="../static/svg/BarberTendenceTextGray.svg"
          alt="Barber Tendence"
          class="my-auto py-auto"
      /></NuxtLink>
      <div
        id="socials"
        class="object-right inline-flex flex-row-reverse my-auto"
      >
        <ul class="object-right inline-flex flex-row-reverse my-auto">
          <li>
            <b-button
              type="is-dark"
              inverted
              rounded
              size="is-medium"
              class="my-5 hover:animate-bounce"
              icon-left="instagram"
            >
            </b-button>
          </li>
          <li>
            <b-button
              type="is-dark"
              inverted
              rounded
              size="is-medium"
              class="my-5 hover:animate-bounce"
              icon-left="facebook"
            >
            </b-button>
          </li>
          <li>
            <b-button
              type="is-dark"
              inverted
              rounded
              size="is-medium"
              class="my-5 hover:animate-bounce"
              icon-left="twitter"
            >
            </b-button>
          </li>
        </ul>
      </div>
      <div class="inline-flex justify-end">
      <p class="my-auto py-auto text-right">
      Mail : barbertendence@gmail.com |
      </p>
      <nuxt-link class="my-auto py-auto text-right" to="/politicasprivacidad"
        > Políticas de privacidad |</nuxt-link
      >
      <p class="my-auto py-auto text-right">
         ©Copyright 2022 Barbertendence. Todos los derechos reservados.
      </p>
      </div>
    </div>
  </div>
</template>

<style>
#LOGOfooter {
  /* TOP | RIGHT | BOTTOM | LEFT */
  margin: auto;
  height: 6rem;
  transform: translateY(0.5rem);
}

#BT-footer {
  height: 6rem;
  /* TOP | RIGHT | BOTTOM | LEFT */
}

#FooterContainer {
  transform: translateY(1.2rem);
  background-color: #fafafa;
}
</style>
