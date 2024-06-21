import { defineStore } from 'pinia';
import { Card, GroupEnum, IUseCardStore } from './type';

export const useCardStore = defineStore('useCardStore', {
  state: (): IUseCardStore => ({
    search: '',
    cards: [{
      id: 1,
      FIO: 'Зубенко Михаил Петрович',
      company: 'OOO "АСОЛЬ"',
      group: GroupEnum.partner,
      side: true,
    },{
      id: 2,
      FIO: 'Зубенко Михаил Петрович',
      company: 'OOO "АСОЛЬ"',
      group: GroupEnum.passerby,
      side: false,
    }],
  }),
  actions: {
    createNewCard(card: Card) {
      this.cards.push(card);
    },
  },
  getters: {
    getCards (): Card[] {
        return this.cards.filter((card) => card.FIO.toLocaleLowerCase().indexOf(this.search.toLocaleLowerCase()) > -1);
    },
    getCardsInside(): Card[] {
      return this.cards.filter((card) => card.side && card.FIO.toLocaleLowerCase().indexOf(this.search.toLocaleLowerCase()) > -1);
    },
    getCardsOutside(): Card[] {
      return this.cards.filter((card) => !card.side && card.FIO.toLocaleLowerCase().indexOf(this.search.toLocaleLowerCase()) > -1);
    },
    getCardsInsideLength(): number {
      return this.cards.filter((card) => card.side).length;
    },
    getCardsOutsideLength(): number {
      return this.cards.filter((card) => !card.side).length;
    },
    getMaxId():number {
      const idArray = this.cards.map((card) => card.id);
      return Math.max(...idArray) || 1;
    }
  },
});