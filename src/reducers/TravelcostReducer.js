export function  GroupStudent (state=[],action){
    // console.warn("************************!!!!!!!!!!!!!!!!!!",action)
    switch(action.type){
        
       case 'STUDENT_GROUP':        
          return action.payload
      default:
       return state
    }
  
  }
