import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-tv-shows',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="tv-shows-page">
      <div class="content">
        <h1 class="page-title">TV Shows</h1>
        <div class="shows-grid">
          <div class="show-card" *ngFor="let show of tvShows">
            <img [src]="'https://image.tmdb.org/t/p/w500' + show.poster_path" [alt]="show.name" class="show-poster">
            <div class="show-info">
              <h3 class="show-title">{{ show.name }}</h3>
              <div class="show-rating">
                <i class="fas fa-star"></i>
                <span>{{ show.vote_average }}/10</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .tv-shows-page {
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

    .shows-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 2rem;
    }

    .show-card {
      transition: transform 0.3s ease;
      cursor: pointer;

      &:hover {
        transform: scale(1.05);
      }
    }

    .show-poster {
      width: 100%;
      aspect-ratio: 2/3;
      border-radius: 4px;
      object-fit: cover;
    }

    .show-info {
      padding: 0.5rem 0;

      .show-title {
        font-family: 'Poppins', sans-serif;
        font-size: 0.86rem;
        color: white;
        margin: 0.5rem 0;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .show-rating {
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
export class TvShowsComponent implements OnInit {
  tvShows: any[] = [];

  constructor(private movieService: MovieService) {}

  ngOnInit() {
    this.loadTvShows();
  }

  private loadTvShows() {
    this.movieService.getTrendingTvShows().subscribe({
      next: (response) => {
        this.tvShows = response.results;
      },
      error: (error) => console.error('Error loading TV shows:', error)
    });
  }
}
