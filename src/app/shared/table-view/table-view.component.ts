import { Component, Input } from '@angular/core';
import { Book, Doc } from 'src/app/core/models/book-response.model';

@Component({
  selector: 'front-end-internship-assignment-table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.scss'],
})
export class TableViewComponent {
  @Input() booksList: any[] = [];
  @Input() subjectName: string = '';
}
