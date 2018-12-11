<template>
  <div>
    <span>Trwa pobieranie danych z serwera...</span>
    <v-progress-linear indeterminate color="grey" height="20" />
  </div>
</template>

<script>
export default {
  name: "LoadingIndicator"
};
</script>
