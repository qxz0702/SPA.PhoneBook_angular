import { Component, OnInit, Injector } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { PersonServiceProxy, PersonEditDto, CreateOrUpdatePersonInput } from '@shared/service-proxies/service-proxies';
import { MatDialogRef } from '@angular/material';
import * as _ from 'lodash';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-create-person-dialog',
  templateUrl: './create-person-dialog.component.html',
  styleUrls: ['./create-person-dialog.component.css']
})
export class CreatePersonDialogComponent extends AppComponentBase implements OnInit {
  person:PersonEditDto = new PersonEditDto();
  saving = false;

  constructor(
    injector: Injector,
    private _personService: PersonServiceProxy,
    private _dialogRef: MatDialogRef<CreatePersonDialogComponent>
  ) {
    super(injector);
   }

  ngOnInit() {
  }

  save(): void{
    this.saving = true;
    const input = new CreateOrUpdatePersonInput();
    input.person = this.person;

    this._personService
      .createOrUpdate(input)
      .pipe(
        finalize(() => {
          this.saving = false;
        })
      )
      .subscribe(() => {
        this.notify.info(this.l('SavedSuccessfully'));
        this.close(true);
      });
  }

  close(result: any): void {
    this._dialogRef.close(result);
  }
}
