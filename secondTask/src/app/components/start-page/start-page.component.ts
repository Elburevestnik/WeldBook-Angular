import { Component, Input } from '@angular/core';
import {PreviewOverlayService} from "../../preview-overlay.service";

@Component({
  selector: 'start',
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.scss']
})
export class StartPageComponent  {
  constructor(private previewDialog: PreviewOverlayService) { }

  showPreview() {
    this.previewDialog.open();
  }
}
