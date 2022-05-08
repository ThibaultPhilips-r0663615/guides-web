<template>
<v-app>
    <main>
        <confirmation-dialog :maxWidth="650" :isDarkTheme="false" :isDialogOpen="this.formState == this.AllStates.Delete" @close-dialog="isDeleteDialogOpen = false" @confirm-dialog="deleteGuide" :dialogText="`Are you sure you want to remove the guide with name: '${ this.selectedGuide.firstName } ${ this.selectedGuide.lastName }'`"></confirmation-dialog>

        <article>
            <guide-hero :bannerAlt="$t('guide.BannerAlt')" :heroImageAlt="$t('guide.HeroImageAlt')" :heroText="$t('guide.HeroText')"></guide-hero>
        </article>

        <article class="marginTopLarge marginBottomLarge">
            <section v-if="dataLoaded" class="card-list-dialogs lol-list-dialogs">
                <v-dialog v-if="(this.formState == this.AllStates.Add || this.formState == this.AllStates.Edit)" v-model="isFormOpen" persistent max-width="800px">
                    <v-card>
                        <v-card-text>
                            <v-btn :id="`lol-list-cards-content-col-card-actions-delete`" icon @click="changeState(AllStates.None)">
                                <v-icon>
                                    mdi-window-close
                                </v-icon>
                            </v-btn>
                            <v-tabs color="#293618" hide-slider :value="this.currentTab - 1">
                                <v-tab @click="currentTab = 1">Content</v-tab>
                                <v-tab @click="currentTab = 2" :disabled="!(this.currentStep >= 2 && this.isContentFormValid)">General</v-tab>
                                <v-tab @click="currentTab = 3" :disabled="!(this.currentStep >= 3 && this.isContentFormValid && this.isGeneralFormValid)">Images</v-tab>
                            </v-tabs>
                            <v-progress-linear :value="this.currentTab * 33.33" color="#293618" height="6"></v-progress-linear>
                        </v-card-text>
                        <v-card-title class="flex justify-center">
                            <h2 class="text-h5 uppercase text-center" v-if="this.formState == this.AllStates.EditLabel">Editing walk '{{ this.selectedGuide.firstName }} {{ this.selectedGuide.lastName }} {{ this.selectedGuide.nickName ? "(" + this.selectedGuide.nickName + ")" : "" }}'</h2>
                            <h2 class="text-h5 uppercase text-center" v-if="this.formState == this.AllStates.AddLabel">Add a guide</h2>
                        </v-card-title>
                        <v-card-text v-show="this.currentTab == 1">
                            <v-container>
                                <guide-content-form :initialEmail="this.selectedGuide.email" :initialFirstName="this.selectedGuide.firstName" :initialLastName="this.selectedGuide.lastName" :initialNickName="this.selectedGuide.nickName" :initialPhoneNumber="this.selectedGuide.phoneNumber" @content-form-changed="handleContentFormUpdate" @content-form-status-update="(status) => this.isContentFormValid = status" @content-form-submit="handleContentFormSubmit" @close-form-dialog-trigger="changeState(AllStates.None)"></guide-content-form>
                            </v-container>
                        </v-card-text>
                        <v-card-text v-show="this.currentTab == 2">
                            <v-container>
                                <guide-general-form :initialDescriptions="this.selectedGuide.descriptions" :initialSelectedLanguages="this.selectedGuide.languages" :allLanguages="$store.state.languages.items" :mainLanguages="getMainLanguages" :areOtherFormsValid="isContentFormValid" @content-form-changed="handleGeneralFormUpdate" @content-form-status-update="(status) => isGeneralFormValid = status" @go-back-trigger="goPreviousTab" @content-form-submit="handleGeneralFormSubmit"></guide-general-form>
                            </v-container>
                        </v-card-text>
                        <v-card-text v-show="this.currentTab == 3">
                            <v-container>
                                <images-form :initialImagesFileData="this.selectedGuide.images" :initialMainImageFiledata="this.selectedGuide.profilePicture" @content-form-changed="handleImagesFormUpdate" @content-form-status-update="(status) => isImagesFormValid = status" @go-back-trigger="goPreviousTab" @images-form-submit="submitForm" :areOtherFormsValid="(isContentFormValid && isGeneralFormValid)"></images-form>
                            </v-container>
                        </v-card-text>
                    </v-card>
                </v-dialog>
            </section>
            <section class="lol-guide-list">
                <h2 class="tw-text-6xl tw-uppercase">Guides</h2>
                <loading-animation :showAnimation="!this.dataLoaded" class="marginTopLarge" />
                <section v-if="dataLoaded" class="lol-guide-list-content">
                    <v-btn v-if="!!$store.state.auth.user" tile class="btn-icon-padding" id="lol-guide-list-add-guide" rounded @click="() => {changeState(AllStates.Add)}">
                        <v-icon left>
                            mdi-bookmark-plus
                        </v-icon>
                        Add a guide
                    </v-btn>
                    <div v-for="guide in $store.state.guides.items" :key="guide.id" class="lol-guide-list-content-element">
                        <div class="lol-guide-list-content-element-left">
                            <div class="lol-guide-list-content-element-left-image">
                                <div class="lol-guide-list-content-element-left-image-left"></div>
                                <div class="lol-guide-list-content-element-left-image-right"></div>
                                <img :src="guide.profilePicture.fileDownloadUrl" />
                            </div>
                        </div>

                        <div class="lol-guide-list-content-element-right tw-py-8">
                            <div class="lol-guide-list-content-element-right-general">
                                <h2 class="tw-text-4xl">
                                    {{ guide.firstName }} {{ guide.lastName }}
                                    {{ guide.nickName ? "(" + guide.nickName + ")" : "" }}
                                </h2>
                                <div class="lol-guide-list-content-element-right-general-languages">
                                    <v-icon small class="tw-mr-2">
                                        mdi-translate
                                    </v-icon>
                                    <p class="lol-guide-list-content-element-right-general-languages-text tw-text-xs">
                                        <span class="tw-pr-2" v-for="language in guide.languages" :key="language.id">{{ language.locale }} ({{ language.languageCode }})</span>
                                    </p>
                                </div>
                                <p class="tw-text-sm tw-mt-4">{{$getCurrentTranslationProperty(guide.descriptions, locale, 'description')}}</p>
                            </div>
                            <div class="lol-guide-list-content-element-right-contact tw-mt-12">
                                <h2 class="tw-text-4xl">CONTACT GEGEVENS</h2>
                                <div class="lol-guide-list-content-element-right-contact-element">
                                    <v-icon class="tw-mr-2">
                                        mdi-phone
                                    </v-icon>
                                    <p class="tw-text-sm">{{ guide.phoneNumber }}</p>
                                </div>
                                <div class="lol-guide-list-content-element-right-contact-element">
                                    <v-icon class="tw-mr-2">
                                        mdi-email
                                    </v-icon>
                                    <a class="tw-text-sm" :href="`mailto:${guide.email}`">{{ guide.email }}</a>
                                </div>

                                <div v-if="!!$store.state.auth.user" class="lol-guide-list-content-element-right-contact-element tw-pt-2">
                                    <v-btn :id="`lol-list-cards-content-col-card-actions-delete-${guide.id}`" icon @click="() => {selectedGuide = guide; changeState(AllStates.Edit);}">
                                        <v-icon>
                                            mdi-pencil
                                        </v-icon>
                                    </v-btn>
                                    <v-btn :id="`lol-list-cards-content-col-card-actions-delete-${guide.id}`" icon  @click="() => {selectedGuide = guide; changeState(AllStates.Delete);}">
                                        <v-icon>
                                            mdi-delete
                                        </v-icon>
                                    </v-btn>
                                </div>
                            </div>
                        </div>
                    </div>

                </section>
            </section>
        </article>
    </main>
