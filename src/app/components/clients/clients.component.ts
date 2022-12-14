import { Component, OnInit } from '@angular/core';
import { ClientDto } from 'src/app/models/client-dto';
import { ClientServiceService } from 'src/app/service/client-service.service';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  listaClients:ClientDto[] = [];
  sharedKey:string = "";
  errmsj:string = "";
  colormsj:string = "";
  constructor(private clientService:ClientServiceService) { }

  ngOnInit(): void {
    this.findAll();
  }

  search(){
    if(this.sharedKey != ""){
      this.clientService.findbySharedKey(this.sharedKey).subscribe(client => {
        this.errmsj="";
        this.listaClients = [];
        this.listaClients.push(client);
      }, err => {
        this.colormsj = "red";
        this.errmsj = "Client not found"
        this.listaClients = [];
      })
    } else {
      this.colormsj = "red";
      this.errmsj = "Please enter the shared key"
    }
  }

  create(newClient:ClientDto){
    this.clientService.create(newClient).subscribe(client =>{
      this.colormsj = "green";
      this.errmsj = `Client ${client.name} created successfully`;
      this.findAll();
    }, err =>{
      this.colormsj = "red";
      this.errmsj = "The client you entered already exists";
    })
  }

  export(){
    this.clientService.export(this.listaClients).subscribe((buffer) => {
      const data: Blob = new Blob([buffer], {
        type: "text/csv;charset=utf-8"
      });
      saveAs(data, "clients.csv");
      console.log(data);
    })

  }

  findAll(){
    this.clientService.findAll().subscribe(clientes => {
      this.listaClients = clientes;
    });
  }

}
