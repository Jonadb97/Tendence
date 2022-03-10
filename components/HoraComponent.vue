<template>
    <div v-if="$parent.HoySeen" id="HoraComponentDiv">
        <b-field label="Seleccionar hora">
        <b-timepicker
            v-model="FechaHour"
            placeholder="Click para seleccionar..."
            :min-time="minTime"
            :max-time="maxTime">
            <b-button
                label="Ok"
                type="is-success"
                icon-left="check"
                outlined
                @click="$parent.TurnoForm.FechaTurno = Hoy + ' ' + FechaHour.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})" />
        </b-timepicker>
    </b-field>
    </div>
</template>

<script>
  export default {
        data() {
            const Hoy = new Date().toLocaleDateString()
            const FechaHour = null
            const min = new Date()
            min.setHours(17)
            min.setMinutes(0)
            const max = new Date()
            max.setHours(21)
            max.setMinutes(0)
            return {
                minTime: min,
                maxTime: max,
                FechaHour,
                Hoy
            }
        }
    }
</script>