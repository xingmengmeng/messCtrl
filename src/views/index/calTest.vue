<template>
    <div>
        <datepicker v-model="date"></datepicker>
        <datepicker v-model="cc" :min="date"></datepicker>
    </div>
</template>

<script>
    import datepicker from '../../components/Datepicker.vue';
    export default {
        data() {
            return {
                date: '2016-12-10',
                cc:'2016-12-11'
            }
        },
        components: { datepicker }
    }
</script>

