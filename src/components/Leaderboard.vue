<template>
  <b-card class="leaderboard-card">
    <template #header>
      <h2 class="text-center text-success mb-0">Leaderboard</h2>
    </template>
    <b-card-body>
      <!-- Leaderboard Table -->
      <b-table
          striped hover
          :items="leaderboard"
          :fields="fields"
          class="text-center">
        <!-- Rank Column -->
        <template #cell(rank)="data">
          <strong>#{{ data.index + 1 }}</strong>
        </template>
        <!-- Thanks Count with Badge -->
        <template #cell(thanksCount)="data">
          <b-badge variant="success" pill>{{ data.item.thanksCount }}</b-badge>
        </template>
      </b-table>
    </b-card-body>
  </b-card>
</template>

<script>
export default {
  data() {
    return {
      leaderboard: [],
      fields: [
        {key: "rank", label: "#"},
        {key: "name", label: "User"},
        {key: "thanksCount", label: "Thanks"},
      ],
    };
  },
  mounted() {
    this.fetchLeaderboard();
    setInterval(this.fetchLeaderboard, 5000);
  },
  methods: {
    fetchLeaderboard() {
      fetch("http://localhost:3000/leaderboard")
          .then((res) => res.json())
          .then((data) => {
            this.leaderboard = data;
          })
          .catch((err) => console.error(err));
    },
  },
};
</script>

<style scoped>
.leaderboard-card {
  padding: 10px;
  border: 1px solid #ccc;
  background: #f9f9f9;
  border-radius: 8px;
}

h2 {
  font-size: 1.5rem;
}

.badge {
  font-size: 1rem;
}
</style>
