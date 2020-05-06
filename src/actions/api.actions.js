import {allConstants} from '../constants';
import {showToast} from '../components/utility';
import {AsyncStorage} from 'react-native';
import {ToastAndroid} from 'react-native';
// TODO: shoul uninstall react-native-cookies
import axios from 'axios';
const sha256 = require('sha256');
import NavigationService from '../../src/routers/NavigationService';

export const apiActions = {
  login,
  loadMobilePerson,
  loadAppContactInfo,
  loadMobileAddress,
  loadAppSetting,
  editMobile,
  editEmail,
  loadBasicList,
  editPassword,
  addTravelCost,
  loadStudentGroup,
  saveAttendance,
  loadMonthAttendance,
  forgotPassword,
  loadStudentInfo,
 
 
};

let url = 'http://192.168.1.46:3100/';
// let url = 'http://192.168.1.64:3100/';
// let url = 'http://94.101.128.11:3100/';
// export function loadlogin() {
//   return dispatch => {
//     return axios.post(global.url + 'api/user/login', {
//       username: username,
//       password: sha256(password),
//       type: type,
//     });
//   };
// }

function login(username, password, type) {
  return dispatch => {
    dispatch(request());
    axios
      .post(
        global.url + 'api/user/login',
        {
          username: username,
          password: sha256(password),
          type: type,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      .then(user => {
        if (user.data.msg === 'success') {
          // console.warn(user.data);
          try {
            AsyncStorage.setItem('@token', user.data.data.token);
            AsyncStorage.setItem('@type', user.data.data.type);
            AsyncStorage.setItem(
              '@userId',
              JSON.stringify(user.data.data.userId),
            );
            AsyncStorage.setItem('@username', user.data.data.username);
            AsyncStorage.setItem('@name', user.data.data.name);
            // showToast('Login success.');
          } catch (error) {
            console.log('Error saving data' + error);
          }
          dispatch(success(user));
          dispatch(NavigationService.navigate('Home'));

          // Toast.show({
          //   text: user.data.msg,
          //   buttonText: 'Okay',
          //   type: 'success',
          // });
          return;
        }
        if (user.data.msg === 'fail') {
          console.log(user.data);
          showToast('Invalid username or password');

          // Toast.show({
          //   text: user.data.msg,
          //   buttonText: 'Okay',
          //   type: 'danger',
          // });
          return;
        }
      })
      .catch(error => {
        console.log(error);
      });

    function request(user) {
      return {type: allConstants.LOGIN_REQUEST, user};
    }
    function success(user) {
      return {type: allConstants.LOGIN_SUCCESS, user};
    }
    function failure(error) {
      return {type: allConstants.LOGIN_FAILURE, error};
    }
  };
}

function loadMobilePerson() {
  return async dispatch => {
    dispatch(request());
    axios
      .get(global.url + 'api/school/loadMobilePerson', {
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': await AsyncStorage.getItem('@token'),
        },
      })
      .then(res => {
        console.log(res.data.data);
        if (res.data.msg === 'success') {
          dispatch({
            type: allConstants.LOAD_Mobile_PERSON,
            data: res.data.data,
          });
          return;
        }
        if (res.data.msg === 'fail') {
          console.log(res.data);
          return;
        }
      })
      .catch(error => {
        console.log(error);
      });

    function request(res) {
      return {type: allConstants.LOAD_Mobile_PERSON, res};
    }
  };
}

function loadAppContactInfo() {
  return async dispatch => {
    dispatch(request());
    axios
      .get(global.url + 'api/school/loadAppContactInfo', {
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': await AsyncStorage.getItem('@token'),
        },
      })
      .then(res => {
        console.log(res.data.data);
        if (res.data.msg === 'success') {
          dispatch({
            type: allConstants.LOAD_CONTACT_INFO,
            data: res.data.data,
          });
          return;
        }
        if (res.data.msg === 'fail') {
          return;
        }
      })
      .catch(error => {
        console.log(error);
      });

    function request(res) {
      return {type: allConstants.LOAD_CONTACT_INFO, res};
    }
  };
}

function loadMobileAddress() {
  return async dispatch => {
    dispatch(request());
    axios
      .get(global.url + 'api/school/loadMobileAddress', {
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': await AsyncStorage.getItem('@token'),
        },
      })
      .then(res => {
        console.log(res.data.data);
        if (res.data.msg === 'success') {
          dispatch({
            type: allConstants.LOAD_MOBILE_ADDRESS,
            data: res.data.data,
          });
          return;
        }
        if (res.data.msg === 'fail') {
          console.log(res.data);
          alert('fail');
          return;
        }
      })
      .catch(error => {
        console.log(error);
      });

    function request(res) {
      return {type: allConstants.LOAD_MOBILE_ADDRESS, res};
    }
  };
}

