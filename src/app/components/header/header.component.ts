import { Component, Input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, ButtonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  @Input() favoriteMovieIds: string[] = [];
  @Input() watchLaterMovieIds: string[] = [];

  constructor(private router: Router) {}

  navigateWithData(data: string[], favorite?: string) {
    const dataString = JSON.stringify(data);
    const path = favorite ? 'favorite' : 'watch-list';

    this.router.navigate([{ outlets: { header: [path] } }], {
      queryParams: { dataIds: dataString },
    });
  }
}
