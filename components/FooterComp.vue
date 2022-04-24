<template>
  <div id="FooterContainer" class="inline-flex w-full bg-white m-0 translate-y-6">
    <NuxtLink to="/" class="inline-flex my-auto mx-1"
      ><div><TendenceLogo id="LOGO" class="flex" /></div>
      <img
        id="BT"
        src="../static/svg/BarberTendenceTextGray.svg"
        alt="Barber Tendence"
        class="my-auto py-auto"
    /></NuxtLink>
    <div id="socials" class="object-right inline-flex flex-row-reverse" >
      <ul class="object-right inline-flex flex-row-reverse">
        <li>
          <b-button type="is-dark" inverted rounded size="is-medium" class="my-5 hover:animate-bounce" icon-left="instagram">
          </b-button>
        </li>
        <li>
          <b-button type="is-dark" inverted rounded size="is-medium" class="my-5 hover:animate-bounce" icon-left="facebook">
          </b-button>
        </li>
        <li>
          <b-button type="is-dark" inverted rounded size="is-medium" class="my-5 hover:animate-bounce" icon-left="twitter">
          </b-button>
        </li>
      </ul>
    </div>
  </div>
</template>

<style>
#LOGO {
  /* TOP | RIGHT | BOTTOM | LEFT */
  margin: 1rem 0 0.5rem 2rem;
}

#BT {
  height: 6rem;
  /* TOP | RIGHT | BOTTOM | LEFT */
  margin: 0 2rem 0 0;
}
</style>
