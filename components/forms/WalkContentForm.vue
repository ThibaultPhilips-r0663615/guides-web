<template>
<v-form ref="contentForm" v-model="isFormValid">
    <v-row v-for="(language, index) in languages" :key="language.id">
        <v-col cols="12">
            <h3 class="text-h5 uppercase">{{language.locale}}</h3>
        </v-col>
        <v-col cols="12">
            <v-text-field :id="`title_${language.languageCode}`" :name="`title_${language.languageCode}`" :autocomplete="`title_${language.languageCode}`" @change="dataChanged" color="#293618" :rules="titleRules" :value="titles[index].title" @input="updateTitle(index, language.languageCode, $event)" :label="`Title[${language.languageCode}]*`" hint="All titles are required" persistent-hint required></v-text-field>
        </v-col>
        <v-col cols="12">
            <v-textarea :id="`description_${language.languageCode}`" :name="`description_${language.languageCode}`" :autocomplete="`description_${language.languageCode}`" @change="dataChanged" color="#293618" :rules="descriptionRules" :value="descriptions[index].description" @input="updateDescription(index, language.languageCode, $event)" :label="`Description[${language.languageCode}]*`" rows="5" hint="All descriptions are required" persistent-hint required></v-textarea>
        </v-col>
        <v-col v-if="index < languages.length - 1" cols="12">
            <v-divider></v-divider>
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

export default Vue.extend({
    name: "WalkContentForm",
    props: {
        languages: {
            type: Array,
            default: () => [],
        },
        initialTitles: {
            type: Array,
            default: () => [],
        },
        initialDescriptions: {
            type: Array,
            default: () => [],
        }
    },
    data() {
        return {
            isFormValid: false,
            titles: this.languages.reduce((array : any[], currentVal: any) => {
                let currentTitle = this.initialTitles.filter((title: any) => currentVal.languageCode == title.languageCode) as any[]
                currentTitle.length == 0 ? array.push({languageCode: currentVal.languageCode, title: ''}) : array.push({languageCode: currentVal.languageCode, title: currentTitle[0].title})
                
                return array;
            }, []),
            descriptions: this.languages.reduce((array : any[], currentVal: any) => {
                let currentDesc = this.initialDescriptions.filter((description: any) => currentVal.languageCode == description.languageCode) as any[]
                currentDesc.length == 0 ? array.push({languageCode: currentVal.languageCode, description: ''}) : array.push({languageCode: currentVal.languageCode, description: currentDesc[0].description})

                return array;
            }, []),
            titleRules: [
                (title: any) => !!title || 'Title is required.',
                (title: any) => (!!title && title.length <= 150 && title.length >= 5) || 'Title must be between 5 and 150 characters.',
            ],
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
        updateTitle(index: any, languageCode: any, title: any) {
            this.titles[index] = {languageCode: languageCode, title: title}
        },
        updateDescription(index: any, languageCode: any, description: any) {
            this.descriptions[index] = {languageCode: languageCode, description: description}
        },
        handleFormSubmitValidateForm() {
            let result = (this.$refs.contentForm as Vue & {
                validate: () => boolean
            }).validate()

            if (result) {
                this.$emit('content-form-submit');
            };
            return;
        },
        handleCloseFormDialog() {
            this.$emit('close-form-dialog-trigger');
        },
        dataChanged() {
            if (this.isFormValid) {
                this.$emit('content-form-changed', {
                    titles: this.titles,
                    descriptions: this.descriptions
                })
            }
        }
    }
})
</script>

<style lang="scss">

</style>
