<template>
<div class="lol-guide-card">
    <div class="lol-guide-card-left">
        <div class="lol-guide-card-left-image">
            <div class="lol-guide-card-left-image-left"></div>
            <div class="lol-guide-card-left-image-right"></div>
            <image-wrapper :itemUrl="guide.profilePicture.fileDownloadUrl" :needsBackgroundColor="true" :itemId="guide.id" />
        </div>
    </div>

    <div class="lol-guide-card-right">
        <div class="lol-guide-card-right-general">
            <h2>
                {{ guide.firstName }} {{ guide.lastName }}
                {{ guide.nickName ? "(" + guide.nickName + ")" : "" }}
            </h2>
            <div class="lol-guide-card-right-general-languages">
                <v-icon>mdi-translate</v-icon>
                <p class="lol-guide-card-right-general-languages-text">
                    <span v-for="language in guide.languages" :key="language.id">{{ language.locale }} ({{ language.languageCode }})</span>
                </p>
            </div>
            <p class="lol-guide-card-right-general-description">{{$getCurrentTranslationProperty(guide.descriptions, locale, 'description')}}</p>
        </div>
        <div class="lol-guide-card-right-contact">
            <h2>CONTACT GEGEVENS</h2>
            <div class="lol-guide-card-right-contact-element">
                <v-icon>mdi-phone</v-icon>
                <p>{{ guide.phoneNumber }}</p>
            </div>
            <div class="lol-guide-card-right-contact-element">
                <v-icon>mdi-phone</v-icon>
                <a :href="`mailto:${guide.email}`">{{ guide.email }}</a>
            </div>

            <div class="lol-guide-card-right-contact-element">
                <v-btn :id="`lol-list-cards-content-col-card-actions-delete-${guide.id}`" icon @click="changeState(AllStates.Edit)">
                    <v-icon>
                        mdi-pencil
                    </v-icon>
                </v-btn>
                <v-btn :id="`lol-list-cards-content-col-card-actions-delete-${guide.id}`" icon @click="changeState(AllStates.Delete)">
                    <v-icon>
                        mdi-delete
                    </v-icon>
                </v-btn>
            </div>
        </div>
    </div>
</div>
</template>

<script lang="ts">
import Vue from "vue"

export default Vue.extend({
    name: 'GuideCard',
    props: {
        guide: {
            type: Object,
            default: {}
        }
    }
})
</script>

<style lang="scss">
@import "~/assets/styles/resolutions";
@import "~/assets/styles/variables";

.lol-guide-card {
    background-color: #f0f0f0;
    width: 100%;
    margin-bottom: 60px;
    display: flex;
    height: 550px;
    position: relative;

    .lol-guide-card-left {
        flex: 45;
        height: 100%;
        position: relative;
        display: flex;
        justify-content: flex-end;

        .lol-guide-card-left-image {
            width: 80%;
            height: 100%;
            position: relative;

            .lol-guide-card-left-image-left {
                width: 20%;
                background: linear-gradient(90deg,
                        rgba(240, 240, 240, 1) 0%,
                        rgba(240, 240, 240, 0) 100%);
                height: 100%;
                position: absolute;
                left: 0;
                top: 0;
                bottom: 0;
                z-index: 1;
            }

            .lol-guide-card-left-image-right {
                width: 20%;
                background: linear-gradient(270deg,
                        rgba(240, 240, 240, 1) 0%,
                        rgba(240, 240, 240, 0) 100%);
                height: 100%;
                position: absolute;
                right: 0;
                top: 0;
                bottom: 0;
                z-index: 1;
            }

            .image-wrapper {
                height: 100%;
                width: 100%;
                display: flex;
                align-content: center;
                vertical-align: middle;
                justify-content: center;

                .image-wrapper-content {
                    height: 100%;
                    width: 100%;
                    display: flex;
                    align-content: center;
                    vertical-align: middle;
                    justify-content: center;
                    position: relative;

                    img {
                        width: 100%;
                        height: 100%;
                        margin: auto;
                        display: block;
                        position: absolute;
                        top: 0px;
                        right: 0px;
                        bottom: 0px;
                        left: 0px;
                        object-fit: cover;
                    }
                }
            }
        }
    }

    .lol-guide-card-right {
        flex: 55;
        height: 100%;
        position: relative;
        margin-left: 40px;

        .lol-guide-card-right-general {
            margin-top: 40px;

            h2 {
                font-size: 2rem;
                color: $secondaryColor;
                text-align: left;
                text-transform: uppercase;
                font-family: "BebasNeue";
                letter-spacing: 1.5px;
            }

            .lol-guide-card-right-general-languages {
                margin-top: 10px;
                display: flex;
                flex-direction: row;
                align-content: center;
                vertical-align: middle;

                .lol-guide-card-right-general-languages-logo {
                    height: 20px;
                    width: 20px;
                }

                .lol-guide-card-right-general-languages-text {
                    font-size: 1rem;
                    flex: 1;
                    font-family: "Montserrat-Light";

                    span {
                        margin-left: 1%;

                        &:not(:last-child) {
                            &::after {
                                content: ",";
                            }
                        }
                    }
                }
            }

            .lol-guide-card-right-general-description {
                margin-top: 20px;
                max-width: 70ch;
                font-size: 1rem;
                font-family: "Montserrat-Light";
            }
        }

        .lol-guide-card-right-contact {
            margin-top: 60px;

            h2 {
                font-size: 1.8rem;
                color: $secondaryColor;
                text-align: left;
                text-transform: uppercase;
                margin-bottom: 40px;
                font-family: "BebasNeue";
                letter-spacing: 1.5px;
            }

            .lol-guide-card-right-contact-element {
                margin-top: 10px;
                display: flex;
                flex-direction: row;
                align-content: center;
                vertical-align: middle;

                .lol-guide-card-right-general-languages-logo {
                    height: 20px;
                    width: 20px;
                }

                p,
                a {
                    font-size: 1rem;
                    margin-left: 1%;
                    font-family: "Montserrat-Light";
                }

                a {
                    cursor: pointer;
                }

                a.hover {
                    text-decoration: none;
                }
            }
        }
    }
}
</style>
