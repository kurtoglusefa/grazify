<template>
  <div>
    <h2>Leaderboard</h2>
    <ul>
      <li v-for="user in users" :key="user.name">
        {{ user.name }} - {{ user.thanksCount }} Thanks
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      users: [],
    };
  },
  mounted() {
    fetch('http://localhost:3000/leaderboard')
        .then((res) => res.json())
        .then((data) => {
          this.users = data;
        })
        .catch((err) => console.error(err));
  },
};
</script>
