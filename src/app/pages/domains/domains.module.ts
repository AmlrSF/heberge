import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DomainsRoutingModule } from './domains-routing.module';
import { ListDomainsComponent } from './list-domains/list-domains.component';
import { AddDomainComponent } from './add-domain/add-domain.component';
import { DomainDetailComponent } from './domain-detail/domain-detail.component';

@NgModule({
  declarations: [
    ListDomainsComponent,
    AddDomainComponent,
    DomainDetailComponent
  ],
  imports: [
    CommonModule,
    DomainsRoutingModule
  ]
})
export class DomainsModule { }
