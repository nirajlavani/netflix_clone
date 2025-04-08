import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieService, Movie } from '../../services/movie.service';

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="movies-page">
      <div class="content">
        <h1 class="page-title">Movies</h1>
        <div class="movies-grid">
          <div class="movie-card" *ngFor="let movie of movies">
            <img [src]="'https://image.tmdb.org/t/p/w500' + movie.poster_path" [alt]="movie.title" class="movie-poster">
            <div class="movie-info">
              <h3 class="movie-title">{{ movie.title }}</h3>
              <div class="movie-rating">
                <i class="fas fa-star"></i>
                <span>{{ movie.vote_average }}/10</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .movies-page {
      padding: 80px 4% 20px 4%;
      min-height: 100vh;
      background-color: #141414;
    }
    
    .page-title {
      font-family: 'Syne', sans-serif;
      font-weight: 300;
      font-size: 1.17rem;
      color: #e5e5e5;
      margin-bottom: 1rem;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .movies-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 2rem;
    }

    .movie-card {
      transition: transform 0.3s ease;
      cursor: pointer;

      &:hover {
        transform: scale(1.05);
      }
    }

    .movie-poster {
      width: 100%;
      aspect-ratio: 2/3;
      border-radius: 4px;
      object-fit: cover;
    }

    .movie-info {
      padding: 0.5rem 0;

      .movie-title {
        font-family: 'Poppins', sans-serif;
        font-size: 0.86rem;
        color: white;
        margin: 0.5rem 0;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .movie-rating {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-family: 'Poppins', sans-serif;
        font-size: 0.72rem;
        color: #46d369;

        i {
          color: #46d369;
        }
      }
    }
  `]
})
export class MoviesComponent implements OnInit {
  movies: Movie[] = [];

  constructor(private movieService: MovieService) {}

  ngOnInit() {
    this.loadMovies();
  }

  private loadMovies() {
    this.movieService.getTrendingMovies().subscribe({
      next: (response) => {
        this.movies = response.results;
      },
      error: (error) => console.error('Error loading movies:', error)
    });
  }
}
