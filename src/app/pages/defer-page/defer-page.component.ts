import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { of } from 'rxjs/internal/observable/of';
import { ButtonComponent } from 'src/app/shared/ui/buttons';

@Component({
  selector: 'app-defer-page',
  standalone: true,
  imports: [ButtonComponent, AsyncPipe],
  templateUrl: './defer-page.component.html',
  styleUrl: './defer-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeferPageComponent {
  sliderArr = of([
    'https://picsum.photos/1200/300?image=1010',
    'https://picsum.photos/1200/300?image=1011',
    'https://picsum.photos/1200/300?image=1012',
    'https://picsum.photos/1200/300?image=1013',
    'https://picsum.photos/1200/300?image=1014',
    'https://picsum.photos/1200/300?image=1015',
    'https://picsum.photos/1200/300?image=1016',
    'https://picsum.photos/1200/300?image=1017',
    'https://picsum.photos/1200/300?image=1018',
    'https://picsum.photos/1200/300?image=1019',
    'https://picsum.photos/1200/300?image=1020',
    'https://picsum.photos/1200/300?image=1021',
    'https://picsum.photos/1200/300?image=1022',
    'https://picsum.photos/1200/300?image=1023',
    'https://picsum.photos/1200/300?image=1024',
    'https://picsum.photos/1200/300?image=1025',
    'https://picsum.photos/1200/300?image=1026',
  ]);

  isVisible = false;
}
