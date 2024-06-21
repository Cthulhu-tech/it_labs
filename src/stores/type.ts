export enum GroupEnum {
    'passerby' = 'Прохожий',
    'customer' = 'Клиент',
    'partner' = 'Партнер',
}

export interface IUseCardStore {
    cards: Card[];
    search: string;
}

export interface Card {
    id: number;
    group: GroupEnum;
    company: string;
    FIO: string;
    side: boolean;
}