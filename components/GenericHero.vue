<template>
<article>
    <section class="lol-generic-hero noprint">
        <div class="lol-generic-hero-content" :title="titleAlt" :style="{ backgroundImage: `linear-gradient(124deg, rgba(41, 54, 24, 0.3) 0%, rgba(96, 109, 56, 0.3) 100%, rgba(41, 54, 24, 0.3) 293618%), url('${fileUrl}')`}">
            <div class="lol-generic-hero-content-text">
                <h1 class="tw-text-7xl tw-uppercase">{{title}}</h1>
            </div>
        </div>
    </section>
</article>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
    name: 'GenericHero',
    props: {
        title: {
            type: String,
            default: ''
        },
        fileUrl: {
            type: String,
            default: ''
        },
        titleAlt: {
            type: String,
            default: ''
        }
    }
})
</script>

<style lang="scss">
@import "~/assets/styles/resolutions";
@import "~/assets/styles/variables";

.lol-generic-hero {
    width: 100%;

    .lol-generic-hero-content {
        background-position: center;
        background-size: cover;
        background-attachment: local;
        height: 300px;
        width: 100%;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 0;

        @include lTablets {
            height: 260px;
        }

        @include lPhone-and-pTablets {
            height: 220px;
        }

        .lol-generic-hero-content-back {
            position: absolute;
            top: 30px;
            left: 15%;
            display: flex;
            outline: 0;
            cursor: pointer;

            @include lComputer {
                left: 10%;
            }

            @include sComputer {
                left: 5%;
            }

            @include lPhone-and-pTablets {
                left: 2.5%;
            }

            i,
            a {
                font-size: 200%;
                color: $secondaryTextColor;
                margin-right: 20px;
                font-weight: bold;

                @include xlPhone {
                    font-size: 170%;
                    margin-right: 15px;
                }
            }
        }

        .lol-generic-hero-content-back:hover {
            h2 {
                text-decoration: underline;
            }
        }

        .lol-generic-hero-content-text {
            text-align: center;
            max-width: 60%;
            max-height: 60%;
            overflow: hidden;

            @include sComputer {
                max-width: 70%;
            }

            @include lPhone-and-pTablets {
                max-width: 80%;
            }

            h1 {
                color: $secondaryTextColor;
                font-family: 'BebasNeue';
                cursor: default;
                user-select: none;
            }
        }
    }
}
</style>
