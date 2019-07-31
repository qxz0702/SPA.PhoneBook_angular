import { Component, OnInit, Injector } from '@angular/core';
import { PagedListingComponentBase } from '@shared/paged-listing-component-base';
import { PersonListDto, PersonServiceProxy } from '@shared/service-proxies/service-proxies';

@Component({
  selector: 'app-persons',
  templateUrl: './persons.component.html',
  styleUrls: ['./persons.component.css']
})
export class PersonsComponent extends PagedListingComponentBase<PersonListDto> {
  filter='';
  people:PersonListDto[]=[];
  constructor(
    injector:Injector,
    private _personService:PersonServiceProxy
  ) { 
    super(injector);
  }
  protected list(request: import("../../shared/paged-listing-component-base").PagedRequestDto, pageNumber: number, finishedCallback: Function): void {
    this._personService.getPaged(this.filter,'Id',request.maxResultCount,request.skipCount).subscribe(res=>{
      this.people=res.items;
      this.showPaging(res,pageNumber);
    });
  }
  protected delete(entity: PersonListDto): void {
    throw new Error("Method not implemented.");
  }
}
