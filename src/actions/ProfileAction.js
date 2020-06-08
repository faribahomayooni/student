import { allConstants } from '../constants';


export function getprofileInfo (data){

    return {type:allConstants.student_Data, payload:data};

}

export function removeprofile (data){

    return {type:allConstants.student_remove, payload:data};

}

export function LogOut(data){

    return {type:allConstants.LOG_OUT, payload:data};

}

export function TypeSignIn(data){

    return {type:allConstants.Type_SignIn, payload:data};

}