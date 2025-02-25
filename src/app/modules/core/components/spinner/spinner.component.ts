import { Component, inject } from '@angular/core';
import { SpinnerService } from '../../services/spinner.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.scss',
})
export class SpinnerComponent {
  private spinnerService: SpinnerService = inject(SpinnerService);
  public isLoading = this.spinnerService.isLoading;
}
