<template>
  <q-page class="q-pa-sm">
    <q-card>
      <q-card-section>
        <span>Payload:</span>
        <q-input
          v-model="payload"
          filled
          type="textarea"
          :placeholder="predefinedPayload"
        ></q-input>
      </q-card-section>
      <q-card-section>
        <q-btn @click="send">Send</q-btn>
      </q-card-section>
      <q-card-section style="word-wrap: break-word">
        {{ result }}
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useJwtStore } from 'src/stores/jwt-store';
const jwtStore = useJwtStore();
const result = ref();

const predefinedPayload = JSON.stringify({
  someKey: 'someValue',
  anyOtherKey: 'anyOtherValue',
});
const payload = ref(predefinedPayload);
function send() {
  result.value = 'sending:';
  if (jwtStore.getJwt === undefined) {
    result.value = '[no jwt provided]';
  }
  jwtStore
    .sendData(JSON.parse(payload.value))
    .then((resolve: unknown) => {
      result.value = resolve;
    })
    .catch((e: unknown) => {
      result.value += e;
    });
}
</script>
