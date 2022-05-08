<template>
<div class="lol-alert-popup">
    <v-alert :value="isAlertPopupOpen" :type="type" border="bottom" :icon="icon" :transition="transition" @click="clickAlertPopup">
        {{alertText}}
    </v-alert>
</div>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
    name: 'AlertPopup',
    data() {
        return {
            isAlertPopupOpen: false
        }
    },
    props: {
        alertText: {
            type: String,
            default: ''
        },
        duration: {
            type: Number,
            default: 2000
        },
        type: {
            type: String,
            default: 'success'
        },
        icon: {
            type: String,
            default: 'mdi-check-all'
        },
        transition: {
            type: String,
            default: 'scale-transition'
        },
        outlined: {
            type: Boolean,
            default: false
        }
    },
    mounted() {
        this.handleTriggerAlertPopup();
    },
    methods: {
        handleTriggerAlertPopup() {
            this.isAlertPopupOpen = true;
            setTimeout(() => {
                this.isAlertPopupOpen = false
                this.$emit('alert-finished-trigger')
            }, this.duration)
        },
        clickAlertPopup() {
            this.isAlertPopupOpen = false;
            this.$emit('click-alert-popup')
        }
    }
})
</script>

<style lang="scss">
.lol-alert-popup {
    position: fixed;
    z-index: 1000;
    width: 80%;
    transform: translate(-50%, 0px);
    left: 50%;
    bottom: 0;

    &>div:first-child {
        margin-bottom: 0;
    }
}
</style>
