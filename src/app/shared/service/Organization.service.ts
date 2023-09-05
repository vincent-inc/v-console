import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Organization } from '../model/Organization.model';
import { HttpClient } from '@angular/common/http';
import { SettingService } from './Setting.service';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {

  private prefix = "saturday"
  selectedOrganizationId?: string;

  constructor(
    private httpClient: HttpClient,
    private settingService: SettingService
    ) { }

  public getOrganizations(): Observable<Organization[]> {
    return this.httpClient.get<Organization[]>(`${this.settingService.getGatewayUrl()}/${this.prefix}/organizations`);
  }

  public getOrganization(id: string): Observable<Organization> {
    return this.httpClient.get<Organization>(`${this.settingService.getGatewayUrl()}/${this.prefix}/organizations/${id}`);
  }

  public postOrganization(organization: Organization): Observable<Organization> {
    return this.httpClient.post<Organization>(`${this.settingService.getGatewayUrl()}/${this.prefix}/organizations`, organization);
  }

  public putOrganization(organization: Organization): Observable<Organization> {
    return this.httpClient.put<Organization>(`${this.settingService.getGatewayUrl()}/${this.prefix}/organizations/${organization.id}`, organization);
  }

  public patchOrganization(organization: Organization): Observable<Organization> {
    return this.httpClient.patch<Organization>(`${this.settingService.getGatewayUrl()}/${this.prefix}/organizations/${organization.id}`, organization);
  }

  public deleteOrganization(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.settingService.getGatewayUrl()}/${this.prefix}/organizations/${id}`);
  }

}
