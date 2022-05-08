<template>
<section class="lol-topic-detail-content-information-body">
    <div class="lol-topic-detail-content-information-body-text">
        <div class="lol-topic-detail-content-information-body-text-labels">
            <span v-for="label in walk.labels" :key="label.id" class="lol-label-span" :style="{ backgroundColor: label.colorCode, color: label.textColorCode }">
                Label placeholder: {{label.texts[0].text }}</span>
        </div>
        <h2>Title placeholder: {{walk.titles[0].title}}</h2>
        <p>Description placeholder: {{walk.descriptions[0].description}}</p>
    </div>
</section>
</template>

<script lang="ts">
import Vue from "vue"
export default Vue.extend({
    name: "WalkDetailGenericInformation",
    props: {
        walk: {
            type: Object,
            default: () => ({})
        }
    },
})
</script>
