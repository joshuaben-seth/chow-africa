<template>
  <lazy-modal :open="open" @close="closeModal" :food-choice="currentOption" />
  <section v-if="loading" class="absolute h-screen w-screen bg-white/[.3] z-20 flex items-center justify-center">
    <loader />
  </section>
  <section class="w-screen h-screen md:w-3/6 mx-auto relative">
    <section class="h-[8%] w-full flex items-center justify-center py-3">
      <img :src="logo" alt="Chow Africa" class="h-full" />
    </section>
    <section class="h-[92%] pt-5">
      <section class="h-full bg-cover bg-top bg-no-repeat rounded-t-xl relative" :style="{
        backgroundImage: `url(${getPoster(currentOption.poster)})`
      }">
        <section
          class="absolute top-5 w-1/2 md:w-2/6 text-sm md:text-lg transform -translate-x-1/2 left-1/2 mx-auto py-2 text-center text-white rounded-full bg-primary">
          Feel like eating this?
        </section>
        <section class="absolute bottom-16 text-white w-11/12 transform -translate-x-1/2 left-1/2 mx-auto">
          <section class="bg-black/[.7] w-full py-4 rounded-xl px-2 mb-3">
            <section class="grid grid-cols-3 gap-2 md:grid-cols-9">
              <section class="col-span-2 md:col-span-7">
                <h2 class="text-white font-black md:text-2xl">
                  {{ currentOption.name }}
                </h2>

                <p class="text-white mt-2 text-xs font-extralight md:text-base">
                  Approx Price: ₦{{ currentOption.approxPrice.toLocaleString() }}
                </p>
              </section>
              <section class="md:col-span-2">
                <span class="bg-primary/[.4] text-bold text-center text-xs w-content p-2 rounded-full">🍝
                  {{ currentOption.category }}</span>
              </section>
            </section>
          </section>
          <section class="grid grid-cols-2 gap-4">
            <button @click="fetchNextOption" class="w-full py-4 bg-accent rounded-lg">Nope, Next?</button>
            <button @click="chooseOption" class="w-full py-4 bg-primary rounded-lg">Yes!</button>
          </section>
        </section>

      </section>
    </section>
  </section>
</template>
<script lang="ts" setup>
import logo from '~/assets/logo.svg';
import comingSoon from '~/assets/coming-soon-flyer.png';

const loading = ref(false);

const currentOption = ref({
  poster: ``,
  name: '',
  category: '',
  approxPrice: 0
})

const open = ref(false);

const chooseOption = () => {
  open.value = true;
}

const closeModal = () => {
  open.value = false;
}

const fetchNextOption = async () => {
  loading.value = true;
  const request = await fetch('https://mvp-api.chow.africa/choices');
  const choice = (await request.json()) as {
    data: {
      choice: Array<typeof currentOption.value>
    }
  };
  if (choice) {
    if (choice.data.choice.length) currentOption.value = choice.data.choice[0];
  }
  loading.value = false;
}

const getPoster = (poster: string) => {
  if (!poster || poster === '' || !poster.includes('http')) {
    return comingSoon;
  }
  return poster;
}

useHead({
  title: 'Chow'
})

onMounted(() => {
  nextTick(() => {
    fetchNextOption();
  })
})
</script>