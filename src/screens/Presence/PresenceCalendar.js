/* eslint-disable radix */
/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import {commonStyle as cs} from '../../styles/common/styles';
import CalendarsScreen from './../../components/CalendarGroup';
// import {TouchableOpacity} from 'react-native-gesture-handler';
import {Button} from './../../components/widgets';
import Icon from 'react-native-vector-icons/FontAwesome';
import {apiActions} from '../../actions';
import AsyncStorage from '@react-native-community/async-storage';
import PickerScreen from './../../components/Picker';
import axios from 'axios';

const {width, height} = Dimensions.get('window');
class PresenceCalendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      group: 0,
      count: 0,
      selected: '',
      groupName: '',
      groupId: '',
      groupname: '',
      type:3,
      id:"",
      change:false,
      month: parseInt(
        this.props.navigation.getParam('date').dateString.substring(5, 7),
        10,
      ),
    };
    // this.getGroupFunction = this.getGroupFunction.bind(this);
  }

   getGroupFunction= async(newGroup)=> {
  console.warn("********************************************************************hihi")
   
    this.setState({group: this.state.group + 1});
    this.setState({change:true})
    const userId = parseInt(await AsyncStorage.getItem('@userId'));
    console.warn('userId', userId);
    if(this.state.id!==newGroup.FLD_FK_GROUP){
      this.setState({id:newGroup.FLD_FK_GROUP})
      this.setState({count:this.state.count+1})
    }
    this.setState({
      groupName: newGroup.FLD_GROUP_NAME,
      groupId: newGroup.FLD_FK_GROUP,
    });
    // this.setState({id:newGroup.FLD_FK_GROUP})
    console.warn('dsfdf', newGroup.FLD_FK_GROUP, userId, this.state.month);
    // this.loadMonthAttendance(newGroup.FLD_FK_GROUP, userId, this.state.month);
    this.props.dispatch(
      apiActions.loadMonthAttendance(
        newGroup.FLD_FK_GROUP,
        userId,
        this.state.month,
      ),
    );
  }

  // loadMonthAttendance = async (groupId, userId, monthId) => {
  //   const user = parseInt(await AsyncStorage.getItem('@userId'));
  //   console.warn('userId', user);
  //   console.warn('sdjfhksfksdfsdjfg', groupId, userId, monthId);
  //   axios
  //     .post(
  //       global.url + 'api/student/loadMonthAttendance',
  //       {
  //         groupId: groupId,
  //         userId: userId,
  //         monthId: monthId,
  //       },
  //       {
  //         headers: {
  //           'Content-Type': 'application/json',
  //           'x-access-token': await AsyncStorage.getItem('@token'),
  //         },
  //       },
  //     )
  //     .then(res => {
  //       console.warn('responseeee', res);
  //       if (res.data.msg === 'success') {
  //         return res.data.data;
  //       }
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });
  // };

  async componentDidMount() {
    // this.loadStudentGroup(-1);
    this.props.dispatch(apiActions.loadStudentGroup(-1));
    this.loadMonthAttendance();
  }

  // loadStudentGroup = async studentId => {
  //   console.warn('ttttttttttttttttttttt', await AsyncStorage.getItem('@token'));
  //   axios
  //     .post(
  //       global.url + 'api/student/loadStudentGroup',
  //       {
  //         studentId: studentId,
  //       },
  //       {
  //         headers: {
  //           'Content-Type': 'application/json',
  //           'x-access-token': await AsyncStorage.getItem('@token'),
  //         },
  //       },
  //     )
  //     .then(res => {
  //       if (res.data.msg === 'success') {
  //         console.warn('group res', res.data.data);
  //       }
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });
  // };

  render() {
    const {loadMonthAttendance} = this.props;
    console.warn('count in parent', this.state.count);
    console.warn('loadMonthAttendance', loadMonthAttendance);
    return (
      <ScrollView>
        <View
          style={
            this.props.loadMonthAttendance !== undefined ? null : styles.overlay
          }>
          <View style={cs.mainContainer}>
            <View style={cs.profileInfo} />
            {/* <View
            style={{
              position: 'absolute',
              top: height / 2,
              left: width / 2,
              backgroundColor: 'red',
              width: 100,
              height: 100,
              zIndex: 2,
            }}>
            {this.props.loadMonthAttendance === undefined && (
              <View>
                <ActivityIndicator
                  size="large"
                  color="red"
                  style={{height: 100, width: 100}}
                />
                <Text style={{color: '#0000ff', textAlign: 'center'}}>
                  please wait
                </Text>
              </View>
            )}
          </View> */}
            <View>
              <View style={{alignItems: 'center', marginTop: 20}}>
                <View style={{alignItems: 'center', direction: 'row'}}>
                  <Text>
                    <Text style={cs.BoldProfileInfo}>
                      {/* TODO: */}
                      Rania
                    </Text>
                    <Text style={cs.RegularProfileInfo}>, jouw groep </Text>
                  </Text>
                  <View>
                    <Text style={cs.colorProfileInfo}>
                      {this.state.groupName}
                    </Text>
                  </View>
                </View>
                <Text>
                  <Text style={cs.RegularProfileInfo}>
                    heeft les op{' '}
                    <Text style={cs.colorProfileInfo}>dinsdag </Text>
                    en <Text style={cs.colorProfileInfo}>donderdag.</Text>
                  </Text>
                </Text>
              </View>
              <View>
                <PickerScreen
                  getGroup={this.getGroupFunction}
                  data={this.props.loadStudentGroup}
                />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 20,
                  alignSelf: 'center',
                }}>
                <TouchableOpacity onPress={()=>this.setState({type:3})} style={[this.state.type===3 &&({borderWidth: 3,borderColor:"blue",borderRadius:5}),cs.presenceStatusColor]}>
                  <Text style={cs.presenceColorText}>AANWEZIG</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>this.setState({type:1})} style={[this.state.type===1 &&({borderWidth:3,borderColor:"blue",borderRadius:5}),cs.lateStatusColor]}>
                  <Text style={cs.presenceColorText}>TE LAAT</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>this.setState({type:2})} style={[this.state.type===2 &&({borderWidth:3,borderColor:"blue",borderRadius: 5}),cs.absentStatusColor]}>
                  <Text style={cs.presenceColorText}>AFWEZIG</Text>
                </TouchableOpacity>
              </View>
              <View style={cs.calendarsWrapper}>
                <View style={{width: '100%'}}>
                  <CalendarsScreen
                    navigation={this.props.navigation}
                    group={this.state.group}
                    type={this.state.type}
                    groupId={this.state.id}
                    change={this.state.change}
                    count={this.state.count}
                  />
                </View>
              </View>
              <View
                style={{
                  marginBottom: 20,
                  width: '100%',
                }}>
                <Button
                  name="AANWEZIG"
                  imgSource={require('./../../assets/images/student/presence/saveImge.png')}
                  colorButton="#CD51C9"
                  onClick={() =>
                    this.props.navigation.navigate('PresenceCalendar')
                  }
                />
                <View
                  style={{
                    marginTop: 5,
                    flex: 1,
                    backgroundColor: 'rgba(238,196,97,0.57)',
                    marginLeft: 12,
                    marginRight: 12,
                    padding: 5,
                    borderColor: '#C99400',
                    borderWidth: 2,
                    borderRadius: 8,
                  }}>
                  <Text
                    style={{
                      color: '#31455E',
                      fontSize: 12,
                      fontStyle: 'italic',
                    }}>
                    LET OP: De aanwezigheid voor vandaag is nog niet 'bewaard'
                  </Text>
                </View>

                <View>
                  <Text style={cs.summaryPresence}>
                    Bekijk een samenvatting van je aanwezigheid.{' '}
                  </Text>
                </View>
                <View
                  style={{
                    width: '100%',
                    marginBottom: 20,
                  }}>
                  <Button
                    name="SAMENVATTING"
                    colorButton="#5467FD"
                    onClick={() =>
                      this.props.navigation.navigate('PresenceCalendar')
                    }
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
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    );
    // : (
    //   <ActivityIndicator
    //     size="large"
    //     stytle={{
    //       justifyContent: 'center',
    //       alignItems: 'center',
    //       flex: 1,
    //       backgroundColor: 'red',
    //     }}
    //   />
    // );
  }
}

const styles = StyleSheet.create({
  overlay: {},
});

const mapStateToProps = state => {
  return {
    loadStudentGroup: state.api.loadStudentGroup,
    loadMonthAttendance: state.api.loadMonthAttendance,
  };
};

export default connect(mapStateToProps)(PresenceCalendar);
