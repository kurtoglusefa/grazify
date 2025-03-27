<template>
  <b-card class="quote-card">
    <template #header>
      <h4 class="text-center text-primary mb-0">Inspiration</h4>
    </template>
    <b-card-body class="text-center quote-body">
      <blockquote class="blockquote">
        <p class="quote-text">{{ quote.text }}</p>
        <footer class="blockquote-footer quote-author">{{ quote.author }}</footer>
      </blockquote>
    </b-card-body>
  </b-card>
</template>

<script>
export default {
  data() {
    return {
      quote: {
        text: "Loading...",
        author: "Unknown",
      },
    };
  },
  mounted() {
    this.fetchQuote();
    setInterval(this.fetchQuote, 10000);
  },
  methods: {
    fetchQuote() {
      console.log("Fetching quote...");

      fetch("https://api.quotable.io/random")
          .then((res) => {
            console.log("Response received:", res);
            if (!res.ok) throw new Error("Failed to fetch quote");
            return res.json();
          })
          .then((data) => {
            console.log("Data received:", data);
            if (data.content && data.author) {
              this.quote.text = data.content;
              this.quote.author = data.author;
            } else {
              console.warn("Invalid quote data received:", data);
              this.quote.text = "Be the change that you wish to see in the world.";
              this.quote.author = "Mahatma Gandhi";
            }
          })
          .catch((err) => {
            console.error("Error fetching quote:", err);
            this.quote.text = "Keep pushing forward, no matter what.";
            this.quote.author = "Unknown";
          });
    }
  },
};
</script>

<style scoped>

.quote-card {
  padding: 8px;
  border: 1px solid #ccc;
  background: #f9f9f9;
  border-radius: 8px;
}


.quote-body {
  padding: 8px;
}

.quote-text {
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 6px;
}

.quote-author {
  font-size: 12px;
  font-style: italic;
  color: #6c757d;
}
</style>
