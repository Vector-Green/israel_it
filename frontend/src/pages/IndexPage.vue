<template>
  <q-table
    flat
    bordered
    ref="tableRef"
    :rows="rows"
    :columns="columns"
    row-key="id"
    v-model:pagination="pagination"
    :loading="loading"
    @request="onRequest"
  >
  </q-table>
  <div>{{ result }}</div>
</template>

<script lang="ts" setup>
import { QTableColumn } from 'quasar';
import { ref, onMounted, onBeforeMount } from 'vue';
import { useJwtStore } from 'src/stores/jwt-store';

import { options as predefinedOptions } from 'src/resources/predefined';
import { payload as predefinedPayload } from 'src/resources/predefined';
const jwtStore = useJwtStore();

const columns: QTableColumn[] = [
  {
    name: 'key',
    label: 'Key',
    field: 'key',
    align: 'center',
  },
  {
    name: 'value',
    label: 'Value',
    field: 'value',
    align: 'center',
  },
];
const result = ref();
const tableRef = ref();
const rows = ref(<{ key: string; value: string }[]>[]);

const loading = ref(false);
const pagination = ref({
  page: 1,
  rowsPerPage: 3,
  rowsNumber: 10,
});
function fetch(props: { pagination: { page: number; rowsPerPage: number } }) {
  jwtStore
    .fetchData(
      (props.pagination.page - 1) * props.pagination.rowsPerPage,
      props.pagination.rowsPerPage
    )
    .then((response) => {
      let data = response.data;
      let transformedData: { key: string; value: string }[] = data.map(
        (item: { [key: string]: string }) => {
          return { key: Object.keys(item)[0], value: Object.values(item)[0] };
        }
      );
      let count = parseInt(response.headers['x-total-count']);

      pagination.value.rowsNumber = count;

      rows.value = transformedData;

      pagination.value.page = props.pagination.page;
      pagination.value.rowsPerPage = props.pagination.rowsPerPage;
    })
    .catch((e) => (result.value = e))
    .finally(() => {
      loading.value = false;
    });
}
function onRequest(props: {
  pagination: { page: number; rowsPerPage: number };
}) {
  loading.value = true;
  result.value = null;

  if (!jwtStore.getJwt) {
    jwtStore
      .generateJwt(predefinedPayload, predefinedOptions)
      .then((jwt) => {
        jwtStore.setJwt(jwt);
      })
      .then(() => fetch(props));
  } else {
    fetch(props);
  }
}
onMounted(() => {
  tableRef.value.requestServerInteraction();
});
</script>
