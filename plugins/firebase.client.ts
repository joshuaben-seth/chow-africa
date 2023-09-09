import {initializeApp} from 'firebase/app'
import {getAnalytics} from 'firebase/analytics'

export default defineNuxtPlugin(nuxtApp => {
    try {
        const config = useRuntimeConfig()

        const firebaseConfig = {
            apiKey: "AIzaSyDZjtmUcFShDLFjnq8CBwRM1x5uPcIO7QY",
            authDomain: "chow-c6d08.firebaseapp.com",
            projectId: "chow-c6d08",
            storageBucket: "chow-c6d08.appspot.com",
            messagingSenderId: "45071783623",
            appId: "1:45071783623:web:73c5d372761b31736dd0e2",
            measurementId: "G-SDKJVP1SB9"
        };

        const app = initializeApp(firebaseConfig)

        const analytics = getAnalytics(app)
        nuxtApp.vueApp.provide('analytics', analytics)
        nuxtApp.provide('analytics', analytics)
    } catch (e) {
        console.log('analytics not installed')
    }

})
