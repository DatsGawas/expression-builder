import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ExpressionBuilderComponent } from './app/components/expression-builder/expression-builder.component';
import {AmexioWidgetModule} from "amexio-ng-extensions";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import { ExpressionDataComponent } from './app/components/expression-data/expression-data.component';

@NgModule({
  declarations: [
    AppComponent,
    ExpressionBuilderComponent,
    ExpressionDataComponent
  ],
  imports: [
    BrowserModule, AmexioWidgetModule, HttpClientModule, FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
