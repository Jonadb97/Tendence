<template>
  <div>
    <head>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/@mdi/font@5.8.55/css/materialdesignicons.min.css"
      />
      <link
        rel="stylesheet"
        href="https://use.fontawesome.com/releases/v5.2.0/css/all.css"
      />
    </head>

    <header-comp class="hero" />
    <Nuxt class="container" />
    <footer-comp class="footer" />
    <script src="https://cdn.tailwindcss.com"></script>
  </div>
</template>

<style>
body {
  margin: 0;
  padding: 0;
  max-height: max-content;
}

#card-turno-actual {
  margin: 0;
}

.media.content {
  color: black;
}

#root-component {
  height: 100%;
}

.label {
  color: white;
}

@media screen and (min-width: 960px) {
  #servicios-list {
    max-width: 100vw;
    display: inline-flex;
    flex-direction: row;
    margin-left: 2rem;
    margin-right: 2rem;
  }
}

#lista-empleados {
  max-width: 100vw;
}

@media screen and (max-width: 600px) {
  .VueCarousel {
    min-width: 100vw;
    max-width: 100vw;
  }
  #servicios-list {
    max-width: 100vw;
    flex-direction: column;
    margin-top: 2rem;
    margin-bottom: 2rem;
  }
}
</style>
