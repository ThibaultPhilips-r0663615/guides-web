<template>
<section class="lol-hero-guides" :title="bannerHover==true ? '' : this.bannerAlt" @mouseenter="bannerHover = true" @mouseleave="bannerHover = false">
    <div class="lol-hero-guides-content">
        <div class="lol-hero-guides-images">
            <img class="lol-hero-guides-image-1" :src="require('~/assets/banners/KarinaCutoutFinal.webp')" :alt="this.heroImageAlt" />
            <img class="lol-hero-guides-image-2" :src="require('~/assets/banners/DidierCutoutFinal.webp')" :alt="this.heroImageAlt" />
        </div>
        <div class="lol-hero-guides-content-text">
            <h1 v-html="heroText"></h1>
        </div>
    </div>
</section>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    name: 'GuideHero',
    props: {
        bannerAlt: {
            type: String,
            default: ''
        },
        heroImageAlt: {
            type: String,
            default: ''
        },
        heroText: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            bannerHover: false
        }
    }
})
</script>

<style lang="scss" scoped>
@import "~/assets/styles/resolutions";
@import "~/assets/styles/variables";
.lol-hero-guides {
    width: 100%;
    background-position: center;
    background-size: cover;
    background-attachment: local;
    height: 500px;
    width: 100%;
    background-image: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url('/banners/GuideBanner.webp');

    @include sComputer {
        height: 450px;
    }

    @include lPhone-and-pTablets {
        height: 400px;
    }

    @include xlPhone {
        height: 350px;
    }

    @include sPhone {
        height: 300px;
    }

    @include xsPhone {
        height: 250px;
    }

    .lol-hero-guides-content {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 75%;
        height: 100%;
        margin: 0 auto;

        @include lComputer {
            width: 80%;
        }

        @include sComputer {
            width: 95%;
        }

        @include lPhone-and-pTablets {
            width: 90%;
        }

        @include sTablets {
            width: 98%;
        }

        @include xlPhone {
            width: 100%;
        }

        .lol-hero-guides-images {
            width: 55%;
            height: 100%;
            display: flex;
            user-select: none;

            .lol-hero-guides-image-1 {
                position: absolute;
                max-width: 55%;
                max-height: 90%;
                left: 0;
                bottom: 0;
                z-index: 30;

                @include lComputer {
                    max-height: 85%;
                }

                @include lTablets {
                    max-height: 80%;
                    left: -10px;
                }

                @include sTablets {
                    max-height: 75%;
                }

                @include xlPhone {
                    max-height: 70%;
                }

                @include sPhone {
                    max-height: 65%;
                }

                @include xsPhone {
                    max-height: 62%;
                    left: -20px;
                }
            }

            .lol-hero-guides-image-2 {
                position: absolute;
                max-width: 50%;
                max-height: 75%;
                left: 320px;
                bottom: 0;
                z-index: 20;

                @include lComputer {
                    left: 300px;
                }

                @include lTablets {
                    left: 305px;
                    max-height: 70%;
                }

                @include lPhone-and-pTablets {
                    left: 195px;
                }

                @include sTablets {
                    left: 190px;
                    max-height: 65%;
                }

                @include xlPhone {
                    left: 150px;
                    max-height: 60%;
                }

                @include sPhone {
                    left: 110px;
                    max-height: 60%;
                }

                @include xsPhone {
                    max-height: 57%;
                    left: 90px;
                }
            }
        }

        .lol-hero-guides-content-text {
            max-width: 45%;
            max-height: 90%;
            overflow: hidden;

            h1 {
                color: $secondaryTextColor;
                font-weight: 400;
                font-size: 280%;
                line-height: 110%;
                cursor: default;
                user-select: none;

                @include lPhone-and-pTablets {
                    font-size: 250%;
                }

                @include xlPhone {
                    font-size: 200%;
                }

                @include sPhone {
                    font-size: 180%;
                }
            }
        }
    }
}
</style>
