<template>
<section class="lol-loading-animation">
    <v-progress-circular v-if="showAnimation" :size="70" :width="7" color="#293618" indeterminate></v-progress-circular>
</section>
</template>

<script lang="ts" setup>
import Vue from 'vue'
export default Vue.extend({
    name: 'LoadingAnimation',
    props: {
        showAnimation: {
            type: Boolean,
            default: false
        }
    }
})
</script>

<style lang="scss">
.lol-loading-animation {
    width: 100%;
    display: flex;
    justify-content: center;
}
</style>
