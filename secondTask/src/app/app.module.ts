import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { MatButtonModule} from '@angular/material';
import { MatTableModule } from '@angular/material/table';
import { OverlayModule } from '@angular/cdk/overlay';

import { AppComponent } from './app.component';
import { PreviewOverlayService } from './preview-overlay.service';
import { StartPageComponent } from './components/start-page/start-page.component';
import { TableComponent } from './components/table/table.component';


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    MatButtonModule,
    OverlayModule,
    MatTableModule
  ],
  declarations: [ AppComponent, TableComponent, StartPageComponent],
  bootstrap: [ AppComponent ],
  providers: [
    PreviewOverlayService
  ],
  entryComponents: [
    TableComponent,
    StartPageComponent
  ]
})
export class AppModule { }
