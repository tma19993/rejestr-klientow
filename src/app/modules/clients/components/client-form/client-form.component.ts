import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Client, PostClientForm } from '../../../core/models/client.model';
import { FormsService } from '../../../core/services/forms.service';
import { ClientsService } from '../../../core/services/clients.service';
import { Router } from '@angular/router';
import { Observer } from 'rxjs';
// import { postcodeValidator } from '../../../shared/validators/postcode.validator';
import { ClientsValidators } from '../../../shared/validators/client.validators';

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrl: './client-form.component.scss',
})
export class ClientFormComponent implements OnInit {
  private formService = inject(FormsService);
  private clientService = inject(ClientsService);
  private router = inject(Router);
  public clientForm!: FormGroup<PostClientForm>;
  public errorMessage = '';
  private observer: Observer<unknown> = {
    next: () => {
      this.errorMessage = '';
      if (this.editMode) {
        this.emitCloseDialog();
      }

      this.router.navigate(['/klienci']);
    },
    error: () => {
      this.errorMessage = 'Wystąpił błąd';
    },
    complete: () => {
      console.log('object');
    },
  };
  @Input() public editMode = false;
  @Input() public client!: Client;
  @Output() private closeDialog: EventEmitter<void> = new EventEmitter<void>();

  public get controls() {
    return this.clientForm.controls;
  }

  public ngOnInit(): void {
    this.initForm();
  }

  public getErrorMessage(control: FormControl): string {
    return this.formService.getErrorMessage(control);
  }

  public onAddClient(): void {
    if (this.editMode) {
      this.clientService
        .putClient(this.clientForm.getRawValue(), this.client.id)
        .subscribe(this.observer);
      return;
    }
    this.clientService
      .postClient(this.clientForm.getRawValue())
      .subscribe(this.observer);
  }
  public emitCloseDialog(): void {
    this.closeDialog.emit();
  }

  private initForm() {
    this.clientForm = new FormGroup({
      firstname: new FormControl(this.editMode ? this.client.firstname : '', {
        nonNullable: true,
        validators: [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(20),
        ],
      }),
      surname: new FormControl(this.editMode ? this.client.surname : '', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      email: new FormControl(this.editMode ? this.client.email : '', {
        nonNullable: true,
        validators: [Validators.required, Validators.email],
      }),
      phone: new FormControl(this.editMode ? this.client.phone : '', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      address: new FormControl(this.editMode ? this.client.address : '', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      postcode: new FormControl(this.editMode ? this.client.postcode : '', {
        nonNullable: true,
        validators: [Validators.required, ClientsValidators.postcode()],
      }),
    });
  }
}
