import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WatchLaterMoviePageComponent } from './watch-later-movie-page.component';

describe('WatchLaterMoviePageComponent', () => {
  let component: WatchLaterMoviePageComponent;
  let fixture: ComponentFixture<WatchLaterMoviePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WatchLaterMoviePageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WatchLaterMoviePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
