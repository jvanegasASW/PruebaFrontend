export class ClientDto {

    name:string;
	sharedKey:string;
	email:string;
	phone:string;
	creationDate:string;

    constructor(name:string, sharedKey:string, email:string, phone:string, creationDate:string) {
        this.name = name;
        this.sharedKey = sharedKey;
        this.email = email;
        this.phone = phone;
        this.creationDate = creationDate;
    }

}
