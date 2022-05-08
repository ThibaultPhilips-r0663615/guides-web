<template>
<v-form ref="labelForm" v-model="isFormValid">
    <v-row>
        <v-col cols="12" md="6">
            <v-color-picker dot-size="25" swatches-max-height="200" v-model="colorCode"></v-color-picker>
        </v-col>
        <v-col cols="12" md="6">
            <v-color-picker dot-size="25" swatches-max-height="200" v-model="textColorCode"></v-color-picker>
        </v-col>
    </v-row>
    <v-row v-for="(language, index) in mainLanguages" :key="language.id">
        <v-col cols="12">
            <h3 class="text-h5 uppercase">{{language.locale}}</h3>
        </v-col>
        <v-col cols="12">
            <v-text-field :id="`text_${language.languageCode}`" :name="`text_${language.languageCode}`" :autocomplete="`text_${language.languageCode}`" color="#293618" :rules="textRules" :value="texts[index].text" @input="updateText(index, language.languageCode, $event)" :label="`Text[${language.languageCode}]*`" hint="All texts are required" persistent-hint required></v-text-field>
        </v-col>
        <v-col v-if="index < mainLanguages.length - 1" cols="12">
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
            Submit
        </v-btn>
    </v-card-actions>
</v-form>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    name: "LabelForm",
    props: {
        initialTextColorCode: {
            type: String,
            default: ''
        },
        initialColorCode: {
            type: String,
            default: ''
        },
        initialTexts: {
            type: Array,
            default: () => [],
        },
        mainLanguages: {
            type: Array,
            default: () => []
        },
    },
    data() {
        return {
            isFormValid: false,
            textColorCode: !!this.initialTextColorCode ? this.initialTextColorCode : '#000000',
            colorCode: !!this.initialColorCode ? this.initialColorCode : '#000000',
            texts: this.mainLanguages.reduce((array: any[], currentVal: any) => {
                let currentText = this.initialTexts.filter((text: any) => currentVal.languageCode == text.languageCode) as any[]
                currentText.length == 0 ? array.push({
                    languageCode: currentVal.languageCode,
                    text: ''
                }) : array.push({
                    languageCode: currentVal.languageCode,
                    text: currentText[0].text
                })

                return array;
            }, []),
            textRules: [
                (text: any) => !!text || 'Text is required.',
                (text: any) => (!!text && text.length <= 50 && text.length >= 1) || 'Text must be between 1 and 50 characters.',
            ]
        }
    },
    methods: {
        handleFormSubmitValidateForm() {
			console.log(this.textColorCode);
			console.log(this.colorCode)
            let result = (this.$refs.labelForm as Vue & {
                validate: () => boolean
            }).validate()
            if (result) {
                this.$emit('label-form-submit', {
                    textColorCode: this.textColorCode,
                    colorCode: this.colorCode,
                    texts: this.texts,
                });
            };
            return;
        },
        handleCloseFormDialog() {
            this.$emit('close-form-dialog-trigger');
        },
        updateText(index: any, languageCode: any, text: any) {
            this.texts[index] = {
                languageCode: languageCode,
                text: text
            }
        },
    }
})
</script>

<style lang="scss" scoped>

</style>
