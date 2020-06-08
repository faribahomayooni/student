import {combineReducers} from 'redux';

import {api} from './api.reducer';
import {notification,Icons} from './notificationreducer'
import {GroupStudent} from './TravelcostReducer'
import {Profile,TypeSign} from './ProfileReducer'
import {Message} from './MessageReducer'
import { loadMonth } from './CalendarReducer';


const rootReducer = combineReducers({
  api,notification,Icons,GroupStudent,Profile,Message,loadMonth,TypeSign

});

export default rootReducer;
