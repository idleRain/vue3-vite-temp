import { createPinia } from 'pinia'
import useExampleStore from '@/store/modules/example'

const pinia = createPinia()

export const useStore = () => ({
  example: useExampleStore()
})

export { useExampleStore }

export default pinia
