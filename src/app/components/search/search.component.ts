import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
})
export class SearchComponent {
  loading: boolean;
  artists: any[] = [];
  error: boolean;

  constructor(private spotifyService: SpotifyService) {
    this.loading = false;
    this.error = false;
  }

  searchArtist(value: string) {
    this.loading = true;
    this.spotifyService.getArtists(value).subscribe(
      (resp: any) => {
        console.log(resp);
        this.artists = resp;
        this.loading = false;
      },
      (err) => {
        if (err.error.error.status === 401) {
          if (this.spotifyService.attempts === 2) {
            this.loading = false;
            this.error = true;
          } else {
            this.spotifyService.tokenReset();
            this.searchArtist(value);
          }
        }
      }
    );
  }
}
