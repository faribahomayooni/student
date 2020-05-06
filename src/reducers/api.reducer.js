import {allConstants} from '../constants';
import {combineReducers} from 'redux'
import AsyncStorage from '@react-native-community/async-storage';
import { act } from 'react-test-renderer';
import { State } from 'react-native-gesture-handler';
import { connectAdvanced } from 'react-redux';

const initialState = [
  {
    mobilePerson: '',
    contactInfo: '',
    mobileAddress: '',
    loadSetting: '',
    editMobile: '',
    editEmail: '',
    loadBasic: '',
    editPassword: '',
    addTravelCost: '',
    loadStudentGroup: '',
    saveAttendance: '',
    loadMonthAttendance: '',
    forgotPass: '',
    studentInfo: '',
    // notificationfirebae:"",
  },
];

export function api(state = initialState, action) {
  switch (action.type) {
    case allConstants.LOGIN_REQUEST:
      return {
        logIn: true,
        user: action.user,
      };
    case allConstants.LOGIN_SUCCESS:
      return {
        logIn: true,
        user: action.user,
      };
    case allConstants.LOGIN_FAILURE:
      return {
        logIn: false,
        error: action.error,
      };
    case allConstants.LOAD_Mobile_PERSON:
      return {
        ...state,
        mobilePerson: action.data,
      };
    case allConstants.LOAD_CONTACT_INFO:
      return {
        ...state,
        contactInfo: action.data,
      };
    case allConstants.LOAD_MOBILE_ADDRESS:
      return {
        ...state,
        mobileAddress: action.data,
      };
    case allConstants.LOAD_APP_SETTING:
      return {
        ...state,
        loadSetting: action.data,
      };
    case allConstants.EDIT_EMAIL:
      return {
        ...state,
        editEmail: action.data,
        // studentInfo: {...state.studentInfo.push({FLD_EMAIL: action.data})},
      };
    case allConstants.EDIT_MOBILE:
      return {
        ...state,
        editMobile: action.data,
        // studentInfo: {...state.studentInfo, FLD_PHONE_NUMBER1: action.data},
      };
    case allConstants.LOAD_BASIC_LIST:
      return {
        ...state,
        loadBasic: action.data,
      };
    case allConstants.EDIT_PASSWORD:
      return {
        ...state,
        editPassword: action.data,
        studentInfo: {...state.studentInfo, FLD_PASSWORD: action.data},
      };
    case allConstants.ADD_TRAVEL_COST:
      return {
        ...state,
        addTravelCost: action.data,
      };
    case allConstants.LOAD_STUDENT_GROUP:
      return {
        ...state,
        loadStudentGroup: action.data,
      };
    case allConstants.SAVE_ATTENDANCE:
      return {
        ...state,
        saveAttendance: action.data,
      };
    case allConstants.LOAD_MONTH_ATTENDANCE:
      return {
        ...state,
        loadMonthAttendance: action.data,
      };
    case allConstants.FORGOT_PASSWORD:
      return {
        ...state,
        forgotPass: action.data,
      };
    case allConstants.LOAD_STUDENT_INFO:
      return {
        studentInfo: action.data,
      };
      // case 'notification_data':
      //   return{ notificationfirebae: [...state,action.data]}
      case 'TOGGLE_TODO':
    default:
      return state;
  }
}
//  export function  notification (state=[],action){
//    console.warn("HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH,",action)
//    switch(action.type){
//       case allConstants.notification_data:
//        return {
//          ...state,
//          notificationdata:action.payload}
//      default:
//       return state
//    }
 
//  }
 