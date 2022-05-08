<template>
<v-form ref="imagesForm" v-model="isFormValid">
    <v-row v-if="initialMainImageFiledata">
        <v-col cols="12">
            <v-subheader>Current main image</v-subheader>
        </v-col>
    </v-row>
    <v-row v-if="this.mainImage">
        <v-col cols="4">
            <v-img height="150" v-bind:src="this.mainImage.base64.includes('data:image') ? this.mainImage.base64 : 'data:image/jpeg;base64,' + this.mainImage.base64" :lazy-src="require('~/assets/images/placeholder.png')" />
        </v-col>
    </v-row>
    <v-row>
        <v-col cols="12">
            <v-file-input @change="updateMainImage" color="#293618" :value="mainImage.file" :rules="mainImageRules" show-size accept="image/png, image/jpeg, image/bmp" placeholder="Select a main image" prepend-icon="mdi-panorama-variant" label="Select a main image"></v-file-input>
        </v-col>
    </v-row>
    <v-divider></v-divider>
    <v-row v-if="this.images">
        <v-col cols="12">
            <v-subheader>Current images</v-subheader>
        </v-col>
    </v-row>
    <v-row v-if="this.images.length >= 1">
        <v-col :cols="Math.floor(Math.min(12 / images.length, 4))" v-for="image in this.images" :key="image.file.name">
            <v-img height="150" v-bind:src="image.base64.includes('data:image') ? image.base64 : 'data:image/jpeg;base64,' + image.base64" :lazy-src="require('~/assets/images/placeholder.png')" />
        </v-col>
    </v-row>
    <v-row>
        <v-col cols="12">
            <v-file-input @change="updateImages" color="#293618" :value="imagesFiles" :rules="imagesRules" show-size accept="image/png, image/jpeg, image/bmp" placeholder="Select up to 5 images" prepend-icon="mdi-image-multiple" label="Select images" multiple></v-file-input>
        </v-col>
    </v-row>
    <small>*indicates required field</small>
    <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="#293618" text @click="handleGoBack">
            Back
        </v-btn>
        <v-btn color="#293618" text @click="handleFormSubmitValidateForm" :disabled="!(areOtherFormsValid && isFormValid)">
            Submit
        </v-btn>
    </v-card-actions>
</v-form>
</template>

<script lang="ts">
import Vue from 'vue'
import axios from 'axios'
export default Vue.extend({
    name: 'ImagesForm',
    props: {
        initialMainImageFiledata: {
            type: Object,
            default: () => null
        },
        initialImagesFileData: {
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
            dataFetched: false,
            mainImage: ({file: null, base64: ''}) as any,
            images: [] as any[],
            imagesFiles: [] as any[],
            mainImageRules: [
                (image: any) => (!!image) || 'Main image is required.',
                (image: any) => (!!image && image.size < 2000000) || 'Main image size should be less than 2 MB.',
            ],
            imagesRules: [
                (images: any[]) => ((!!images && images?.length > 0) ? (!images.some((image: any) => image.size > 2000000) && images.length <= 5) : true) || 'Image size should be less than 2 MB!'
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
    async fetch() {
        if (!!this.initialMainImageFiledata) {
            let mainImageResponse = await axios.get(this.initialMainImageFiledata.fileDownloadUrl, {
                responseType: 'arraybuffer'
            })
            this.mainImage = {
                file: this.dataURLtoFile(Buffer.from(mainImageResponse.data, 'binary').toString('base64'), this.initialMainImageFiledata.fileName),
                base64: Buffer.from(mainImageResponse.data, 'binary').toString('base64')
            }
        }
        else {
            this.mainImage = {
                file: null,
                base64: ''
            }
        }
        if (this.initialImagesFileData.length >= 1) {
            let imagesPromises = [] as any[];
            let imagesFile = [] as any[];
            this.initialImagesFileData.forEach((imageFileData: any) => {
                imagesPromises.push(axios.get(imageFileData.fileDownloadUrl, {
                    responseType: 'arraybuffer'
                }));
            })
            await Promise.all(imagesPromises)
                .then((res: any[]) => {
                    this.initialImagesFileData.forEach((imageFileData: any, index: any) => {
                        imagesFile.push({
                            file: this.dataURLtoFile(Buffer.from(res[index].data, 'binary').toString('base64'), imageFileData.fileName),
                            base64: Buffer.from(res[index].data, 'binary').toString('base64')
                        });
                    })
                })

            this.images = imagesFile;
            this.imagesFiles = this.images.map((image: any) => image.file)
        }

        this.dataFetched = true;
    },
    methods: {
        handleGoBack() {
            this.$emit('go-back-trigger');
        },
        handleFormSubmitValidateForm() {
            let result = (this.$refs.imagesForm as Vue & {
                validate: () => boolean
            }).validate()
            if (result) {
                this.$emit('images-form-submit', {
                mainImage: this.mainImage.file,
                images: this.imagesFiles
            });
            };
            return;
        },
        dataChanged() {
            this.$emit('content-form-changed', {
                mainImage: this.mainImage.file,
                images: this.imagesFiles
            })
        },
        async updateMainImage(mainImageEvent: any) {
            console.log(mainImageEvent)
            this.mainImage = {
                file: mainImageEvent,
                base64: !!mainImageEvent ? await this.getBase64(mainImageEvent) : ''
            };
            this.dataChanged()
        },
        updateImages(imagesEvent: any) {
            this.images = [];
            this.imagesFiles = [];
            imagesEvent.forEach(async (imageFile: any, index: any) => {
                this.images.push({
                    file: imageFile,
                    base64: await this.getBase64(imageFile)
                });
            })
            this.imagesFiles = imagesEvent
            this.dataChanged()
        },
        dataURLtoFile(dataurl: any, filename: any, mimeParam: any = "image/jpeg") {
            var arr = dataurl.split(',') as any[]
            let bstr: any;
            let mime = mimeParam;
            if (arr.length > 1) {
                mime = arr[0].match(/:(.*?);/)[1]
                bstr = atob(arr[1])
            } else {
                bstr = atob(arr[0])
            }
            let n = bstr.length;
            let u8arr = new Uint8Array(n);
            while (n--) {
                u8arr[n] = bstr.charCodeAt(n);
            }
            return new File([u8arr], filename, {
                type: mime
            });
        },
        getBase64(file: File) {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => resolve(reader.result);
                reader.onerror = error => reject(error);
            });
        }
    }
})
</script>

<style lang="scss">

</style>
