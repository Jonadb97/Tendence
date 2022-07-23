<template>
  <div id="MainContainer" class="justify-center items-center flex-col flex">
    <TendenceLogo v-if="auth.loggedIn" id="LOGO" class="items-center justify-center self-center" style="height: 15rem;" />
    <TendenceLogo v-else id="LOGO" class="items-center justify-center self-center" style="height: 15rem; " />
    <h1 class="text-white text-xl m-4 p-4">POLITICA DE PRIVACIDAD</h1>

    <pre class="text-white m-12 p-12" style="background-color: rgba(0, 0, 0, 0); width: 50%; white-space: pre-wrap;">
      

El sitio web barbertendence.com es propiedad de Barber Tendence, que es un controlador de datos de sus datos personales.

Hemos adoptado esta Política de privacidad, que determina cómo procesamos la información recopilada por barbertendence.com, que también proporciona las razones por las que debemos recopilar ciertos datos personales sobre usted. Por lo tanto, debe leer esta Política de privacidad antes de utilizar el sitio web barbertendence.com.

Cuidamos sus datos personales y nos comprometemos a garantizar su confidencialidad y seguridad.
Información personal que recopilamos:

Cuando visita barbertendence.com, recopilamos automáticamente cierta información sobre su dispositivo, incluida información sobre su navegador web, dirección IP, zona horaria y algunas de las cookies instaladas en su dispositivo. Además, a medida que navega por el Sitio, recopilamos información sobre las páginas web individuales o los productos que ve, qué sitios web o términos de búsqueda lo refirieron al Sitio y cómo interactúa con el Sitio. Nos referimos a esta información recopilada automáticamente como "Información del dispositivo". Además, podemos recopilar los datos personales que nos proporciona (incluidos, entre otros, Nombre, Apellido, Dirección, información de pago, etc.) durante el registro para poder cumplir con el acuerdo.
¿Por qué tratamos sus datos?

Nuestra principal prioridad es la seguridad de los datos del cliente y, como tal, podemos procesar solo los datos mínimos del usuario, solo en la medida en que sea absolutamente necesario para mantener el sitio web. La información recopilada automáticamente se usa solo para identificar posibles casos de abuso y establecer información estadística sobre el uso del sitio web. Esta información estadística no se agrega de otra manera de tal manera que identifique a cualquier usuario particular del sistema.

Puede visitar el sitio web sin decirnos quién es ni revelar ninguna información mediante la cual alguien pueda identificarlo como una persona específica e identificable. Sin embargo, si desea utilizar algunas de las funciones del sitio web, o desea recibir nuestro boletín informativo o proporcionar otros detalles completando un formulario, puede proporcionarnos datos personales, como su correo electrónico, nombre, apellido, ciudad de residencia, organización, número de teléfono. Puede optar por no proporcionarnos sus datos personales, pero es posible que no pueda aprovechar algunas de las funciones del sitio web. Por ejemplo, no podrá recibir nuestro boletín o contactarnos directamente desde el sitio web. Los usuarios que no estén seguros de qué información es obligatoria pueden ponerse en contacto con nosotros a través de barbertendence@gmail.com.
Tus derechos:

Si es residente europeo, tiene los siguientes derechos relacionados con sus datos personales:

    El derecho a ser informado.
    El derecho de acceso.
    El derecho a la rectificación.
    El derecho de supresión.
    El derecho a restringir el procesamiento.
    El derecho a la portabilidad de los datos.
    El derecho a oponerse.
    Derechos en relación con la toma de decisiones automatizada y elaboración de perfiles.

Si desea ejercer este derecho, comuníquese con nosotros a través de la información de contacto a continuación.

Además, si es residente europeo, notamos que estamos procesando su información para cumplir con los contratos que podamos tener con usted (por ejemplo, si realiza un pedido a través del Sitio), o para perseguir nuestros intereses comerciales legítimos enumerados arriba. Además, tenga en cuenta que su información puede transferirse fuera de Europa, incluidos Canadá y los Estados Unidos.
Enlaces a otros sitios web:

Nuestro sitio web puede contener enlaces a otros sitios web que no son de nuestra propiedad ni están controlados por nosotros. Tenga en cuenta que no somos responsables de dichos otros sitios web ni de las prácticas de privacidad de terceros. Lo alentamos a que tenga cuidado cuando abandone nuestro sitio web y lea las declaraciones de privacidad de cada sitio web que pueda recopilar información personal.
Seguridad de información:

Protegemos la información que proporciona en servidores informáticos en un entorno controlado y seguro, protegido contra el acceso, uso o divulgación no autorizados. Mantenemos medidas de seguridad administrativas, técnicas y físicas razonables para proteger contra el acceso, uso, modificación y divulgación de datos personales no autorizados bajo su control y custodia. Sin embargo, no se puede garantizar la transmisión de datos a través de Internet o de una red inalámbrica.
Divulgación jurídica:

Divulgaremos cualquier información que recopilemos, usemos o recibamos si así lo requiere o lo permite la ley, como para cumplir con una citación o un proceso legal similar, y cuando creamos de buena fe que la divulgación es necesaria para proteger nuestros derechos, proteger su seguridad o la seguridad de otros, investigar fraudes o responder a una solicitud del gobierno.
Información del contacto:

Si desea comunicarse con nosotros para obtener más información sobre esta Política o desea comunicarse con nosotros con respecto a cualquier asunto relacionado con los derechos individuales y su Información personal, puede enviar un correo electrónico a barbertendence@gmail.com.

    </pre>
  </div>
</template>

<script>
export default {
  name: 'PrivacyPolicies',
  layout: 'default-lay',
  data() {
    return {
      auth: this.$auth,
    }
  },

  mounted() {
    const auth = this.$auth
    auth.$storage.setLocalStorage(
      'url',
      'https://api-tendence-testing.herokuapp.com'
    )
    auth.$storage.setLocalStorage('urlFront', 'https://tendence.herokuapp.com')
  },
  methods: {},
}
</script>

<style>
@font-face {
  font-family: 'Akira';
  src: url('../static/fonts/AkiraExpandedDemo.otf') format('otf');
}

#home-heading {
  color: white;
}

body,
html {
  background-image: url('../static/img/barberbackground.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: repeat-y;
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
}

#BT-home {
  width: 720px;
}
</style>
