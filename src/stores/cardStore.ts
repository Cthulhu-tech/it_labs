import { defineStore } from 'pinia';
import { Card, IUseCardStore } from './type';

export const useCardStore = defineStore('useCardStore', {
  state: (): IUseCardStore => ({
    search: '',
    cards: [],
  }),
  actions: {
    createNewCard(card: Card) {
      this.cards.push(card);
    },
    updateCard(card: Card) {
      const index = this.cards.findIndex(_card => _card.id === card.id);
      this.cards.splice(index, 1, card);
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
      if(this.cards.length) {
        const idArray = this.cards.map((card) => card.id);
        return Math.max(...idArray);
      }
      return 0;
    },
  },
  persist: true,
});