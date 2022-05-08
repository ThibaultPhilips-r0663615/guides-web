<template>
<div>
    <v-form ref="generalForm" v-model="isFormValid">
        <v-row>
            <v-col cols="12" sm="6">
                <v-text-field :id="`price-per-person`" :name="`price-per-person`" :autocomplete="`price-per-person`" @change="dataChanged" v-model="pricePerPerson" :rules="pricePerPersonRules" color="#293618" label="Price per person*" hint="In euros" persistent-hint required></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
                <v-text-field :id="`duration`" :name="`duration`" :autocomplete="`duration`" @change="dataChanged" v-model="duration" :rules="durationRules" color="#293618" label="Duration*" hint="In minutes" persistent-hint></v-text-field>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12" sm="6">
                <v-select :id="`start-address`" :name="`start-address`" :autocomplete="`start-address`" @change="dataChanged" color="#293618" v-model="startLocation" :items="addresses" label="Start location" required :item-text="getLocationItemText" :item-value="getLocationItemValue">
                    <template v-slot:selection="data">
                        <v-chip close @click:close="removeStartLocation(data.item)" class="whitespace-normal">
                            {{data.item.street}} {{data.item.houseNumber}} {{data.item.postcode}} {{data.item.city}}
                        </v-chip>
                    </template>
                    <template v-slot:item="data">
                        {{data.item.street}} {{data.item.houseNumber}} {{data.item.postcode}} {{data.item.city}}
                    </template>
                </v-select>
            </v-col>
            <v-col cols="12" sm="6">
                <v-select :id="`end-address`" :name="`end-address`" :autocomplete="`end-address`" @change="dataChanged" color="#293618" v-model="endLocation" :items="addresses" label="End location" required :item-text="getLocationItemText" :item-value="getLocationItemValue">
                    <template v-slot:selection="data">
                        <v-chip close @click:close="removeEndLocation(data.item)">
                            {{data.item.street}} {{data.item.houseNumber}} {{data.item.postcode}} {{data.item.city}}
                        </v-chip>
                    </template>
                    <template v-slot:item="data">
                        {{data.item.street}} {{data.item.houseNumber}} {{data.item.postcode}} {{data.item.city}}
                    </template>
                </v-select>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12" sm="6">
                <v-autocomplete :id="`labels`" :name="`labels`" :autocomplete="`labels`" @change="dataChanged" color="#293618" v-model="selectedLabels" :items="labels" label="Select labels" multiple :item-text="getLabelItemText" :item-value="getLabelItemValue">
                    <template v-slot:selection="data">
                        <v-chip close @click:close="removeLabel(data.item)" :color="data.item.colorCode" x-small outlined>
                            {{data.item.texts[0].text}}
                        </v-chip>
                    </template>
                    <template v-slot:item="data">
                        {{data.item.texts[0].text}}
                    </template>
                </v-autocomplete>
            </v-col>
            <v-col cols="12" sm="6">
                <v-autocomplete :id="`guides`" :name="`guides`" :autocomplete="`guides`" @change="dataChanged" color="#293618" v-model="selectedGuides" :items="guides" label="Select guides" multiple :item-text="getGuideItemText" :item-value="getGuideItemValue">
                    <template v-slot:selection="data">
                        <v-chip close @click:close="removeGuides(data.item)">
                            <v-avatar left>
                                <v-img :src="data.item.profilePicture.fileDownloadUrl"></v-img>
                            </v-avatar>
                            {{data.item.firstName}} {{data.item.lastName}}
                        </v-chip>
                    </template>
                    <template v-slot:item="data">
                        <v-avatar left>
                            <v-img max-height="35" max-width="35" :src="data.item.profilePicture.fileDownloadUrl"></v-img>
                        </v-avatar>
                        {{data.item.firstName}} {{data.item.lastName}}
                    </template>
                </v-autocomplete>
            </v-col>
        </v-row>
        <small>*indicates required field</small>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="#293618" text @click="handleGoBack">
                Back
            </v-btn>
            <v-btn color="#293618" text @click="handleFormSubmitValidateForm" :disabled="!(areOtherFormsValid && isFormValid)">
                Next
            </v-btn>
        </v-card-actions>
    </v-form>
