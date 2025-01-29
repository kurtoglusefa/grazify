



<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-4">
        <div class="card">
          <div class="card-header bg-success text-white">
            <h2>Grazify</h2>
          </div>
          <div class="card-body">
            <form @submit.prevent="login">
              <div class="form-group mb-3">
                <input v-model="name" id="name" class="form-control" placeholder="Username" required />
              </div>
              <div class="form-group mb-3">
                <input v-model="password" id="password" type="password" class="form-control" placeholder="Password" required />
              </div>
              <button type="submit" class="btn btn-success w-25">Login</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      password: '',
    };
  },
  methods: {
    login() {
      fetch('http://localhost:3000/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: this.name, password: this.password }),
      })
          .then((res) => res.json())
          .then((data) => alert(data.message))
          .catch((err) => console.error(err));
    },
  },
};
</script>

