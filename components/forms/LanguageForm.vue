<template>
<v-form ref="languageForm" v-model="isFormValid">
    <v-row>
        <v-col>
            <v-text-field :id="`locale`" :name="`locale`" :autocomplete="`locale`" v-model="locale" :rules="localeRules" color="#293618" label="Locale*"></v-text-field>
        </v-col>
    </v-row>
    <v-row>
        <v-col>
            <v-text-field :id="`languageCode`" :name="`languageCode`" :autocomplete="`languageCode`" v-model="languageCode" :rules="languageCodeRules" color="#293618" label="Language code*"></v-text-field>
        </v-col>
    </v-row>
    <v-row>
        <v-col>
            <v-checkbox :id="`isMainLanguage`" :name="`isMainLanguage`" v-model="isMainLanguage" :label="`Is it a main language of the website?`" color="#293618"></v-checkbox>
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
    name: "LanguageForm",
    props: {
        initialLocale: {
            type: String,
            default: ''
        },
        initialLanguageCode: {
            type: String,
            default: ''
        },
        initialIsMainLanguage: {
            type: Boolean,
            default: false
        },
    },
    data() {
        return {
            isFormValid: false,
            locale: this.initialLocale,
            languageCode: this.initialLanguageCode,
            isMainLanguage: this.initialIsMainLanguage,
            localeRules: [
                (locale: any) => !!locale || 'Locale is required.',
                (locale: any) => (!!locale && locale.length <= 50 && locale.length >= 1) || 'Locale must be between 1 and 50 characters.',
            ],
            languageCodeRules: [
                (languageCode: any) => !!languageCode || 'Language code is required.',
                (languageCode: any) => (!!languageCode && languageCode.length <= 10 && languageCode.length >= 1) || 'Language code must be between 1 and 10 characters.',
            ]
        }
    },
    methods: {
        handleFormSubmitValidateForm() {
            let result = (this.$refs.languageForm as Vue & {
                validate: () => boolean
            }).validate()
            if (result) {
                this.$emit('language-form-submit', {
                    locale: this.locale,
                    languageCode: this.languageCode,
                    isMainLanguage: this.isMainLanguage
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
