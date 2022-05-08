<template>
<footer class="lol-footer">
    <article class="lol-footer-content">
        <section class="lol-footer-content-body">
            <div class="lol-footer-content-body-content paddingTopLarge paddingBottomLarge">
                <div class="lol-footer-content-body-content-left">
                    <h2 class="tw-mb-4 tw-text-4xl">{{$t('footer.ContactUs.Title')}}</h2>
                    <div class="lol-footer-content-body-content-left-body">
                        <div class="lol-footer-content-body-content-left-body-element">
                            <v-icon>mdi-email</v-icon>
                            <p class="tw-uppercase tw-text-base" v-html="$t('footer.ContactUs.Email')"></p>
                        </div>
                        <div class="lol-footer-content-body-content-left-body-element">
                            <v-icon>mdi-phone</v-icon>
                            <p class="tw-uppercase tw-text-base" v-html="$t('footer.ContactUs.PhoneNumber')"></p>
                        </div>
                        <div class="lol-footer-content-body-content-left-body-element">
                            <v-icon>mdi-star</v-icon>
                            <p class="tw-uppercase tw-text-base" v-html="$t('footer.ContactUs.Websites')"></p>
                        </div>
                    </div>
                </div>
                <div class="lol-footer-content-body-content-center">
                    <h2 class="tw-mb-4 tw-text-4xl">Quick navigation</h2>
                    <ul class="lol-footer-content-body-content-center-body">
                        <li>
                            <NuxtLink class="tw-uppercase tw-text-base" :to="`/${this.locale}/home`">
                                Home
                            </NuxtLink>
                        </li>
                        <li>
                            <NuxtLink class="tw-uppercase tw-text-base" :to="`/${this.locale}/a-la-carte`">
                                A la carte
                            </NuxtLink>
                        </li>
                        <li>
                            <NuxtLink class="tw-uppercase tw-text-base" :to="`/${this.locale}/guides`">
                                Guides
                            </NuxtLink>
                        </li>
                    </ul>
                </div>
                <div class="lol-footer-content-body-content-right">
                    <div class="lol-footer-content-body-content-right-top tw-mb-8">
                        <h2 class="tw-mb-4 tw-text-4xl">
                            Change language
                            <v-icon x-large>
                                mdi-translate
                            </v-icon>
                        </h2>
                        <ul>
                            <li v-for="language in locales" :key="language.id">
                                <NuxtLink class="tw-uppercase tw-text-base" :to="`/${language.languageCode}`" :prefetch="false" @click.native="$store.commit('SET_LANG', language.languageCode)">
                                    {{ language.locale }} ({{ language.languageCode }})
                                </NuxtLink>
                            </li>
                        </ul>
                    </div>
                    <div class="lol-footer-content-body-content-right-bottom">
                        <h2 class="tw-mb-4 tw-text-4xl">Follow us</h2>
                        <ul>
                            <li v-if="!!!($t('footer.FollowUs.InstagramUrl'))">
                                <a id="follow-us-instragram" :href="$t('footer.FollowUs.InstagramUrl')">
                                    <v-icon large>
                                        mdi-instagram
                                    </v-icon>
                                </a>
                            </li>
                            <li v-if="!!($t('footer.FollowUs.FacebookUrl'))">
                                <a id="follow-us-facebook" :href="$t('footer.FollowUs.FacebookUrl')">
                                    <v-icon large>
                                        mdi-facebook
                                    </v-icon>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
        <section class="lol-footer-content-footer tw-py-4">
            <h2 class="tw-mb-2 tw-text-2xl tw-uppercase">{{$t('footer.Copyright')}}</h2>
            <h3 class="tw-uppercase tw-text-sm">Created by, thibault philips</h3>
        </section>
    </article>
</footer>
</template>

<script lang="ts">
import Vue from "vue";
import * as is from 'is_js';
import axios from 'axios';

