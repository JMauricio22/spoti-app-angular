import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
})
export class ArtistComponent {
  loading: boolean = true;
  artist: any = {};
  topTracks: any[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private spotifyService: SpotifyService
  ) {
    this.activatedRoute.params.subscribe((params) => {
      const { id } = params;
      this.spotifyService.getArtist(id).subscribe((artist) => {
        console.log(artist);
        this.artist = artist;
        this.spotifyService.getTopTracks(id).subscribe((tracks) => {
          console.log(tracks);
          this.topTracks = tracks;
        });
        this.loading = false;
      });
    });
  }
}
