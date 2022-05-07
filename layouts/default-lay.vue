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

#servicios-list {
  max-width: 100vw;
}

#lista-empleados {
  max-width: 100vw;
}

@media screen and (max-width: 600px) {
  .li {
    transform: scale(0.5);
    margin: 1.2rem;
    padding: 0;
  }
  .card {
    transform: scale(0.5);
    margin: 1px;
    padding: 1px;
  }
  .VueCarousel {
    min-width: 100vw;
    max-width: 100vw;
  }
}
</style>
