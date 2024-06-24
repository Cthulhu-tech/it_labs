<template>
    <div class="card" @click="open">
        <span>{{ card.id }}</span>
        <span>{{ card.FIO }}</span>
        <span>{{ card.company }}</span>
        <span>{{ card.group }}</span>
        <div class="presence" :class="{inside: card.side}"/>
    </div>
</template>

<script lang="ts" setup>
import CardAddComponent from '@/components/CardAddComponent.vue';
import { useModal } from 'vue-final-modal';
import { defineProps, withDefaults } from "vue";
import { Card, GroupEnum } from '@/stores/type';

const props = withDefaults(defineProps<{card: Card}>(), {
    card: () => ({
        id: 0,
        FIO: '',
        company: '',
        group: GroupEnum.passerby,
        side: false,
    }),
});

const { open, close } = useModal({
  component: CardAddComponent,
  attrs: {
      onConfirm() {
        close()
      },
      type: 'update',
      card: props.card,
    },
});
</script>
