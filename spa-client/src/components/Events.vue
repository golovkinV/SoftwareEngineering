<template>
  <div class="container container-lrl">
    <h3>Events</h3>
    <hr>
    <table class="table table-striped table-bordered">
      <thead>
      <tr>
        <th>Name</th>
        <th>Dates</th>
        <th>Participants</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="event in events" :key="event.id" v-on:click="openDetail(event.id)">
        <td>{{event.name}}</td>
        <td>{{event.start}} - {{event.finish}}</td>
        <td>{{event.users.length}}</td>
      </tr>
      </tbody>
    </table>
    <div style="text-align: center; margin-top: 30px" v-if="isAdmin">
      <button v-on:click="addEvent">Add Event</button>
    </div>
  </div>
</template>

<script>
import EventService from "@/services/EventService";

export default {
  name: "Events",
  data() {
    return {
      events: [],
      isAdmin: Boolean
    };
  },
  methods: {
    openDetail(eventId) {
      this.$router.push(`/events/${eventId}`)
    },
    fetchEvents() {
      EventService.getAll()
          .then(response => {
            const events = response.data
            this.events = events
                .sort( (a, b) => new Date(b.start) - new Date(a.start))
          })
          .catch( e => {
            console.log(e)
          })
    },
    refreshList() {
      this.fetchEvents();
    },
    addEvent() {
      this.$router.push("/events/add")
    }
  },
  mounted() {
    this.fetchEvents();
    const authUser = JSON.parse(localStorage.getItem("user"));
    this.isAdmin = authUser.role.name === "Admin"
  }
}
</script>

<style scoped>
h3 {
  text-align: center;
}
.container-lrl {
  margin-top: 5%;
  margin-bottom: 5%;
  width: 100%;
  border-radius: 3px;
  background: #fff;
  padding: 5%;
  box-shadow: 0 5px 8px 0 rgba(0, 0, 0, 0.2), 0 9px 26px 0 rgba(0, 0, 0, 0.19);
}
table {
  text-align: center;
}
tr {
  cursor: pointer;
}
button {
  font-weight: 600;
  background-color: #0062cc;
  color: #fff;
  width: 18%;
  border-radius: 1rem;
  padding-block: 5px;
  padding-inline: 24px;
  border: none;
  outline:none;
  cursor: pointer;
}
</style>