<template>
<v-app>
    <main class="tw-z-30">
        <confirmation-dialog :maxWidth="650" :isDarkTheme="false" :isDialogOpen="this.formState == this.AllStates.DeleteLanguage" @close-dialog="changeState(AllStates.None)" @confirm-dialog="() => {deleteLanguage(); changeState(AllStates.None)} " :dialogText="`Are you sure you want to remove the language: '${ this.selectedLanguage.locale } (${ this.selectedLanguage.languageCode })'`"></confirmation-dialog>
        <confirmation-dialog :maxWidth="650" :isDarkTheme="false" :isDialogOpen="this.formState == this.AllStates.DeleteAddress" @close-dialog="changeState(AllStates.None)" @confirm-dialog="() => {deleteAddress(); changeState(AllStates.None)}" :dialogText="`Are you sure you want to remove the address: '${this.selectedAddress.streetName} ${this.selectedAddress.houseNumber} ${this.selectedAddress.postcode} ${this.selectedAddress.cityName}'`"></confirmation-dialog>
        <confirmation-dialog :maxWidth="650" :isDarkTheme="false" :isDialogOpen="this.formState == this.AllStates.DeleteLabel" @close-dialog="changeState(AllStates.None)" @confirm-dialog="() => {deleteLabel(); changeState(AllStates.None);}" :dialogText="`Are you sure you want to remove the label: '${ $getCurrentTranslationProperty(this.selectedLabel.texts, locale, 'text')}'`"></confirmation-dialog>

        <article class="marginTopLarge marginBottomLarge lol-manage">
            <h2 class="tw-text-6xl tw-uppercase">Manage</h2>
            <v-dialog v-if="(this.formState == this.AllStates.AddLanguage || this.formState == this.AllStates.EditLanguage)" v-model="isLanguageFormOpen" persistent max-width="800px">
                <v-card>
                    <v-card-title class="flex justify-center">
                        <h2 class="text-h5 uppercase text-center">{{this.formState == this.AllStates.AddLanguage ? `Add a language` : `Edit language`}}</h2>
                    </v-card-title>
                    <v-card-text>
                        <language-form :initialLocale="this.selectedLanguage.locale" :initialLanguageCode="this.selectedLanguage.languageCode" :initialIsMainLanguage="this.selectedLanguage.isMainLanguage" @language-form-submit="handleLanguageFormSubmit" @close-form-dialog-trigger="changeState(AllStates.None)"></language-form>
                    </v-card-text>
                </v-card>
            </v-dialog>
            <v-dialog v-if="(this.formState == this.AllStates.AddAddress || this.formState == this.AllStates.EditAddress)" v-model="isAddressFormOpen" persistent max-width="800px">
                <v-card>
                    <v-card-title class="flex justify-center">
                        <h2 class="text-h5 uppercase text-center">{{this.formState == this.AllStates.AddAddress ? `Add an address` : `Edit address`}}</h2>
                    </v-card-title>
                    <v-card-text>
                        <address-form :initialStreetName="this.selectedAddress.streetName" :initialHouseNumber="this.selectedAddress.houseNumber" :initialCity="this.selectedAddress.cityName" :initialPostcode="this.selectedAddress.postcode" @address-form-submit="handleAddressFormSubmit" @close-form-dialog-trigger="changeState(AllStates.None)"></address-form>
                    </v-card-text>
                </v-card>
            </v-dialog>
            <v-dialog v-if="(this.formState == this.AllStates.AddLabel || this.formState == this.AllStates.EditLabel)" v-model="isLabelFormOpen" persistent max-width="800px">
                <v-card>
                    <v-card-title class="flex justify-center">
                        <h2 class="text-h5 uppercase text-center">{{this.formState == this.AllStates.AddLabel ? `Add a label` : `Edit label`}}</h2>
                    </v-card-title>
                    <v-card-text>
                        <label-form :mainLanguages="getMainLanguages" :initialTextColorCode="this.selectedLabel.textColorCode" :initialColorCode="this.selectedLabel.colorCode" :initialTexts="this.selectedLabel.texts" @label-form-submit="handleLabelFormSubmit" @close-form-dialog-trigger="changeState(AllStates.None)"></label-form>
                    </v-card-text>
                </v-card>
            </v-dialog>
            <section class="lol-manage-element marginTopLarge marginBottomLarge">
                <v-btn tile class="btn-icon-padding" id="lol-guide-list-add-guide" rounded @click="changeState(AllStates.AddLanguage)">
                    <v-icon left>
                        mdi-bookmark-plus
                    </v-icon>
                    Add a language
                </v-btn>
                <v-card class="lol-manage-element-content">
                    <h2 class="tw-text-3xl tw-py-3" @click="toggleMenuStateByIndex(0)">
                        <v-icon v-show="menuState[0]" large>
                            mdi-chevron-up
                        </v-icon>
                        <v-icon v-show="!menuState[0]" large>
                            mdi-chevron-down
                        </v-icon>
                        Languages
                    </h2>
                    <v-card-text v-show="menuState[0]">
                        <v-data-table :headers="languageHeaders" :items="$store.state.languages.items" :items-per-page="5" class="elevation-1">
                            <template v-slot:[`item.actions`]="{ item }">
                                <v-icon small class="mr-2" @click="() => {selectedLanguage = item; changeState(AllStates.EditLanguage);}">
                                    mdi-pencil
                                </v-icon>
                                <v-icon small @click="() => {selectedLanguage = item; changeState(AllStates.DeleteLanguage);}">
                                    mdi-delete
                                </v-icon>
                            </template>
                        </v-data-table>
                    </v-card-text>
                </v-card>
            </section>
            <section class="lol-manage-element marginTopLarge marginBottomLarge">
                <v-btn tile class="btn-icon-padding" id="lol-guide-list-add-guide" rounded @click="changeState(AllStates.AddAddress)">
                    <v-icon left>
                        mdi-bookmark-plus
                    </v-icon>
                    Add a address
                </v-btn>
                <v-card class="lol-manage-element-content">
                    <h2 class="tw-text-3xl tw-py-3" @click="toggleMenuStateByIndex(1)">
                        <v-icon v-show="menuState[1]" large>
                            mdi-chevron-up
                        </v-icon>
                        <v-icon v-show="!menuState[1]" large>
                            mdi-chevron-down
                        </v-icon>
                        Addresses
                    </h2>
                    <v-card-text v-show="menuState[1]">
                        <v-data-table :headers="addressHeaders" :items="$store.state.addresses.items" :items-per-page="5" class="elevation-1">
                            <template v-slot:[`item.actions`]="{ item }">
                                <v-icon small class="mr-2" @click="() => {selectedAddress = item; changeState(AllStates.EditAddress);}">
                                    mdi-pencil
                                </v-icon>
                                <v-icon small @click="() => {selectedAddress = item; changeState(AllStates.DeleteAddress);}">
                                    mdi-delete
                                </v-icon>
                            </template>
                        </v-data-table>
                    </v-card-text>
                </v-card>
            </section>
            <section class="lol-manage-element marginTopLarge">
                <v-btn tile class="btn-icon-padding" id="lol-guide-list-add-guide" rounded @click="changeState(AllStates.AddLabel)">
                    <v-icon left>
                        mdi-bookmark-plus
                    </v-icon>
                    Add a Label
                </v-btn>
                <v-card class="lol-manage-element-content">
                    <h2 class="tw-text-3xl tw-py-3" @click="toggleMenuStateByIndex(2)">
                        <v-icon v-show="menuState[2]" large>
                            mdi-chevron-up
                        </v-icon>
                        <v-icon v-show="!menuState[2]" large>
                            mdi-chevron-down
                        </v-icon>
                        Labels
                    </h2>
                    <v-card-text v-if="!!menuState[2]">
                        <v-data-table :headers="labelHeaders" :items="$store.state.labels.items" :items-per-page="5" class="elevation-1">
                            <template v-slot:[`item.texts`]="{ item }">
                                <v-chip :color="item.colorCode" x-small outlined>{{$getCurrentTranslationProperty(item.texts, locale, 'text')}}</v-chip>
                            </template>
                            <template v-slot:[`item.actions`]="{ item }">
                                <v-icon small class="mr-2" @click="() => {selectedLabel = item; changeState(AllStates.EditLabel);}">
                                    mdi-pencil
                                </v-icon>
                                <v-icon small @click="() => {selectedLabel = item; changeState(AllStates.DeleteLabel);}">
                                    mdi-delete
                                </v-icon>
                            </template>
                        </v-data-table>
                    </v-card-text>
                </v-card>
            </section>
        </article>
    </main>
