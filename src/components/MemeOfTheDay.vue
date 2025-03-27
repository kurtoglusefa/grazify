<template>
  <b-card class="meme-card">
    <template #header>
      <h2 class="text-center text-success mb-0">Meme of the Day</h2>
    </template>
    <b-card-body class="text-center">
      <template v-if="memeUrl">
        <a :href="memePostLink" target="_blank">
          <img :src="memeUrl" alt="Meme of the Day" class="meme-img" />
        </a>
        <p class="meme-title">{{ memeTitle }}</p>
      </template>
      <p v-else>Loading...</p>
    </b-card-body>
  </b-card>
</template>

<script>
export default {
  data() {
    return {
      memeUrl: null,
      memePostLink: null,
      memeTitle: null,
    };
  },
  mounted() {
    this.fetchMeme();
  },
  methods: {
    fetchMeme() {
      fetch("https://meme-api.com/gimme")
          .then((res) => res.json())
          .then((data) => {
            this.memeUrl = data.url;
            this.memePostLink = data.postLink;
            this.memeTitle = data.title;
          })
          .catch((err) => console.error("Error fetching meme:", err));
    },
  },
};
</script>

<style scoped>
.meme-card {
  padding: 10px;
  border: 1px solid #ccc;
  background: #f9f9f9;
  border-radius: 8px;
}

.meme-img {
  max-width: 100%;
  height: auto;
  border-radius: 5px;
}

.meme-title {
  font-size: 0.9rem;
  color: #555;
  margin-top: 5px;
}
</style>
