<template>
    <VueFinalModal class="popup" @click.self="emit('confirm')">
        <div class="popup-create">
            <div class="wrapper-popup-close">
                <div class="popup-close" @click="emit('confirm')">×</div>
            </div>
            <div class="wrapper-input">
                <span class="wrapper-input__title">ФИО</span>
                <input class="input" :class="{error: errors.FIO}" type="text" v-model="fio" v-bind="fioProps">
            </div>
            <div class="wrapper-input">
                <span class="wrapper-input__title">Компания</span>
                <input class="input" :class="{error: errors.company}" type="text" v-model="company" v-bind="companyProps">
            </div>
            <div class="wrapper-input">
                <span class="wrapper-input__title">Группа</span>
                <select class="input select" v-model="group" v-bind="groupProps" name="group">
                    <option :value="group" v-for="group in GroupEnum" :key="group">
                        {{ group }}
                    </option>
                </select>
            </div>
            <div class="wrapper-input">
                <span class="wrapper-input__title">Присутствие</span>
                <input class="checkbox" :class="{error: errors.side}" type="checkbox" v-model="side" v-bind="sideProps">
            </div>
            <div class="wrapper-button">
                <button
                    class="button add"
                    type="button"
                    @click="submit"
                >
                    Добавить
                </button>
                <button
                    class="button add close"
                    type="button"
                    @click="emit('confirm')"
                >
                    Закрыть
                </button>
            </div>
        </div>
    </VueFinalModal>
</template>

<script lang="ts" setup>
import { VueFinalModal } from 'vue-final-modal';
import { computed, defineEmits } from 'vue';
import { useForm } from 'vee-validate';
import { Card, GroupEnum } from '@/stores/type';
import { useCardStore } from '@/stores/cardStore';
import { string } from 'yup';

const emit = defineEmits<{
    (e: 'confirm'): void
}>();

const cardStore = useCardStore();
const maxId = computed(() => cardStore.getMaxId + 1);

const { errors, defineField, handleSubmit } = useForm<Card>({
  initialValues: {
    id: maxId.value,
    group: GroupEnum.customer,
    company: '',
    FIO: '',
    side: false,
  },
  validationSchema: {
    company: string().required().matches(/^(\S+$)/g),
    FIO: string().required().matches(/^(\S+$)/g),
  },
});

const submit = handleSubmit((values) => {
    cardStore.createNewCard(values);
    emit('confirm');
});

const [group, groupProps] = defineField('group');
const [company, companyProps] = defineField('company');
const [fio, fioProps] = defineField('FIO');
const [side, sideProps] = defineField('side');
</script>
  