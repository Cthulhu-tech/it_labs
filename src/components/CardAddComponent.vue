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
                    {{ props.type === 'create' ? 'Добавить' : 'Обновить' }}
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
import { computed, defineEmits, reactive } from 'vue';
import { useForm } from 'vee-validate';
import { Card, GroupEnum } from '@/stores/type';
import { useCardStore } from '@/stores/cardStore';
import { string } from 'yup';
import { defineProps, withDefaults } from "vue";
import { PropsCardAddComponent } from '@/interface/type';

const props = withDefaults(defineProps<PropsCardAddComponent>(), {
    type: 'create',
    card: () => ({
        id: 0,
        FIO: '',
        company: '',
        group: GroupEnum.passerby,
        side: false,
    }),
});

const emit = defineEmits<{
    (e: 'confirm'): void
}>();

const cardStore = useCardStore();
const id = computed(() => props.type === 'create' ? (cardStore.getMaxId + 1) : props.card.id);
const initialValue = reactive({
    id: id.value,
    group: props.card.group,
    company: props.card.company,
    FIO: props.card.FIO,
    side: props.card.side,
});
const { errors, defineField, handleSubmit } = useForm<Card>({
  initialValues: initialValue,
  validationSchema: {
    company: string().trim().required(),
    FIO: string().trim().required(),
  },
});

const submit = handleSubmit((values) => {
    if(props.type === 'create') {
        cardStore.createNewCard(values);
        emit('confirm');
        return;
    }
    cardStore.updateCard(values);
    emit('confirm');
});

const [group, groupProps] = defineField('group');
const [company, companyProps] = defineField('company');
const [fio, fioProps] = defineField('FIO');
const [side, sideProps] = defineField('side');
</script>
  