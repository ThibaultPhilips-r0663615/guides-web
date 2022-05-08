<template>
<v-dialog class="lol-confirmation-dialog" :value="isDialogOpen" :max-width="maxWidth" :dark="isDarkTheme">
    <v-card class="lol-confirmation-dialog-content tw-p-2">
        <p class="tw-text-2xl text-center">{{dialogText}}</p>

        <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn color="#9c9c9c" text @click="handleCloseDialog">
                Close
            </v-btn>

            <v-btn color="#293618" text @click="handleConfirmDialog">
                Confirm
            </v-btn>
        </v-card-actions>
    </v-card>
</v-dialog>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
    name: "ConfirmationDialog",
    methods: {
        handleCloseDialog() {
            this.$emit('close-dialog');
        },
        handleConfirmDialog() {
            this.$emit('confirm-dialog');
        }
    },
    props: {
        dialogText: {
            type: String,
            default: ''
        },
        maxWidth: {
            type: Number,
            default: 350
        },
        isDarkTheme: {
            type: Boolean,
            default: true
        },
        isDialogOpen: {
            type: Boolean,
            default: false
        }
    }
})
</script>

<style lang="scss" scoped>
.lol-confirmation-dialog {
    .lol-confirmation-dialog-content {
        p {
            white-space: pre-wrap;
        }
    }
}
</style>
