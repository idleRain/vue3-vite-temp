import useExampleStore from './modules/example'

const pinia = createPinia()

export const useStore = () => ({
  example: useExampleStore()
})

export { useExampleStore }

export default pinia
