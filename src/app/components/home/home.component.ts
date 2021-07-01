import { Component } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  loading: boolean;
  newReleases: any[] = [];
  error: boolean;

  constructor(private spotifyService: SpotifyService) {
    this.loading = true;
    this.error = false;
    this.getNewReleases();
  }
  getNewReleases() {
    this.spotifyService.getNewReleases().subscribe(
      (resp: any) => {
        console.log(resp);
        this.newReleases = resp;
        this.loading = false;
      },
      (err) => {
        if (err.error.error.status === 401) {
          if (this.spotifyService.attempts === 2) {
            this.loading = false;
            this.error = true;
          } else {
            this.spotifyService.tokenReset();
            this.getNewReleases();
          }
        }
      }
    );
  }
}