function loadAppSetting() {
  return async dispatch => {
    dispatch(request());
    axios
      .get(global.url + 'api/school/loadAppSetting', {
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': await AsyncStorage.getItem('@token'),
        },
      })
      .then(res => {
        if (res.data.msg === 'success') {
          dispatch({
            type: allConstants.LOAD_APP_SETTING,
            data: res.data.data,
          });
          return;
        }
        if (res.data.msg === 'fail') {
          console.log(res.data);
          return;
        }
      })
      .catch(error => {
        console.log(error);
      });

    function request(res) {
      return {type: allConstants.LOAD_APP_SETTING, res};
    }
  };
}

function editEmail(email) {
  // console.warn("+++++++test in edit emain function")
  return async dispatch => {
    dispatch(request());
    axios
      .post(
        global.url + 'api/student/editEmail',
        {
          email: email,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'x-access-token': await AsyncStorage.getItem('@token'),
          },
        },
      )
      .then(res => {
        // console.warn('success', res.data.data);
        if (res.data.msg === 'success') {
          dispatch({
            type: allConstants.EDIT_EMAIL,
            data: res.data.data,
          });
          ToastAndroid.show(
            'youre email has been changed sucessfully',
            ToastAndroid.SHORT,
          );

          dispatch(NavigationService.navigate('ProfileSetting'));
          return;
        }
        if (res.data.msg === 'fail') {
          console.warn('fail', res.data);
          return;
        }
      })
      .catch(error => {
        // console.warn('error1', error);
      });

    function request(res) {
      return {type: allConstants.EDIT_EMAIL, res};
    }
  };
}

function editMobile(mobile) {
  return async dispatch => {
    
    (request());
    axios
      .post(
        global.url + 'api/student/editMobile',
        {
          mobile: mobile,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'x-access-token': await AsyncStorage.getItem('@token'),
          },
        },
      )
      .then(res => {
        if (res.data.msg === 'success') {
          dispatch({
            type: allConstants.EDIT_MOBILE,
            data: res.data.data,
          });
          ToastAndroid.show(
            'youre phone number has been changed sucessfully',
            ToastAndroid.SHORT,
          );
          dispatch(NavigationService.navigate('ProfileSetting'));
          return;
        }
        if (res.data.msg === 'fail') {
          // console.warn('fail', res.data);
          return;
        }
      })
      .catch(error => {
        // console.warn('error3', error);
      });

    function request(res) {
      return {type: allConstants.EDIT_MOBILE, res};
    }
  };
}

function loadBasicList(id) {
  return async dispatch => {
    dispatch(request());
    axios
      .post(
        global.url + 'api/admin/loadBasicList',
        {
          id: id,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'x-access-token': await AsyncStorage.getItem('@token'),
          },
        },
      )
      .then(res => {
        if (res.data.msg === 'success') {
          dispatch({
            type: allConstants.LOAD_BASIC_LIST,
            data: res.data.data,
          });
          return;
        }
      })
      .catch(error => {
        console.log(error);
      });

    function request(res) {
      return {type: allConstants.LOAD_BASIC_LIST, res};
    }
  };
}

function loadStudentGroup(studentId) {
  return async dispatch => {
    dispatch(request());
    axios
      .post(
        global.url + 'api/student/loadStudentGroup',
        {
          studentId: studentId,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'x-access-token': await AsyncStorage.getItem('@token'),
          },
        },
      )
      .then(res => {
        if (res.data.msg === 'success') {
          dispatch({
            type: allConstants.LOAD_STUDENT_GROUP,
            data: res.data.data,
          });
          return;
        }
      })
      .catch(error => {
        console.log(error);
      });

    function request(res) {
      return {type: allConstants.LOAD_STUDENT_GROUP, res};
    }
  };
}

function editPassword(password, password2) {
  return async dispatch => {
    dispatch(request());
    axios
      .post(
        global.url + 'api/student/editPassword',
        {
          password: sha256(password),
          password2: password2,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'x-access-token': await AsyncStorage.getItem('@token'),
          },
        },
      )
      .then(async res => {
        if (res.data.msg === 'success') {
          dispatch({
            type: allConstants.EDIT_PASSWORD,
            data: res.data.data,
          });
          ToastAndroid.show(
            'youre password has been changed sucessfully',
            ToastAndroid.SHORT,
          );
          await AsyncStorage.removeItem('@token');
          dispatch(NavigationService.navigate('SignIn'));
          return;
        }
      })
      .catch(error => {
        console.log(error);
      });

    function request(res) {
      return {type: allConstants.EDIT_PASSWORD, res};
    }
  };
}

