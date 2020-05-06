import { allConstants } from '../constants';


export function getMessageData (data){

    return {type: allConstants.Message_data, payload:data};

}

