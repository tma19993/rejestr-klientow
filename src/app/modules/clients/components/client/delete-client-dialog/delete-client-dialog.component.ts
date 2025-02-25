import { Component, inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Client } from '../../../../core/models/client.model';
import { ClientsService } from '../../../../core/services/clients.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-client-dialog',
  templateUrl: './delete-client-dialog.component.html',
  styleUrl: './delete-client-dialog.component.scss',
})
export class DeleteClientDialogComponent implements OnInit {
  private readonly dialogRef = inject(
    MatDialogRef<DeleteClientDialogComponent>,
  );
  private readonly data = inject<{ client: Client }>(MAT_DIALOG_DATA);
  private clientService: ClientsService = inject(ClientsService);
  private router: Router = inject(Router);

  public client!: Client;

  public errorMessage = '';

  public ngOnInit(): void {
    this.client = this.data.client;
  }

  public onDelete(): void {
    this.clientService.deleteClient(this.client.id).subscribe({
      next: () => {
        this.dialogRef.close();
        this.router.navigate(['/klienci']);
      },
      error: () => {
        this.errorMessage = 'Wystąpił błąd!';
      },
    });
  }
}
