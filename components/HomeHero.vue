<template>
<header class="lol-home-hero">
    <div class="lol-home-hero-content tw-z-0">
        <div class="lol-home-hero-content-left">
            <div class="lol-home-hero-content-left-content">
                <div class="lol-home-hero-content-left-content-top">
                    <img :src="require('~/assets/images/LOL-logo-white.png')">
                </div>
                <img class="lol-home-hero-content-left-content-church" :src="require('~/assets/images/Middleground_Church.png')">
                <img class="lol-home-hero-content-left-content-houses" :src="require('~/assets/images/Foreground_1.png')">
            </div>
        </div>
        <div class="lol-home-hero-content-right">
            <img :src="require('~/assets/images/HeaderMiddle.png')" />
            <div class="lol-home-hero-content-right-content tw-pt-10">
                <div class="lol-home-hero-content-right-content-header">
                    <nav class="lol-home-hero-content-right-content-header-nav">
                        <ul class="lol-home-hero-content-right-content-header-nav-content">
                            <li class="tw-text-2xl">
                                <NuxtLink :to="`/${locale}/`" :prefetch="false">
                                    Home
                                </NuxtLink>
                            </li>
                            <li class="tw-text-2xl">
                                <NuxtLink :to="`/${locale}/a-la-carte`" :prefetch="false" replace>
                                    A la carte
                                </NuxtLink>
                            </li>
                            <li class="tw-text-2xl">
                                <NuxtLink :to="`/${locale}/guides`" :prefetch="false" replace>
                                    Guides
                                </NuxtLink>
                            </li>
                            <li class="tw-text-2xl" v-if="!!$store.state.auth.user">
                                <NuxtLink :to="`/${locale}/manage`" :prefetch="false">
                                    Manage
                                </NuxtLink>
                            </li>
                            <li class="tw-text-2xl">
                                <v-icon class="lol-navigation-icon">
                                    mdi-web
                                </v-icon>
                                {{locale}}
                            </li>
                        </ul>
                    </nav>
                </div>
                <div class="lol-home-hero-content-right-content-body tw-pt-40">
                    <h1 class="tw-text-7xl">PLACE PREFEREE LEUVEN</h1>
                    <p class="tw-text-base tw-pt-8">On sait depuis longtemps que travailler avec du texte lisible et contenant du sens est source de distractions, et empêche de se concentrer sur la mise en page elle-même. L'avantage du Lorem Ipsum sur un texte générique comme 'Du texte.</p>
                </div>
                <div class="lol-home-hero-content-right-content-footer tw-pt-28">
                    <div class="lol-home-hero-content-right-content-footer-actions">
                        <NuxtLink :to="`/${locale}/a-la-carte`" class="lol-home-hero-content-right-content-footer-actions-cta tw-text-3xl">
                            Explore
                        </NuxtLink>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <static-header :languages="this.languages" :distanceToShowHeader="200" :locale="this.locale" :locales="this.locales"></static-header>
</header>
</template>

<script lang="ts">
import Vue from 'vue'
import axios from 'axios'

export default Vue.extend({
    name: 'HomeHero',
    data: (): any => ({
        languages: [],
        languageMenuIsOpen: false,
        menuIsOpen: false,
        productMenuIsOpen: false,
        showStatic: false
    }),
    computed: {
        locale(): string {
            return this.$store.state.locale
        },
        locales(): any[] {
            return this.languages.reduce((array: any[], currentLanguage: any) => {
                let currentLanguageCode = this.$store.state.locales.filter((language: any) => language.toLowerCase() == currentLanguage.languageCode.toLowerCase())
                if (currentLanguageCode.length >= 1) {
                    array.push(currentLanguage)
                }
                return array;
            }, [])
        }
    },
    async fetch() {
        await axios
            .get(`${process.env.API_URL_LOCALE}/languages`)
            .then((res: any) => {
                this.languages = res.data;
            });
    },
    methods: {
        toggleMenuState(state: any): void {
            this.menuIsOpen = state;
        },
        toggleLanguage(state: any): void {
            this.languageMenuIsOpen = state;
        }
    },

})
</script>

<style lang="scss">
@import "~/assets/styles/resolutions";
@import "~/assets/styles/variables";
@import "~/assets/styles/fonts";

