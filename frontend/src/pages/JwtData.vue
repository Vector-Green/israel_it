<template>
  <q-page class="q-pa-sm">
    <q-card>
      <q-card-section>
        <span>Payload:</span>
        <q-input
          v-model="payload"
          filled
          type="textarea"
          :placeholder="JSON.stringify(predefinedPayload)"
        ></q-input>
      </q-card-section>

      <q-separator></q-separator>

      <q-card-section
        ><span>Options:</span>
        <q-input
          v-model="options"
          filled
          type="textarea"
          :placeholder="JSON.stringify(predefinedOptions)"
        ></q-input
      ></q-card-section>

      <q-card-section style="word-wrap: break-word">
        {{ result }}
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { computedAsync } from '@vueuse/core';
import { useJwtStore } from 'src/stores/jwt-store';

import { options as predefinedOptions } from 'src/resources/predefined';
import { payload as predefinedPayload } from 'src/resources/predefined';

const jwtStore = useJwtStore();

const options = ref(JSON.stringify(predefinedOptions));
const payload = ref(JSON.stringify(predefinedPayload));

const result = computedAsync(async () => {
  jwtStore
    .generateJwt(JSON.parse(payload.value), JSON.parse(options.value))
    .then((jwt) => {
      jwtStore.setJwt(jwt);
    });
  return jwtStore.getJwt;
}, 'generating jwt...');
</script>
