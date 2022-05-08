<template>
<v-app>
    <c-header></c-header>
    <main>
        <confirmation-dialog :isDarkTheme="false" :isDialogOpen="this.isDeleteDialogOpen" @close-dialog="isDeleteDialogOpen = false" @confirm-dialog="deleteWalk" :dialogText="`Are you sure you want to remove the walk with id: '${this.selectedWalk.id}'`"></confirmation-dialog>
        <alert-popup v-if="this.showAlert" @alert-finished-trigger="showAlert = false" :duration="3000" :isAlertPopupOpen="this.walkRemovedAlert" :type="`success`" :alertText="`The walk with id ${this.selectedWalk.id} has been successfully removed.`"></alert-popup>

        <generic-hero :title="$t('aLaCarte.HeroText')" :titleAlt="$t('aLaCarte.BannerAlt')" :fileUrl="`/banners/TopicBanner.jpg`"></generic-hero>
        <article class="card-list lol-list marginTopLarge marginBottomLarge">
            <loading-animation :showAnimation="!this.dataLoaded" />
            <section v-if="this.dataLoaded" class="card-list-dialogs lol-list-dialogs">
                <v-dialog v-if="this.formState == this.AllStates.Add" v-model="this.isAddDialogOpen" persistent max-width="800px">
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
                            <v-progress-linear :value="currentTab * 33.33" color="#293618" height="6"></v-progress-linear>
                        </v-card-text>
                        <v-card-title class="flex justify-center">
                            <h2 class="text-h5 uppercase text-center">Add a walk</h2>
                        </v-card-title>
                        <v-card-text v-show="this.currentTab == 1">
                            <v-container>
                                <walk-content-form :languages="this.languages" @content-form-changed="handleContentFormUpdate" @content-form-status-update="(status) => this.isContentFormValid = status" @content-form-submit="this.handleContentFormSubmit" @close-form-dialog-trigger="changeState(AllStates.None)"></walk-content-form>
                            </v-container>
                        </v-card-text>
                        <v-card-text v-show="this.currentTab == 2">
                            <v-container>
                                <walk-general-form :guides="this.guides" :labels="this.labels" :addresses="this.addresses" :areOtherFormsValid="this.isContentFormValid" @content-form-changed="this.handleGeneralFormUpdate" @content-form-status-update="(status) => this.isGeneralFormValid = status" @go-back-trigger="this.goPreviousTab" @content-form-submit="this.handleContentGeneralForm"></walk-general-form>
                            </v-container>
                        </v-card-text>
                        <v-card-text v-show="this.currentTab == 3">
                            <v-container>
                                <images-form @content-form-changed="this.handleImagesFormUpdate" @content-form-status-update="(status) => this.isImagesFormValid = status" @go-back-trigger="this.goPreviousTab" @images-form-submit="this.submitForm" :areOtherFormsValid="(this.isContentFormValid && this.isGeneralFormValid)"></images-form>
                            </v-container>
                        </v-card-text>
                    </v-card>
                </v-dialog>
                <v-dialog v-if="this.formState == this.AllStates.Edit" v-model="this.isEditDialogOpen" persistent max-width="800px">
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
                            <h2 class="text-h5 uppercase text-center">Editing walk '{{$getCurrentTranslationProperty(this.selectedWalk.titles, locale, 'title')}}'</h2>
                        </v-card-title>
                        <v-card-text v-show="currentTab == 1">
                            <v-container>
                                <walk-content-form :initialDescriptions="this.selectedWalk.descriptions" :initialTitles="this.selectedWalk.titles" :languages="this.languages" @content-form-changed="this.handleContentFormUpdate" @content-form-status-update="(status) => this.isContentFormValid = status" @content-form-submit="this.handleContentFormSubmit" @close-form-dialog-trigger="changeState(this.AllStates.None)"></walk-content-form>
                            </v-container>
                        </v-card-text>
                        <v-card-text v-show="currentTab == 2">
                            <v-container>
                                <walk-general-form :initialPricePerPerson="this.selectedWalk.pricePerPerson" :initialDuration="this.selectedWalk.duration" :initialStartLocation="this.selectedWalk.startLocation" :initialEndLocation="this.selectedWalk.endLocation" :initialSelectedGuides="this.selectedWalk.guides" :initialSelectedLabels="this.selectedWalk.labels" :guides="this.guides" :labels="this.labels" :addresses="this.addresses" :areOtherFormsValid="this.isContentFormValid" @content-form-changed="this.handleGeneralFormUpdate" @content-form-status-update="(status) => this.isGeneralFormValid = status" @go-back-trigger="this.goPreviousTab" @content-form-submit="this.handleContentGeneralForm"></walk-general-form>
                            </v-container>
                        </v-card-text>
                        <v-card-text v-show="currentTab == 3">
                            <v-container>
                                <images-form :initialImagesFileData="this.selectedWalk.images" :initialMainImageFiledata="this.selectedWalk.banner" @content-form-changed="this.handleImagesFormUpdate" @content-form-status-update="(status) => this.isImagesFormValid = status" @go-back-trigger="this.goPreviousTab" @images-form-submit="this.submitForm" :areOtherFormsValid="(this.isContentFormValid && this.isGeneralFormValid)"></images-form>
                            </v-container>
                        </v-card-text>
                    </v-card>
                </v-dialog>
            </section>
            <section v-if="dataLoaded" class="lol-list-cards">
                <div class="lol-list-cards-content">
                    <v-btn v-if="!!this.$store.state.auth.user" tile class="btn-icon-padding" id="lol-list-cards-add-a-la-carte" rounded @click="changeState(AllStates.Add)">
                        <v-icon left>
                            mdi-bookmark-plus
                        </v-icon>
                        Add a walk
                    </v-btn>
                    <div v-for="(item, index) in $getAmountOfRows(walks, 3)" :key="index" class="lol-list-cards-content-row">
                        <div v-for="(walk) in $getElementsOfCurrentRow(walks, item, 3)" :key="walk.id" class="lol-list-cards-content-col">
                            <card :loading="loading" :imgSrc="walk.banner.fileDownloadUrl" :title="$getCurrentTranslationProperty(walk.titles, locale, 'title')" :description="$getCurrentTranslationProperty(walk.descriptions, locale, 'description')" :link="`/a-la-carte/${walk.id}`" :id="walk.id" @on-mouse-event="setCurrentSelectedWalk(walk)">
                                <div class="lol-list-card-body-detail mb-2 tw-text-xs">
                                    <v-icon>
                                        mdi-cash
                                    </v-icon>
                                    $ {{walk.pricePerPerson}} • per person
                                </div>
                                <div class="lol-list-card-body-detail mb-2 tw-text-xs">
                                    <v-icon>
                                        mdi-timer
                                    </v-icon>
                                    {{walk.duration}} minute(s)
                                </div>
                                <v-chip-group v-if="walk.labels.length > 0" active-class="deep-purple accent-4 white--text" column>
                                    <v-chip v-for="label in walk.labels" :key="label.id" :color="label.colorCode" x-small outlined>{{$getCurrentTranslationProperty(label.texts, locale, 'text')}}</v-chip>
                                </v-chip-group>

                                <template v-if="!!$store.state.auth.user" v-slot:actions>
                                    <v-btn class="lol-list-card-actions-extra" :id="`lol-list-cards-content-col-card-actions-delete-${walk.id}`" icon @click="changeState(AllStates.Edit)">
                                        <v-icon>
                                            mdi-pencil
                                        </v-icon>
                                    </v-btn>
                                    <v-btn class="lol-list-card-actions-extra" :id="`lol-list-cards-content-col-card-actions-delete-${walk.id}`" icon @click="changeState(AllStates.Delete)">
                                        <v-icon>
                                            mdi-delete
                                        </v-icon>
                                    </v-btn>
                                </template>
                            </card>
                        </div>
                    </div>
                </div>
            </section>
        </article>
        <article class="marginTopLarge marginBottomLarge">
            <step-by-step></step-by-step>
        </article>
    </main>
    <c-footer></c-footer>
