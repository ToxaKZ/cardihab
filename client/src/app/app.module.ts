import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { SearchInputComponent } from './search-input/search-input.component';
import { MedicationsListComponent } from './medications-list/medications-list.component';
import { MedicationsResultsComponent } from './medications-results/medications-results.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchInputComponent,
    MedicationsListComponent,
    MedicationsResultsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
