import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { ItemSearchStore } from '@features/items/stores/items-store';
import { NoRecordsFound } from '@shared/components';

@Component({
  selector: 'app-items-list',
  imports: [
    MatTableModule,
    MatCardModule,
    MatProgressSpinnerModule,
    NoRecordsFound
  ],
  templateUrl: './items-list.html',
  styleUrl: './items-list.scss',
  providers: [ItemSearchStore]
})
export class ItemsList {
  itemStore = inject(ItemSearchStore);
  columns = ['id', 'title', 'description'];

  ngOnInit() {
    this.itemStore.loadAll();
  }

}
