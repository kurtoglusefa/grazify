<template>
  <b-card class="shoutout-wall">
    <template #header>
      <h2 class="text-center text-primary mb-0">Shout-Out Wall</h2>
    </template>

    <b-card-body class="shoutout-body">

      <!-- Shout-Out Form -->
      <b-form @submit.prevent="submitShout" class="mb-4">
        <b-row class="g-2">
          <b-col>
            <b-form-input
                v-model="newShout.sender"
                placeholder="Your name"
                required
            />
          </b-col>
          <b-col>
            <b-form-input
                v-model="newShout.receiver"
                placeholder="Recipient"
                required
            />
          </b-col>
        </b-row>
        <b-form-textarea
            v-model="newShout.message"
            placeholder="Write a kind message..."
            rows="2"
            class="mt-2"
            required
        />
        <b-button type="submit" variant="primary" class="mt-2 w-100">
          Send Shout-Out
        </b-button>
      </b-form>

      <!-- Shout-Out List -->
      <transition-group name="fade-slide" tag="ul" class="list-unstyled">
        <li v-for="shout in shouts" :key="shout.id" class="mb-2 p-2 border rounded bg-white shout-item shadow-sm">
          <div class="d-flex justify-content-between align-items-center flex-wrap">
            <div>
              <span class="badge bg-primary me-1">{{ shout.sender }}</span>
              <span class="me-1">➤</span>
              <span class="badge bg-success me-1">{{ shout.receiver }}</span>
            </div>
            <small class="text-muted">{{ formatTimestamp(shout.timestamp) }}</small>
          </div>
          <p class="mt-2 mb-0 fst-italic">“{{ shout.message }}”</p>
        </li>
      </transition-group>

      <p v-if="shouts.length === 0" class="text-center text-muted">No shout-outs yet!</p>
    </b-card-body>
  </b-card>
</template>

<script>
export default {
  name: "ShoutOutWall",
  data() {
    return {
      shouts: [],
      newShout: {
        sender: "",
        receiver: "",
        message: "",
      },
    };
  },
  mounted() {
    this.fetchShouts();
    setInterval(this.fetchShouts, 5000);
  },
  methods: {
    async fetchShouts() {
      try {
        const response = await fetch("http://localhost:3000/shouts");
        if (!response.ok) throw new Error("Failed to load shout-outs");
        this.shouts = await response.json();
      } catch (error) {
        console.error("Error fetching shout-outs:", error);
      }
    },
    formatTimestamp(timestamp) {
      return new Date(timestamp).toLocaleString();
    },
    async submitShout() {
      const {sender, receiver, message} = this.newShout;

      if (!sender || !receiver || !message) return;

      try {
        const response = await fetch("http://localhost:3000/shouts", {
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify(this.newShout),
        });

        if (!response.ok) throw new Error("Failed to send shout-out");

        const inserted = await response.json();
        this.shouts.unshift({
          id: inserted.id || Date.now(),
          sender,
          receiver,
          message,
          timestamp: new Date().toISOString(),
        });

        this.newShout = {sender: "", receiver: "", message: ""};
      } catch (error) {
        console.error("Error submitting shout-out:", error);
      }
    },
  },
};
</script>

<style scoped>
.shoutout-wall {
  max-height: 80vh;
  overflow-y: auto;
  background-color: #f5f9ff;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
}

.shoutout-body {
  padding: 12px;
}

/* Animations */
.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.fade-slide-enter-active {
  transition: all 0.4s ease;
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.fade-slide-leave-active {
  transition: all 0.4s ease;
}

.shout-item {
  transition: all 0.4s ease;
}
</style>
