import { allConstants } from '../constants';


export function getnotification (data){

    return {type: allConstants.notification_data, payload:data};

}

export function getIcondata (data){

    return {type:allConstants.Icon_data,payload:data}
}