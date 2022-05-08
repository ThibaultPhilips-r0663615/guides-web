<template>
<div :class="`lol-util-bar ${languageMenuIsOpen ? 'language-active' : ''} ${
        menuIsOpen ? 'menu-active' : ''}`">
    <div class="lol-util-bar-content">
        <button v-if="isLoggedIn" class="tw-text-sm tw-uppercase" @click="logout">logout</button>
        <div class="lol-util-bar-content-menu">
            <i v-if="menuIsOpen" class="icon ion-md-close" @click="() => {toggleMenuState(false); toggleLanguage(false);}"></i>
            <i v-if="!menuIsOpen" class="icon ion-md-menu" @click="() => {toggleMenuState(true); toggleLanguage(false);}"></i>
        </div>
        <NuxtLink to="/" :prefetch="false" class="lol-util-bar-content-logo">
            <img :src="require(`~/assets/images/Logo.png`)" />
        </NuxtLink>
        <div class="lol-languages-dropdown">
            <div class="lol-selected-language" @click="toggleMenuState(false); toggleLanguage(!languageMenuIsOpen);">
                <i class="icon ion-md-arrow-dropdown"></i>
                <p>{{locale}}</p>
            </div>
            <div class="lol-languages-dropdown-content">
                <NuxtLink v-for="language in locales" :key="language.id" :to="`/${language.languageCode}`" :prefetch="false" @click.native="$store.commit('SET_LANG', language.languageCode)">
                    {{ language.locale }} ({{ language.languageCode }})
                </NuxtLink>
            </div>
        </div>
    </div>
    <div class="lol-util-bar-menu noprint">
        <ul class="lol-nav-bar-menu-content">
            <li>
                <NuxtLink :to="`/${locale}/`" :prefetch="false">
                    Home
                </NuxtLink>
            </li>
            <li>
                <NuxtLink :to="`/${locale}/a-la-carte`" :prefetch="false" replace>
                    A la carte
                </NuxtLink>
            </li>
            <li>
                <NuxtLink :to="`/${locale}/guides`" :prefetch="false" replace>
                    Guides
                </NuxtLink>
            </li>
            <li class="tw-text-xl" v-if="!!$store.state.auth.user">
                <NuxtLink :to="`/${locale}/manage`" :prefetch="false">
                    Manage
                </NuxtLink>
            </li>
        </ul>
    </div>
    <div class="lol-util-bar-language">
        <div class="lol-util-bar-language-content">
            <v-card tile>
                <v-list-item v-for="language in locales" :key="language.id">
                    <v-list-item-content>
                        <v-list-item-title>
                            <NuxtLink :to="`/${language.languageCode}`" :prefetch="false" @click.native="$store.commit('SET_LANG', language.languageCode)">
                                {{ language.locale }} ({{ language.languageCode }})
                            </NuxtLink>
                        </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-card>
        </div>
    </div>
</div>
</template>

<script lang="ts">
import Vue from 'vue'
import {
    mapGetters
} from 'vuex'
export default Vue.extend({
    name: 'UtilBar',
    props: {
        languages: {
            type: Array,
            default: () => []
        },
        languageMenuIsOpen: {
            type: Boolean,
            default: false
        },
        menuIsOpen: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        toggleMenuState(state: Boolean): void {
            console.log('toggleMenuState')
            console.log(state)
            this.$emit('toggle-menu-trigger', state)
        },
        toggleLanguage(state: Boolean): void {
            console.log('toggleLanguage')
            console.log(state)
            this.$emit('toggle-language-menu-trigger', state)
        },
        logout() {
            this.$store.dispatch('auth/logout');
            this.$router.push(`/${this.$store.state.locale}`)
        }
    },
    computed: {
        locale() {
            return this.$store.state.locale
        },
        locales() {
            return this.languages.reduce((array: any[], currentLanguage: any) => {
                let currentLanguageCode = this.$store.state.locales.filter((language: any) => language.toLowerCase() == currentLanguage.languageCode.toLowerCase())
                if (currentLanguageCode.length >= 1) {
                    array.push(currentLanguage)
                }
                return array;
            }, [])
        },
        isLoggedIn(): any {
            return !!this.$store.state.auth.user
        }
    },

})
</script>

<style lang="scss">
@import "~/assets/styles/resolutions";
@import "~/assets/styles/variables";
@import "~/assets/styles/fonts";

.lol-util-bar {
    background-color: $thirdBackgroundColor;
    width: 100%;
    height: 45px;

    @include lPhone-and-pTablets {
        height: 35px;
    }

    @include xlPhone {
        background-color: $secondaryTextColor;
        height: 70px;
    }

    .lol-util-bar-content {
        width: 70%;
        margin: 0 auto;
        height: 100%;
        user-select: none;
        display: flex;
        justify-content: space-between;
        align-items: center;

        @include lComputer {
            width: 80%;
        }

        @include sComputer {
            width: 90%;
        }

        @include lPhone-and-pTablets {
            width: 95%;
        }

        @include xlPhone {
            height: 70px;
            width: 80%;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        @include sPhone {
            width: 85%;
        }

        @include xsPhone {
            width: 90%;
        }

        .lol-util-bar-content-menu {
            display: none;

            @include xlPhone {
                display: flex;
                width: 33.3%;
                min-height: 100%;
                justify-content: center;
                align-content: center;
                flex-direction: column;

                i {
                    font-size: 400%;
                    color: $secondaryColor;

                    @include sPhone {
                        font-size: 350%;
                    }
                }
            }
        }

        .lol-util-bar-content-logo {
            display: none;
            position: relative;

            @include xlPhone {
                display: unset;
                width: 33.3%;
                text-align: center;
                height: 100%;

                img {
                    margin-top: 5px;
                    max-height: 60px;
                    outline: 0;
                }
            }
        }

        .lol-languages-dropdown {
            float: right;
            position: relative;
            display: block;
            margin-top: 10px;

            @include xlPhone {
                height: 100%;
                margin-top: unset;
                float: unset;
                width: 33.3%;
                display: flex;
                justify-content: flex-end;
            }

            .lol-selected-language {
                display: flex;
                cursor: pointer;

                @include xlPhone {
                    height: 100%;
                }

                i {
                    margin-right: 5px;

                    @include xlPhone {
                        font-size: 180%;
                        display: flex;
                        justify-content: center;
                        align-content: center;
                        flex-direction: column;
                    }
                }

                p {
                    text-decoration: none;
                    color: $primaryTextColor;
                    font-weight: 400;
                    font-size: 90%;
                    text-transform: uppercase;

                    @include sComputer {
                        text-align: right;
                    }

                    @include xlPhone {
                        font-size: 200%;
                        display: flex;
                        justify-content: center;
                        align-content: center;
                        flex-direction: column;
                    }
                }
            }

            .lol-languages-dropdown-content {
                display: none;
                position: absolute;
                min-width: 250px;
                margin-left: -10px;
                padding-left: 25px;
                padding-right: 25px;
                z-index: 999;
                background-color: $secondaryBackgroundColor;
                box-shadow: 3px 3px 2px #c7c7c7;

                @include lComputer {
                    right: -30%;
                    left: unset;
                    padding: 0 8px;
                }

                @include sComputer {
                    padding: 0 6px;
                }

                @include xlPhone {
                    display: none;
                }

                p,
                a {
                    color: $primaryTextColor;
                    line-height: 145%;
                    padding: 2px 0;
                    font-size: 80%;
                    font-weight: 400;
                    cursor: pointer;
                    display: block;
                    text-decoration: none;
                }

                p:first-child,
                a:first-child {
                    padding: 10px 0 5px 0;

                    @include lComputer {
                        padding: 8px 0 4px 0;
                    }

                    @include sComputer {
                        padding: 6px 0 3px 0;
                    }
                }

                p:last-child,
                a:last-child {
                    padding: 5px 0 10px 0;

                    @include lComputer {
                        padding: 4px 0 8px 0;
                    }

                    @include sComputer {
                        padding: 3px 0 6px 0;
                    }
                }

                p:hover,
                p:active,
                a:hover,
                a:active {
                    text-decoration: underline;
                }
            }

            .lol-languages-dropdown-content:before {
                bottom: 100%;
                left: 3%;
                border: solid transparent;
                content: " ";
                height: 0;
                width: 0;
                position: absolute;
                border-bottom-color: $secondaryBackgroundColor;
                border-width: 7px;
                border-width: 7px;

                @include lComputer {
                    right: 15%;
                    left: unset;
                }

                @include sComputer {
                    right: 14%;
                    border-width: 6px;
                    border-width: 6px;
                }

                @include lPhone-and-pTablets {
                    right: 12%;
                }

                @include xlPhone {
                    display: none;
                }
            }
        }

        .lol-languages-dropdown:hover,
        .lol-languages-dropdown:active {
            .lol-languages-dropdown-content {
                display: block;

                @include xlPhone {
                    display: none;
                }
            }
        }
    }

    .lol-util-bar-menu {
        display: none;
        width: 100%;
        height: 100%;
        position: relative;

        .lol-nav-bar-menu-content {
            text-align: center;
            height: 100%;
            width: 100%;
            padding-top: 25px;
            list-style: none;

            li {
                margin-top: 40px;

                a {
                    text-decoration: none;
                    font-size: 220%;
                    font-weight: 400;
                    color: $primaryTextColor;
                }
            }
        }
    }

    .lol-util-bar-menu::after {
        background: url('/images/HomeDrawing.png');

        @include sPhone {
            content: "";
            background: url('/images/MobileMenuCurveFinal.png');
            background-position: center;
            background-size: contain;
            background-repeat: no-repeat;
        }

        content: "";
        background-position: center;
        background-size: contain;
        background-repeat: no-repeat;
        opacity: 0.2;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        position: absolute;
        z-index: -1;
    }

    .lol-util-bar-language {
        display: none;
        width: 100%;
        height: 100%;
        position: relative;

        .lol-util-bar-language-content {
            text-align: center;
            height: 100%;
            width: 100%;
            padding-top: 25px;

            p,
            a {
                margin-top: 40px;
                text-decoration: none;
                font-size: 220%;
                font-weight: 400;
                color: $primaryTextColor;
                cursor: pointer;
                text-decoration: none;
                transition: text-decoration 0.2s;
            }

            p:hover,
            a:hover {
                text-decoration: underline;
            }
        }
    }

    .lol-util-bar-language::after {
        background: url('/images/HomeDrawing.png');

        @include sPhone {
            content: "";
            background: url('/images/MobileMenuCurveFinal.png');
            background-position: center;
            background-size: contain;
            background-repeat: no-repeat;
        }

        content: "";
        background-position: center;
        background-size: contain;
        background-repeat: no-repeat;
        opacity: 0.2;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        position: absolute;
        z-index: -1;
    }

    &.menu-active {
        @include xlPhone {
            background-color: $secondaryTextColor;
            min-height: 100vh;
            overflow: auto;
            position: fixed;
            display: block;
            z-index: 999;
            top: 0;
            left: 0;

            .lol-util-bar-menu {
                display: block;
            }
        }
    }

    &.language-active {
        @include xlPhone {
            background-color: $secondaryTextColor;
            min-height: 100vh;
            overflow: auto;
            position: fixed;
            display: block;
            z-index: 999;
            top: 0;
            left: 0;

            .lol-util-bar-language {
                display: block;
            }
        }
    }
}
</style>
