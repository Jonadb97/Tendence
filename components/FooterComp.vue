<template>
  <div class="footer w-screen bottom-0" style="font-family: 'Mazzard';">
    <div id="FooterContainer" class="inline-flex w-screen bottom-0">
      <NuxtLink to="/" class="inline-flex my-auto"
        ><div><TendenceLogo id="LOGOfooter" class="" /></div></NuxtLink>
      <div
        id="socials"
        class="object-right inline-flex flex-row-reverse my-auto"
      >
        <ul class="object-right inline-flex flex-row-reverse my-auto">
          <li>
            <b-button
              type="is-light"
              rounded
              outlined
              size="is-small"
              class="my-5 mx-2 hover:animate-bounce"
              icon-left="instagram"
            >
            </b-button>
          </li>
          <li>
            <b-button
              type="is-light"
              rounded
              outlined
              size="is-small"
              class="my-5 mx-2 hover:animate-bounce"
              icon-left="facebook"
            >
            </b-button>
          </li>
          <li>
            <b-button
              type="is-light"
              rounded
              outlined
              size="is-small"
              class="my-5 mx-2 hover:animate-bounce"
              icon-left="twitter"
            >
            </b-button>
          </li>
        </ul>
      </div>
      <div class="flex flex-row-reverse text-white">
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
.b-button {
  background: rgba(0, 0, 0, 100);
}

#LOGOfooter {
  /* TOP | RIGHT | BOTTOM | LEFT */
  margin: auto;
  height: 6rem;
  transform: translateY(-0.3rem);
}

#BT-footer {
  height: 6rem;
  /* TOP | RIGHT | BOTTOM | LEFT */
}

#FooterContainer {
  transform: translateY(1.2rem);
}
</style>
