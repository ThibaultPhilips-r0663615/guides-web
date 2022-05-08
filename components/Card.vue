<template>
<v-card class="lol-list-card" @mouseenter="$emit('on-mouse-event')" @click="$emit('on-mouse-event')">
    <v-img height="250" :src="imgSrc" :lazy-src="require('~/assets/images/placeholder.png')"></v-img>

    <div class="lol-list-card-body py-30">
        <h2 class="tw-text-3xl">{{title}}</h2>

        <slot></slot>

        <v-divider class="my-4"></v-divider>
        <p class="tw-text-base max-h-24 overflow-hidden">{{description}}</p>
    </div>
    <v-card-actions class="lol-list-card-actions mt-8">
        <slot name="actions"></slot>

        <NuxtLink :to="link" :prefetch="false">
            <v-btn tile class="btn-icon-padding lol-list-card-actions-primary tw-text-lg" :id="`lol-list-card-actions-read-more-${id}`" rounded>
                <v-icon left>
                    mdi-eye
                </v-icon>
                Read more
            </v-btn>
        </NuxtLink>
    </v-card-actions>
</v-card>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
    name: 'Card',
    props: {
        imgSrc: {
            type: String,
            default: ''
        },
        title: {
            type: String,
            default: ''
        },
        description: {
            type: String,
            default: ''
        },
        link: {
            type: String,
            default: '/'
        },
        id: {
            type: String,
            default: ''
        }
    }
})
</script>

<style lang="scss">
@import "~/assets/styles/resolutions";
@import "~/assets/styles/variables";
@import "~/assets/styles/fonts";

.lol-list-card {
    background-color: #efefef;
    box-shadow: 4px 4px 4px 2px $boxShadowColor;
    width: 90%;
    height: 100%;
    margin: 0 auto 0 auto;
    position: relative;

    @include lPhone-and-pTablets {
        width: 100%;
    }

    .lol-list-card-body {
        padding: 15px 15px 60px 15px;
        margin-bottom: 10px;

        @include lComputer {
            padding: 10px 12px 50px 12px;
            margin-bottom: 8px;
        }

        @include sComputer {
            padding: 8px 10px 50px 10px;
            margin-bottom: 6px;
        }

        @include lPhone-and-pTablets {
            padding: 6px 6px 40px 6px;
            margin-bottom: 5px;
        }

        @include xlPhone {
            padding: 4px 10px 35px 10px;
        }

        @include sPhone {
            padding: 4px 10px 35px 10px;
        }

        @include xsPhone {
            padding: 4px 10px 35px 10px;
        }

        h2 {
            color: $colorGreen;
            font-family: 'BebasNeue';
            background: linear-gradient(124deg, rgba(41, 54, 24, 1) 0%, rgba(96, 109, 56, 1) 100%, rgba(41, 54, 24, 1) 293618%);
            background-clip: text;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }

        .lol-list-card-body-detail {
            i {
                color: $colorGreen;
            }
        }

        p {
            line-height: 145%;
            color: $primaryTextColor;
            font-family: 'Montserrat-Light';
        }

        i {
            color: $secondaryColor;
            font-size: 150%;

            @include lComputer {
                font-size: 140%;
            }

            @include sComputer {
                font-size: 130%;
            }

            @include xlPhone {
                font-size: 140%;
            }
        }

        .lol-label-span {
            padding: 3px 10px;
            border-radius: 10px;
            font-size: 75%;
            margin-right: 10px;
            line-height: 100%;
            margin-top: 10px;
            cursor: default;
            user-select: none;
            display: inline-block;

            @include lComputer {
                margin-top: 8px;
                margin-right: 8px;
                padding: 3px 8px;
            }

            @include sComputer {
                margin-top: 6px;
                margin-right: 6px;
                padding: 2px 7px;
            }

            @include lPhone-and-pTablets {
                margin-top: 5px;
                margin-right: 5px;
                padding: 2px 5px;
                font-size: 70%;
            }

            @include xlPhone {
                margin-top: 8px;
                margin-right: 8px;
                padding: 3px 8px;
            }

            @include sPhone {
                margin-top: 6px;
                margin-right: 6px;
                padding: 2px 7px;
            }

            @include xsPhone {
                margin-top: 5px;
                margin-right: 5px;
                padding: 2px 6px;
                font-size: 70%;
            }
        }
    }

    .lol-list-card-actions {
        position: absolute;
        bottom: 0;
        right: 0;

        .lol-list-card-actions-primary {
            float: right;
            color: $secondaryTextColor;
            font-family: 'BebasNeue';
            background: rgba(188, 109, 40, 1);
            background: linear-gradient(124deg, rgba(188, 109, 40, 1) 0%, rgba(211, 152, 86, 1) 100%, rgba(41, 54, 24, 1) 293618%);
            box-shadow: 4px 4px 10px 1px $colorOrange;
            padding: 0 55px;
            border-radius: 50px;
            transition: all .25s;

            &:hover {
                opacity: .9;
                transform: scale(1.05);
                box-shadow: 6px 6px 15px 2px $colorLightOrange;

            }

            i {
                color: $secondaryTextColor;
                font-size: 150%;

                @include lComputer {
                    font-size: 140%;
                }

                @include sComputer {
                    font-size: 130%;
                }

                @include xlPhone {
                    font-size: 140%;
                }
            }
        }

        .lol-list-card-actions-extra {
            color: $secondaryTextColor;
            border-radius: 50px;
            box-shadow: none;
            margin-right: 1rem;
            transition: all .25s;

            &:hover {
                opacity: .9;
                transform: scale(1.05);
                box-shadow: 0px 0px 10px 2px #ffffff
            }

            i {
                color: $secondaryTextColor;
                font-size: 150%;
                background: linear-gradient(124deg, rgba(31, 44, 14, 1) 0%, rgba(106, 119, 66, 1) 100%, rgba(41, 54, 24, 1));
                background-clip: text;
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;

                @include lComputer {
                    font-size: 140%;
                }

                @include sComputer {
                    font-size: 130%;
                }

                @include xlPhone {
                    font-size: 140%;
                }
            }
        }
    }
}
</style>
