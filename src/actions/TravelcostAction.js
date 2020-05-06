import { allConstants } from '../constants';

export function getGroupStudent (data){
    return {type:allConstants.STUDENT_GROUP,payload:data};
}