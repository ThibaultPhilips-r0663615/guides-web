<template>
<article>
    <section class="lol-walk-detail-hero">
        <div class="lol-walk-detail-hero-content" :style="{ backgroundImage: error ? `url('/images/placeholder.png)'` : 'linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(' + walk.banner.fileDownloadUrl + ')' }" :title="bannerHover === true ? '' : titleAlt" @mouseover="()=> setBannerHover(true)" @mouseleave="() => setBannerHover(false)">
            <div class="lol-walk-detail-hero-content-back">
                <NuxtLink :to="backUrl" :prefetch="false">
                    <i class="icon ion-md-arrow-round-back"></i>{{back}}
                </NuxtLink>
            </div>
            <div class="lol-walk-detail-hero-content-text">
                <h1>{{$getCurrentTranslationProperty(walk.titles, locale, 'title')}}</h1>
            </div>
        </div>
    </section>
</article>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
    name: "WalkDetailHero",
    data: () => ({
        bannerHover: false
    }),
    methods: {
        setBannerHover(state: any) {
            this.bannerHover = state;
        }
    },
    props: {
        walk: {
            type: Object,
            default: () => (undefined),
        },
        back: {
            type: String,
            default: '',
        },
        backUrl: {
            type: String,
            default: ''
        },
        error: {
            type: Object,
            default: () => (undefined),
        },
        titleAlt: {
            type: String,
            default: ''
        }
    },
    computed: {
        locale(): string {
            return this.$store.state.locale
        },
    },
});
</script>
