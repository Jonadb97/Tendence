<template>
    <div class="flex flex-row justify-center items-center text-center">
        <!-- Form starts here -->

        <section class="TurnoForm">
          <div class="field">

            <label  class="label">Nombre</label>
              <div class="control">
                <input id="NombreLabel" v-model="TurnoForm.nombre"  class="input" type="text" placeholder="Tu nombre acá">


              </div>
          </div>

          <div class="field">

            <label  class="label">Apellido</label>
              <div class="control">
                <input id="NombreLabel" v-model="TurnoForm.apellido"  class="input" type="text" placeholder="Tu apellido acá">


              </div>
          </div>

          <div class="field">

            <label  class="label">Mail</label>
              <div class="control">
                <input id="NombreLabel" v-model="TurnoForm.mail"  class="input" type="text" placeholder="Tu mail acá">


              </div>
          </div>

          <div class="field">

            <div class="CalendarCheckBox">
                
                <div v-if ="HoySeen || !OtroDiaSeen" id="HoyDiv" class="inline-flex">
                    <label class="checkbox">
                    <input id="Hoy" v-model="HoySeen" type="checkbox">
                    Hoy
                    <HoraComponent />
                    </label>
                </div>

                <div v-if="OtroDiaSeen || !HoySeen" id="OtroDiaDiv" class="inline-flex">
                    <label class="checkbox">
                    <input id="OtroDia" v-model="OtroDiaSeen" type="checkbox">
                    Otro día
                    <CalendarComponent />
                    </label>
                </div>
            </div>
            
          </div>

          <div>
            <label class="label">Tipo de corte</label>
            <div class="flex flex-row text-black">
              <button class="text-black" @click="TurnoForm.tipoCorte = 'Solo pelo' "  ><div class="p-4 m-4"><img class="w-32 rounded-full" src="../static/img/cortePelo.png" alt="Pelo"> <br> <p class="flex flex-row justify-center items-center text-center text-xs">Corte de pelo</p></div></button>
              <button @click="TurnoForm.tipoCorte = 'Pelo y barba' " ><div class="p-4 m-4"><img class="w-32 rounded-full" src="../static/img/cortePeloyBarba.png" alt="Pelo y Barba"> <br> <p class="flex flex-row justify-center items-center text-center text-xs">Corte de Pelo y Barba</p></div></button>
            </div>
          </div>
          
          <!-- Turno flotador -->

          <div id="TurnoFlotador" class="border rounded-lg m-2 p-2 text-left">
              <h1 class="font-bold m-1 p-1">Turno:</h1>
                <p class="m-1 p-1">Nombre y apellido: {{ TurnoForm.nombre + ' ' + TurnoForm.apellido }} </p>
                <p class="m-1 p-1">Mail: {{ TurnoForm.mail }}</p>
                <p class="m-1 p-1">Fecha: {{ TurnoForm.FechaTurno }}</p>
                <p class="m-1 p-1">Tipo de corte: {{ TurnoForm.tipoCorte }}</p>
          </div>
        </section>

        <!-- Form ends here -->
    </div>
</template>

<script>
import CalendarComponent from "./FormComponents/CalendarComponent.vue";
import HoraComponent from "./FormComponents/HoraComponent.vue";
export default {
    components: { CalendarComponent, HoraComponent }, 

    data: () => ({
        TurnoForm: {
            nombre: "",
            apellido: "",
            mail: "",
            FechaTurno: "",
            tipoCorte: ""
        },
        HoySeen: false,
        OtroDiaSeen: false,
    }),
    
}

</script>

<style>
#TurnoFlotador {
    margin-right: 20%;
    border-color: rgb(48, 48, 48);
    background-color: #2E2E2E;
    color: white;
}

.TurnoForm {
    margin-top: 3.5rem;
}

#NombreLabel {
    width: 15rem;
}

.CalendarCheckBox {
    padding: 0.5rem;
    font-size: 1.5rem;
}

label > input {
    height: 1.2rem;
    width: 1.2rem;
}

button {
     color: rgb(49, 25, 25);
}

button:hover{
    color: rgb(44, 44, 44);
}

@keyframes imganimation {
    from {width: 8rem;
    height: 8rem;}
    to {width: 10rem;
    height: 10rem;}
}

button > div > img:hover{
    animation-name: imganimation;
    animation-duration: 0.5s;
    animation-timing-function: ease-in-out;
    animation-direction: reverse;
}
</style>