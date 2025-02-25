import { Component, inject } from '@angular/core';
import { Client } from '../../../../core/models/client.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-client-dialog',
  templateUrl: './edit-client-dialog.component.html',
  styleUrl: './edit-client-dialog.component.scss',
})
export class EditClientDialogComponent {
  private readonly dialogRef = inject(MatDialogRef<EditClientDialogComponent>);
  public readonly data = inject<{ client: Client }>(MAT_DIALOG_DATA);

  public closeDialog(): void {
    this.dialogRef.close();
  }
}
