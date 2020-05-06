import {combineReducers} from 'redux';

import {api} from './api.reducer';
import {notification,Icons} from './notificationreducer'
import {GroupStudent} from './TravelcostReducer'
import {Profile} from './ProfileReducer'
import {Message} from './MessageReducer'


const rootReducer = combineReducers({
  api,notification,Icons,GroupStudent,Profile,Message

});

export default rootReducer;
