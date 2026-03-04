<template>
  <footer class="about-warp">
    <p class="app-name">
      {{ appName }}
      <br />
      <span class="app-version">Version {{ appVersion }}</span>
    </p>

    <ul class="social">
      <li v-for="(url, name) of social">
        <a :href="url" target="_blank">{{ name }}</a>
      </li>
    </ul>

    <p class="copyright">
      <a href="https://github.com/Hurt-In-Dream/light-tab-page/blob/master/LICENSE" target="_blank">
        {{ t("about.license") }}
      </a>
      <br />
      Copyright © 2023 Devifish. Modified by HurtInDream.
      <br />
      All rights reserved.
    </p>
  </footer>
</template>

<script lang="ts" setup>
import { computed } from "vue"
import { useI18n } from "vue-i18n"

const { t } = useI18n()

const appName = import.meta.env.npm_package_name
const appVersion = import.meta.env.npm_package_version

const social = computed<Record<string, string>>(() => ({
  [t("about.projectHome")]: "https://github.com/Hurt-In-Dream/light-tab-page",
  [t("about.changelog")]: "https://github.com/Hurt-In-Dream/light-tab-page/blob/master/CHANGELOG.md",
  [t("about.feedback")]: "https://github.com/Hurt-In-Dream/light-tab-page/issues",
  [t("about.homepage")]: "https://hurtindream.de"
}))
</script>

<style lang="less">
.about-warp {
  .app-name {
    font-size: 14px;
    margin: 0;
  }
  .app-version {
    font-size: 12px;
  }

  .social {
    margin: 12px 0;
  }

  .copyright {
    margin: 0;
    font-size: 12px;
    color: #888;

    a {
      color: #888;
    }
  }
}
</style>
