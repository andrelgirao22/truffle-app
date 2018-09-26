import { ItemDTO } from './item.dto';
export interface OrderItemDTO {
    
    item: ItemDTO
    quantity: number
    value: number
    
}