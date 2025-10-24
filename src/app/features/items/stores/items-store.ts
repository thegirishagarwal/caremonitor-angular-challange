import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { IItem } from '@core/models';
import { inject } from '@angular/core';
import { ItemService } from '../services/items.service';
import { lastValueFrom } from 'rxjs';

type ItemSearchState = {
  items: IItem[];
  isLoaded: boolean;
  isTableLoaded: boolean;
  isAgainLoaded: boolean;
  error: string;
};

const initialState: ItemSearchState = {
  items: [],
  isLoaded: false,
  isTableLoaded: false,
  isAgainLoaded: false,
  error: ''
};

export const ItemSearchStore = signalStore(
  withState(initialState),
  withMethods((store, itemService = inject(ItemService)) => ({
    async loadAll() {
      try {
        patchState(store, { isLoaded: false });
        const items: any = await lastValueFrom(itemService.getAllItems());
        patchState(store, { items, isLoaded: true, isTableLoaded: items.length > 0, isAgainLoaded: true });
      }
      catch (error: any) {
        console.error(error);
        patchState(store, { isLoaded: true, error: error?.message || 'Something went wrong' });
      }
    }
  }))
);
