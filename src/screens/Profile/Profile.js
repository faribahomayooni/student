import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, Text, AsyncStorage, ScrollView,Dimensions} from 'react-native';
import {commonStyle as cs} from '../../styles/common/styles';
import {Button} from '../../components/widgets';
import Icon from 'react-native-vector-icons/FontAwesome';
import Progress from './../../components/Progress';
import axios from 'axios';
import {apiActions} from '../../actions';
import {getprofileInfo} from '../../actions/ProfileAction'

const {width,height}=Dimensions.get('window')

class Profile extends Component {
 
  
   state = {
      studentInfo: null,
      groupname:"",
      groupid:"",
      TeacherLastName:'',
      TeacherLastName:"",
      targetName:""
    }
  
  componentDidMount=async()=> {
    this.loadStudentInfo()
   this.loadStudentGroup(-1);

    
  }


   loadStudentGroup=async(studentId) =>{  
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
        .then(async(res) => {
          // console.warn("***********",res.data.data[0].FLD_FK_GROUP)
          if (res.data.msg === 'success') {
            this.setState({groupname:res.data.data[0].FLD_GROUP_NAME,groupid:await res.data.data[0].FLD_FK_GROUP})   
           this. getTeacherName(res.data.data[0].FLD_FK_GROUP)
          }
        })
        .catch(error => {
          console.log(error);
        });
  
    
    
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
        this.props.getprofileInfo(res.data)
        console.warn('===>res when call twice for component', res);
        if (res.data.msg === 'success') {
        }
        if (res.data.msg === 'fail') {
          // console.warn('fail', res.data);
          return;
        }
      })
      .catch(error => {
        // console.warn('error', error);
      });
  };

  // componentWillUnmount(){
  //   this.setState({studentInfo:null})
  // }

  render() {
    //  console.warn("================.load student group",this.props.Profile.data[0])
    const {studentInfo} = this.props;
    return (
      <ScrollView>
        <View style={cs.mainContainer}>
          <View style={[cs.profileInfo]}>
            <Text>
              <Text style={cs.BoldProfileInfo}>
                { this.props.Profile.data!==undefined  &&
                  this.props.Profile.data[0].firstname}
              </Text>
              <Text style={cs.RegularProfileInfo}>, je zit in groep </Text>
                 
                  
                
            </Text>
            <Text style={[cs.colorProfileInfo]}>{this.state.groupname}</Text>
            <Text>
              <Text style={cs.RegularProfileInfo}>
                Je volgt een <Text style={cs.colorProfileInfo}>{this.state.targetName} </Text>traject
                en je
              </Text>
            </Text>
            <Text>
              <Text style={cs.RegularProfileInfo}>
                docent is <Text style={cs.colorProfileInfo}>{this.state.teacherName}{' '}{this.state.teacherlastname}</Text>
              </Text>
            </Text>
          </View>
          <View style={cs.ProfileBorderBottom} />
          <View>
            <Text style={cs.titlePresence}>Mijn aanwezigheid</Text>
          </View>
          <View style={{alignItems: 'center'}}>
            <Text style={cs.progressText}>
              <Text style={[cs.BoldProgressInfo]}>
                {' '}
                { this.props.Profile.data!==undefined &&
                 this.props.Profile.data[0].firstname}{' '}
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
              console.warn("!!!!!!!!!!!!!!!!!!",this.props.navigation)
                  this.props.navigation.navigate('ProfileSetting', {
                      // studentInfo: this.props.Profile,
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
    loadStudentGroup: state.api.loadStudentGroup,
    Profile:state.Profile
  };
};


const mapDispatchToProps= {
  getprofileInfo,

 }


export default connect(mapStateToProps,mapDispatchToProps)(Profile);
