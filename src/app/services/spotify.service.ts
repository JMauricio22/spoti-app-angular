import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SpotifyService {
  accessToken = '';
  attempts = 0;
  client_id = '4de13dc3c3c74942aad19cdcd519dca4';

  constructor(private http: HttpClient) {
    this.getToken();
  }

  getToken() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.get(
      `https://server-spotify-token-4uk4g8cjc-jmauricio22.vercel.app/api/token/${this.client_id}`,
      { headers }
    );
  }

  tokenReset() {
    this.accessToken = '';
    this.attempts++;
  }

  /* 
  'Bearer BQDvQxXl2on6fuH6UXkl3Ztl5kGzB0oacHxwNfrE675H9iHuZojctKzmiznw2eU1fsihcwM18thbBmPvqdNMQotUkBrywGaV0HvsxjxOS1M3PhcYOmhunaIf1NZLIiP7uOLbIN30T5vEhm1IpwE'
  */

  getRequestHeaders(token: string = this.accessToken) {
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  getQuery(query: string) {
    const url = 'https://api.spotify.com/v1/';

    if (this.accessToken === '') {
      return this.getToken().pipe(
        mergeMap((resp: any) => {
          this.accessToken = resp.access_token;
          return this.http.get(`${url}${query}`, {
            headers: this.getRequestHeaders(),
          });
        })
      );
    }

    return this.http.get(`${url}${query}`, {
      headers: this.getRequestHeaders(),
    });
  }

  getNewReleases() {
    return this.getQuery('browse/new-releases').pipe(
      map((resp: any) => resp.albums.items)
    );
  }

  getArtists(search: string) {
    return this.getQuery(`search?q=${search}&type=artist&limit=15`).pipe(
      map((resp: any) => resp.artists.items)
    );
  }

  getArtist(id: string) {
    return this.getQuery(`artists/${id}`);
  }

  getTopTracks(id: string) {
    return this.getQuery(`artists/${id}/top-tracks?market=us`).pipe(
      map((resp: any) => resp.tracks)
    );
  }
}
