<template>
  <div class="WAL position-relative bg-grey-4" :style="style">
    <q-layout view="lHh Lpr lFf" class="WAL__layout shadow-3" container>
      <q-header elevated>
        <q-toolbar class="bg-grey-3 text-black">
          <q-btn
            round
            flat
            icon="keyboard_arrow_left"
            class="WAL__drawer-open q-mr-sm"
            @click="toggleLeftDrawer"
          />

          <q-btn round flat>
            <q-avatar>
              <img :src="currentTab.avatar" />
            </q-avatar>
          </q-btn>

          <span class="q-subtitle-1 q-pl-md">
            {{ currentTab.label }}
          </span>
        </q-toolbar>
      </q-header>

      <q-drawer
        v-model="leftDrawerOpen"
        show-if-above
        bordered
        :breakpoint="690"
      >
        <q-toolbar class="bg-grey-3">
          <q-avatar class="cursor-pointer">
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo.svg" />
          </q-avatar>
          <q-space></q-space>
          Choose Route
          <q-space></q-space>
          <q-btn
            round
            flat
            icon="close"
            class="WAL__drawer-close"
            @click="toggleLeftDrawer"
          />
        </q-toolbar>

        <q-scroll-area style="height: calc(100% - 100px)">
          <q-list>
            <q-item
              v-for="(tab, index) in tabs"
              :key="tab.id"
              clickable
              v-ripple
              @click="setcurrentTab(index)"
            >
              <q-item-section avatar>
                <q-avatar>
                  <img :src="tab.avatar" />
                </q-avatar>
              </q-item-section>

              <q-item-section>
                <q-item-label lines="1">
                  {{ tab.label }}
                </q-item-label>
                <q-item-label class="tab__summary" caption>
                  {{ tab.caption }}
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-scroll-area>
      </q-drawer>

      <q-page-container class="bg-grey-2">
        <router-view />
      </q-page-container>
    </q-layout>
  </div>
</template>

<script lang="ts" setup>
import { useQuasar } from 'quasar';
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();
const tabs = [
  {
    id: 1,
    label: 'Random Data Fetch',
    avatar: 'https://cdn.quasar.dev/logo-v2/svg/logo.svg',
    caption: 'GET of /random-data',
    route: '/',
  },
  {
    id: 2,
    label: 'JWT generation',
    avatar: 'https://cdn.quasar.dev/logo-v2/svg/logo.svg',
    caption: 'in browser',
    route: '/jwt',
  },
  {
    id: 3,
    label: 'POST data',
    avatar: 'https://cdn.quasar.dev/logo-v2/svg/logo.svg',
    caption: 'POST to /random-data',
    route: '/post',
  },
];

const $q = useQuasar();

const leftDrawerOpen = ref(false);
const currentTabIndex = ref(0);

const currentTab = computed(() => {
  return tabs[currentTabIndex.value];
});

const style = computed(() => ({
  height: $q.screen.height + 'px',
}));

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}

function setcurrentTab(index: number) {
  router.push(tabs[index].route);
  currentTabIndex.value = index;
}
</script>

<style lang="scss">
.WAL {
  width: 100%;
  height: 100%;
  padding-top: 20px;
  padding-bottom: 20px;

  &:before {
    content: '';
    height: 127px;
    position: fixed;
    top: 0;
    width: 100%;
    background-color: #009688;
  }
  &__layout {
    margin: 0 auto;
    z-index: 4000;
    height: 100%;
    width: 90%;
    max-width: 950px;
    border-radius: 5px;
  }
  &__field.q-field--outlined .q-field__control:before {
    border: none;
  }
  .q-drawer--standard {
    .WAL__drawer-close {
      display: none;
    }
  }
}
@media (max-width: 850px) {
  .WAL {
    padding: 0;
    &__layout {
      width: 100%;
      border-radius: 0;
    }
  }
}
@media (min-width: 691px) {
  .WAL {
    &__drawer-open {
      display: none;
    }
  }
}
.tab__summary {
  margin-top: 4px;
}
.tab__more {
  margin-top: 0 !important;
  font-size: 1.4rem;
}
</style>
