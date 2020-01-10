import {
  Directive,
  HostListener,
  HostBinding,
  ElementRef
} from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropDownDirective {
  // @Input() set appDropdown(condition: boolean) {
  //   if ( condition ) {
  //     this.vcRef.createEmbeddedView(this.templateRef);
  //   } else {
  //       this.vcRef.clear();
  //   }
  // }
  constructor(private elRef: ElementRef) {}

  @HostBinding('class.open') isOpen = false;
  @HostListener('document:click', ['$event']) toggleOpen(event: Event) {
    this.isOpen = this.elRef.nativeElement.contains(event.target)
      ? !this.isOpen
      : false;
  }
}
