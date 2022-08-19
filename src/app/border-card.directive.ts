import { Directive,ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[pkmnBorderCard]'
})
export class BorderCardDirective {
 //on initialise nos fonctions avec des valeurs de bases 
  constructor(private el:ElementRef) { 

    this.setBorder('#f5f5f5');
  }
  //on ajoute des  "eventListeners" qui vont réagir en fonction de méthodes
  @HostListener('mouseenter') onMouseEnter() {
    this.setBorder('#009688');
  }
  @HostListener('mouseleave') onMouseLeave() {
    this.setBorder('#f5f5f5');
  }
  
  //nos deux fonctions

  private setBorder(color: string) {
    let border = 'solid 4px' + color;
    this.el.nativeElement.style.border = border;
  }
}
