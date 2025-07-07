<template>
  <div class="fixed inset-0 z-[9999] flex items-center justify-center bg-[#fff9]">
    <div
      class="loader grid h-[50px] w-[50px] rounded-full border-4 border-transparent border-r-[#25b09b]"
    />
  </div>
</template>

<style scoped>
.loader {
  animation: l15 1s infinite linear;
  aspect-ratio: 1;
}

.loader::before,
.loader::after {
  grid-area: 1/1;
  animation: l15 2s infinite;
  margin: 2px;
  border: inherit;
  border-radius: 50%;
  content: '';
}

.loader::after {
  animation-duration: 3s;
  margin: 8px;
}

@keyframes l15 {
  100% {
    transform: rotate(1turn);
  }
}
</style>