</v-app>
</template>

<script lang="ts">
import Vue from "vue";
import axios from "axios";
import ImageWrapper from "~/components/ImageWrapper.vue";
import GuideContentForm from "~/components/forms/GuideContentForm.vue";
import GuideGeneralForm from "~/components/forms/GuideGeneralForm.vue";
import ImagesForm from '~/components/forms/ImagesForm.vue';
import {
    Guide
} from "~/model/guide";
import {
    Language
} from "~/model/language";

enum State {
    None,
    Add,
    Edit,
    Delete
}

export default Vue.extend({
    name: 'GuidesPage',
    layout(context: any) {
        return 'genericLayout'
    },
    components: {
        ImageWrapper,
        GuideContentForm,
        GuideGeneralForm,
        ImagesForm
    },
    data() {
        return {
            guides: [] as Guide[],
            languages: [] as Language[],
            dataLoaded: false,
            dataLoadedSuccessfully: false,
            isAddDialogOpen: false,
            isEditDialogOpen: false,
            isDeleteDialogOpen: false,
            selectedGuide: ({}) as Guide,
            currentTab: 1 as number,
            currentStep: 1 as number,
            isContentFormValid: false,
            isGeneralFormValid: false,
            isImagesFormValid: false,
            showAlert: false,
            formState: State.None as State,
            AllStates: State,
            guide: ({}) as Guide,
            profilePicture: ({}) as File,
            images: [] as File[],
            addDataBeingTransmitted: false,
        }
    },
    computed: {
        locale(): string {
            return this.$store.state.locale
        },
        getMainLanguages(): any {
            return this.$store.state.languages.items.filter((language: any) => language.isMainLanguage)
        },
        isFormOpen(): Boolean {
            console.log('test')
            return (this.formState == this.AllStates.Add || this.formState == this.AllStates.Edit)
        }
    },
    async fetch(): Promise < void > {
        this.$store.dispatch('guides/get')
        .catch(() => {
            this.dataLoadedSuccessfully = false;
        }).finally(() => {
            this.dataLoaded = true;
        });

        this.$store.dispatch('languages/get')
        .catch(() => {
            this.dataLoadedSuccessfully = false;
        }).finally(() => {
            this.dataLoaded = true;
        });
    },
    methods: {
        changeState(state: State): void {
            this.formState = state;
        },
        handleContentFormSubmit(data: any): void {
            this.handleContentFormUpdate(data);
            this.currentStep = 2;
            this.currentTab = 2;
        },
        handleGeneralFormSubmit(data: any): void {
            this.handleGeneralFormUpdate(data);
            this.currentStep = 3;
            this.currentTab = 3;
        },
        goPreviousTab(): void {
            this.currentTab--;
        },
        deleteGuide(): void {
            axios.delete(`${process.env.API_URL_REMOTE}/guide/${(this.selectedGuide as any)._id}`, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${this.$store.state.auth.accessToken}`
                    }
                })
                .catch((error) => {
                    if (error.response) {
                        // The request was made and the server responded with a status code
                        // that falls out of the range of 2xx
                        console.log(error.response.data);
                        console.log(error.response.status);
                        console.log(error.response.headers);
                    } else if (error.request) {
                        // The request was made but no response was received
                        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                        // http.ClientRequest in node.js
                        console.log(error.request);
                    } else {
                        // Something happened in setting up the request that triggered an Error
                        console.log('Error', error.message);
                    }
                })
                .finally(() => {
                    this.changeState(this.AllStates.None);
                    this.$store.dispatch('guides/getForce')
                        .catch((error: any) => {
                            console.log(error)
                        })
                })
        },
        handleContentFormUpdate(data: any): void {
            this.guide.firstName = data.firstName;
            this.guide.lastName = data.lastName;
            this.guide.nickName = data.nickName;
            this.guide.email = data.email;
            this.guide.phoneNumber = data.phoneNumber;
        },
        handleGeneralFormUpdate(data: any): void {
            this.guide.languages = data.languages;
            this.guide.descriptions = data.descriptions;
        },
        handleImagesFormUpdate(data: any): void {
            this.profilePicture = data.mainImage;
            this.images = data.images;
        },
        submitForm(data: any): void {
            this.addDataBeingTransmitted = true;
            this.handleImagesFormUpdate(data);
            let formData = new FormData();
            formData.delete('guide')
            formData.delete('profilePicture')
            formData.delete('images')

            formData.append('guide', JSON.stringify(this.guide))
            // formData.append('guide', new Blob([JSON.stringify(this.guide)]))
            formData.append('profilePicture', new Blob([this.profilePicture], {
                type: this.profilePicture.type
            }), this.profilePicture.name);

            for (let i = 0; i < this.images.length; i++) {
                formData.append('images', new Blob([this.images[i]], {
                    type: this.images[i].type
                }), this.images[i].name);
            }

            axios({
                    method: 'POST',
                    url: `${process.env.API_URL_REMOTE}/add-guide`,
                    data: formData,
                    headers: {
                        "Content-Type": "multipart/form-data",
                        "Authorization": `Bearer ${this.$store.state.auth.accessToken}`
                    }
                })
                .then((res) => {
                    console.log(res)
                    this.changeState(State.None)
                })
                .catch((error) => {
                    if (error.response) {
                        // The request was made and the server responded with a status code
                        // that falls out of the range of 2xx
                        console.log(error.response.data);
                        console.log(error.response.status);
                        console.log(error.response.headers);
                    } else if (error.request) {
                        // The request was made but no response was received
                        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                        // http.ClientRequest in node.js
                        console.log(error.request);
                    } else {
                        // Something happened in setting up the request that triggered an Error
                        console.log('Error', error.message);
                    }
                })
                .finally(() => {
                    this.addDataBeingTransmitted = false
                    this.changeState(this.AllStates.None);
                    this.selectedGuide = {} as any;
                    this.$store.dispatch('guides/getForce')
                        .catch((error: any) => {
                            console.log(error)
                        })
                })
        }
    },
    head(): any {
        return {
            title: this.$t(`SEO.GuideTitle`) as string,
            meta: [{
                    hid: 'description',
                    name: 'description',
                    content: this.$t(`SEO.GuideDescription`) as string
                },
                {
                    hid: 'keywords',
                    name: 'keywords',
                    content: this.$t(`SEO.GuideKeyWords`) as string
                },
                {
                    hid: 'twitter:card',
                    name: 'twitter:card',
                    content: 'summary'
                },
                {
                    hid: 'twitter:title',
                    name: 'twitter:title',
                    content: ((this.$t(`SEO.GuideTitle`) as string).length >= 70 ? (this.$t(`SEO.GuideTitle`) as string) : (this.$t(`SEO.GuideTitle`) as string).substring(0, 70))
                },
                {
                    hid: 'twitter:description',
                    name: 'twitter:description',
                    content: this.$t(`SEO.GuideDescription`) as string
                },
                {
                    hid: 'twitter:image',
                    name: 'twitter:image',
                    content: `${process.env.WEBSITE_DOMAIN}${require('~/assets/images/Logo.png')}`
                },
                {
                    hid: 'og:title',
                    name: 'og:title',
                    content: this.$t(`SEO.GuideTitle`) as string
                },
                {
                    hid: 'og:description',
                    name: 'og:description',
                    content: this.$t(`SEO.GuideDescription`) as string
                },
                {
                    hid: 'og:url',
                    name: 'og:url',
                    content: `${process.env.WEBSITE_DOMAIN}${this.$route.path}`
                },
                {
                    hid: 'og:type',
                    name: 'og:type',
                    content: 'website'
                },
                {
                    hid: 'og:site_name',
                    name: 'og:site_name',
                    content: process.env.WEBSITE_NAME
                },
                {
                    hid: 'og:locale',
                    name: 'og:locale',
                    content: this.$store.state.locale
                },
                {
                    hid: 'og:locale:alternate',
                    name: 'og:locale:alternate',
                    content: this.languages.reduce((array: any[], currentLanguage: any) => {
                        let currentLanguageCode = this.$store.state.locales.filter((language: any) => (language.toLowerCase() == currentLanguage.languageCode.toLowerCase() && !(currentLanguage.languageCode.toLowerCase() == this.$store.state.locale.toLowerCase())))
                        if (currentLanguageCode.length >= 1) {
                            array.push(currentLanguage.languageCode)
                        }
                        return array;
                    }, [])

                },
                {
                    hid: 'og:image',
                    name: 'og:image',
                    content: `${process.env.WEBSITE_DOMAIN}${require('~/assets/images/Logo.png')}`
                }
            ]
        }
    }
});
</script>

<style lang="scss" scoped>
@import "~/assets/styles/resolutions";
@import "~/assets/styles/variables";

.lol-guide-list {
    width: 100%;

    h2 {
        color: $primaryTextColor;
        text-transform: uppercase;
        font-family: 'BebasNeue';
        text-align: center;
    }

    .lol-guide-list-content {
        position: relative;

        #lol-guide-list-add-guide {
            position: absolute;
            top: -2.5rem;
            right: 0;
            color: $secondaryTextColor;
            background: rgb(41, 54, 24);
            background: linear-gradient(124deg, rgba(41, 54, 24, 1) 0%, rgba(96, 109, 56, 1) 100%, rgba(41, 54, 24, 1) 293618%);
            box-shadow: 4px 4px 10px 1px $colorGreen;
            padding: 0 55px;
            border-radius: 20px;
            transition: all .25s;

            @include lPhone-and-pTablets {
                transform: translate(-50%, 0);
                width: 95%;
                left: 50%;
            }

            &:hover {
                opacity: .9;
                box-shadow: 6px 6px 15px 2px $colorLightGreen;
                transform: scale(1.05);

                @include lPhone-and-pTablets {
                    transform: translate(-50%, 0) scale(1.02);
                }
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

        .lol-guide-list-content-element {
            background-color: #F0F0F0;
            width: 100%;
            margin-bottom: 60px;
            display: flex;
            height: auto;
            position: relative;

            .lol-guide-list-content-element-left {
                flex: 45;
                position: relative;
                display: flex;
                justify-content: flex-end;

                .lol-guide-list-content-element-left-image {
                    width: 80%;
                    position: relative;

                    .lol-guide-list-content-element-left-image-left {
                        width: 20%;
                        background: linear-gradient(90deg, rgba(240, 240, 240, 1) 0%, rgba(240, 240, 240, 0) 100%);
                        position: absolute;
                        left: 0;
                        top: 0;
                        bottom: 0;
                        z-index: 1;
                        max-height: 100%;
                    }

                    .lol-guide-list-content-element-left-image-right {
                        width: 20%;
                        background: linear-gradient(270deg, rgba(240, 240, 240, 1) 0%, rgba(240, 240, 240, 0) 100%);
                        position: absolute;
                        right: 0;
                        top: 0;
                        bottom: 0;
                        z-index: 1;
                        max-height: 100%;
                    }

                    img {
                        position: absolute;
                        left: 0;
                        top: 0;
                        width: 100%;
                        object-fit: cover;
                        max-height: 100%;
                        height: 100%;
                    }
                }
            }

            .lol-guide-list-content-element-right {
                flex: 55;
                height: 100%;
                position: relative;
                margin-left: 40px;

                .lol-guide-list-content-element-right-general {
                    h2 {
                        text-align: left;
                        color: $colorGreen;
                        font-family: 'BebasNeue';
                        background: linear-gradient(124deg, rgba(41, 54, 24, 1) 0%, rgba(96, 109, 56, 1) 100%, rgba(41, 54, 24, 1) 293618%);
                        background-clip: text;
                        -webkit-background-clip: text;
                        -webkit-text-fill-color: transparent;

                    }

                    .lol-guide-list-content-element-right-general-languages {
                        margin-top: 10px;
                        display: flex;
                        flex-direction: row;
                        align-content: center;
                        vertical-align: middle;

                        i {
                            color: $colorGreen;
                        }

                        p {
                            display: flex;

                            span {
                                &:not(:last-child) {
                                    &::after {
                                        content: ','
                                    }
                                }
                            }
                        }
                    }

                    p {
                        max-width: 70ch;
                        font-family: 'Montserrat-Light';
                    }
                }

                .lol-guide-list-content-element-right-contact {
                    h2 {
                        text-align: left;
                        color: $colorGreen;
                        font-family: 'BebasNeue';
                        background: linear-gradient(124deg, rgba(41, 54, 24, 1) 0%, rgba(96, 109, 56, 1) 100%, rgba(41, 54, 24, 1) 293618%);
                        background-clip: text;
                        -webkit-background-clip: text;
                        -webkit-text-fill-color: transparent;
                    }

                    .lol-guide-list-content-element-right-contact-element {
                        margin-top: 10px;
                        display: flex;
                        flex-direction: row;
                        align-content: center;
                        vertical-align: middle;

                        i {
                            color: $colorGreen;
                        }

                        p,
                        a {
                            font-family: 'Montserrat-Light';
                        }

                        a {
                            color: $primaryTextColor;
                            text-decoration: none;
                            position: relative;
                            width: inherit;

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

                        }
                    }
                }
            }
        }
    }
}
</style>
