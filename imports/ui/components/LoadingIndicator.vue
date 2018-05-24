<template>
  <div>
    <span class="">Trwa pobieranie danych z serwera...</span>
    <v-progress-linear indeterminate color="grey" height="20"></v-progress-linear>
  </div>
</template>


<script>
export default {
  name: "LoadingIndicator"
};
</script>
