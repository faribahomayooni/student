/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {commonStyle as cs} from '../../styles/common/styles';
import SettingItem from '../../components/SettingItem';
import {apiActions} from '../../actions';
import AsyncStorage from '@react-native-community/async-storage';
import {removeNotification} from '../../actions/notificationAction'
import axios from 'axios';
// import {LogOut} from '../../actions/ProfileAction'
import Form from '../../../native-base-theme/components/Form';
import {removeprofile} from '../../actions/ProfileAction'
import NavigationService from '../../routers/NavigationService';
import { StackActions, NavigationActions } from 'react-navigation';
import SplashScreen from 'react-native-splash-screen';

class ProfileSetting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mobile: this.props.navigation.getParam('mobile'),
      email: this.props.navigation.getParam('email'),
      firstname: this.props.navigation.getParam('firstname'),
      lastname: this.props.navigation.getParam('lastname'),
      password: this.props.navigation.getParam('password'),
      mobilePerson:[],
      address:[],
      setting:[],
      basicList:[]
      
    };
    // const {dispatch} = this.props;
    // dispatch(apiActions.loadStudentInfo());
  }

  componentDidMount() {
     this.props.removeNotification()
    console.warn("!!!!!!!!!!",NavigationActions)
    this.loadMobilePerson()
    this.loadAppContactInfo()
    this.loadMobileAddress()
    this.loadAppSetting()
    this.loadBasicList(30)
    // window.scrollTo(0, 0);
    // const {dispatch} = this.props;
  //  this.props.dispatch(apiActions.loadMobilePerson());
    //  dispatch(apiActions.loadAppContactInfo());
    //  dispatch(apiActions.loadMobileAddress());
    //  dispatch(apiActions.loadAppSetting());
    //  dispatch(apiActions.loadBasicList(30));
  }


   loadAppSetting=async()=> {
      axios
        .get(global.url + 'api/school/loadAppSetting', {
          headers: {
            'Content-Type': 'application/json',
            'x-access-token': await AsyncStorage.getItem('@token'),
          },
        })
        .then(res => {
          if (res.data.msg === 'success') {
          this.setState({setting:res.data.data})
           
          }
          if (res.data.msg === 'fail') {
            console.log(res.data);
           
          }
        })
        .catch(error => {
          console.log(error);
        });
    
  }


   loadMobilePerson=async()=> {
      axios
        .get(global.url + 'api/school/loadMobilePerson', {
          headers: {
            'Content-Type': 'application/json',
            'x-access-token': await AsyncStorage.getItem('@token'),
          },
        })
        .then(res => {
          console.warn("*****this is mobile person*******",res.data.data);
          if (res.data.msg === 'success') {
        this.setState({mobilePerson:res.data.data})
         
          }
          if (res.data.msg === 'fail') {
            console.log(res.data);
            return;
          }
        })
        .catch(error => {
          console.log(error);
        });
  }

   loadAppContactInfo=async() =>{
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
            this.setState({AppContactInfo:res.data.data})
           
          }
          if (res.data.msg === 'fail') {
           
          }
        })
        .catch(error => {
          console.log(error);
        });
  
     
   
  }

   loadMobileAddress=async() =>{
 
     
      axios
        .get(global.url + 'api/school/loadMobileAddress', {
          headers: {
            'Content-Type': 'application/json',
            'x-access-token': await AsyncStorage.getItem('@token'),
          },
        })
        .then(res => {
          console.warn("++++++++++++++++++++++",res.data.data);
          if (res.data.msg === 'success') {
            this.setState({address:res.data.data})
            
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
  }


   loadBasicList =async(id)=> {
    
     
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
            this.setState({basicList:res.data})
         
            
          }
        })
        .catch(error => {
          console.log(error);
        });
  
      
  }
  // loadStudentInfo = async () => {
  //   axios
  //     .get(global.url + 'api/student/loadInfo', {
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'x-access-token': await AsyncStorage.getItem('@token'),
  //       },
  //     })
  //     .then(res => {
  //       this.setState({studentInfo: res.data});
  //       console.warn('===>res when call twice for component', res);
  //       if (res.data.msg === 'success') {
  //       }
  //       if (res.data.msg === 'fail') {
  //         // console.warn('fail', res.data);
  //         return;
  //       }
  //     })
  //     .catch(error => {
  //       // console.warn('error', error);
  //     });
  // };

  logout() {
    this.props.removeprofile()
    this.props.removeNotification()
    AsyncStorage.setItem('@token', '');
    AsyncStorage.setItem('@typeofsignin', '');
    this.props.navigation.navigate('SignIn');
    
  }

  static navigationOptions = {
    title: 'Instellingen',
    headerRight: () => (
      <TouchableOpacity
        style={{alignSelf: 'flex-end'}}
        onPress={() => {
          this.props.dispatch(apiActions.changeMode(true));
        }}>
        <Image
          style={{marginTop: -45, marginRight: 10, alignSelf: 'flex-end'}}
          source={require('./../../assets/images/student/setting/Image208.png')}
        />
      </TouchableOpacity>
    ),
  };
  render() {
    console.warn("@@@@&&&&& stackaction",StackActions)
    // const studentInfo = this.props.navigation.getParam('studentInfo');
    // console.warn('studentInfo', studentInfo);
    return (
      <ScrollView>
        <View
          style={
            this.props.darkMode ? {backgroundColor: 'red'} : cs.mainContainer
          }>
          <View style={cs.pageTitleWrapper}>
            <View style={cs.settingContainer}>
              <View style={cs.settingWrapper}>
                { this.props.Profile.data !== undefined ? (
                  <SettingItem
                    routeNavigationName="nothing"
                    navigation={this.props.navigation}
                    title="Naam"
                    desc={
                      this.props.Profile.data[0]!== undefined &&      (this.props.Profile.data[0].firstname +
                      ' ' +
                         this.props.Profile.data[0].FLD_LASTNAME)
                    }
                    settingImg={require('./../../assets/images/student/setting/user.png')}
                  />
                ) : null}
                { this.props.Profile.data!== undefined ? (
                  <SettingItem
                    routeNavigationName="EmailSetting"
                    navigation={this.props.navigation}
                    title="E-mail"
                    desc={ this.props.Profile.data[0].FLD_EMAIL}
                    nameIcon="angle-right"
                    settingImg={require('./../../assets/images/student/setting/email.png')}
                  />
                ) : null}
                { this.props.Profile.data !== undefined ? (
                  <SettingItem
                    routeNavigationName="PasswordSetting"
                    navigation={this.props.navigation}
                    title="Wachtwoord"
                    desc="Opnieuw aanvragen"
                    nameIcon="angle-right"
                    settingImg={require('./../../assets/images/student/setting/unlock.png')}
                  />
                ) : null}
                { this.props.Profile.data !== undefined ? (
                  <SettingItem
                    routeNavigationName="PhoneSetting1"
                    navigation={this.props.navigation}
                    title="Telefoonnummer"
                    desc={this.props.Profile.data[0] !== undefined && this.props.Profile.data[0].FLD_PHONE_NUMBER1}
                    nameIcon="angle-right"
                    settingImg={require('./../../assets/images/student/setting/smartphone.png')}
                  />
                ) : null}
              </View>
            </View>
            <View style={[cs.settingContainer,{flexDirection:"column",paddingRight:30,paddingLeft:30}]}>
              <View style={cs.settingWrapper}>
                <SettingItem
                  basicListData={this.state.basicList}
                  routeNavigationName="TravelsCostSetting"
                  navigation={this.props.navigation}
                  title="Verslagen"
                  desc="Stuur de bonnetjes op!"
                  nameIcon="angle-right"
                  settingImg={require('./../../assets/images/teacher/analytics.png')}
                />
                
              </View>
              <View style={cs.settingWrapper}>
               
                 <SettingItem
                  basicListData={this.state.basicList}
                  routeNavigationName="TravelsCostSetting"
                  navigation={this.props.navigation}
                  title="Reiskosten sturen"
                  desc="Stuur de bonnetjes op!"
                  nameIcon="angle-right"
                  settingImg={require('./../../assets/images/student/setting/metro.png')}
                />
              
            </View>
            
              </View>
            <View style={cs.settingContainer}>
              <View style={cs.settingWrapper}>
                <SettingItem
                  routeNavigationName="HelpCentre"
                  navigation={this.props.navigation}
                  title="Helpcentrum"
                  nameIcon="angle-right"
                  desc="Heb je hulp nodig?"
                  settingImg={require('./../../assets/images/student/setting/light-bulb.png')}
                />
                <SettingItem
                  appSettingData={this.state.setting}
                  routeNavigationName="Privacy"
                  navigation={this.props.navigation}
                  title="Privacy & Klachten"
                  desc="De reglementen"
                  nameIcon="angle-right"
                  settingImg={require('./../../assets/images/student/setting/document.png')}
                />
                <SettingItem
                  personData={this.state.mobilePerson}
                  infoData={this.state.AppContactInfo}
                  addressData={this.state.address}
                  routeNavigationName="MySchool"
                  navigation={this.props.navigation}
                  title="Over jouw school"
                  desc="Alle contact informatie"
                  nameIcon="angle-right"
                  settingImg={require('./../../assets/images/student/setting/notification.png')}
                />
                <SettingItem
                  routeNavigationName="AboutApp"
                  navigation={this.props.navigation}
                  title="Over deze APP"
                  desc="Contract informatie"
                  nameIcon="angle-right"
                  settingImg={require('./../../assets/images/student/setting/smartphone-1.png')}
                />
              </View>
            </View>
            <TouchableOpacity
              onPress={() => this.logout()}
              style={cs.powerSetting}>
              <Text
                style={{
                  fontSize: 21,
                  color: '#31455E',
                  marginRight: 12,
                  top: 3,
                }}>
                Uitloggen
              </Text>
              <Image
                style={cs.passEye}
                source={require('./../../assets/images/student/setting/quit001-E005.png')}
              />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
    // : (
    //   <ActivityIndicator
    //     size="large"
    //     style={{flex: 1, alignItems: 'center', justifyContetnt: 'center'}}
    //   />
    // );
  }
}

const mapStateToProps = state => {
  return {
    loadMobilePerson: state.api.mobilePerson,
    loadAppContactInfo: state.api.contactInfo,
    loadMobileAddress: state.api.mobileAddress,
    loadAppSetting: state.api.loadSetting,
    loadBasicList: state.api.loadBasic,
    studentInfo: state.api.studentInfo,
    Profile:state.Profile
  };
};

const mapDispatchToProps= {
  removeNotification,
  removeprofile
 }

export default connect(mapStateToProps,mapDispatchToProps)(ProfileSetting);
