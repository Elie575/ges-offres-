import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search-app',
  imports: [],
  templateUrl: './search-app.component.html',
  styleUrl: './search-app.component.css'
})
export class SearchAppComponent {

  searchQuery: string = '';
  @Output() searchEvent = new EventEmitter<string>();
  onSearch() {
    this.searchEvent.emit(this.searchQuery);
  }
}
