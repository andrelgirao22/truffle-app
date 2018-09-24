import { AddressDTO } from './address.dto';

export interface AccountDTO {
	
	id: string
	name: string
    email: string
	password:string
	register:string
	imageUrl?: string
	address: AddressDTO
}