</div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
    name: 'WalkGeneralForm',
    props: {
        initialPricePerPerson: {
            type: Number,
            default: 0
        },
        initialDuration: {
            type: Number,
            default: 0
        },
        addresses: {
            type: Array,
            default: false
        },
        initialStartLocation: {
            type: Object,
            default: () => null
        },
        initialEndLocation: {
            type: Object,
            default: () => null
        },
        guides: {
            type: Array,
            default: () => []
        },
        initialSelectedGuides: {
            type: Array,
            default: () => []
        },
        labels: {
            type: Array,
            default: () => []
        },
        initialSelectedLabels: {
            type: Array,
            default: () => []
        },
        areOtherFormsValid: {
            type: Boolean,
            default: false
        },
    },
    data() {
        return {
            isFormValid: false,
            pricePerPerson: this.initialPricePerPerson,
            duration: this.initialDuration,
            startLocation: !!this.initialStartLocation ? this.initialStartLocation : {},
            endLocation: this.initialEndLocation ? this.initialEndLocation : {},
            selectedGuides: this.guides.reduce((array : any[], currentVal: any) => {
                let currentGuide = this.initialSelectedGuides.filter((guide: any) => currentVal.id == guide.id) as any[]
                if(currentGuide.length >= 1)
                    array.push(currentGuide[0])
                
                return array;
            }, []),
            selectedLabels: this.labels.reduce((array : any[], currentVal: any) => {
                let currentLabel = this.initialSelectedLabels.filter((label: any) => currentVal.id == label.id) as any[]
                if(currentLabel.length >= 1)
                    array.push(currentLabel[0])

                return array;
            }, []),
            pricePerPersonRules: [
                (pricePerPerson: any) => !!pricePerPerson || 'Price per person is required.',
                (pricePerPerson: any) => (pricePerPerson && pricePerPerson <= 100 && pricePerPerson >= 0) || 'Price per person must be between 0 and 100.'
            ],
            durationRules: [
                (duration: any) => !!duration || 'Duration is required',
                (duration: any) => (duration && duration <= 1440 && duration >= 0) || 'Duration must be between 0 and 1440.'
            ]
        }
    },
    watch: {
        'isFormValid': function (val: any, oldVal: any) {
            if (val != oldVal) {
                this.$emit('content-form-status-update', val)
            }
        }
    },
    methods: {
        removeLabel(label: any) {
            const index = (this.selectedLabels as any[]).findIndex(currLabel => {
                return label.id === currLabel.id 
            })
            if (index >= 0) this.selectedLabels.splice(index, 1)
        },
        removeGuides(guide: any) {
            const index = (this.selectedGuides as any[]).findIndex(currGuide => {
                return guide.id === currGuide.id 
            })
            if (index >= 0) this.selectedGuides.splice(index, 1)
        },
        removeStartLocation() {
            this.startLocation = {};
        },
        removeEndLocation() {
            this.endLocation = {};
        },
        getGuideItemText(item: any) {
            return `${item.firstName} ${item.lastName}`;
        },
        getGuideItemValue(item: any) {
            return item;
        },
        getLabelItemText(item: any) {
            return `${item.texts[0].text}`;
        },
        getLabelItemValue(item: any) {
            return item;
        },
        getLocationItemText(item: any) {
            return `${item.street} ${item.houseNumber} ${item.postcode} ${item.city}`;
        },
        getLocationItemValue(item: any) {
            return item;  
        },
        handleGoBack() {
            this.$emit('go-back-trigger');
        },
        handleFormSubmitValidateForm() {
            let result = (this.$refs.generalForm as Vue & {
                validate: () => boolean
            }).validate()
            if (result) {
                this.$emit('content-form-submit');
            };
            return;
        },
        dataChanged() {
            if (this.isFormValid) {
                this.$emit('content-form-changed', {
                    pricePerPerson: this.pricePerPerson,
                    duration: this.duration,
                    startLocation: this.startLocation,
                    endLocation: this.endLocation,
                    labels: this.selectedLabels,
                    guides: this.selectedGuides
                })
            }
        }
    }

})
</script>

<style lang="scss">
.v-chip {
    white-space: normal;
    &.v-size--default,
    &.v-size--x-small {
        height: auto;
    }
}
</style>
