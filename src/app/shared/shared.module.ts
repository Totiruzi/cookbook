import { DropDownDirective } from './drop-down.directive';
import { PlaceHolderDirective } from './placeholder/placeholder.directive';
import { AlertComponent } from './alert/alert.component';
import { NgModule } from '@angular/core';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AlertComponent,
    LoadingSpinnerComponent,
    PlaceHolderDirective,
    DropDownDirective
  ],
  imports: [ CommonModule],
  exports: [
    CommonModule,
    AlertComponent,
    LoadingSpinnerComponent,
    PlaceHolderDirective,
    DropDownDirective
  ],
  entryComponents: [
    AlertComponent
  ]
})
export class SharedModule {}
