import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styles: [],
})
export class CardComponent {
  @Input() items: any[] = [];

  constructor(private router: Router) {}

  showArtist(item: any) {
    const artistId = item.type === 'artist' ? item.id : item.artists[0].id;
    this.router.navigate(['/artist', artistId]);
  }
}
