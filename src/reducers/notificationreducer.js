export function  notification (state=[],action){
  // console.warn("oooooooooooooooooooooOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOoooo",action)
    switch(action.type){
       case 'notification_data':
        
          return [
            Object.assign({}, action.payload), ...state
           
          ];
      default:
       return state
    }
  
  }

  export function  Icons (state={},action){
      switch(action.type){
         case 'Icon_data':        
            return action.payload
        default:
         return state
      }
    
    }
 