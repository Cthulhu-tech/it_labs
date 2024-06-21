<template>
  <div class="card filter">
    <span>Номер</span>
    <span>ФИО</span>
    <span>Компания</span>
    <span>Группа</span>
    <span>Присутствие</span>
  </div>
  <div class="card" v-for="card in cards" :key="card.id">
    <span>{{ card.id }}</span>
    <span>{{ card.FIO }}</span>
    <span>{{ card.company }}</span>
    <span>{{ card.group }}</span>
    <div class="presence" :class="{inside: card.side}"/>
  </div>
</template>

<script lang="ts" setup>
import { useCardStore } from '@/stores/cardStore';
import { useRoute } from 'vue-router';
import { computed } from 'vue';
import { FilterEnum } from '@/router/type';

const route = useRoute();
const filter = computed(() => route.params.filter);
const cardStore = useCardStore();
const cards = computed(() => {
  if(filter.value ===  FilterEnum.inside) {
    return cardStore.getCardsInside;
  }
  if(filter.value === FilterEnum.outside) {
    return cardStore.getCardsOutside;
  }
  return cardStore.getCards;
});
</script>
