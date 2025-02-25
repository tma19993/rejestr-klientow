import { Component, OnInit } from '@angular/core';
import { ClientsService } from '../../../core/services/clients.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { Client } from '../../../core/models/client.model';
import { MatDialog } from '@angular/material/dialog';
import { DeleteClientDialogComponent } from './delete-client-dialog/delete-client-dialog.component';
import { EditClientDialogComponent } from './edit-client-dialog/edit-client-dialog.component';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrl: './client.component.scss',
})
export class ClientComponent implements OnInit {
  public client!: Client;
  constructor(
    private clientService: ClientsService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
  ) {}

  public ngOnInit(): void {
    this.route.params
      .pipe(switchMap((params) => this.clientService.getClient(+params['id'])))
      .subscribe({
        next: (client) => {
          this.client = client;
        },
      });
  }

  public openDialog(): void {
    this.dialog.open(DeleteClientDialogComponent, {
      data: { client: this.client },
    });
  }

  public openEditDialog(): void {
    this.dialog.open(EditClientDialogComponent, {
      data: { client: this.client },
      width: '600px',
      maxWidth: '600px',
    });
  }
}
