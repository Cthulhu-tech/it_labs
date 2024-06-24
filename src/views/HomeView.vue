<template>
  <header class="header">
    <div>
      <img src="@/assets/logo.png" alt="logo">
    </div>
    <input class="input search" type="text" v-model="cardStore.search" :placeholder="'Поиск по имени'">
    <button class="button add" type="button" @click="open">Добавить</button>
    <div class="visitors-data">
      <span class="visitors-data__title">Посетители</span>
      <div class="visitors-data-counters">
        <span class="visitors-data-counters_inside">{{cardStore.getCardsInsideLength}}</span>/
        <span class="visitors-data-counters_outside">{{cardStore.getCardsOutsideLength}}</span>
      </div>
    </div>
  </header>
  <main class="main">
    <RouterView/>
  </main>
  <footer class="footer">
    <span class="footer__title">Фильтровать по:</span>
    <RouterLink :to="{name: 'card', params: {'filter': FilterEnum.outside}}">
      Отсутствующие
    </RouterLink>
    <RouterLink :to="{name: 'card', params: {'filter': FilterEnum.inside}}">
      Присутствующие
    </RouterLink>
    <RouterLink :to="{name: 'card', params: {'filter': FilterEnum.no_filters}}">
      Без фильтра
    </RouterLink>
  </footer>
</template>

<script lang="ts" setup>
import { useModal } from 'vue-final-modal';
import { FilterEnum } from '@/router/type';
import { useCardStore } from '@/stores/cardStore';
import CardAddComponent from '@/components/CardAddComponent.vue';

const cardStore = useCardStore();

const { open, close } = useModal({
  component: CardAddComponent,
  attrs: {
      onConfirm() {
        close()
      },
    },
});
</script>
