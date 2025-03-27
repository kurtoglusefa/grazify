<template>
  <b-container class="profile-container">
    <b-row class="justify-content-center">
      <b-col md="10">
        <b-card class="profile-card">

          <b-card-header class="bg-success text-white">
            <b-row class="align-items-center">
              <b-col class="d-flex align-items-center">
                <b-avatar variant="light" size="50px"></b-avatar>
                <h3 class="ml-3">Welcome, {{ user.name }}!</h3>
              </b-col>
              <b-col class="text-right">
                <b-button variant="danger" @click="showLogoutModal = true">Logout</b-button>
              </b-col>
            </b-row>
          </b-card-header>

          <b-card-body>
            <b-container>
              <b-row class="mb-2">
                <b-col md="4">
                  <b-card class="sub-card">User Avatar Upload</b-card>
                </b-col>
                <b-col md="4">
                  <b-card class="sub-card">Personalized Bio</b-card>
                </b-col>
                <b-col md="4">
                  <b-card class="sub-card">Badges & Achievements</b-card>
                </b-col>
              </b-row>

              <b-row>
                <b-col md="4">
                  <b-card class="sub-card">Activity History</b-card>
                </b-col>
                <b-col md="4">
                  <b-card class="sub-card">Contribution Stats</b-card>
                </b-col>
                <b-col md="4">
                  <b-card class="sub-card">Future Expansion</b-card>
                </b-col>
              </b-row>
            </b-container>
          </b-card-body>

        </b-card>
      </b-col>
    </b-row>

    <b-modal v-model="showLogoutModal" title="Confirm Logout" ok-title="Logout" cancel-title="Cancel" @ok="logout">
      Are you sure you want to log out?
    </b-modal>
  </b-container>
</template>

<script>
export default {
  data() {
    return {
      user: {id: "", name: "", thanksCount: 0},
      showLogoutModal: false,
    };
  },
  mounted() {
    this.fetchUserProfile();
  },
  methods: {
    async fetchUserProfile() {
      const userId = this.$route.params.id;
      try {
        const response = await fetch(`http://localhost:3000/users/profile/${userId}`);
        if (!response.ok) throw new Error("User not found");
        this.user = await response.json();
      } catch (error) {
        console.error("Error fetching profile:", error);
        this.$router.push("/");
      }
    },
    logout() {
      localStorage.removeItem("user");
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>

.profile-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  padding-top: 20px;
}


.profile-card {
  width: 1100px;
  height: 600px;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  background: white;
  text-align: center;
}


.sub-card {
  height: 120px;
  font-size: 14px;
  text-align: center;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.b-button {
  font-size: 16px;
}
</style>
