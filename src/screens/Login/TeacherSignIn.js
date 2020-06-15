/* eslint-disable no-shadow */
/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {connect, connectAdvanced} from 'react-redux';
import {commonStyle as cs} from '../../styles/common/styles';
import {View, Text, TouchableOpacity, Image,AsyncStorage} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import {Row, Col} from 'native-base';
import ActionSheet from 'react-native-actionsheet';
import axios from 'axios';
import {showToast} from '../../components/utility';
import {TypeSignIn,getprofileInfo} from '../../actions/ProfileAction'
import {InputField, Button, Header} from '../../components/widgets';
import Icon from 'react-native-vector-icons/FontAwesome';
const sha256 = require('sha256');
var schoolOptions = [
  'De Taalkans',
  'Toekomst jaren',
  'Knoester Trainingen',
  'Cancel',
];

class TeacherSignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username:"",
      password:"",
    };
    this.actionSheet = null;
    this.signIn = this.signIn.bind(this);
  }
  signIn() {
  
    
    this.setState({
      username: this.state.username,
      password: this.state.password,
      // showPassword: true,
    });
    if (this.state.username && this.state.password) {
      axios
        .post(
          global.url + 'api/user/login',
          {
            username: this.state.username,
            password: sha256(this.state.password),
            type: 2,
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        )
        .then(async(user) => {
          if (user.data.msg === 'success') {
            AsyncStorage.setItem('@typeofsignin',"teacher");
              this.props.TypeSignIn("teacher")
            var typeSignIn="teacher"
          
            AsyncStorage.setItem('@token', user.data.data.token);
           console.warn("========================> teacher signin",user.data);
           this.loadStudentInfo()
            try {
              var typeSignIn="teacher"
              AsyncStorage.setItem('@typeofsignin',"teacher");
              console.warn("**********************type sign",await AsyncStorage.getItem('@typeofsignin'))
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
               
           ;
              console.warn('Error saving data' + error);
            }
           
            this.props.navigation.navigate('Home',{typeofsignin:"teacher"});
           
            this.props.TypeSignIn("teacher")
           
           
          }
          if (user.data.msg === 'fail') {
            console.warn(user.data);
            showToast('Invalid username or password');

          }
        })
        .catch(error => {
          console.warn("++++++++++++++errro",error);
        });

      // this.props.dispatch(
      //   apiActions.login(this.state.username, this.state.password, 2),
      // );
    }
  
  }

  
  loadStudentInfo = async () => {
    axios
      .get(global.url + 'api/teacher/loadInfo', {
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': await AsyncStorage.getItem('@token'),
        },
      })
      .then(res => {
        this.setState({studentInfo: res.data});
        this.props.getprofileInfo(res.data.data[0])
        console.warn('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%teacher info&**************************', res.data);
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


  
  showActionSheet = () => {
    this.ActionSheet.show();
  };
  // showActionSheet() {
  //   if (this.actionSheet !== null) {
  //     // Call as you would ActionSheet.show(config, callback)
  //     this.actionSheet._root.showActionSheet(
  //       {
  //         options: schoolOptions,
  //         cancelButtonIndex: CANCEL_INDEX,
  //         destructiveButtonIndex: DESTRUCTIVE_INDEX,
  //         title: 'Selecteer uw school',
  //       },
  //       buttonIndex => {
  //         this.setState({clicked: schoolOptions[buttonIndex]});
  //       },
  //     );
  //   }
  // }
  state = {user: ''};
  updateUser = user => {
    this.setState({user: user});
  };
  render() {
    var type = AsyncStorage.getItem('@typeofsignin')
     console.warn("@@@@@@@@@@@@@@ type of signin",type)
    let {
      username,
      password,
      rememberMe,
      emailActive,
      passwordActive,
    } = this.state;
    return (
      <View style={cs.mainContainer}>
        <View style={cs.columnContainer}>
          <Header name={'Inloggen'} />
        </View>

        <View style={cs.textLoginContainer}>
          <Text style={cs.textLogin}>Vul hier uw</Text>
          <Text style={cs.textLogin}>logingegevens in.</Text>
        </View>

        <View style={cs.inputsWrapper}>
          <InputField
            // heading="Email address"
            onfocus={() => {
              this.setState({emailActive: true, passwordActive: false});
            }}
            value={username}
            active={emailActive}
            keyboard={'email-address'}
            reference={component => (this.email = component)}
            placeholder="Uw e-mailadres"
            onSubmit={() => this.password.focus()}
            onChange={username => this.setState({username})}
          />
          <View style={cs.borderBottom} />
          <InputField
          
            onfocus={() => {
              this.setState({passwordActive: true, emailActive: false});
            }}
            value={password}
            active={passwordActive}
            secure={true}
            placeholder="Uw wachtwoord"
            reference={component => (this.password = component)}
            onSubmit={() => {
              this.setState({passwordActive: false});
            }}
            onChange={password => this.setState({password})}
          />
          <Image
            style={cs.passEye}
            source={require('./../../assets/images/common/eye.png')}
          />
        </View>

        <View style={cs.columnContainer}>
          <View style={cs.rowContainer}>
            <CheckBox
              value={rememberMe}
              onValueChange={value => {
                this.setState({rememberMe: value});
              }}
              tintColors={{true: '#5467fd'}}
              style={cs.checkboxCustom}
            />
            <Text style={cs.checkEmailText}>
              E-mailadres onthouden op deze computer
            </Text>
          </View>
          <View style={cs.textLoginContainer}>
            <Text style={cs.textSelection}>Kies hier uw school</Text>
          </View>
          <View style={cs.selectionWrapper}>
            <TouchableOpacity onPress={this.showActionSheet}>
              <ActionSheet
                ref={o => (this.ActionSheet = o)}
                title={'Selecteer uw school'}
                options={schoolOptions}
                cancelButtonIndex={3}
                destructiveButtonIndex={1}
                onPress={index => {
                  /* do something */
                }}
              />
              <Text style={cs.selectionInputText}> Selecteer uw school</Text>

              <View style={cs.selectIconWrapper}>
                <Icon
                  name="chevron-down"
                  color="#fff"
                  size={12}
                  style={{marginLeft: 5, marginTop: 4}}
                />
              </View>
            </TouchableOpacity>
          </View>

          <View>
            <Button
              colorButton="#5467fd"
              name="INLOGGEN"
              onClick={() => this.signIn()}
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
        <Row>
          <View style={cs.loginFooterWrapper}>
            <Col style={cs.textLogoWrapper}>
              <Text style={cs.textLogo}>Een project van </Text>
            </Col>
            <Col style={cs.imageLogoWrapper}>
              <Image
                source={require('./../../assets/images/common/NT2student_logo.png')}
              />
            </Col>
          </View>
        </Row>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    TypeSign:state.TypeSign
  };
};

const mapDispatchToProps= {
  getprofileInfo,
  TypeSignIn
 }

export default connect(mapStateToProps,mapDispatchToProps)(TeacherSignIn);
