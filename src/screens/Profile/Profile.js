import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, Text, AsyncStorage, ScrollView} from 'react-native';
import {commonStyle as cs} from '../../styles/common/styles';
import {Button} from '../../components/widgets';
import Icon from 'react-native-vector-icons/FontAwesome';
import Progress from './../../components/Progress';
import axios from 'axios';
import {apiActions} from '../../actions';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      studentInfo: null,
    };
  }
  componentDidMount() {
    const {dispatch} = this.props;
    dispatch(apiActions.loadStudentInfo());
    // console.warn(info);
    this.loadStudentInfo();
  }

  loadStudentInfo = async () => {
    axios
      .get(global.url + 'api/student/loadInfo', {
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': await AsyncStorage.getItem('@token'),
        },
      })
      .then(res => {
        this.setState({studentInfo: res.data});
        console.warn('===>res when call twice for component', res);
        if (res.data.msg === 'success') {
        }
        if (res.data.msg === 'fail') {
          console.warn('fail', res.data);
          return;
        }
      })
      .catch(error => {
        console.warn('error', error);
      });
  };

  render() {
    const {studentInfo} = this.props;
    return (
      <ScrollView>
        <View style={cs.mainContainer}>
          <View style={cs.profileInfo}>
            <Text>
              <Text style={cs.BoldProfileInfo}>
                {this.state.studentInfo !== null &&
                  this.state.studentInfo.data[0].firstname}
              </Text>
              <Text style={cs.RegularProfileInfo}>, je zit in groep </Text>
              <Text style={cs.colorProfileInfo}>VH_2019_B1.</Text>
            </Text>
            <Text>
              <Text style={cs.RegularProfileInfo}>
                Je volgt een <Text style={cs.colorProfileInfo}>B1 </Text>traject
                en je
              </Text>
            </Text>
            <Text>
              <Text style={cs.RegularProfileInfo}>
                docent is <Text style={cs.colorProfileInfo}>Jannie Make.</Text>
              </Text>
            </Text>
          </View>
          <View style={cs.ProfileBorderBottom} />
          <View>
            <Text style={cs.titlePresence}>Mijn aanwezigheid</Text>
          </View>
          <View style={{alignItems: 'center'}}>
            <Text style={cs.progressText}>
              <Text style={cs.BoldProgressInfo}>
                {' '}
                {this.state.studentInfo !== null &&
                  this.state.studentInfo.data[0].firstname}{' '}
              </Text>
              <Text style={cs.RegularProgressInfo}>, je bent</Text>
            </Text>
            <Progress />
            <Text style={cs.progressBottomText}> van de lessen</Text>
            <Text style={cs.progressBottomText}> aanwezig geweest.</Text>
          </View>
          <View style={cs.ProfileBorderBottom} />
          <View style={{marginTop: 15}}>
            <Text style={cs.settingText}>Hieronder kun je de </Text>
            <Text style={cs.settingText}>
              {' '}
              instellingen van de APP aanpassen
            </Text>
          </View>
          <View style={{marginTop: 0}}>
            <Button
              colorButton="#5467fd"
              name="INSTELLINGEN"
              onClick={() => {
              
                  this.props.navigation.navigate('ProfileSetting', {
                      studentInfo: this.state.studentInfo,
                    })
                 
              }}
            />
            <View style={cs.nextIconWrapper}>
              <Icon
                name="chevron-right"
                color="white"
                size={12}
                style={{marginLeft: 8, marginTop: 5}}
              />
            </View>
          </View>
          {/* <Footer navigation={this.props.navigation} activeTab={'Profile'} /> */}
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => {
  return {
    studentInfo: state.api.studentInfo,
    user: state.api.user,
  };
};

export default connect(mapStateToProps)(Profile);
