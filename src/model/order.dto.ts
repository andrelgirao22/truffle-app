import { AccountDTO } from './account.dto';
import { OrderItemDTO } from "./order.item.dto";
import { PaymentDTO } from "./payment.dto";

export interface OrderDTO {

    orderItens: OrderItemDTO[]
    payments: PaymentDTO[]
    orderValue:number
    account: AccountDTO

}