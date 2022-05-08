<template>
  <h1>{{$t('notFound.Header')}}</h1>
</template>

<script lang="ts">
import Vue from 'vue'

let $t;
export default Vue.extend({
  name: 'NotFoundPage',
  mounted() {
    console.log((this as any).$t('notFound.Header'))
  }
})
</script>
