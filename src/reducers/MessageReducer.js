export function  Message (state=[],action){
   // console.warn("@@@@@@@@@@@@@@",action.type)
    switch(action.type){
       case 'Message_data':        
          return [...state,...action.payload]
      default:
       return state
    }
  
  }

  export function  reset (state=[],action){
   //  console.warn("@@@@@@@@@@@@@@",action.type)
   switch(action.type){
      case 'Message_data':        
         return [...state,...action.payload]
     default:
      return state
   }
 
 }