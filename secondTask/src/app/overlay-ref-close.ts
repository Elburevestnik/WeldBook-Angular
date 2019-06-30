import { OverlayRef } from '@angular/cdk/overlay';

export class OverlayRefClose {

  constructor(private overlayRef: OverlayRef) { }

  close(): void {
    this.overlayRef.dispose();
  }
}
