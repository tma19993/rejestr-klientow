import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { map, Observable } from 'rxjs';
import {
  Client,
  ClientResponse,
  GetClientsResponse,
  PostClient,
} from '../models/client.model';

@Injectable({
  providedIn: 'root',
})
export class ClientsService {
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  public getClients(
    pageIndex: number,
    itemPerSize: number,
    sortDirection: string,
    sortColumnName: string,
    value = '',
  ): Observable<GetClientsResponse> {
    let params = new HttpParams({
      fromObject: {
        _page: pageIndex,
        _limit: itemPerSize,
      },
    });
    if (sortColumnName) {
      params.append('_sort', sortColumnName).append('_order', sortDirection);
    }
    if (value) {
      params = params.append('firstname_like', value);
    }

    return this.http
      .get<ClientResponse[]>(`${this.apiUrl}/clients`, {
        observe: 'response',
        params,
      })
      .pipe(
        map((response) => {
          if (!response.body) {
            return { clients: [], totalCount: 0 };
          }
          const clientsArray: Client[] = response.body.map(
            ({ id, firstname, surname, email, phone, address, postcode }) =>
              new Client(
                id,
                firstname,
                surname,
                email,
                phone,
                address,
                postcode,
              ),
          );
          const totalCount = Number(response.headers.get('X-Total-Count'));
          return {
            clients: clientsArray,
            totalCount,
          };
        }),
      );
  }

  public getClient(id: number): Observable<Client> {
    return this.http
      .get<ClientResponse>(`${this.apiUrl}/clients/${id}`)
      .pipe(
        map(
          ({ id, firstname, surname, email, phone, address, postcode }) =>
            new Client(id, firstname, surname, email, phone, address, postcode),
        ),
      );
  }

  public postClient(clientData: PostClient): Observable<Client> {
    return this.http
      .post<ClientResponse>(`${this.apiUrl}/clients`, clientData)
      .pipe(
        map(
          ({ id, firstname, surname, email, phone, address, postcode }) =>
            new Client(id, firstname, surname, email, phone, address, postcode),
        ),
      );
  }

  public deleteClient(id: number): Observable<Record<string, never>> {
    return this.http.delete<Record<string, never>>(
      `${this.apiUrl}/clients/${id}`,
    );
  }

  public putClient(clientData: PostClient, id: number): Observable<Client> {
    return this.http
      .put<ClientResponse>(`${this.apiUrl}/clients/${id}`, clientData)
      .pipe(
        map(
          ({ id, firstname, surname, email, phone, address, postcode }) =>
            new Client(id, firstname, surname, email, phone, address, postcode),
        ),
      );
  }
}
