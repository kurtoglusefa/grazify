<template>
  <div class="background">
    <!-- Language Switcher in the Top Right Corner -->
    <div class="language-switcher-container">
      <LanguageSwitcher/>
    </div>
    <router-view v-if="$route.path.startsWith('/profile')"></router-view>
    <div v-else class="main-container">
      <div class="left-column">
        <MemeOfTheDay/>
        <QuoteOfTheDay/>
      </div>
      <div class="center-column">
        <Login/>
        <ShoutOutWall/>
      </div>
      <Leaderboard class="leaderboard"/>
    </div>

    <svg version="1.1" xmlns="http://www.w3.org/2000/svg"
         xmlns:xlink="http://www.w3.org/1999/xlink" class="animated-waves"
         viewBox="0 0 1600 900" preserveAspectRatio="xMidYMax slice">
      <defs>
        <linearGradient id="bg">
          <stop offset="0%" style="stop-color:rgba(130, 158, 249, 0.06)"></stop>
          <stop offset="50%" style="stop-color:rgba(76, 190, 255, 0.6)"></stop>
          <stop offset="100%" style="stop-color:rgba(115, 209, 72, 0.2)"></stop>
        </linearGradient>
        <path id="wave" fill="url(#bg)" d="M-363.852,502.589c0,0,236.988-41.997,505.475,0
          s371.981,38.998,575.971,0s293.985-39.278,505.474,5.859s493.475,48.368,716.963-4.995v560.106H-363.852V502.589z"/>
      </defs>
      <g>
        <use xlink:href='#wave' opacity=".3">
          <animateTransform
              attributeName="transform"
              attributeType="XML"
              type="translate"
              dur="10s"
              calcMode="spline"
              values="270 230; -334 180; 270 230"
              keyTimes="0; .5; 1"
              keySplines="0.42, 0, 0.58, 1.0;0.42, 0, 0.58, 1.0"
              repeatCount="indefinite"/>
        </use>
        <use xlink:href='#wave' opacity=".6">
          <animateTransform
              attributeName="transform"
              attributeType="XML"
              type="translate"
              dur="8s"
              calcMode="spline"
              values="-270 230;243 220;-270 230"
              keyTimes="0; .6; 1"
              keySplines="0.42, 0, 0.58, 1.0;0.42, 0, 0.58, 1.0"
              repeatCount="indefinite"/>
        </use>
        <use xlink:href='#wave' opacity=".9">
          <animateTransform
              attributeName="transform"
              attributeType="XML"
              type="translate"
              dur="6s"
              calcMode="spline"
              values="0 230;-140 200;0 230"
              keyTimes="0; .4; 1"
              keySplines="0.42, 0, 0.58, 1.0;0.42, 0, 0.58, 1.0"
              repeatCount="indefinite"/>
        </use>
      </g>
    </svg>
  </div>
</template>

<script>
import {useRoute} from "vue-router";
import Login from "./components/Login.vue";
import Leaderboard from "./components/Leaderboard.vue";
import ShoutOutWall from "./components/ShoutOutWall.vue";
import MemeOfTheDay from "./components/MemeOfTheDay.vue";
import QuoteOfTheDay from "./components/QuoteOfTheDay.vue";
import LanguageSwitcher from "./components/LanguageSwitcher.vue";

export default {
  name: "App",
  components: {
    Login,
    Leaderboard,
    ShoutOutWall,
    MemeOfTheDay,
    QuoteOfTheDay,
    LanguageSwitcher,
  },
  setup() {
    const route = useRoute();
    return {route};
  },
};
</script>

<style>

.language-switcher-container {
  position: absolute;
  top: 10px;
  right: 20px;
  z-index: 1000;
}


.main-container {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  max-width: 1200px;
  margin: 50px auto;
  gap: 40px;
  position: relative;
  z-index: 1;
}


.left-column {
  flex: 1;
  padding: 15px;
  border-right: 2px solid rgba(255, 255, 255, 0.5);
  background: rgba(255, 255, 255, 0.8);
  border-radius: 8px;
}


.center-column {
  flex: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}


.leaderboard {
  flex: 1;
  padding: 15px;
  border-left: 2px solid rgba(255, 255, 255, 0.5);
  background: rgba(255, 255, 255, 0.8);
  border-radius: 8px;
}


.background {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: #0e4166;
  background-image: linear-gradient(to bottom, rgba(14, 65, 102, 0.86), #0e4166);
  overflow: hidden;
}


.animated-waves {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  box-sizing: border-box;
  display: block;
}
</style>
