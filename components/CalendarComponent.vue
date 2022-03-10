<template>
    <div id="CalendarComponentDiv">
        <b-field v-if ="$parent.OtroDiaSeen" label="Seleccionar Fecha y Hora">
        <b-datetimepicker
        v-model="FechaCalendar"
        inline
        placeholder="Click para seleccionar..."
        :min-datetime="minDatetime"
        :max-datetime="maxDatetime"
        :locale="es-AR"
        >
        
        <template #right>
                <b-button
                    label="Ok"
                    type="is-success"
                    icon-left="check"
                    outlined
                     @click="$parent.TurnoForm.FechaTurno = FechaCalendar.toLocaleDateString() + ' ' + FechaCalendar.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})"/>
            </template>
        </b-datetimepicker>
        </b-field>
    </div>
</template>

<script>
export default {
    data() {
            const FechaCalendar = null
            const min = new Date()
            min.setDate(min.getDate() - -1)
            min.setHours(17)
            min.setMinutes(0)
            min.setSeconds(0)
            const max = new Date()
            max.setDate(max.getDate() + 7)
            max.setHours(21)
            max.setMinutes(0)
            max.setSeconds(0)
            return {
                minDatetime: min,
                maxDatetime: max,
                FechaCalendar
        }}
}
</script>

<style>

</style>