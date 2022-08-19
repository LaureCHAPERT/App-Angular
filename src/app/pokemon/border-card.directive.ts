import { Directive,ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[pkmnBorderCard]'
})
export class BorderCardDirective {

  private initialColor: string = '#f5f5f5';
  private defaultColor:string = '#009688';
  private defaultHeight: number = 200 ; 
 //on initialise nos fonctions avec des valeurs de bases 
  constructor(private el:ElementRef) { 

    this.setBorder(this.initialColor);
    this.setHeight(this.defaultHeight);
  }
  //@Input permet que la couleur soit personnalisable dans le tpl
  @Input('pkmnBorderCard') borderColor: string; //alias


  //on ajoute des  "eventListeners" qui vont réagir en fonction de méthodes
  @HostListener('mouseenter') onMouseEnter() {
    // si l'utilisateur définit une couleur OU celle par défaut 
    this.setBorder(this.borderColor || this.defaultColor);
  }
  @HostListener('mouseleave') onMouseLeave() {
    this.setBorder(this.initialColor);
  }
  
  //notre fonction

  private setBorder(color: string) {
    let border = 'solid 4px' + color;
    this.el.nativeElement.style.border = border;
  }
  private setHeight(height:number) {
    this.el.nativeElement.style.height = height + 'px';
  }
}
