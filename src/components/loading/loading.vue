<template>
  <div class="fixed inset-0 flex justify-center items-center bg-[#fff9] z-[9999]">
    <div class="loader w-[40px] h-[40px]"></div>
  </div>
</template>

<style scoped>
.loader {
  --c: no-repeat orange;
  background: var(--c), var(--c), var(--c), var(--c);
  background-size: 21px 21px;
  animation: l5 1.5s infinite cubic-bezier(0.3, 1, 0, 1);
}

@keyframes l5 {
  0% {
    background-position:
      0 0,
      100% 0,
      100% 100%,
      0 100%;
  }

  33% {
    background-position:
      0 0,
      100% 0,
      100% 100%,
      0 100%;
    width: 60px;
    height: 60px;
  }

  66% {
    background-position:
      100% 0,
      100% 100%,
      0 100%,
      0 0;
    width: 60px;
    height: 60px;
  }

  100% {
    background-position:
      100% 0,
      100% 100%,
      0 100%,
      0 0;
  }
}
</style>
