import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';
import { ClientsService } from '../../../core/services/clients.service';
import { MatTableDataSource } from '@angular/material/table';
import { Client } from '../../../core/models/client.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  merge,
  startWith,
  Subscription,
  switchMap,
} from 'rxjs';
import { FormControl } from '@angular/forms';
@Component({
  selector: 'app-clients-table',
  templateUrl: './clients-table.component.html',
  styleUrl: './clients-table.component.scss',
})
export class ClientsTableComponent implements AfterViewInit, OnDestroy {
  public displayedColumns: string[] = [
    'lp',
    'firstname',
    'surname',
    'email',
    'buttons',
  ];
  public dataSource!: MatTableDataSource<Client>;
  public totalCount = 0;
  public filterValue = new FormControl('', { nonNullable: true });
  public sub = new Subscription();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private clientsService: ClientsService) {}

  public ngAfterViewInit(): void {
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    this.sub.add(
      merge(this.sort.sortChange, this.paginator.page)
        .pipe(
          startWith({}),
          switchMap(() => {
            const pageIndex = this.paginator.pageIndex + 1;
            const itemPerSize = this.paginator.pageSize;
            const sortDirection = this.sort.direction;
            const sortColumnName = this.sort.active;
            return this.clientsService.getClients(
              pageIndex,
              itemPerSize,
              sortDirection,
              sortColumnName,
            );
          }),
          map((data) => {
            this.totalCount = data.totalCount;
            return data.clients;
          }),
        )
        .subscribe({
          next: (clients) => {
            this.dataSource = new MatTableDataSource<Client>(clients);
          },
          error: (err) => {
            console.log(err);
          },
        }),
    );

    this.sub.add(
      this.filterValue.valueChanges
        .pipe(debounceTime(500), distinctUntilChanged())
        .subscribe((value) => {
          const val = value?.trim();
          this.applyFilter(val);
        }),
    );

    // this.clientsService.getClients().subscribe({
    //   next: (response) => {
    //     this.totalCount = response.totalCount;
    //     this.dataSource = new MatTableDataSource<Client>(response.clients);
    //     this.dataSource.paginator = this.paginator;
    //     this.dataSource.sort = this.sort;
    //   },
    //   error: (err) => {
    //     console.log(err);
    //   },
    // });
  }

  public applyFilter(value: string): void {
    const pageIndex = this.paginator.pageIndex + 1;
    const itemPerSize = this.paginator.pageSize;
    const sortDirection = this.sort.direction;
    const sortColumnName = this.sort.active;

    this.clientsService
      .getClients(pageIndex, itemPerSize, sortDirection, sortColumnName, value)
      .subscribe({
        next: (resp) => {
          this.totalCount = resp.totalCount;
          this.dataSource = new MatTableDataSource<Client>(resp.clients);
        },
      });

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  public ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