.lol-home-hero {
    width: 100%;
    height: 100vh;
    position: relative;
    background-image: url('~/assets/images/HomeHeroBackground.jpg');
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;

    .lol-home-hero-content {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: row;

        .lol-home-hero-content-left {
            height: 100%;
            width: 40%;

            .lol-home-hero-content-left-content {
                height: 100%;
                width: 100%;
                position: relative;

                .lol-home-hero-content-left-content-top {
                    position: absolute;
                    width: 150px;
                    left: 10%;
                    top: 2%;
                    transform: rotate(130deg);
                }

                .lol-home-hero-content-left-content-church {
                    position: absolute;
                    left: -20%;
                    bottom: 15%;
                    width: 90%;
                }

                .lol-home-hero-content-left-content-houses {
                    position: absolute;
                    left: -1%;
                    bottom: -12%;
                    width: 80%;
                }
            }
        }

        .lol-home-hero-content-right {
            height: 100%;
            width: 60%;
            background-image: url('~/assets/images/HomeHeroRightBackground.png');
            background-position: center;
            background-size: cover;
            background-repeat: no-repeat;
            position: relative;
            display: flex;
            justify-content: flex-end;

            img {
                position: absolute;
                left: 60px;
                height: inherit;
                width: auto;
            }

            .lol-home-hero-content-right-content {
                height: 100%;
                width: 70%;
                display: flex;
                flex-direction: column;
                flex: 0 0 auto;
                justify-content: flex-start;
                align-items: flex-end;
                z-index: 1;
                margin-right: 15%;

                .lol-home-hero-content-right-content-header {
                    width: 100%;
                    display: flex;
                    justify-content: flex-end;
                    flex: 0 0 auto;
                    align-items: flex-end;

                    .lol-home-hero-content-right-content-header-nav {
                        width: 70%;

                        .lol-home-hero-content-right-content-header-nav-content {
                            text-align: right;
                            height: 80%;
                            display: flex;
                            flex-direction: row;
                            justify-content: space-between;
                            flex: 0 0 auto;
                            align-items: flex-end;

                            li {
                                font-family: 'BebasNeue';
                                transition: transform 0.25s;
                                cursor: pointer;

                                &:after {
                                    content: ' ';
                                    border-bottom: 2px solid $colorOrange;
                                    position: absolute;
                                    width: 0;
                                    left: 50%;
                                    transform: translate(-50%, 0);
                                    bottom: -15px;
                                    display: block;
                                    transition: all 0.25s;
                                }

                                &:hover {
                                    transform: scale(1.1);

                                    &:after {
                                        content: ' ';
                                        width: 100%;
                                    }

                                    a {
                                        color: $colorLightOrange;
                                        font-family: 'BebasNeue';
                                        background: linear-gradient(124deg, rgba(188, 109, 40, 1) 0%, rgba(211, 152, 86, 1) 100%, rgba(41, 54, 24, 1) 293618%);
                                        background-clip: text;
                                        -webkit-background-clip: text;
                                        -webkit-text-fill-color: transparent;

                                    }
                                }

                                a {
                                    color: $primaryTextColor;
                                    text-decoration: none;
                                    transform: scale(1);
                                    position: relative;
                                    width: inherit;
                                }
                            }
                        }
                    }
                }

                .lol-home-hero-content-right-content-body {
                    width: 100%;
                    text-align: right;
                    display: flex;
                    flex-direction: column;
                    flex: 0 0 auto;
                    justify-content: center;
                    align-items: flex-end;

                    h1 {
                        color: $colorGreen;
                        font-family: 'BebasNeue';
                        background: linear-gradient(124deg, rgba(41, 54, 24, 1) 0%, rgba(96, 109, 56, 1) 100%, rgba(41, 54, 24, 1) 293618%);
                        background-clip: text;
                        -webkit-background-clip: text;
                        -webkit-text-fill-color: transparent;
                        width: 15ch;
                    }

                    p {
                        width: 70ch;
                        font-family: 'Montserrat-Light';
                        line-height: 145%;
                    }
                }

                .lol-home-hero-content-right-content-footer {
                    .lol-home-hero-content-right-content-footer-actions {
                        .lol-home-hero-content-right-content-footer-actions-cta {
                            color: $secondaryTextColor;
                            text-decoration: none;
                            font-family: 'BebasNeue';
                            padding: 15px 160px;
                            border-radius: 50px;
                            background: rgba(188, 109, 40, 1);
                            background: linear-gradient(124deg, rgba(188, 109, 40, 1) 0%, rgba(211, 152, 86, 1) 100%, rgba(41, 54, 24, 1) 293618%);
                            box-shadow: 4px 4px 25px 1px $colorOrange;
                            transition: all .25s;

                            &:hover {
                                box-shadow: 6px 6px 30px 2px $colorLightOrange;
                                opacity: .8;
                                transform: scale(1.05);
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>
