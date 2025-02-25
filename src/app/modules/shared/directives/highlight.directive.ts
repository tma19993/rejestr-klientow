import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
  standalone: true,
})
export class HighlightDirective {
  @Input() appHighlight = '';
  constructor(private el: ElementRef) {}

  // HostListener działa na eventy na drzewku dom
  @HostListener('mouseenter') enter() {
    this.el.nativeElement.style.color = this.appHighlight;
  }
  @HostListener('mouseleave') leave() {
    this.el.nativeElement.style.color = '';
  }
  // public ngOnInit(): void {
  //   this.el.nativeElement.style.color = this.appHighlight;
  // }
}
