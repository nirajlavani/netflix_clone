import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieService, Movie } from '../../services/movie.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  featuredMovie: Movie | null = null;
  categories: { id: number; name: string }[] = [];
  moviesByCategory: { [key: number]: Movie[] } = {};
  isLoading: boolean = true;
  error: string | null = null;

  constructor(private movieService: MovieService) {
    console.log('HomeComponent initialized');
  }

  ngOnInit() {
    console.log('ngOnInit called');
    this.loadTrendingMovies();
  }

  private loadTrendingMovies() {
    console.log('Loading trending movies...');
    this.movieService.getTrendingMovies().subscribe({
      next: (response) => {
        console.log('Trending movies response:', response);
        if (response.results && response.results.length > 0) {
          this.featuredMovie = response.results[0];
          this.loadCategories();
        } else {
          this.error = 'No trending movies found';
          this.isLoading = false;
        }
      },
      error: (error) => {
        console.error('Error loading trending movies:', error);
        this.error = 'Failed to load trending movies';
        this.isLoading = false;
      }
    });
  }

  private loadCategories() {
    console.log('Loading categories...');
    this.movieService.getMovieCategories().subscribe({
      next: (response) => {
        console.log('Categories response:', response);
        if (response.genres) {
          this.categories = response.genres;
          this.categories.forEach(category => {
            this.loadMoviesByCategory(category.id);
          });
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading categories:', error);
        this.error = 'Failed to load movie categories';
        this.isLoading = false;
      }
    });
  }

  private loadMoviesByCategory(categoryId: number) {
    console.log(`Loading movies for category ${categoryId}...`);
    this.movieService.getMoviesByCategory(categoryId).subscribe({
      next: (response) => {
        console.log(`Movies for category ${categoryId}:`, response);
        if (response.results) {
          this.moviesByCategory[categoryId] = response.results;
        }
      },
      error: (error) => {
        console.error(`Error loading movies for category ${categoryId}:`, error);
        this.moviesByCategory[categoryId] = [];
      }
    });
  }
}
