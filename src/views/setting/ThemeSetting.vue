<template>
  <div class="theme-setting">
    <setting-item :lable="t('theme.mode')">
      <div class="theme-mode">
        <a-tooltip v-for="item in themeModes" :title="item.name" :key="item.name">
          <div class="theme-item" @click="theme.mode = item.mode">
            <img :src="item.icon" />
            <transition name="scale">
              <check-circle-filled class="select-icon" v-if="item.mode === theme.mode" />
            </transition>
          </div>
        </a-tooltip>
      </div>
    </setting-item>
    <setting-item :lable="t('theme.primaryColor')">
      <color-radio v-model:value="theme.primaryColor" :colors="primaryColors" />
    </setting-item>
    <setting-item :lable="t('theme.customColor')">
      <div class="custom-color-input">
        <a-input
          v-model:value="customColorInput"
          :placeholder="t('theme.customColorPlaceholder')"
          allow-clear
          style="width: 200px"
          @pressEnter="applyCustomColor"
        >
          <template #prefix>
            <div
              class="color-preview"
              :style="{ backgroundColor: isValidHex(customColorInput) ? customColorInput : '#ccc' }"
            />
          </template>
        </a-input>
        <a-button type="primary" size="small" :disabled="!isValidHex(customColorInput)" @click="applyCustomColor">
          应用
        </a-button>
      </div>
    </setting-item>
    <setting-item horizontal v-if="background.type === BackgroundType.Local">
      <template #lable>
        <span>
          {{ t('theme.wallpaperPalette') }}
          <a-tag color="warning">{{ t("common.experimen") }}</a-tag>
        </span>
      </template>
      <a-switch
        :checked="isColorPalette"
        :loading="loading.colorPalette"
        @change="changeColorPalette"
      />
    </setting-item>
  </div>
</template>

<script lang="ts" setup>
import { ThemeMode } from "@/types/setting"
import { CheckCircleFilled } from "@ant-design/icons-vue"
import AutoMode from "@/assets/auto-mode.svg"
import LightMode from "@/assets/light-mode.svg"
import DarkMode from "@/assets/dark-mode.svg"
import { useSettingStore } from "@/store"
import { useI18n } from "vue-i18n"
import { storeToRefs } from "pinia"
import { computed, ref } from "vue"
import { isEmpty } from "@/utils/common"
import { BackgroundType } from "@/types/setting"
import { reactive } from "vue"

const themeModes = [
  {
    name: "跟随系统",
    mode: ThemeMode.Auto,
    icon: AutoMode
  },
  {
    name: "浅色模式",
    mode: ThemeMode.Light,
    icon: LightMode
  },
  {
    name: "深色模式",
    mode: ThemeMode.Dart,
    icon: DarkMode
  }
]

const { t } = useI18n()
const settingStore = useSettingStore()
const { theme, primaryColors, background } = storeToRefs(settingStore)
const loading = reactive({ colorPalette: false })
const isColorPalette = computed(() => !isEmpty(theme.value.colorPalette))

const customColorInput = ref("")

function isValidHex(color: string): boolean {
  return /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(color)
}

function applyCustomColor() {
  if (isValidHex(customColorInput.value)) {
    theme.value.primaryColor = customColorInput.value
  }
}

async function changeColorPalette(checked: any) {
  if (checked) {
    settingStore.loadWallpaperPalette()
  } else {
    theme.value.colorPalette = []
  }
}
</script>

<style lang="less">
.theme-setting {
  .theme-mode {
    display: flex;
    height: 45px;
    column-gap: 8px;

    .theme-item {
      position: relative;
      cursor: pointer;

      img {
        height: 45px;
        width: 52px;
      }

      .select-icon {
        color: var(--primary-color);
        position: absolute;
        bottom: 8px;
        right: 8px;
      }
    }
  }

  .custom-color-input {
    display: flex;
    align-items: center;
    column-gap: 8px;

    .color-preview {
      width: 14px;
      height: 14px;
      border-radius: 3px;
      border: 1px solid #d9d9d9;
      transition: background-color 0.3s ease;
    }
  }
}
</style>
