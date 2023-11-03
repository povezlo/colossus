import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StoreListComponent } from './components';

const routes: Routes = [{ path: 'store', component: StoreListComponent }];

@Component({
  selector: 'app-stores',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './stores-page.component.html',
  styleUrls: ['./stores-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StoresPageComponent {}
