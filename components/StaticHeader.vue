<template>
<div v-show="showStatic" class="tw-z-50 tw-fixed tw-top-0 tw-w-screen lol-nav-bar-fixed">
    <!-- // ------------------------------------ mobile ------------------------------------ // -->
    <util-bar :languageMenuIsOpen="languageMenuIsOpen" :menuIsOpen="menuIsOpen" :languages="languages" @toggle-menu-trigger="(status) => toggleMenuState(status)" @toggle-language-menu-trigger="(status) => toggleLanguage(status)"></util-bar>
    <!-- ------------------------------------ desktop ------
    ------------------------------ -->
    <nav class="lol-nav-bar">
        <div class="lol-nav-bar-content">
            <NuxtLink to="/" :prefetch="false" class="lol-nav-bar-content-logo">
                <img :src="require(`~/assets/images/LOL-logo-white.png`)" />
            </NuxtLink>
            <div class="lol-nav-bar-content-navigation">
                <ul class="lol-nav-bar-content-navigation-content">
                    <li class="tw-text-xl">
                        <NuxtLink :to="`/${locale}/`" :prefetch="false">
                            Home
                        </NuxtLink>
                    </li>
                    <li class="tw-text-xl">
                        <NuxtLink :to="`/${locale}/a-la-carte`" :prefetch="false">
                            A la carte
                        </NuxtLink>
                    </li>
                    <li class="tw-text-xl">
                        <NuxtLink :to="`/${locale}/guides`" :prefetch="false">
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
        </div>
    </nav>
</div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    name: 'StaticHeader',
    props: {
        distanceToShowHeader: {
            type: Number,
            default: 500
        },
        languages: {
            type: Array,
            default: []
        },
        locale: {
            type: String,
            default: ''
        },
        locales: {
            type: Array,
            default: []
        }
    },
    data(): any {
        return {
            languageMenuIsOpen: false,
            menuIsOpen: false,
            productMenuIsOpen: false,
            showStatic: false
        }
    },
    mounted(): void {
        window.addEventListener('scroll', this.handleScroll);
    },
    destroyed(): void {
        window.removeEventListener('scroll', this.handleScroll);
    },
    methods: {
        handleScroll(event: any) {
            if (event.path[0].documentElement.scrollTop > this.distanceToShowHeader) {
                this.showStatic = true;
                return;
            }
            this.showStatic = false;
        }
    }
})
</script>

<style lang="scss" scoped>
@import "~/assets/styles/resolutions";
@import "~/assets/styles/variables";

.lol-nav-bar {
    ::v-deep .test-value {
        a {
            color: $thirdColor;
        }
    }
}

.v-application {
    font-family: "Roboto", sans-serif;
    line-height: 1;
}

.v-application {
    ::v-deep p {
        margin-bottom: 0px;
    }
}

.lol-nav-bar-fixed {
    box-shadow: 0px 2px 8px 2px rgba($color: #2f2f2f, $alpha: 0.6);
}

.lol-nav-bar {
    background-color: rgba(41, 54, 24, 1);
    background: linear-gradient(124deg, rgba(41, 54, 24, 1) 0%, rgba(96, 109, 56, 1) 100%, rgba(41, 54, 24, 1) 293618%);
    width: 100%;
    height: 90px;
    display: flex;
    justify-content: center;

    @include lTablets {
        height: 80px;
    }

    @include lPhone-and-pTablets {
        height: 70px;
    }

    @include xlPhone {
        display: none;
    }

    .lol-nav-bar-content {
        width: 70%;
        height: 100%;
        display: flex;
        justify-content: space-between;
        user-select: none;

        @include lComputer {
            width: 80%;
        }

        @include sComputer {
            width: 90%;
        }

        @include lPhone-and-pTablets {
            width: 95%;
        }

        .lol-nav-bar-content-logo {
            position: relative;
            cursor: unset;
            display: flex;
            justify-content: center;
            align-items: center;

            @include lTablets {
                height: 60px;
            }

            @include lPhone-and-pTablets {
                height: 50px;
            }

            img {
                cursor: pointer;
                max-height: 80%;
                max-width: 100%;
            }
        }

        .lol-nav-bar-content-navigation {
            flex: 9;
            display: flex;
            align-items: center;
            justify-content: flex-end;

            .lol-nav-bar-content-navigation-content {
                display: flex;
                justify-content: flex-end;
                list-style: none;
                gap: 2rem;

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
                        transition: width 0.25s;
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
                        color: $secondaryTextColor;
                        text-decoration: none;
                        transform: scale(1);
                        position: relative;
                        width: inherit;
                    }
                }
            }
        }
    }
}
</style>
