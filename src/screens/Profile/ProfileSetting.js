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

class ProfileSetting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mobile: this.props.navigation.getParam('mobile'),
      email: this.props.navigation.getParam('email'),
      firstname: this.props.navigation.getParam('firstname'),
      lastname: this.props.navigation.getParam('lastname'),
      password: this.props.navigation.getParam('password'),
    };
    const {dispatch} = this.props;
    dispatch(apiActions.loadStudentInfo());
  }

  componentDidMount() {
    // window.scrollTo(0, 0);
    const {dispatch} = this.props;
    // dispatch(apiActions.loadMobilePerson());
    // dispatch(apiActions.loadAppContactInfo());
    // dispatch(apiActions.loadMobileAddress());
    dispatch(apiActions.loadAppSetting());
    dispatch(apiActions.loadBasicList(30));
  }

  logout() {
    AsyncStorage.setItem('@token', '');
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
                {this.props.studentInfo !== undefined ? (
                  <SettingItem
                    routeNavigationName="nothing"
                    navigation={this.props.navigation}
                    title="Naam"
                    desc={
                      this.props.studentInfo.firstname +
                      ' ' +
                      this.props.studentInfo.FLD_LASTNAME
                    }
                    settingImg={require('./../../assets/images/student/setting/user.png')}
                  />
                ) : null}
                {this.props.studentInfo !== undefined ? (
                  <SettingItem
                    routeNavigationName="EmailSetting"
                    navigation={this.props.navigation}
                    title="E-mail"
                    desc={this.props.studentInfo.FLD_EMAIL}
                    nameIcon="angle-right"
                    settingImg={require('./../../assets/images/student/setting/email.png')}
                  />
                ) : null}
                {this.props.studentInfo !== undefined ? (
                  <SettingItem
                    routeNavigationName="PasswordSetting"
                    navigation={this.props.navigation}
                    title="Wachtwoord"
                    desc="Opnieuw aanvragen"
                    nameIcon="angle-right"
                    settingImg={require('./../../assets/images/student/setting/unlock.png')}
                  />
                ) : null}
                {this.props.studentInfo !== undefined ? (
                  <SettingItem
                    routeNavigationName="PhoneSetting1"
                    navigation={this.props.navigation}
                    title="Telefoonnummer"
                    desc={this.props.studentInfo.FLD_PHONE_NUMBER1}
                    nameIcon="angle-right"
                    settingImg={require('./../../assets/images/student/setting/smartphone.png')}
                  />
                ) : null}
              </View>
            </View>
            <View style={cs.settingContainer}>
              <View style={cs.settingWrapper}>
                <SettingItem
                  basicListData={this.props.loadBasicList}
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
                  appSettingData={this.props.loadAppSetting}
                  routeNavigationName="Privacy"
                  navigation={this.props.navigation}
                  title="Privacy & Klachten"
                  desc="De reglementen"
                  nameIcon="angle-right"
                  settingImg={require('./../../assets/images/student/setting/document.png')}
                />
                <SettingItem
                  personData={this.props.loadMobilePerson}
                  infoData={this.props.loadAppContactInfo}
                  addressData={this.props.loadMobileAddress}
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
  };
};

export default connect(mapStateToProps)(ProfileSetting);
