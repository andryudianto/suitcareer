<template>
  <div class="home">
    <div v-for=" event in events " :key="event.id">
      <EventCard :event="event" />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import EventCard from '../components/EventCard'
export default {
  components: {
    EventCard
  },
  name: 'Home',
  created () {
    this.$store.dispatch('fetchEvents')
  },
  computed: {
    events () {
      return this.$store.state.events
    }
  }
}
</script>
