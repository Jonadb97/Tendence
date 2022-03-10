<template>
    <div id="MainContainer">
        <h2>Agendar nuevo turno</h2>

        <AgendarNuevoTurnoForm/>
    </div>
</template>

<script>
import AgendarNuevoTurnoForm from "../../components/AgendarNuevoTurnoForm.vue";
export default {
    name: "NuevoTurnoForm",
    components: { AgendarNuevoTurnoForm },
    layout: "default-lay"
}
</script>

<style>
</style>