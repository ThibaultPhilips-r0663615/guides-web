<template>
<v-app>
    <home-hero></home-hero>
    <main class="tw-z-30">
        <article class="marginBottomLarge">
            <activity-cards></activity-cards>
        </article>

        <article class="marginTopLarge marginBottomLarge">
            <section class="lol-future-walks marginTopLarge marginBottomLarge">
                <div v-if="themeWalks.length >= 1" class="lol-future-walks-content">
                    <h2 class="lol-general-header">
                        {{$t('home.FutureWalksHeader')}}
                    </h2>
                    <div class="lol-future-walks-content-elements">
                        <div v-for="themeWalk in themeWalks" :key="themeWalk.id" class="lol-future-walks-content-element" :style="{ backgroundImage: `url('${themeWalk.banner.fileDownloadUrl}')` }">
                            <div class="lol-future-walks-content-element-body">
                                <h1>{getCurrentTranslationProperty(themeWalk.titles, router.locale as string)}</h1>
                                <h1>
                                    {themeWalk.date}
                                </h1>
                                <h1>
                                    {themeWalk.startTime}
                                </h1>
                                <NuxtLink :to="`/${locale}/theme-walk/${themeWalk.id}`" class="btn btn-ghost-white">
                                    {{$t('home.FutureWalksButton')}}
                                </NuxtLink>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </article>

        <article class="marginTopLarge marginBottomLarge">
            <about-us></about-us>
        </article>

        <article class="marginTopLarge marginBottomLarge">
            <step-by-step></step-by-step>
        </article>

        <article class="marginTopLarge">
            <what-we-stand-for></what-we-stand-for>
        </article>
    </main>
    <c-footer class="marginTopLarge"></c-footer>
</v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import AboutUs from '~/components/AboutUs.vue'
import ActivityCards from '~/components/ActivityCards.vue'
import CFooter from '~/components/CFooter.vue'
import CHeader from '~/components/CHeader.vue'
import HomeHero from '~/components/HomeHero.vue'
import StepByStep from '~/components/StepByStep.vue'
import WhatWeStandFor from '~/components/WhatWeStandFor.vue'
import {
    ThemeWalk
} from '~/model/theme-walk'

export default Vue.extend({
    components: {
        CHeader,
        CFooter,
        StepByStep,
        WhatWeStandFor,
        AboutUs,
        ActivityCards,
        HomeHero
    },
    name: 'IndexPage',
    data() {
        return {
            themeWalks: [] as ThemeWalk[]
        }
    },
    computed: {
        locale() {
            return this.$store.state.locale
        },
    }
})
</script>

<style lang="scss" scoped>
body {

    .v-application {
        font-family: "Roboto", sans-serif;
        line-height: 1;
    }
}
</style>
