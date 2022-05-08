<template>
<section class="lol-activity-cards paddingTopLarge paddingBottomLarge">
    <div class="lol-activity-cards-content">
        <h2 class="tw-text-6xl">{{$t('home.ActivityHeader')}}</h2>
        <div class="lol-activity-cards-content-body">
            <div class="lol-activity-card">
                <NuxtLink :to="`/${locale}/a-la-carte`" class="lol-activity-card-content">
                    <div class="lol-activity-card-content-body" :style="{ backgroundImage: 'url(' + require('~/static/images/ALaCarte.jpg') + ')'}">
                        <div class="lol-activity-card-content-body-filter">
                        </div>
                        <h3 class="tw-text-5xl">{{$t('home.ALaCarteCardBackHeader')}}</h3>
                    </div>
                </NuxtLink>
            </div>
            <!--div class="lol-activity-card">
                <NuxtLink :to="`/${locale}/theme-walks`" class="lol-activity-card-content">
                    <div class="lol-activity-card-content-body" :style="{ backgroundImage: 'url(' + require('~/static/images/ThemeWalk.jpg') + ')'}">
                        <div class="lol-activity-card-content-body-filter">
                        </div>
                        <h3 class="tw-text-5xl">{{$t('home.ThemeWalkCardFont')}}</h3>
                    </div>
                </NuxtLink>
            </div-->
        </div>
    </div>
</section>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    name: 'ActivityCards',
    computed: {
        locale(): string {
            return this.$store.state.locale
        },
    },
})
</script>

<style lang="scss">
@import "~/assets/styles/resolutions";
@import "~/assets/styles/variables";
@import "~/assets/styles/fonts";

.lol-activity-cards {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    // background-image: linear-gradient(rgba(135, 11, 16, 0.6), rgba(135, 11, 16, 0.6)), url('~/assets/banners/FooterBanner.webp');
    background: rgb(31, 44, 14);
    background-image: linear-gradient(124deg, rgba(31, 44, 14, 0.6) 0%, rgba(106, 119, 66, 0.6) 100%, rgba(41, 54, 24, 0.6));
    background-position: bottom;
    background-size: cover;
    background-attachment: fixed;

    .lol-activity-cards-content {
        width: 50%;
        height: auto;
        display: flex;
        flex-direction: column;
        align-items: center;

        h2 {
            color: $colorLightOrange;
            font-family: 'BebasNeue';
            background: linear-gradient(124deg, rgba(188, 109, 40, 1) 0%, rgba(211, 152, 86, 1) 100%, rgba(41, 54, 24, 1) 293618%);
            background-clip: text;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;

            &:after {
                background-color: $colorOrange;
            }
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

        .lol-activity-cards-content-body {
            margin-top: 40px;
            display: flex;
            justify-content: space-around;
            width: 100%;

            .lol-activity-card {
                width: 40%;
                position: relative;
                border-radius: 20%;
                height: 300px;

                @include lComputer {
                    height: 250px;
                }

                @include sComputer {
                    height: 220px;
                }

                @include lPhone-and-pTablets {
                    height: 180px;
                    width: 48%;
                }

                @include xlPhone {
                    height: 180px;
                    width: 80%;
                    margin: 30px auto 0 auto;
                }

                @include sPhone {
                    height: 160px;
                    width: 90%;
                    margin: 20px auto 0 auto;
                }

                @include xsPhone {
                    width: 100%;
                }

                .lol-activity-card-content {
                    width: 100%;
                    height: 100%;
                    text-align: center;
                    border-radius: 80px;
                    display: block;
                    box-shadow: 4px 4px 25px 1px $colorOrange;
                    transition: box-shadow .25s;

                    &:hover {
                        box-shadow: 6px 6px 30px 2px $colorLighterOrange;
                    }

                    .lol-activity-card-content-body {
                        position: relative;
                        width: 100%;
                        height: 100%;
                        cursor: default;
                        border-radius: 80px;
                        background-position: bottom;
                        background-size: cover;
                        background-repeat: no-repeat;
                        cursor: pointer;
                        opacity: 1;
                        transition: opacity .25s;

                        &:hover {
                            opacity: 0.7;
                        }

                        h3 {
                            color: $secondaryTextColor;
                            font-family: 'BebasNeue';
                            text-transform: uppercase;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            position: absolute;
                            left: 50%;
                            top: 50%;
                            transform: translate(-50%, -50%);
                            width: 80%;
                            white-space: pre-wrap;
                        }

                        .lol-activity-card-content-body-filter {
                            background: linear-gradient(124deg, rgba(188, 109, 40, 1) 0%, rgba(211, 152, 86, 1) 100%, rgba(188, 109, 40, 1));
                            background-position: center;
                            background-repeat: no-repeat;
                            background-size: cover;
                            display: flex;
                            justify-content: center;
                            align-content: center;
                            width: 100%;
                            height: 100%;
                            overflow: hidden;
                            mix-blend-mode: multiply;
                            border-radius: 80px;
                        }
                    }
                }
            }
        }
    }
}
</style>
