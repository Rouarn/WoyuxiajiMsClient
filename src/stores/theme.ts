import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useThemeStore = defineStore(
  'theme',
  () => {
    const isDark = ref(false)

    const toggleTheme = () => {
      isDark.value = !isDark.value
    }

    watch(
      isDark,
      (val) => {
        if (val) {
          document.documentElement.classList.add('dark')
        } else {
          document.documentElement.classList.remove('dark')
        }
      },
      { immediate: true },
    )

    return {
      isDark,
      toggleTheme,
    }
  },
  {
    persist: true,
  },
)
