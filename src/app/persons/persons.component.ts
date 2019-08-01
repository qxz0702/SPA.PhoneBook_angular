import { Component, OnInit, Injector, ViewChild } from '@angular/core';
import { PagedListingComponentBase } from '@shared/paged-listing-component-base';
import { PersonListDto, PersonServiceProxy } from '@shared/service-proxies/service-proxies';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { CreateOrEditPersonModalComponent } from './create-or-edit-person-modal/create-or-edit-person-modal.component';
import { MatDialog } from '@angular/material';
import { CreatePersonDialogComponent } from './create-person-dialog/create-person-dialog.component';
import { EditPersonDialogComponent } from './edit-person-dialog/edit-person-dialog.component';

@Component({
  selector: 'app-persons',
  templateUrl: './persons.component.html',
  styleUrls: ['./persons.component.css'],
  animations: [appModuleAnimation()],
})
export class PersonsComponent extends PagedListingComponentBase<PersonListDto> {
  @ViewChild('createOrEditPersonModal',{static:true}) CreateOrEditPersonModal: CreateOrEditPersonModalComponent;
  filter='';
  people:PersonListDto[]=[];
  constructor(
    injector:Injector,
    private _personService:PersonServiceProxy,
    private _dialog: MatDialog
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

  /**
   * 添加联系人
   *
   * @memberof PersonsComponent
   */
  createPerson(): void {
    this.showCreateOrEditPersonDialog();
  }

  showCreateOrEditPersonDialog(id?: number): void {
    let createOrEditPersonDialog;
    if (id === undefined || id <= 0) {
        createOrEditPersonDialog = this._dialog.open(CreatePersonDialogComponent);
    } else {
        createOrEditPersonDialog = this._dialog.open(EditPersonDialogComponent, {
            data: id
        });
    }

    createOrEditPersonDialog.afterClosed().subscribe(result => {
        if (result) {
            this.refresh();
        }
    });
}
}