function addTravelCost(
  id,
  costTypeId,
  date,
  costFile,
  costFileName,
  studentId,
) {
  return async dispatch => {
    dispatch(request());
    axios
      .post(
        global.url + 'api/student/addTravelCost',
        {
          id: id,
          costTypeId: costTypeId,
          date: date,
          costFile: costFile,
          costFileName: costFileName,
          studentId: studentId,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'x-access-token': await AsyncStorage.getItem('@token'),
          },
        },
      )
      .then(res => {
        // console.warn('result', res);
        if (res.data.msg === 'success') {
          dispatch({
            type: allConstants.ADD_TRAVEL_COST,
            data: res.data.data,
          });
          showToast('Travel cost add successful');
          dispatch(NavigationService.navigate('TravelsCostSetting'));
          return;
        }
      })
      .catch(error => {
        // console.warn('error2', error);
      });

    function request(res) {
      return {type: allConstants.ADD_TRAVEL_COST, res};
    }
  };
}

function saveAttendance(id, isPresent, isLate) {
  return async dispatch => {
    dispatch(request());
    axios
      .post(
        global.url + 'api/student/saveAttendance',
        {
          id: id,
          isPresent: isPresent,
          isLate: isLate,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'x-access-token': await AsyncStorage.getItem('@token'),
          },
        },
      )
      .then(res => {
        console.log(res);
        if (res.data.msg === 'success') {
          dispatch({
            type: allConstants.SAVE_ATTENDANCE,
            data: res.data.data,
          });
          dispatch(NavigationService.navigate('Presence'));
          return;
        }
      })
      .catch(error => {
        console.log(error);
      });

    function request(res) {
      return {type: allConstants.SAVE_ATTENDANCE, res};
    }
  };
}

function loadMonthAttendance(groupId, userId, monthId) {
  return async dispatch => {
    dispatch(request());
    axios
      .post(
        global.url + 'api/student/loadMonthAttendance',
        {
          groupId: groupId,
          userId: userId,
          monthId: monthId,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'x-access-token': await AsyncStorage.getItem('@token'),
          },
        },
      )
      .then(res => {
        // console.warn('responseeee', res);
        if (res.data.msg === 'success') {
          dispatch({
            type: allConstants.LOAD_MONTH_ATTENDANCE,
            data: res.data.data,
          });
          // dispatch(NavigationService.navigate('Presence'));
          return;
        }
      })
      .catch(error => {
        console.log(error);
      });

    function request(res) {
      return {type: allConstants.LOAD_MONTH_ATTENDANCE, res};
    }
  };
}

function forgotPassword(BSNNumber) {
  return async dispatch => {
    dispatch(request());
    axios
      .post(
        global.url + 'api/student/forgotPassword',
        {
          BSNNumber: BSNNumber,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            // 'x-access-token': await AsyncStorage.getItem('@token'),
          },
        },
      )
      .then(res => {
        // console.warn('resulttt', res.data.data[0]);
        if (res.data.msg === 'success') {
          dispatch({
            type: allConstants.FORGOT_PASSWORD,
            data: res.data.data,
          });
          return;
        }
      })
      .catch(error => {
        // console.warn('error5', error);
      });

    function request(res) {
      return {type: allConstants.FORGOT_PASSWORD, res};
    }
  };
}

function loadStudentInfo() {
  // console.warn("++++++++++++++++++++++++++++++++++++++++++++++notificationdata in redux test****************")
  return async dispatch => {
    dispatch(request());
    axios
      .get(global.url + 'api/student/loadInfo', {
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': await AsyncStorage.getItem('@token'),
        },
      })
      .then(res => {
        console.log(res, '===>res when call twice for component');
        if (res.data.msg === 'success') {
          dispatch({
            type: allConstants.LOAD_STUDENT_INFO,
            data: res.data.data[0],
          });
          return;
        }
        if (res.data.msg === 'fail') {
          // console.warn('fail', res.data);
          return;
        }
      })
      .catch(error => {
        // console.warn('error', error);
      });

    function request(res) {
      return {type: allConstants.LOAD_STUDENT_INFO, res};
    }
  };
}



    


