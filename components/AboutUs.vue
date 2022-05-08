<template>
<section class="lol-about-us marginBottomLarge">
    <div class="lol-about-us-content">
        <h2 class="tw-text-6xl">{{$t('home.AboutUsHeader')}}</h2>
        <q class="tw-text-base">{{$t('home.AboutUsText')}}</q>
    </div>
</section>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
    name: 'AboutUs'

})
</script>

<style lang="scss">
@import "~/assets/styles/resolutions";
@import "~/assets/styles/variables";
@import "~/assets/styles/fonts";

.lol-about-us {
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: center;

    .lol-about-us-content {
        width: 70%;
        height: auto;
        display: flex;
        flex-direction: column;
        align-items: center;

        @include lComputer {
            width: 70%;
        }

        @include lPhone-and-pTablets {
            width: 80%;
        }

        @include xlPhone {
            width: 90%;
        }

        @include xsPhone {
            width: 95%;
        }

        h2 {
            color: $colorLightOrange;
            font-family: 'BebasNeue';
            background: linear-gradient(124deg, rgba(188, 109, 40, 1) 0%, rgba(211, 152, 86, 1) 100%, rgba(188, 109, 40, 1) 293618%);
            background-clip: text;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;

            &:after {
                background-color: $colorOrange;
            }
        }

        q {
            font-family: 'Montserrat-Light';
            padding-top: 40px;
            line-height: 145%;
            width: 80ch;
            margin: 0 auto;
            text-align: center;
            display: block;
            position: relative;

            @include lComputer {
                padding-top: 30px;
            }

            @include sComputer {
                padding-top: 25px;
            }

            &:before {
                font-size: 20rem;
                position: absolute;
                top: 60px;
                left: -140px;
                content: "🙶";
                opacity: .1;
                color: #000;
            }

            &:after {
                content: "";
            }
        }
    }
}
</style>
