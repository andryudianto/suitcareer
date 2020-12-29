<template>
    <b-card :title=event.name :sub-title=event.Location.name>
    <b-card-text>
        <div> {{event.start}} - {{event.end}} </div>
        <div> {{ event.Tickets[0].typeTicket }} => {{ event.Tickets[0].price }} </div>
        <div> {{ event.Tickets[1].typeTicket }} => {{ event.Tickets[1].price }} </div>
        <div> {{ event.Tickets[2].typeTicket }} => {{ event.Tickets[2].price }} </div>
    </b-card-text>

    <b-card-text>To Order this ticket please click link below</b-card-text>
    <a href="#" class="card-link">Card link</a>
    <b-link href="#" class="card-link">Another link</b-link>
    </b-card>
</template>

<script>
export default {
  props: ['event'],
  name: 'EventCard',
  methods: {
    generateDate (date) {
      const d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

       if (month.length < 2) {
        month = '0' + month;
       }
       if (day.length < 2) {
        day = '0' + day; 
       }
       return [year, month, day].join('-');
    }
  }
}
</script>

<style>

</style>
