<template>
  <div id="app">
    <Login />
    <Leaderboard />
  </div>
</template>

<script>
import Login from './components/Login.vue';
import Leaderboard from './components/Leaderboard.vue';

export default {
  name: 'App',
  components: {
    Login,
    Leaderboard,
  },
};
</script>

<style>
/* Add some basic styling if needed */
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  margin-top: 20px;
}
</style>

