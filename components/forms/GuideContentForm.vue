<template>
<v-form ref="contentForm" v-model="isFormValid">
    <v-row>
        <v-col cols="12" sm="6">
            <v-text-field :id="`given-name`" :name="`given-name`" :autocomplete="`given-name`" @change="dataChanged" v-model="firstName" :rules="firstNameRules" color="#293618" label="Given name*"></v-text-field>
        </v-col>
        <v-col cols="12" sm="6">
            <v-text-field :id="`family-name`" :name="`family-name`" :autocomplete="`family-name`" @change="dataChanged" v-model="lastName" :rules="lastNameRules" color="#293618" label="Family name*"></v-text-field>
        </v-col>
    </v-row>
    <v-row>
        <v-col cols="12" sm="6">
            <v-text-field :id="`nickname`" :name="`nickname`" :autocomplete="`nickname`" @change="dataChanged" v-model="nickName" :rules="nickNameRules" color="#293618" label="Nickname"></v-text-field>
        </v-col>
        <v-col cols="12" sm="6">
            <v-text-field :id="`tel`" :name="`tel`" :autocomplete="`tel`" @change="dataChanged" v-model="phoneNumber" :rules="phoneNumberRules" color="#293618" label="Phonenumber*"></v-text-field>
        </v-col>
    </v-row>
    <v-row>
        <v-col cols="12" sm="12">
            <v-text-field :id="`email`" :name="`email`" :autocomplete="`email`" @change="dataChanged" v-model="email" :rules="emailRules" color="#293618" label="Email*" hint="exmaple@example.com" persistent-hint></v-text-field>
        </v-col>
    </v-row>
    <small>*indicates required field</small>
    <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="#293618" text @click="handleCloseFormDialog">
            Close
        </v-btn>
        <v-btn color="#293618" text @click="handleFormSubmitValidateForm" :disabled="!isFormValid">
            Next
        </v-btn>
    </v-card-actions>
</v-form>
</template>

<script lang="ts">
import Vue from "vue"

const emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default Vue.extend({
    name: "GuideContentForm",
    props: {
        initialFirstName: {
            type: String,
            default: ''
        },
        initialLastName: {
            type: String,
            default: ''
        },
        initialNickName: {
            type: String,
            default: ''
        },
        initialEmail: {
            type: String,
            default: ''
        },
        initialPhoneNumber: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            isFormValid: false,
            firstName: this.initialFirstName,
            lastName: this.initialLastName,
            nickName: this.initialNickName,
            email: this.initialEmail,
            phoneNumber: this.initialPhoneNumber,
            firstNameRules: [
                (firstName: any) => !!firstName || 'Firstname is required.',
                (firstName: any) => (!!firstName && firstName.length <= 50 && firstName.length >= 1) || 'Firstname must be between 1 and 50 characters.',
            ],
            lastNameRules: [
                (lastName: any) => !!lastName || 'Lastname is required.',
                (lastName: any) => (!!lastName && lastName.length <= 50 && lastName.length >= 1) || 'Lastname must be between 1 and 50 characters.',
            ],
            nickNameRules: [
                (nickName: any) => (!!nickName ? nickName.length <= 50 && nickName.length >= 0 : true) || 'Nickname must be between 0 and 50 characters.',
            ],
            emailRules: [
                (email: any) => !!email || 'Email is required.',
                (email: any) => (!!email && email.length <= 100 && email.length >= 3) || 'Email must be between 3 and 100 characters.',
                (email: any) => (!!email && emailPattern.test(email)) || 'Email is not valid.'
            ],
            phoneNumberRules: [
                (phoneNumber: any) => !!phoneNumber || 'Phonenumber is required.',
                (phoneNumber: any) => (!!phoneNumber && phoneNumber.length <= 20 && phoneNumber.length >= 1) || 'Phonenumber must be between 1 and 20 characters.',
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
        handleFormSubmitValidateForm() {
            let result = (this.$refs.contentForm as Vue & {
                validate: () => boolean
            }).validate()

            if (result) {
                this.$emit('content-form-submit', {
                    firstName: this.firstName,
                    lastName: this.lastName,
                    nickName: this.nickName,
                    email: this.email,
                    phoneNumber: this.phoneNumber,
                });
            };
            return;
        },
        handleCloseFormDialog() {
            this.$emit('close-form-dialog-trigger');
        },
        dataChanged() {
            if (this.isFormValid) {
                this.$emit('content-form-changed', {
                    firstName: this.firstName,
                    lastName: this.lastName,
                    nickName: this.nickName,
                    email: this.email,
                    phoneNumber: this.phoneNumber,
                })
            }
        }
    }
})
</script>

<style lang="scss">

</style>
