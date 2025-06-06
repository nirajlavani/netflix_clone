import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment'; // Import environment

export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  vote_average: number;
  genre_ids: number[];
}

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private apiKey = environment.apiKey; // Use the key from environment
  private baseUrl = 'https://api.themoviedb.org/3';

  constructor(private http: HttpClient) {}

  getTrendingMovies(): Observable<{ results: Movie[] }> {
    return this.http.get<{ results: Movie[] }>(`${this.baseUrl}/trending/movie/week?api_key=${this.apiKey}`);
  }

  getTrendingTvShows(): Observable<any> {
    return this.http.get(`${this.baseUrl}/trending/tv/week?api_key=${this.apiKey}`);
  }

  getMovieCategories(): Observable<{ genres: { id: number; name: string }[] }> {
    return this.http.get<{ genres: { id: number; name: string }[] }>(`${this.baseUrl}/genre/movie/list?api_key=${this.apiKey}`);
  }

  getMoviesByCategory(genreId: number): Observable<{ results: Movie[] }> {
    return this.http.get<{ results: Movie[] }>(`${this.baseUrl}/discover/movie?api_key=${this.apiKey}&with_genres=${genreId}`);
  }
} 