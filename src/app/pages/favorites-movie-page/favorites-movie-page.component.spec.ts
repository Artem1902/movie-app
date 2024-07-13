import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoritesMoviePageComponent } from './favorites-movie-page.component';

describe('FavoritesMoviePageComponent', () => {
  let component: FavoritesMoviePageComponent;
  let fixture: ComponentFixture<FavoritesMoviePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FavoritesMoviePageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FavoritesMoviePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
