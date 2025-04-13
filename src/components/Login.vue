<template>
  <b-container class="mt-6">
    <b-row class="justify-content-center">
      <b-col md="6">
        <b-card class="login-card">
          <b-card-header class="bg-success text-white text-center">
            <h2>{{ $t("appTitle") }}</h2>
          </b-card-header>
          <b-card-body>
            <b-form @submit.prevent="login">
              <b-form-group class="mb-3">
                <b-form-input
                    v-model="name"
                    id="name"
                    :placeholder="$t('login.username')"
                    required
                ></b-form-input>
              </b-form-group>
              <b-form-group class="mb-3">
                <b-form-input
                    v-model="password"
                    id="password"
                    type="password"
                    :placeholder="$t('login.password')"
                    required
                ></b-form-input>
              </b-form-group>
              <div class="d-flex justify-content-center">
                <b-button
                    type="submit"
                    variant="success"
                    class="mr-3"
                >
                  {{ $t("login.loginButton") }}
                </b-button>
                <b-button
                    variant="primary"
                    @click="showRegisterModal = true"
                >
                  {{ $t("login.signupButton") }}
                </b-button>
              </div>
            </b-form>
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>

    <div v-if="showRegisterModal" class="custom-modal-overlay">
      <div class="custom-modal">
        <div class="custom-modal-header">
          <h2>{{ $t("register.title") }}</h2>
          <button
              class="close-btn"
              @click="showRegisterModal = false"
          >
            &times;
          </button>
        </div>
        <div class="custom-modal-body">
          <b-form @submit.prevent="register">
            <b-form-group :label="$t('register.username')">
              <b-form-input
                  v-model="newUser.name"
                  required
              ></b-form-input>
            </b-form-group>
            <b-form-group :label="$t('register.password')">
              <b-form-input
                  v-model="newUser.password"
                  type="password"
                  required
              ></b-form-input>
            </b-form-group>
            <b-form-group :label="$t('register.confirmPassword')">
              <b-form-input
                  v-model="newUser.confirmPassword"
                  type="password"
                  required
              ></b-form-input>
            </b-form-group>
            <div class="d-flex justify-content-end">
              <b-button
                  variant="secondary"
                  class="mr-2"
                  @click="showRegisterModal = false"
              >
                {{ $t("register.cancel") }}
              </b-button>
              <b-button
                  type="submit"
                  variant="success"
              >
                {{ $t("register.submit") }}
              </b-button>
            </div>
          </b-form>
        </div>
      </div>
    </div>
  </b-container>
</template>

<script>
import {useRouter} from "vue-router";
import {useI18n} from "vue-i18n";
import {ref} from "vue";

export default {
  setup() {
    const router = useRouter();
    const {t} = useI18n();

    const name = ref("");
    const password = ref("");
    const showRegisterModal = ref(false);
    const newUser = ref({
      name: "",
      password: "",
      confirmPassword: "",
    });

    const login = () => {
      fetch("http://localhost:3000/users/login", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({name: name.value, password: password.value}),
      })
          .then((res) => res.json())
          .then((data) => {
            if (data.error) {
              alert(data.error);
            } else {
              alert(t("login.successMessage"));
              localStorage.setItem("user", JSON.stringify(data.user));
              router.push(`/profile/${data.user.id}`);
            }
          })
          .catch(() => {
            alert(t("login.errorMessage"));
          });
    };

    const register = () => {
      if (newUser.value.password !== newUser.value.confirmPassword) {
        alert(t("register.passwordMismatch"));
        return;
      }
      fetch("http://localhost:3000/users/register", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          name: newUser.value.name,
          password: newUser.value.password,
        }),
      })
          .then((res) => res.json())
          .then((data) => {
            alert(data.message);
            showRegisterModal.value = false;
          })
          .catch((err) => console.error(err));
    };

    return {
      router,
      t,
      name,
      password,
      showRegisterModal,
      newUser,
      login,
      register,
    };
  },
};
</script>

<style scoped>
.login-card {
  width: 400px;
}

.custom-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.custom-modal {
  background: white;
  width: 400px;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.custom-modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: black;
}
</style>
