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
    <script src="https://cdn.tailwindcss.com"></script>
  </div>
</template>

<style>
#footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 50px;
  z-index: 100;
  background-image: linear-gradient(to right, rgb(40, 40, 40), rgb(20, 20, 20));
}

#main-content {
  margin: auto;
  position: center;
}

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

.media-content {
  color: black;
}

#footer {
  width: 100vw;
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
  #lista-empleados {
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
  .carousel-slide > button {
    width: 64px;
  }

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
  #lista-empleados {
    max-width: 100vw;
    flex-direction: column;
    margin-top: 2rem;
    margin-bottom: 2rem;
  }
}
</style>
