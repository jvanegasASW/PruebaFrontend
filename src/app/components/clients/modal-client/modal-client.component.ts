import { Component, EventEmitter, Output } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ClientDto } from 'src/app/models/client-dto';

@Component({
  selector: 'app-modal-client',
  templateUrl: './modal-client.component.html',
  styleUrls: ['./modal-client.component.css']
})
export class ModalClientComponent {

  client:ClientDto = new ClientDto("","","","","");
  errmsj:string = "";
  @Output() propagar = new EventEmitter<ClientDto>();
	constructor(private modalService: NgbModal) {}

	open(content:any) {
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
			(result) => {
        this.client = new ClientDto("","","","","");
        this.errmsj = "";
			},
			(reason) => {
        this.client = new ClientDto("","","","","");
        this.errmsj = "";
			},
		);
	}

	private getDismissReason(reason: any): string {
		if (reason === ModalDismissReasons.ESC) {
			return 'by pressing ESC';
		} else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
			return 'by clicking on a backdrop';
		} else {
			return `with: ${reason}`;
		}
	}

  create(modal:any){
    
    if(this.client.name != "" && this.client.email != "" && this.client.phone != ""){
      this.propagar.emit(this.client);
      modal.close('');
    } else {
      this.errmsj = "Please enter all the fields";
    }
  }

}
