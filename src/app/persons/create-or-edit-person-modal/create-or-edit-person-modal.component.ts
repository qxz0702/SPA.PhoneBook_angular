import { Component, OnInit, Injector, ViewChild, Output, EventEmitter, ElementRef } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { CreateOrUpdatePersonInput, PersonServiceProxy, PersonEditDto } from '@shared/service-proxies/service-proxies';
import { ModalDirective } from 'ngx-bootstrap';

@Component({
  selector: 'app-create-or-edit-person-modal',
  templateUrl: './create-or-edit-person-modal.component.html',
  styleUrls: ['./create-or-edit-person-modal.component.css']
})
export class CreateOrEditPersonModalComponent extends AppComponentBase {
  @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('modalContent',{static:true}) modalContent: ElementRef;

  @ViewChild('createOrEditModal',{static:true}) modal: ModalDirective;


  person: PersonEditDto = new PersonEditDto();


  active = false;
  saving = false;






  constructor(

    injector: Injector,
    private _personService: PersonServiceProxy


  ) {
    super(injector)
  }



  onShown(): void {
    $.AdminBSB.input.activate($(this.modalContent.nativeElement))
  }






  /**
   * 弹出模态框信息
   *
   * @param {number} [personId]
   * @memberof CreateOrEditPersonModalComponent
   */
  show(personId?: number): void {

    this.active = true;
    this._personService.getForEdit(personId).subscribe(personResult => {

      this.person = personResult.person;
      this.modal.show();
    })

  }


  /**
   * 处理联系人信息的编辑和添加
   *
   * @memberof CreateOrEditPersonModalComponent
   */
  save(): void {
    const input = new CreateOrUpdatePersonInput();

    input.person = this.person;
    this.saving = true;
    this._personService.createOrUpdate(input).subscribe(

      () => {
        this.notify.info(this.l('SavedSuccessfully'));
        this.close();
        this.modalSave.emit(null);
      }
    );



  }

  /**
   * 关闭模态框
   *
   * @memberof CreateOrEditPersonModalComponent
   */
  close(): void {


    this.active = false;
    this.modal.hide();
  }

}
