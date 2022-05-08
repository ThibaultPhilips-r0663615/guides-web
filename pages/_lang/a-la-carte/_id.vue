<template>
<div>
    <main>
        <walk-detail-hero v-if="dataLoaded" :backUrl="`/a-la-carte`" :walk="walk" :back="`Back`" :titleAlt="`Banner alt`" :error="error"></walk-detail-hero>

        <article class="marginTopSmall marginBottomLarge">
            <loading-animation :showAnimation="!this.dataLoaded" />
            <section v-if="dataLoaded" class="lol-walk-overview">
                <div class="lol-walk-overview-content">
                    <div class="lol-walk-overview-content-general">
                        <div class="lol-walk-overview-content-general-header">
                            <div class="lol-walk-overview-content-general-header-element" v-if="!!walk.guides.length">
                                <v-icon class="lol-navigation-icon">
                                    mdi-account-group
                                </v-icon>
                                <p class="tw-text-xs"><span>guides - </span>{{walk.guides.length}}</p>
                            </div>
                            <div class="lol-walk-overview-content-general-header-element" v-if="!!walk.languages.length">
                                <v-icon class="lol-navigation-icon">
                                    mdi-translate
                                </v-icon>
                                <p class="tw-text-xs"><span>languages - </span>nl, fr</p>
                            </div>
                            <div class="lol-walk-overview-content-general-header-element">
                                <v-icon class="lol-navigation-icon">
                                    mdi-cash
                                </v-icon>
                                <p class="tw-text-xs"><span>price per person - </span>${{walk.pricePerPerson}}</p>
                            </div>
                            <div class="lol-walk-overview-content-general-header-element">
                                <v-icon class="lol-navigation-icon">
                                    mdi-timer
                                </v-icon>
                                <p class="tw-text-xs"><span>duration - </span>{{walk.duration}} minute(s)</p>
                            </div>
                        </div>
                        <div class="lol-walk-overview-content-general-divider">
                            <v-divider></v-divider>
                        </div>
                        <div class="lol-walk-overview-content-general-body">
                            <v-chip-group v-if="walk.labels.length > 0" active-class="deep-purple accent-4 white--text" column>
                                <v-chip v-for="label in walk.labels" :key="label.id" :color="label.colorCode" x-small outlined>{{$getCurrentTranslationProperty(label.texts, locale, 'text')}}</v-chip>
                            </v-chip-group>
                            <h2 class="tw-text-3xl tw-mt-4">{{$getCurrentTranslationProperty(walk.titles, locale, 'title')}}</h2>
                            <p class="tw-text-sm">{{$getCurrentTranslationProperty(walk.descriptions, locale, 'description')}}</p>
                        </div>
                        <div class="lol-walk-overview-content-general-carousel tw-mt-12">
                            <v-carousel v-if="dataLoaded" :hide-delimiters="!(walk.images.length > 1)" :show-arrows="false" :cycle="!(walk.images.length > 1)" interval="4000" :progress="!(walk.images.length > 1)">
                                <v-carousel-item v-for="(image,i) in walk.images" :key="i" :src="image.fileDownloadUrl"></v-carousel-item>
                            </v-carousel>
                        </div>
                    </div>
                    <div class="lol-walk-overview-content-recommendations">
                        <div class="lol-walk-overview-content-recommendations-content">
                            <h2 v-if="!!this.recommendations" class="tw-text-3xl">{{$t('aLaCarteDetail.NavigationRecommendations')}}</h2>
                            <h2 class="tw-text-3xl" v-else>{{$t('aLaCarteDetail.NoRecommendationsText')}}</h2>
                            <div class="lol-walk-overview-content-recommendations-content-list">
                                <v-card v-for="recommendation in this.recommendations" :key="recommendation.id" class="lol-walk-overview-content-recommendations-content-list-element tw-my-6">
                                    <v-img height="200" :src="recommendation.banner.fileDownloadUrl" :lazy-src="require('~/assets/images/placeholder.png')"></v-img>
                                    <div class="lol-walk-overview-content-recommendations-content-list-element-body tw-p-1">
                                        <v-chip-group v-if="!!recommendation.labels" active-class="deep-purple accent-4 white--text" column>
                                            <v-chip v-for="label in recommendation.labels" :key="label.id" :color="label.colorCode" x-small outlined>{{$getCurrentTranslationProperty(label.texts, locale, 'text')}}</v-chip>
                                        </v-chip-group>
                                        <h3 class="tw-text-lg">{{$getCurrentTranslationProperty(recommendation.titles, locale, 'title')}}</h3>

                                        <v-btn tile class="btn-icon-padding" id="lol-walk-overview-content-recommendations-content-list-element-body-action" rounded>
                                            <v-icon left>
                                                mdi-eye
                                            </v-icon>
                                            Read more
                                        </v-btn>
                                    </div>
                                </v-card>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </article>

        <article class="marginTopLarge marginBottomLarge">
            <step-by-step></step-by-step>
        </article>
    </main>
</div>
</template>

