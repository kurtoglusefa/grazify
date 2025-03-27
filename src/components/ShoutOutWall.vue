<template>
  <b-container class="mt-5">
    <b-row class="justify-content-center">
      <b-col md="8">
        <b-card class="shoutout-card">
          <b-card-header class="bg-success text-white text-center">
            <h3>Shout-Out Wall</h3>
          </b-card-header>
          <b-card-body>
            <div class="shoutout-feed">
              <transition-group name="shout-animation" tag="ul" class="list-group">
                <li
                    v-for="(shout, index) in displayedShouts"
                    :key="shout.id"
                    class="list-group-item shout-item"
                    :class="{
                    'shout-center': index === 2,
                    'shout-faded': index !== 2,
                  }"
                >
                  <span class="shout-sender">{{ shout.sender }}</span>
                  <span class="shout-arrow"> ➡ </span>
                  <span class="shout-receiver">{{ shout.receiver }}</span>:
                  <span class="shout-message">"{{ shout.message }}"</span>
                </li>
              </transition-group>
            </div>
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  data() {
    return {
      shouts: [],
      displayedShouts: [],
      currentIndex: 0,
    };
  },
  mounted() {
    this.fetchShouts();
    setInterval(this.fetchShouts, 10000);
    setInterval(this.autoRotateShouts, 3000);
  },
  methods: {
    fetchShouts() {
      fetch("http://localhost:3000/shouts")
          .then((res) => res.json())
          .then((data) => {
            this.shouts = data;
            this.updateDisplayedShouts();
          })
          .catch((err) => console.error(err));
    },
    autoRotateShouts() {
      if (this.shouts.length > 2) {
        this.currentIndex = (this.currentIndex + 1) % this.shouts.length;
        this.updateDisplayedShouts();
      }
    },
    updateDisplayedShouts() {
      const totalShouts = this.shouts.length;
      if (totalShouts < 3) {
        this.displayedShouts = [...this.shouts];
      } else {
        this.displayedShouts = [
          this.shouts[(this.currentIndex + totalShouts - 1) % totalShouts],
          this.shouts[this.currentIndex],
          this.shouts[(this.currentIndex + 1) % totalShouts],
        ];
      }
    },
  },
};
</script>

<style scoped>

.shoutout-card {
  padding: 10px;
  border: 1px solid #ccc;
  background: #f9f9f9;
  border-radius: 8px;
  text-align: center;
}


.shoutout-feed {
  height: 130px;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  position: relative;
}


.shout-item {
  transition: all 1s ease-in-out;
  opacity: 0.5;
  font-size: 0.85rem;
  transform: scale(0.85);
  padding: 5px;
}


.shout-center {
  font-size: 1rem;
  font-weight: bold;
  opacity: 1;
  transform: scale(1);
}


.shout-faded {
  opacity: 0.3;
}

.shout-sender {
  font-weight: bold;
  color: #007bff;
}

.shout-receiver {
  font-weight: bold;
  color: #28a745;
}

.shout-message {
  font-style: italic;
  color: #555;
}

.shout-arrow {
  font-weight: bold;
  color: #000;
}
</style>
