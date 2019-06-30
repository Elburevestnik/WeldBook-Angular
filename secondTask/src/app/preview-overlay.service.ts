import { Injectable } from '@angular/core';
import {Overlay, OverlayConfig} from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';


import { TableComponent } from "./components/table/table.component";
import {OverlayRefClose} from "./overlay-ref-close";
interface PreviewOverlayConfig {
  panelClass?: string;
  hasBackdrop?: boolean;
  backdropClass?: string;

}
const DEFAULT_CONFIG: PreviewOverlayConfig = {
  hasBackdrop: true,
  backdropClass: 'dark-backdrop',
  panelClass: 'dialog-panel'
}

@Injectable()
export class PreviewOverlayService {

  constructor(private overlay: Overlay) { }

  open(config: PreviewOverlayConfig = {}) {
    const dialogConfig = {...DEFAULT_CONFIG, ...config};
    const overlayRef = this.createOverlay(dialogConfig);
    const dialogRef = new OverlayRefClose(overlayRef);
    const filePreviewPortal = new ComponentPortal(TableComponent);

    overlayRef.attach(filePreviewPortal);
    overlayRef.backdropClick().subscribe(_ => dialogRef.close());
    return dialogRef;
  }

  private createOverlay(config: PreviewOverlayConfig) {
    const overlayConfig = this.getOverlayConfig(config);
    return this.overlay.create(overlayConfig);
  }

  private getOverlayConfig(config: PreviewOverlayConfig): OverlayConfig {
    const positionStrategy = this.overlay.position()
      .global()
      .centerHorizontally()
      .centerVertically();
    const overlayConfig = new OverlayConfig({
      hasBackdrop: config.hasBackdrop,
      backdropClass: config.backdropClass,
      panelClass: config.panelClass,
      scrollStrategy: this.overlay.scrollStrategies.block(),
      positionStrategy

    });
    return overlayConfig;
  }
}
