import { AccountDTO } from './account.dto';
export interface LocalUser {
    token: string
    account: AccountDTO
    email: string
}