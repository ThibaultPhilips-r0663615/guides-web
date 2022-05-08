<template>
<v-form ref="addressForm" v-model="isFormValid">
    <v-row>
        <v-col cols="12" md="6">
            <v-text-field :id="`streetName`" :name="`streetName`" :autocomplete="`streetName`" v-model="streetName" :rules="streetNameRules" color="#293618" label="Streetname*"></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
            <v-text-field :id="`houseNumber`" :name="`houseNumber`" :autocomplete="`houseNumber`" v-model="houseNumber" :rules="houseNumberRules" color="#293618" label="House number*"></v-text-field>
        </v-col>
    </v-row>
    <v-row>
        <v-col cols="12" md="6">
            <v-text-field :id="`cityName`" :name="`cityName`" :autocomplete="`cityName`" v-model="cityName" :rules="cityNameRules" color="#293618" label="City name*"></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
            <v-text-field :id="`postcode`" :name="`postcode`" :autocomplete="`postcode`" v-model="postcode" :rules="postcodeRules" color="#293618" label="Postcode*"></v-text-field>
        </v-col>
    </v-row>
    <small>*indicates required field</small>
    <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="#293618" text @click="handleCloseFormDialog">
            Close
        </v-btn>
        <v-btn color="#293618" text @click="handleFormSubmitValidateForm" :disabled="!isFormValid">
            Submit
        </v-btn>
    </v-card-actions>
</v-form>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    name: "AddressForm",
    props: {
        initialStreetName: {
            type: String,
            default: ''
        },
        initialHouseNumber: {
            type: String,
            default: ''
        },
        initialCity: {
            type: String,
            default: ''
        },
        initialPostcode: {
            type: String,
            default: ''
        },
    },
    data() {
        return {
            isFormValid: false,
            streetName: this.initialStreetName,
            houseNumber: this.initialHouseNumber,
            cityName: this.initialCity,
            postcode: this.initialPostcode,
            streetNameRules: [
                (streetName: any) => !!streetName || 'Street name is required.',
                (streetName: any) => (!!streetName && streetName.length <= 100 && streetName.length >= 1) || 'Street name must be between 1 and 100 characters.',
            ],
            houseNumberRules: [
                (houseNumber: any) => !!houseNumber || 'Housenumber code is required.',
                (houseNumber: any) => (!!houseNumber && houseNumber.length <= 50 && houseNumber.length >= 1) || 'Housenumber code must be between 1 and 50 characters.',
            ],
            cityNameRules: [
                (cityName: any) => !!cityName || 'City name is required.',
                (cityName: any) => (!!cityName && cityName.length <= 100 && cityName.length >= 1) || 'City name must be between 1 and 100 characters.',
            ],
            postcodeRules: [
                (postcode: any) => !!postcode || 'Postcode code is required.',
                (postcode: any) => (!!postcode && postcode.length <= 20 && postcode.length >= 1) || 'Postcode code must be between 1 and 20 characters.',
            ]
        }
    },
    methods: {
        handleFormSubmitValidateForm() {
            let result = (this.$refs.addressForm as Vue & {
                validate: () => boolean
            }).validate()
            if (result) {
                this.$emit('address-form-submit', {
                    streetName: this.streetName,
                    houseNumber: this.houseNumber,
                    cityName: this.cityName,
                    postcode: this.postcode,
                });
            };
            return;
        },
        handleCloseFormDialog() {
            this.$emit('close-form-dialog-trigger');
        }
    }
})
</script>

<style lang="scss" scoped>

</style>
