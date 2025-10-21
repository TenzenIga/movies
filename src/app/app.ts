import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Footer } from './components/footer/footer';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Footer],
  standalone:true,
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class App {
  protected readonly title = signal('signal-movies');

}
