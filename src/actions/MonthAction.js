import { allConstants } from '../constants';


export function getMonthData (data){

    return {type: allConstants.Month_Data, payload:data};

}

