import { Component } from '@angular/core'
import { MatCardModule } from '@angular/material/card'
import { MatButtonModule } from '@angular/material/button'
import {
  MatSnackBar,
  MatSnackBarConfig,
  MatSnackBarModule,
} from '@angular/material/snack-bar'

@Component({
  selector: 'app-root',
  styleUrls: ['./app.component.css'],
  templateUrl: './app.component.html',
  imports: [MatCardModule, MatButtonModule, MatSnackBarModule],
})
export class AppComponent {
  public title = 'frontend'
  public constructor(public snackbar: MatSnackBar) {}

  public ok(): void {
    this.snackbar.open('You clicked Ok', null, {
      duration: 1500,
    } as MatSnackBarConfig)
  }

  public cancel(): void {
    this.snackbar.open('You clicked Cancel', null, {
      duration: 1500,
    } as MatSnackBarConfig)
  }
}
