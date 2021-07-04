import Item1 from '../../images/item1.jpeg'
import Item2 from '../../images/item2.jpeg'
import Item3 from '../../images/item3.jpg'
import Item4 from '../../images/item4.jpg'
import Item5 from '../../images/item5.jpg'
import Item6 from '../../images/item6.jpg'
import Item7 from '../../images/item7.jpg'
import Item8 from '../../images/item8.jpg'
import Item9 from '../../images/item9.jpg'
import Item10 from '../../images/item10.jpg'
import Item11 from '../../images/item11.jpg'
import Item12 from '../../images/item12.jpg'
import Item13 from '../../images/item13.jpg'
import Item14 from '../../images/item14.jpg'
import Item15 from '../../images/item15.png'
import Item16 from '../../images/item16.jpg'
import Item17 from '../../images/item17.png'
import Item18 from '../../images/item18.jpg'

import { ADD_TO_CART,REMOVE_ITEM,SUB_QUANTITY,ADD_QUANTITY,ADD_SHIPPING } from '../actions/action-types/cart-actions'


const initState = {
    items: [
        {id:1, desc: "Captures your moments", price:6000,img:Item1},
        {id:2, desc: "Time is precious", price:1500,img: Item2},
        {id:3, desc: "Hear music, Enjoy music",price:2000,img: Item3},
        {id:4,desc: "Technology and you", price:50000,img:Item4},
        {id:5, desc: "The mobile you always desired.", price:9000,img: Item5},
        {id:6, desc: "The best appliances for your home",price:50000,img: Item6},
        {id:7, desc: "Add More Life to Your Car.", price:3000,img:Item7},
        {id:8, desc: "Learning, Fun together", price:800,img:Item8},
        {id:9, desc: "A wide range of accessories", price:900,img:Item9},
        {id:10, desc: "Fresh Chocolate, Fresh Friendship.", price:400,img:Item10},
        {id:11, desc: "It's all sugar honey!", price:250,img:Item11},
        {id:12, desc: "Your Honey's Here!", price:100,img:Item12},
        {id:13, desc: "Pride and Passion meets Success.", price:500,img:Item13},
        {id:14, desc: "A library of badminton skills.", price:450,img:Item14},
        {id:15, desc: "Believe in basketball.", price:550,img:Item15},
        {id:16, desc: "Take a look. Read a book!", price:300,img:Item16},
        {id:17, desc: "Have intimate sessions with yourself", price:2000,img:Item17},
        {id:18, desc: "Simply the best in beauty.", price:600,img:Item18}
    ],
    addedItems:[],
    total: 0

}
const cartReducer= (state = initState,action)=>{
   
    //INSIDE HOME COMPONENT
    if(action.type === ADD_TO_CART){
          let addedItem = state.items.find(item=> item.id === action.id)
          //check if the action id exists in the addedItems
         let existed_item= state.addedItems.find(item=> action.id === item.id)
         if(existed_item)
         {
            addedItem.quantity += 1 
             return{
                ...state,
                 total: state.total + addedItem.price 
                  }
        }
         else{
            addedItem.quantity = 1;
            //calculating the total
            let newTotal = state.total + addedItem.price 
            
            return{
                ...state,
                addedItems: [...state.addedItems, addedItem],
                total : newTotal
            }
            
        }
    }
    if(action.type === REMOVE_ITEM){
        let itemToRemove= state.addedItems.find(item=> action.id === item.id)
        let new_items = state.addedItems.filter(item=> action.id !== item.id)
        
        //calculating the total
        let newTotal = state.total - (itemToRemove.price * itemToRemove.quantity )
        console.log(itemToRemove)
        return{
            ...state,
            addedItems: new_items,
            total: newTotal
        }
    }
    //INSIDE CART COMPONENT
    if(action.type=== ADD_QUANTITY){
        let addedItem = state.items.find(item=> item.id === action.id)
          addedItem.quantity += 1 
          let newTotal = state.total + addedItem.price
          return{
              ...state,
              total: newTotal
          }
    }
    if(action.type=== SUB_QUANTITY){  
        let addedItem = state.items.find(item=> item.id === action.id) 
        //if the qt == 0 then it should be removed
        if(addedItem.quantity === 1){
            let new_items = state.addedItems.filter(item=>item.id !== action.id)
            let newTotal = state.total - addedItem.price
            return{
                ...state,
                addedItems: new_items,
                total: newTotal
            }
        }
        else {
            addedItem.quantity -= 1
            let newTotal = state.total - addedItem.price
            return{
                ...state,
                total: newTotal
            }
        }
        
    }

    if(action.type=== ADD_SHIPPING){
          return{
              ...state,
              total: state.total + 6
          }
    }

    if(action.type=== 'SUB_SHIPPING'){
        return{
            ...state,
            total: state.total - 6
        }
  }
    
  else{
    return state
    }
    
}

export default cartReducer