</v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import AboutUs from '~/components/AboutUs.vue'
import ActivityCards from '~/components/ActivityCards.vue'
import CFooter from '~/components/CFooter.vue'
import CHeader from '~/components/CHeader.vue'
import HomeHero from '~/components/HomeHero.vue'
import StepByStep from '~/components/StepByStep.vue'
import WhatWeStandFor from '~/components/WhatWeStandFor.vue'
import LanguageForm from '~/components/forms/LanguageForm.vue'
import AddressForm from '~/components/forms/AddressForm.vue'
import LabelForm from '~/components/forms/LabelForm.vue'
import {
    ThemeWalk
} from '~/model/theme-walk'
import axios from 'axios';

enum State {
    None,
    AddLanguage,
    EditLanguage,
    DeleteLanguage,
    AddAddress,
    EditAddress,
    DeleteAddress,
    AddLabel,
    EditLabel,
    DeleteLabel,
}

export default Vue.extend({
    name: 'ManagePage',
    middleware: 'adminAuth',
    layout(context: any) {
        return 'genericLayout'
    },
    components: {
        CHeader,
        CFooter,
        StepByStep,
        WhatWeStandFor,
        AboutUs,
        ActivityCards,
        HomeHero,
        LanguageForm,
        AddressForm,
        LabelForm
    },
    data(): any {
        return {
            themeWalks: [] as ThemeWalk[],
            addDataBeingTransmitted: true,
            selectedLanguage: ({}) as any,
            selectedAddress: ({}) as any,
            selectedLabel: ({}) as any,
            menuState: [true, true, true],
            formState: State.None as State,
            AllStates: State,
            languageHeaders: [{
                    text: 'Id',
                    align: 'start',
                    sortable: false,
                    value: '_id',
                },
                {
                    text: 'Locale',
                    value: 'locale'
                },
                {
                    text: 'Language code',
                    value: 'languageCode'
                },
                {
                    text: 'Site main language',
                    value: 'isMainLanguage'
                },
                {
                    text: 'Actions',
                    value: 'actions',
                    sortable: false
                },
            ],
            addressHeaders: [{
                    text: 'Id',
                    align: 'start',
                    sortable: false,
                    value: '_id',
                },
                {
                    text: 'Streetname',
                    value: 'streetName'
                },
                {
                    text: 'Housenumber',
                    value: 'houseNumber'
                },
                {
                    text: 'City',
                    value: 'cityName'
                },
                {
                    text: 'Postcode',
                    value: 'postcode'
                },
                {
                    text: 'Actions',
                    value: 'actions',
                    sortable: false
                },
            ],
            labelHeaders: [{
                    text: 'Id',
                    align: 'start',
                    sortable: false,
                    value: '_id',
                },
                {
                    text: 'Background color code',
                    value: 'colorCode'
                },
                {
                    text: 'Text color code',
                    value: 'textColorCode'
                },
                {
                    text: 'Text',
                    value: 'texts'
                },
                {
                    text: 'Actions',
                    value: 'actions',
                    sortable: false
                },
            ]
        }
    },
    computed: {
        locale(): any {
            return this.$store.state.locale
        },
        isLanguageFormOpen(): any {
            return (this.formState == this.AllStates.AddLanguage || this.formState == this.AllStates.EditLanguage)
        },
        isAddressFormOpen(): any {
            return (this.formState == this.AllStates.AddAddress || this.formState == this.AllStates.EditAddress)
        },
        isLabelFormOpen(): any {
            return (this.formState == this.AllStates.AddLabel || this.formState == this.AllStates.EditLabel)
        },
        getMainLanguages(): any {
            return this.$store.state.languages.items.filter((language: any) => language.isMainLanguage)
        }
    },
    async fetch(): Promise < void > {
        this.$store.dispatch('languages/get')
        .catch((error: any) => {
            console.log(error)
        })
        .finally(() => {
            this.loginDataBeingTransmitted = false;
        })
        this.$store.dispatch('addresses/get')
        .catch((error: any) => {
            console.log(error)
        })
        .finally(() => {
            this.loginDataBeingTransmitted = false;
        })
        this.$store.dispatch('labels/get')
        .catch((error: any) => {
            console.log(error)
        })
        .finally(() => {
            this.loginDataBeingTransmitted = false;
        })
    },
    methods: {
        changeState(state: State): void {
            this.formState = state;
        },
        toggleMenuStateByIndex(index: number) {
            console.log(index)
            let temp = [...this.menuState];
            temp[index] = !temp[index];
            this.menuState = temp;
        },
        handleLanguageFormSubmit(data: any) {
            let headers = {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${this.$store.state.auth.accessToken}`
                }
            };
            let apiRequest = this.formState == this.AllStates.AddLanguage ?
                axios.post(`${process.env.API_URL_REMOTE}/add-language`, JSON.stringify(data), headers) :
                axios.put(`${process.env.API_URL_REMOTE}/update-language/${(this.selectedLanguage as any)._id}`,
                    JSON.stringify({
                        _id: (this.selectedLanguage as any)._id,
                        ...data
                    }), headers)

            apiRequest
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
                    this.changeState(this.AllStates.None)
                    this.selectedLanguage = {};
                    this.$store.dispatch('languages/getForce')
                        .catch((error: any) => {
                            console.log(error)
                        })
                })
        },
        handleAddressFormSubmit(data: any) {
            let headers = {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${this.$store.state.auth.accessToken}`
                }
            };
            let apiRequest = this.formState == this.AllStates.AddLanguage ?
                axios.post(`${process.env.API_URL_REMOTE}/add-address`, JSON.stringify(data), headers) :
                axios.put(`${process.env.API_URL_REMOTE}/update-address/${(this.selectedAddress as any)._id}`,
                    JSON.stringify({
                        _id: (this.selectedAddress as any)._id,
                        ...data
                    }), headers)

            apiRequest
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
                    this.changeState(this.AllStates.None)
                    this.selectedAddress = {};
                    this.$store.dispatch('addresses/getForce')
                        .catch((error: any) => {
                            console.log(error)
                        })
                })
        },
        handleLabelFormSubmit(data: any) {
            let headers = {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${this.$store.state.auth.accessToken}`
                }
            };
            let apiRequest = this.formState == this.AllStates.AddLanguage ?
                axios.post(`${process.env.API_URL_REMOTE}/add-label`, JSON.stringify(data), headers) :
                axios.put(`${process.env.API_URL_REMOTE}/update-label/${(this.selectedLabel as any)._id}`,
                    JSON.stringify({
                        _id: (this.selectedLabel as any)._id,
                        ...data
                    }), headers)

            apiRequest
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
                    this.changeState(this.AllStates.None)
                    this.selectedLabel = {};
                    this.$store.dispatch('labels/getForce')
                        .catch((error: any) => {
                            console.log(error)
                        })
                })
        },
        deleteLanguage() {
            axios.delete(`${process.env.API_URL_REMOTE}/language/${(this.selectedLanguage as any)._id}`, {
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
                    this.$store.dispatch('languages/getForce')
                        .catch((error: any) => {
                            console.log(error)
                        })
                })
        },
        deleteAddress() {
            axios.delete(`${process.env.API_URL_REMOTE}/address/${(this.selectedAddress as any)._id}`, {
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
                    this.$store.dispatch('addresses/getForce')
                        .catch((error: any) => {
                            console.log(error)
                        })
                })
        },
        deleteLabel() {
            axios.delete(`${process.env.API_URL_REMOTE}/label/${(this.selectedLabel as any)._id}`, {
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
                    this.$store.dispatch('labels/getForce')
                        .catch((error: any) => {
                            console.log(error)
                        })
                })
        }
    }
})
</script>

<style lang="scss" scoped>
@import "~/assets/styles/resolutions";
@import "~/assets/styles/variables";
@import "~/assets/styles/fonts";

.lol-manage {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    h2 {
        color: $primaryTextColor;
        text-transform: uppercase;
        font-family: 'BebasNeue';
        text-align: center;
    }

    .lol-manage-element {
        width: 70%;
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

        .lol-manage-element-content {
            h2 {
                cursor: pointer;
                transition: all 0.25s;

                &:hover {
                    background-color: #ececec;
                    transform: scale(1.05);
                }
            }
        }
    }
}
</style>
