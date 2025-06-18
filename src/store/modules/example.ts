import { defineStore } from 'pinia'

const useExampleStore = defineStore('example', () => {
  const abc = ref('abc!')

  const getAbc = () => {
    return abc.value
  }

  const state = {
    abc
  }

  const actions = {
    getAbc
  }

  return { ...state, ...actions }
})

export default useExampleStore
