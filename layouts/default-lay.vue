<template>
<div>
    <head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@mdi/font@5.8.55/css/materialdesignicons.min.css">
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.2.0/css/all.css">
        
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


.media.content {
  color: black;
}

#root-component {
  height: 100%;
}

.label {
  color: white;
}


</style>