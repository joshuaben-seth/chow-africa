<template>
  <TransitionRoot as="template" :show="open">
    <Dialog as="div" class="relative z-10" @close="$emit('close')">
      <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100"
                       leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"/>
      </TransitionChild>

      <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <TransitionChild as="template" enter="ease-out duration-300"
                           enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                           enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200"
                           leave-from="opacity-100 translate-y-0 sm:scale-100"
                           leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
            <DialogPanel
                class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
              <div class="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
                <button type="button"
                        class="rounded-md bg-white text-gray-400 hover:text-gray-500"
                        @click="$emit('close')">
                  <span class="sr-only">Close</span>
                  <XMarkIcon class="h-6 w-6" aria-hidden="true"/>
                </button>
              </div>
              <div>
                <div class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                  <CheckIcon class="h-6 w-6 text-green-600" aria-hidden="true"/>
                </div>
                <div v-if="!optionChosen" class="mt-3 text-center sm:mt-5">
                  <DialogTitle as="h3" class="text-base font-semibold leading-6 text-gray-900">
                    What would you like to do next?
                  </DialogTitle>
                  <div class="mt-2">
                    <p class="text-sm text-gray-500">Let us know so we can build it for you</p>
                  </div>
                </div>
                <div v-if="optionChosen" class="w-full mt-5">
                  <p class="w-full px-5 text-gray-500 text-center my-10">{{ message }}</p>
                  <p class="w-full text-center my-5">
                    <a href="https://waitlist.chow.africa" target="_blank"
                       class="w-full py-4 px-5 bg-accent rounded-lg text-white ">
                      Join the Wait List
                    </a>
                  </p>
                </div>
                <div v-else class="grid grid-cols-2 gap-3 mt-5 py-5">
                  <div v-for="o of options" :key="o.title"
                       @click="triggerClose"
                       class="p-2 bg-gray-100 duration-300 rounded-lg cursor-pointer hover:shadow-lg">
                    <div class="h-10 w-10 rounded-full bg-white my-3 p-1">
                      <img :src="o.icon"/>
                    </div>
                    <div class="mt-5 mb-3">
                      <h3 class="font-bold">{{ o.title }}</h3>
                      <p class="text-xs mt-2 text-gray-500">{{ o.description }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup lang="ts">
import {Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot} from '@headlessui/vue'
import {XMarkIcon} from '@heroicons/vue/24/outline'
import {CheckIcon} from '@heroicons/vue/24/solid'
import orderIcon from '~/assets/order.png'
import cookIcon from '~/assets/cook.png'
import restaurantIcon from '~/assets/restaurant.png'
import browseIcon from '~/assets/browse.png'

const message = `Noted! We're working to make these available for you. We'd like to let you know when it's ready.`
const optionChosen = ref(false);

const options = [
  {
    icon: orderIcon,
    title: 'Order Meal',
    description: `Have the meal cooked and delivered to you`
  },
  {
    icon: cookIcon,
    title: 'Prepare at Home',
    description: `Get recipes and ingredients to prepare the meal at home`
  },
  {
    icon: restaurantIcon,
    title: 'Find Restaurants',
    description: `See a list of places that have this meal and their contact details`
  },
  {
    icon: browseIcon,
    title: 'Continue Browsing',
    description: `Stay on the app and continue looking at food options`
  }
]

const triggerClose = () => {
  optionChosen.value = true;
}

defineProps<{
  open: boolean;
}>();

defineEmits(['close'])
onMounted(() => {
  optionChosen.value = false;
})
</script>