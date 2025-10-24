import { Component, input } from '@angular/core';

@Component({
  selector: 'app-no-records-found',
  imports: [],
  templateUrl: './no-records-found.html',
  styleUrl: './no-records-found.scss',
})
export class NoRecordsFound {
  message = input<string>('No records found');
  error = input<string>('');
}
