<script setup>
import {
  date,
  QAvatar,
  QBtn,
  QDrawer,
  QHeader,
  QIcon,
  QImg,
  QItem,
  QItemSection,
  QLayout,
  QPageContainer,
  QScrollArea,
  QToolbar
} from 'quasar';
import { computed, ref } from 'vue';

const leftDrawerOpen = ref(false);
const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value;
};

const todayDate = computed(() => {
  const formattedString = date.formatDate(Date.now(), 'dddd D MMMM');
  return formattedString;
});
</script>

<template>
  <QLayout view="lHh Lpr lFf">
    <QHeader>
      <QToolbar>
        <QBtn @click="toggleLeftDrawer" dense flat icon="menu" round />
      </QToolbar>

      <div class="q-px-lg q-pt-xl q-mb-md">
        <div class="text-h3">TODO</div>
        <div class="text-subtitle1">{{ todayDate }}</div>
      </div>

      <QImg
        src="~/assets/pexels-robert-anthony-carbone-598966.jpg"
        class="header-image full-height absolute-top"
      />
    </QHeader>

    <QDrawer
      :breakpoint="600"
      :width="250"
      show-if-above
      v-model="leftDrawerOpen"
    >
      <QScrollArea
        style="
          border-right: 1px solid #ddd;
          height: calc(100% - 192px);
          margin-top: 192px;
        "
      >
        <QList padding>
          <QItem to="/" exact clickable v-ripple>
            <QItemSection avatar>
              <QIcon name="list" />
            </QItemSection>

            <QItemSection> Todo </QItemSection>
          </QItem>

          <QItem :to="{ name: 'help' }" exact clickable v-ripple>
            <QItemSection avatar>
              <QIcon name="help" />
            </QItemSection>

            <QInterSection> Help </QInterSection>
          </QItem>
        </QList>
      </QScrollArea>

      <QImg
        class="absolute-top"
        src="~/assets/pexels-robert-anthony-carbone-598966.jpg"
        style="height: 192px"
      >
        <div class="absolute-bottom bg-transparent">
          <QAvatar class="q-mb-sm" rounded size="56px">
            <img src="~/assets/0.png" style="object-fit: cover" />
          </QAvatar>

          <div class="text-weight-bold">Santos Vilanculos</div>

          <div>@_santosvilanculos</div>
        </div>
      </QImg>
    </QDrawer>

    <QPageContainer>
      <RouterView v-slot="{ Component }">
        <KeepAlive>
          <component :is="Component" />
        </KeepAlive>
      </RouterView>
    </QPageContainer>
  </QLayout>
</template>

<style lang="scss">
.header-image {
  z-index: -1;
  opacity: 0.2;
  filter: grayscale(100%);
}
</style>
