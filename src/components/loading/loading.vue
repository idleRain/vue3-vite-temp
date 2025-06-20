<template>
  <div class="fixed inset-0 flex justify-center items-center bg-[#fff9] z-[9999]">
    <div
      class="loader grid w-[50px] h-[50px] border-4 border-transparent rounded-full border-r-[#25b09b]"
    />
  </div>
</template>

<style scoped>
.loader {
  aspect-ratio: 1;
  animation: l15 1s infinite linear;
}

.loader::before,
.loader::after {
  content: '';
  grid-area: 1/1;
  margin: 2px;
  border: inherit;
  border-radius: 50%;
  animation: l15 2s infinite;
}

.loader::after {
  margin: 8px;
  animation-duration: 3s;
}

@keyframes l15 {
  100% {
    transform: rotate(1turn);
  }
}
</style>