<script lang="ts">
import Vue from "vue";
import CHeader from "~/components/CHeader.vue";
import WalkDetailHero from "~/components/WalkDetailHero.vue";
import axios from "axios";
import WalkDetailGenericInformation from "~/components/WalkDetailGenericInformation.vue";
import CFooter from "~/components/CFooter.vue";
import {
    Walk
} from "~/model/walk";
import StaticHeader from '~/components/StaticHeader.vue'

export default Vue.extend({
    layout(context: any) {
        return 'genericLayout'
    },
    components: {
        CHeader,
        WalkDetailHero,
        WalkDetailGenericInformation,
        CFooter,
        StaticHeader
    },
    props: {
        error: {
            type: Array,
            default: () => {},
        }
    },
    data(): any {
        return {
            step: 0,
            walk: ({}) as Walk,
            dataLoaded: false,
            recommendations: [] as Walk[]
        }
    },
    computed: {
        locale(): string {
            return this.$store.state.locale
        },
    },
    async fetch(): Promise < void > {
        console.log('fetch')
        await axios
        .get(`${process.env.API_URL_LOCALE}/walks/${this.$route.params.id}`)
        .then((res: any) => {
            this.walk = res.data;
            this.dataLoaded = true;
        });

        await axios.get(`${process.env.API_URL_LOCALE}/walks/recommendations/${this.$route.params.id}/3`)
        .then((res: any) => {
            this.recommendations = res.data;
            this.dataLoaded = true;
        });
    },
    async asyncData(context): Promise < any > {
        console.log('asyncData')
        return {
            test: 'babychan'
        }
    },
    methods: {
        setStep(state: number): void {
            this.step = state;
        }
    },
    head(): any {
        console.log(this.test)
        return {}
    }
});
</script>

<style lang="scss">
@import "~/assets/styles/resolutions";
@import "~/assets/styles/variables";
@import "~/assets/styles/generalStyles";
@import "~/assets/styles/fonts";

.lol-walk-overview {
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: center;

    .lol-walk-overview-content {
        width: 70%;
        height: auto;
        min-height: 400px;
        display: flex;
        flex-direction: row;
        align-content: center;
        gap: 15%;

        .lol-walk-overview-content-general {
            width: 70%;

            .lol-walk-overview-content-general-header {
                display: flex;
                gap: 2rem;

                .lol-walk-overview-content-general-header-element {
                    display: flex;
                    align-items: center;

                    i {
                        color: $colorGreen;
                    }

                    p {
                        font-family: 'Montserrat-Light';

                        span {
                            font-family: 'Montserrat-SemiBoldItalic';
                        }
                    }
                }
            }

            .lol-walk-overview-content-general-body {
                h2 {
                    color: $colorLightOrange;
                    font-family: 'BebasNeue';
                    background: linear-gradient(124deg, rgba(41, 54, 24, 1) 0%, rgba(96, 109, 56, 1) 100%, rgba(41, 54, 24, 1) 293618%);
                    background-clip: text;
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }

                p {
                    color: $primaryTextColor;
                    line-height: 145%;
                    max-width: 90ch;
                    font-family: 'Montserrat-Light';
                    position: relative;
                    height: inherit;
                    white-space: pre-wrap;
                }
            }

            .lol-walk-overview-content-general-carousel {
                height: 700px;

                .v-carousel {
                    height: 100% !important;

                    .v-window__container {
                        .v-window-item {
                            .v-image {
                                height: 100% !important;
                            }
                        }
                    }
                }
            }
        }

        .lol-walk-overview-content-recommendations {
            width: 20%;

            .lol-walk-overview-content-recommendations-content {
                h2 {
                    color: $colorLightOrange;
                    font-family: 'BebasNeue';
                    background: linear-gradient(124deg, rgba(41, 54, 24, 1) 0%, rgba(96, 109, 56, 1) 100%, rgba(41, 54, 24, 1) 293618%);
                    background-clip: text;
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }

                .lol-walk-overview-content-recommendations-content-list {
                    .lol-walk-overview-content-recommendations-content-list-element {
                        .lol-walk-overview-content-recommendations-content-list-element-body {
                            h3 {
                                color: $colorLightOrange;
                                font-family: 'BebasNeue';
                                background: linear-gradient(124deg, rgba(41, 54, 24, 1) 0%, rgba(96, 109, 56, 1) 100%, rgba(41, 54, 24, 1) 293618%);
                                background-clip: text;
                                -webkit-background-clip: text;
                                -webkit-text-fill-color: transparent;
                            }

                            #lol-walk-overview-content-recommendations-content-list-element-body-action {
                                color: $secondaryTextColor;
                                background: rgba(188, 109, 40, 1);
                                background: linear-gradient(124deg, rgba(188, 109, 40, 1) 0%, rgba(211, 152, 86, 1) 100%, rgba(41, 54, 24, 1) 293618%);
                                box-shadow: 4px 4px 10px 1px $colorOrange;
                                padding: 0 25px;
                                border-radius: 20px;
                                transition: all .25s;

                                &:hover {
                                    opacity: .9;
                                    box-shadow: 6px 6px 15px 2px $colorLightOrange;
                                    transform: scale(1.05);

                                    @include lPhone-and-pTablets {
                                        transform: translate(-50%, 0) scale(1.02);
                                    }
                                }
                            }
                        }

                    }
                }
            }
        }
    }
}
</style>
