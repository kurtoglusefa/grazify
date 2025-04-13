<template>
  <div class="quote-card">
    <h4 class="quote-header">Inspiration</h4>
    <div class="quote-body">
      <p class="quote-text">{{ quote.text }}</p>
      <footer class="quote-author">- {{ quote.author }}</footer>
    </div>
  </div>
</template>

<script>
export default {
  name: "QuoteOfTheDay",
  data() {
    return {
      quote: {
        text: "Loading...",
        author: "Unknown",
      },
      intervalId: null,
    };
  },
  mounted() {
    this.fetchQuote();
    this.intervalId = setInterval(this.fetchQuote, 5000);
  },
  beforeUnmount() {
    clearInterval(this.intervalId);
  },
  methods: {
    async fetchQuote() {
      try {
        const response = await fetch("https://api.quotable.io/random");
        if (!response.ok) throw new Error(`Failed to fetch quote: ${response.status}`);
        const data = await response.json();
        this.quote.text = data.content || "Be inspired.";
        this.quote.author = data.author || "Unknown";
      } catch (error) {
        console.error("Error fetching quote:", error);
        this.setFallbackQuote();
      }
    },
    setFallbackQuote() {
      this.quote.text = "Push yourself, because no one else is going to do it for you.";
      this.quote.author = "Unknown";
    },
  },
};
</script>

<style scoped>
.quote-card {
  padding: 16px;
  border: 1px solid #ddd;
  background: #fdfdfd;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.quote-header {
  font-size: 18px;
  color: #007bff;
  margin-bottom: 12px;
}

.quote-body {
  font-size: 16px;
  color: #333;
}

.quote-text {
  font-weight: 500;
  margin-bottom: 8px;
}

.quote-author {
  font-size: 14px;
  font-style: italic;
  color: #555;
}
</style>