export default Vue.extend({
    name: "CFooter",
    data: () => ({
        is: is,
        languages: []
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
})
</script>

<style lang="scss" scoped>
@import "~/assets/styles/resolutions";
@import "~/assets/styles/variables";
@import "~/assets/styles/fonts";

.lol-footer {
    width: 100%;
    line-height: 145%;
    font-family: 'Montserrat-Light';
    display: flex;
    flex-direction: column;
    align-items: center;

    .lol-footer-content {
        width: 100%;
        height: auto;

        .lol-footer-content-body {
            width: 100%;
            background: rgb(41, 54, 24);
            background: linear-gradient(130deg, rgba(34, 45, 20, 1) 20%, rgba(96, 109, 56, 1) 80%);
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;

            .lol-footer-content-body-content {
                display: flex;
                flex-direction: row;
                width: 70%;
                justify-content: space-between;
                gap: 5%;

                @include xlPhone {
                    display: block;
                }

                @include lComputer {
                    width: 80%;
                }

                @include sComputer {
                    width: 90%;
                }

                @include lPhone-and-pTablets {
                    width: 95%;
                }

                h2 {
                    color: $secondaryTextColor;
                    font-family: 'BebasNeue';

                    i {
                        color: $secondaryTextColor;
                    }
                }

                .lol-footer-content-body-content-left {
                    width: 33%;

                    .lol-footer-content-body-content-left-body {
                        color: $secondaryTextColor;

                        .lol-footer-content-body-content-left-body-element {
                            color: $secondaryTextColor;
                            flex-direction: row;
                            align-items: center;
                            vertical-align: middle;
                            display: flex;
                            margin: 0.5rem 0;

                            i {
                                color: $secondaryTextColor;
                                margin-right: 0.5rem;
                            }

                            p ::v-deep a {
                                text-decoration: underline;

                                &:hover {
                                    color: $colorLightOrange;
                                    background: linear-gradient(124deg, rgba(188, 109, 40, 1) 0%, rgba(211, 152, 86, 1) 100%, rgba(41, 54, 24, 1) 293618%);
                                    background-clip: text;
                                    -webkit-background-clip: text;
                                    -webkit-text-fill-color: transparent;

                                    &:after {
                                        width: 100%;
                                    }
                                }
                            }
                        }
                    }
                }

                .lol-footer-content-body-content-center {
                    text-align: center;
                    width: 33%;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    text-align: center;

                    .lol-footer-content-body-content-center-body {
                        list-style-type: none;
                        text-transform: uppercase;
                        display: flex;
                        flex-direction: column;

                        li {
                            padding: 0.5rem 0;

                            a {
                                text-decoration: none;
                                transform: scale(1);
                                position: relative;
                                color: $secondaryTextColor;
                                width: inherit;
                                transition: transform 0.25s;
                                transform-origin: 50% 50%;
                                cursor: pointer;
                                display: inline-block;

                                &:after {
                                    content: ' ';
                                    border-bottom: 2px solid $colorOrange;
                                    position: absolute;
                                    width: 0;
                                    left: 50%;
                                    transform: translate(-50%, 0);
                                    bottom: -10px;
                                    display: block;
                                    transition: width 0.25s;
                                }

                                &:hover {
                                    transform: scale(1.1);
                                    color: $colorLightOrange;
                                    background: linear-gradient(124deg, rgba(188, 109, 40, 1) 0%, rgba(211, 152, 86, 1) 100%, rgba(41, 54, 24, 1) 293618%);
                                    background-clip: text;
                                    -webkit-background-clip: text;
                                    -webkit-text-fill-color: transparent;

                                    &:after {
                                        content: ' ';
                                        width: 100%;
                                    }
                                }
                            }
                        }
                    }
                }

                .lol-footer-content-body-content-right {
                    width: 33%;
                    text-align: right;
                    color: $secondaryTextColor;

                    .lol-footer-content-body-content-right-top {
                        width: 100%;

                        ul {
                            list-style-type: none;
                            display: flex;
                            flex-direction: column;
                            justify-content: flex-end;
                            text-transform: uppercase;
                            width: 100%;

                            li {
                                padding: 0.5rem 0;

                                a {
                                    text-decoration: none;
                                    transform: scale(1);
                                    position: relative;
                                    color: $secondaryTextColor;
                                    width: inherit;
                                    transition: transform 0.25s;
                                    transform-origin: 50% 50%;
                                    cursor: pointer;
                                    display: inline-block;

                                    &:after {
                                        content: ' ';
                                        border-bottom: 2px solid $colorOrange;
                                        position: absolute;
                                        width: 0;
                                        left: 50%;
                                        transform: translate(-50%, 0);
                                        bottom: -10px;
                                        display: block;
                                        transition: width 0.25s;
                                    }

                                    &:hover {
                                        transform: scale(1.1);
                                        color: $colorLightOrange;
                                        background: linear-gradient(124deg, rgba(188, 109, 40, 1) 0%, rgba(211, 152, 86, 1) 100%, rgba(41, 54, 24, 1) 293618%);
                                        background-clip: text;
                                        -webkit-background-clip: text;
                                        -webkit-text-fill-color: transparent;

                                        &:after {
                                            content: ' ';
                                            width: 100%;
                                        }
                                    }
                                }
                            }
                        }
                    }

                    .lol-footer-content-body-content-right-bottom {
                        ul {
                            list-style-type: none;
                            display: flex;
                            flex-direction: row;
                            justify-content: flex-end;
                            gap: 4%;
                            width: 100%;

                            li {
                                transition: transform 0.25s;
                                cursor: pointer;

                                &:hover {
                                    transform: scale(1.1);
                                }

                                a {
                                    text-decoration: none;
                                    transform: scale(1);

                                    &#follow-us-facebook {
                                        i {
                                            color: #3B5998;
                                        }
                                    }

                                    &#follow-us-instragram {
                                        i {
                                            background: linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%);
                                            background-clip: text;
                                            -webkit-background-clip: text;
                                            -webkit-text-fill-color: transparent;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

        .lol-footer-content-footer {
            display: flex;
            flex-direction: column;
            align-items: center;

            h2 {
                font-family: 'Montserrat-Medium';
                color: $colorGreen;
                font-family: 'BebasNeue';
                background: linear-gradient(124deg, rgb(65, 86, 38) 0%, rgb(152, 172, 89) 100%, rgb(65, 86, 38) 293618%);
                background-clip: text;
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
            }

            h3 {
                color: $colorGreen;
                font-family: 'BebasNeue';
                background: linear-gradient(124deg, rgb(65, 86, 38) 0%, rgb(152, 172, 89) 100%, rgb(65, 86, 38) 293618%);
                background-clip: text;
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
            }
        }
    }
}
</style>
