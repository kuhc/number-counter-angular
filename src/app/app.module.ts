import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AngularEditorModule } from '@kolkov/angular-editor';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { NumberCounterComponent } from './shared/number-counter/number-counter.component';

@NgModule({
  imports: [BrowserModule, FormsModule, HttpClientModule, AngularEditorModule],
  declarations: [AppComponent, HelloComponent, NumberCounterComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
