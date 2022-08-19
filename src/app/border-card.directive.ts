import { Directive,ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[pkmnBorderCard]'
})
export class BorderCardDirective {
 //on initialise nos fonctions avec des valeurs de bases 
  constructor(private el:ElementRef) { 

    this.setBorder('#f5f5f5');
  }
  //@Input permet que la couleur soit personnalisable dans le tpl
  @Input('pkmnBorderCard') borderColor: string;

  //on ajoute des  "eventListeners" qui vont réagir en fonction de méthodes
  @HostListener('mouseenter') onMouseEnter() {
    // si l'utilisateur définit une couleur OU celle par défaut 
    this.setBorder(this.borderColor || '#009688');
  }
  @HostListener('mouseleave') onMouseLeave() {
    this.setBorder('#f5f5f5');
  }
  
  //notre fonction

  private setBorder(color: string) {
    let border = 'solid 4px' + color;
    this.el.nativeElement.style.border = border;
  }
}
