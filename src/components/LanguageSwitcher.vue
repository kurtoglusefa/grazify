<template>
  <div class="language-switcher">
    <b-button @click="changeLanguage('en')" :variant="currentLang === 'en' ? 'success' : 'secondary'"
              class="flag-button">
      <img src="@/assets/flags/gb.svg" alt="English" class="flag-image"/>
    </b-button>
    <b-button @click="changeLanguage('it')" :variant="currentLang === 'it' ? 'success' : 'secondary'"
              class="flag-button">
      <img src="@/assets/flags/it.svg" alt="Italian" class="flag-image"/>
    </b-button>
  </div>
</template>

<script>
import {useI18n} from "vue-i18n";
import {ref} from "vue";

export default {
  setup() {
    const {locale} = useI18n();
    const currentLang = ref(locale.value);

    const changeLanguage = (lang) => {
      locale.value = lang;
      currentLang.value = lang;
      localStorage.setItem("selectedLanguage", lang);
    };

    return {currentLang, changeLanguage};
  },
};
</script>

<style scoped>
.language-switcher {
  display: flex;
  gap: 15px;
  justify-content: center;
}

.flag-button {
  width: 80px;
  height: 50px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  overflow: hidden;
}


.flag-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 5px;
}
</style>
