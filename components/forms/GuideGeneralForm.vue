<template>
<div>
    <v-form ref="generalForm" v-model="isFormValid">
        <v-row>
            <v-col cols="12" sm="12">
                <v-autocomplete :id="`languages`" :name="`languages`" :autocomplete="`languages`" @change="dataChanged" color="#293618" v-model="selectedLanguages" :items="allLanguages" label="Select languages" multiple :item-text="getLanguageItemText" :item-value="getLanguageItemValue">
                    <template v-slot:selection="data">
                        <v-chip close @click:close="removeLanguage(data.item)" x-small outlined>
                            {{data.item.locale}} ({{data.item.languageCode}})
                        </v-chip>
                    </template>
                    <template v-slot:item="data">
                        {{data.item.locale}} ({{data.item.languageCode}})
                    </template>
                </v-autocomplete>
            </v-col>
        </v-row>
        <v-row v-for="(language, index) in mainLanguages" :key="language.id">
            <v-col cols="12">
                <h3 class="text-h5 uppercase">{{language.locale}}</h3>
            </v-col>
            <v-col cols="12">
                <v-textarea :id="`description_${language.languageCode}`" :name="`description_${language.languageCode}`" :autocomplete="`description_${language.languageCode}`" @change="dataChanged" color="#293618" :rules="descriptionRules" :value="descriptions[index].description" @input="updateDescription(index, language.languageCode, $event)" :label="`Description[${language.languageCode}]*`" rows="5" hint="All descriptions are required" persistent-hint required></v-textarea>
            </v-col>
            <v-col v-if="index < mainLanguages.length - 1" cols="12">
                <v-divider></v-divider>
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
    name: 'GuideGeneralForm',
    props: {
        initialSelectedLanguages: {
            type: Array,
            default: () => [],
        },
        initialDescriptions: {
            type: Array,
            default: () => [],
        },
        allLanguages: {
            type: Array,
            default: () => []
        },
        mainLanguages: {
            type: Array,
            default: () => []
        },
        areOtherFormsValid: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            isFormValid: false,
            selectedLanguages: this.allLanguages.reduce((array: any[], currentVal: any) => {
                let currentLanguage = this.initialSelectedLanguages.filter((language: any) => currentVal.id == language.id) as any[]
                if (currentLanguage.length >= 1)
                    array.push(currentLanguage[0])

                return array;
            }, []),
            descriptions: this.mainLanguages.reduce((array: any[], currentVal: any) => {
                let currentDesc = this.initialDescriptions.filter((description: any) => currentVal.languageCode == description.languageCode) as any[]
                currentDesc.length == 0 ? array.push({
                    languageCode: currentVal.languageCode,
                    description: ''
                }) : array.push({
                    languageCode: currentVal.languageCode,
                    description: currentDesc[0].description
                })

                return array;
            }, []),
            descriptionRules: [
                (description: any) => !!description || 'Description is required.',
                (description: any) => (!!description && description.length <= 20000 && description.length >= 100) || 'Description must be between 100 and 20000 characters.',
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
        removeLanguage(lang: any) {
            const index = (this.selectedLanguages as any[]).findIndex(currLang => {
                return lang.id === currLang.id
            })
            if (index >= 0) this.selectedLanguages.splice(index, 1)
        },
        getLanguageItemText(item: any) {
            return `${item.locale} (${item.languageCode})`;
        },
        getLanguageItemValue(item: any) {
            return item;
        },
        updateDescription(index: any, languageCode: any, description: any) {
            this.descriptions[index] = {
                languageCode: languageCode,
                description: description
            }
        },
        handleGoBack() {
            this.$emit('go-back-trigger');
        },
        handleFormSubmitValidateForm() {
            let result = (this.$refs.generalForm as Vue & {
                validate: () => boolean
            }).validate()
            if (result) {
                this.$emit('content-form-submit', {
                    languages: this.selectedLanguages,
                    descriptions: this.descriptions
                });
            };
            return;
        },
        dataChanged() {
            if (this.isFormValid) {
                this.$emit('content-form-changed', {
                    languages: this.selectedLanguages,
                    descriptions: this.descriptions
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