</v-app>
</template>

<script lang="ts" setup>
import axios from "axios";
import Vue from "vue";
import CHeader from "~/components/CHeader.vue";
import CFooter from '~/components/CFooter.vue';
import ConfirmationDialog from "~/components/ConfirmationDialog.vue";
import WalkContentForm from '~/components/forms/WalkContentForm.vue';
import WalkGeneralForm from "~/components/forms/WalkGeneralForm.vue";
import ImagesForm from "~/components/forms/ImagesForm.vue";
import Card from '~/components/Card.vue'
import {
    Subject
} from 'rxjs'
import {
    Walk
} from "~/model/walk";
import {
    Label
} from "~/model/label";
import {
    Address
} from "~/model/address";
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

let dataDirty = new Subject<void>();

export default Vue.extend({
    components: {
        CHeader,
        CFooter,
        ConfirmationDialog,
        WalkContentForm,
        WalkGeneralForm,
        ImagesForm,
        Card
    },
    data(): any {
        return {
            labels: [] as Label[],
            addresses: [] as Address[],
            guides: [] as Guide[],
            languages: [] as Language[],
            loading: false,
            isAddDialogOpen: false,
            isEditDialogOpen: false,
            isDeleteDialogOpen: false,
            walkRemovedAlert: false,
            selectedWalk: ({}) as Walk,
            currentTab: 1 as number,
            currentStep: 1 as number,
            isContentFormValid: false,
            isGeneralFormValid: false,
            isImagesFormValid: false,
            showAlert: false,
            baseWalk: ({}) as Walk,
            banner: ({}) as any,
            images: [] as any[],
            formState: State.None as State,
            AllStates: State,
            dataLoaded: false,
            dataDirtySubscription: ({}) as any
        }
    },
    computed: {
        locale(): void {
            return this.$store.state.locale
        },
        walks(): Walk[] {
            return this.$store.state.aLaCarteWalks.walks;
        }
    },
    mounted(): void {
        this.dataDirtySubscription = dataDirty.subscribe({
            next: () => console.log(`observerA`),
        });
    },
    beforeDestroy() {
        this.dataDirtySubscription.unsubscribe();
    },
    async fetch(): Promise < void > {
        console.log(this.$config)
        this.$store.dispatch('aLaCarteWalks/fetch')
        .catch((error: any) => {
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

        this.$store.dispatch('labels/get')
        .catch(() => {
            this.dataLoadedSuccessfully = false;
        }).finally(() => {
            this.dataLoaded = true;
        });

        
        this.$store.dispatch('addresses/get')
        .catch(() => {
            this.dataLoadedSuccessfully = false;
        }).finally(() => {
            this.dataLoaded = true;
        });

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
        setCurrentSelectedWalk(walk: Walk): void {
            this.selectedWalk = walk;
            this.banner = this.selectedWalk.banner;
            this.images = this.selectedWalk.images;
        },
        reserve(): void {
            this.loading = true

            setTimeout(() => (this.loading = false), 2000)
        },
        changeState(state: State): void {
            switch (state) {
                case State.None:
                    this.isAddDialogOpen = false;
                    this.isEditDialogOpen = false;
                    this.isDeleteDialogOpen = false;
                    this.currentStep = 0;
                    this.currentTab = 0;
                    break;
                case State.Add:
                    this.isAddDialogOpen = true;
                    this.isEditDialogOpen = false;
                    this.isDeleteDialogOpen = false;
                    break;
                case State.Edit:
                    this.isAddDialogOpen = false;
                    this.isEditDialogOpen = true;
                    this.isDeleteDialogOpen = false;
                    break;
                case State.Delete:
                    this.isAddDialogOpen = false;
                    this.isEditDialogOpen = false;
                    this.isDeleteDialogOpen = true;
                    break;
                default:
                    this.isAddDialogOpen = false;
                    this.isEditDialogOpen = false;
                    this.isDeleteDialogOpen = false;
                    this.currentStep = 0;
                    this.currentTab = 0;
                    break;
            }
            this.formState = state;
        },
        handleContentFormSubmit(): void {
            this.currentStep = 2;
            this.currentTab = 2;
        },
        handleContentGeneralForm(): void {
            this.currentStep = 3;
            this.currentTab = 3;
        },
        openDeteleWalkDialog(): void {
            this.isDeleteDialogOpen = true;
        },
        goPreviousTab(): void {
            this.currentTab--;
        },
        deleteWalk(): void {
            this.isDeleteDialogOpen = false;
            axios.delete(`${process.env.API_URL_LOCALE}/walks/${(this.selectedWalk as any).id}`, {
                    headers: {
                        "Content-Type": "application/json",
                        "withCredentials": "true"
                    }
                })
                .then((res) => {
                    
                })
                .catch((err) => {
                    console.log(err)
                })
                .finally(() => {
                    dataDirty.next();
                })
        },
        handleContentFormUpdate(data: any): void {
            this.baseWalk['titles'] = data.titles;
            this.baseWalk['descriptions'] = data.descriptions;
        },
        handleGeneralFormUpdate(data: any): void {
            this.baseWalk['pricePerPerson'] = data.pricePerPerson;
            this.baseWalk['duration'] = data.duration;
            this.baseWalk['startLocation'] = data.startLocation;
            this.baseWalk['endLocation'] = data.endLocation;
            this.baseWalk['labels'] = data.labels;
            this.baseWalk['guides'] = data.guides;
        },
        handleImagesFormUpdate(data: any): void {
            this.banner = data.mainImage;
            this.images = data.images;
        },
        submitForm(): void {
            let formData = new FormData();
            formData.delete('walk')
            formData.delete('banner')
            formData.delete('images')

            formData.append('walk', new Blob([JSON.stringify(this.baseWalk)], {
                type: "application/json"
            }))
            formData.append('banner', new Blob([this.banner], {
                type: "multipart/form-data"
            }), this.banner.name);

            for (let i = 0; i < this.images.length; i++) {
                formData.append('images', new Blob([this.images[i]], {
                    type: "multipart/form-data"
                }), this.images[i].name);
            }
            axios({
                    method: 'POST',
                    url: `${process.env.API_URL_LOCALE}/walks/`,
                    data: formData,
                    headers: {
                        "Content-Type": "multipart/form-data",
                        "withCredentials": "true"
                    }
                })
                .then((res) => {
                    this.changeState(this.AllStates.None)
                    this.$store.dispatch('aLaCarteWalks/fetch')
                        .catch((error: any) => {
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
                })
                .catch((err) => console.log(err))
        }
    }
});
</script>

<style lang="scss">
article.card-list {
    width: 100%;
}
</style>
