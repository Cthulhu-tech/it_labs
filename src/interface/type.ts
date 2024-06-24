import { Card, GroupEnum } from "@/stores/type";

export interface IQuery {
    side: GroupEnum;
}

export type PropsCardAddComponent = {
    type: string;
    card: Card;
}
