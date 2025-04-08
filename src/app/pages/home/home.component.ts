import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { MovieService, Movie } from '../../services/movie.service';
import { Subscription, interval, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  bannerMovie: Movie | null = null;
  slideshowMovies: Movie[] = [];
  categories: { id: number; name: string }[] = [];
  moviesByCategory: { [key: number]: Movie[] } = {};
  isLoading = true;
  errorMessage: string | null = null;

  currentSlideIndex = 0;
  private slideshowIntervalSubscription: Subscription | null = null;
  private destroy$ = new Subject<void>();

  constructor(
    private movieService: MovieService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    this.loadInitialData();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    if (this.slideshowIntervalSubscription) {
      this.slideshowIntervalSubscription.unsubscribe();
    }
  }

  loadInitialData(): void {
    this.isLoading = true;
    this.errorMessage = null;

    this.movieService.getTrendingMovies().subscribe({
      next: (response) => {
        if (response.results && response.results.length > 0) {
          this.slideshowMovies = response.results.slice(0, 5);
          this.bannerMovie = this.slideshowMovies[0];
          if (isPlatformBrowser(this.platformId)) {
            this.startSlideshow();
          }
        } else {
          this.errorMessage = 'Could not load trending movies.';
        }
        this.loadCategories();
      },
      error: (error) => {
        console.error('Error loading trending movies:', error);
        this.errorMessage = 'Failed to load trending movies. Please try again later.';
        this.isLoading = false;
      }
    });
  }

  loadCategories(): void {
    this.movieService.getMovieCategories().subscribe({
      next: (response) => {
        this.categories = response.genres;
        this.loadMoviesForCategories();
      },
      error: (error) => {
        console.error('Error loading categories:', error);
        this.errorMessage = 'Failed to load movie categories.';
        this.isLoading = false;
      }
    });
  }

  loadMoviesForCategories(): void {
    let categoriesLoaded = 0;
    if (this.categories.length === 0) {
        this.isLoading = false;
        return;
    }

    this.categories.forEach(category => {
      this.movieService.getMoviesByCategory(category.id).subscribe({
        next: (response) => {
          this.moviesByCategory[category.id] = response.results;
          categoriesLoaded++;
          if (categoriesLoaded === this.categories.length) {
            this.isLoading = false;
          }
        },
        error: (error) => {
          console.error(`Error loading movies for category ${category.name}:`, error);
          categoriesLoaded++;
          if (categoriesLoaded === this.categories.length) {
            this.isLoading = false;
          }
        }
      });
    });
  }

  startSlideshow(): void {
    if (this.slideshowIntervalSubscription) {
      this.slideshowIntervalSubscription.unsubscribe();
    }
    this.slideshowIntervalSubscription = interval(5000)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.nextSlide();
      });
  }

  nextSlide(): void {
    this.currentSlideIndex = (this.currentSlideIndex + 1) % this.slideshowMovies.length;
    this.bannerMovie = this.slideshowMovies[this.currentSlideIndex];
  }

  prevSlide(): void {
    this.currentSlideIndex = (this.currentSlideIndex - 1 + this.slideshowMovies.length) % this.slideshowMovies.length;
    this.bannerMovie = this.slideshowMovies[this.currentSlideIndex];
  }

  goToSlide(index: number): void {
    if(index >= 0 && index < this.slideshowMovies.length) {
        this.currentSlideIndex = index;
        this.bannerMovie = this.slideshowMovies[this.currentSlideIndex];
        if (isPlatformBrowser(this.platformId)) {
            this.startSlideshow();
        }
    }
  }
}
