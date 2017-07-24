import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {TrumbowygModule} from './trumbowyg';
import {AppComponent} from './app.component';
import {SafeHtmlPipe} from './safeHtml';

@NgModule({
  declarations: [
    AppComponent,
    SafeHtmlPipe
  ],
  imports: [
    BrowserModule,
    TrumbowygModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
