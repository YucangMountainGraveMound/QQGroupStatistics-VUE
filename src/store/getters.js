import formatter from '@/utils/formatter'

/**
 * auth
 */
export const authLoading = state => state.auth.loading
export const authError = state => state.auth.error

/**
 * app
 */
export const heatMapRange = state => {
  let menuWidth = state.app.menu_collapse ? 78 : 200
  let range = parseInt((state.app.window_inner_width - 32 - menuWidth) / 90)
  if (range < 8) return 8
  if (range > 12) return 12
  return range
}

export const currentRouteName = state => state.route.name

export const imagesUser = state => state.chart.image_count_user
