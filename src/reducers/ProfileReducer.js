
  export function  Profile (state={},action){
    switch(action.type){
       case 'student_Data':        
          return action.payload
          case 'student_remove':        
          return ""
      default:
       return state
    }
  
  }

  export function  TypeSign (state="",action){
    switch(action.type){
       case 'Type_SignIn':        
          return action.payload
      default:
       return state
    }
  
  }

//   export function  Profile (state="",action){
//     switch(action.type){
//        case 'student_remove':        
//           return ""
//       default:
//        return state
//     }
  
//   }



//   export function  LogOut (state="",action){
//     switch(action.type){
//        case 'LOG_OUT':        
//           return action.payload==true && state
//       default:
//        return state
//     }
  
//   }

  