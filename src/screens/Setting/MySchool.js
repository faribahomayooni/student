/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import {connect} from 'react-redux';
import {View, Text, ScrollView, Image} from 'react-native';
import {commonStyle as cs} from '../../styles/common/styles';
import {apiActions} from '../../actions';
import CheckBox from '@react-native-community/checkbox';
import {Row, Col} from 'native-base';

function MySchool(props) {
  const [Val,setValue]=useState(true)
  const personData = props.navigation.getParam('personData');
  const infoData = props.navigation.getParam('infoData');
  const addressData = props.navigation.getParam('addressData');
  return (
    <ScrollView>
      <View style={cs.mainContainer}>
        <View style={{alignItems: 'center'}}>
          <Text style={cs.pageTitle}>Mijn school</Text>
        </View>
        <View style={cs.settingContainer}>
          <View style={cs.settingWrapper}>
            <View style={cs.helpCentreDetail}>
              <View>
                {infoData ? (
                  <Text style={cs.mySchoolTitle}>{infoData[0].Fld_Titel}</Text>
                ) : null}
              </View>
            </View>
            <Row style>
              <Col style={{width: '70%'}}>
                <View
                  style={{
                    margin: 20,
                    paddingRight: 10,
                    width: '100%',
                  }}>
                  {infoData ? (
                    <Text style={cs.mySchoolDesc}>{infoData[0].Fld_Text}</Text>
                  ) : null}
                </View>
              </Col>
              <Col style={{width: '25%'}}>
                <View
                  style={{
                    //   position: 'absolute',
                    top: 10,
                    right: 20,
                    bottom: 10,
                    justifyContent: 'center',
                    alignItems: 'flex-end',
                  }}>
                  {infoData ? (
                    <Image
                      style={{width: 50, height: 50, marginBottom: 30,resizeMode:"contain"}}
                      source={{
                        uri:
                          `${global.url}app/contact/cn-` +
                          infoData[0].Fld_Image,
                      }}
                    />
                  ) : (
                    <Image
                      style={{width: 50, height: 50, marginBottom: 30}}
                      source={require('./../../assets/images/student/setting/no-image-png-6.png')}
                    />
                  )}
                </View>
              </Col>
            </Row>
          </View>
        </View>
        <View style={cs.settingContainer}>
          <View style={cs.settingWrapper}>
            <View style={cs.infoSenderMessage}>
              <Text style={cs.messageProfileName}>Adres</Text>
            </View>
            {addressData
              ? addressData.map(item => {
                  return (
                    <>
                      <View style={cs.infoSenderMessage}>
                        <Image
                          style={cs.mySchoolImg}
                          source={require('./../../assets/images/student/message/kn_nieuwlogo_2017_topgoed.png')}
                        />
                      </View>
                      <View
                        style={{
                          alignSelf: 'flex-start',
                          marginLeft: 20,
                          marginTop: -40,
                        }}>
                        <Text style={cs.schoolTrainingTitle}>
                          Knoester Trainingen
                        </Text>
                      </View>
                      <View
                        style={{
                          marginTop: 10,
                          margin: 20,
                          paddingRight: 20,
                          paddingLeft: 20,
                          width: '100%',
                        }}>
                        <Text style={cs.addressTitle}>{item.Address}</Text>
                        <Text style={cs.addressSubTitle}>
                          {item.PostCode} {item.City}
                        </Text>
                      </View>
                    </>
                  );
                })
              : null}
          </View>
        </View>
        <View style={cs.settingContainer}>
          <View style={cs.settingWrapper}>
            <View style={cs.infoSenderMessage}>
              <Text style={cs.messageProfileName}>Contract persoon</Text>
            </View>
            {personData
              ? personData.map(item => {
                  return (
                    <View
                      style={{
                        flexDirection: 'row',
                        marginTop: 20,
                        flex: 1,
                        marginTop:"10%",
                        // marginLeft: 'auto',
                        paddingLeft: 15,
                      }}>
                      <View style={{flexDirection: 'column'}}>
                      {
                      item.Fld_Photo? 
                       <Image
                          source={{
                            uri:
                              `${global.url}app/contact/pr-` + item.Fld_Photo,
                          }}
                          style={{borderRadius: 60 / 2, width: 60, height: 60,resizeMode:"contain"}}
                        />:
                        <Image
                        source={require('./../../assets/images/student/message/NoPath-1.png')}
                        style={{borderRadius: 60 / 2, width: 60, height: 60}}
                      />}
                      </View>
                      <View style={{flexDirection: 'column'}}>
                        <View style={{marginLeft: 20, marginBottom: -10}}>
                          <Text style={cs.schoolTrainingTitle}>
                            {item.Fld_Name}
                          </Text>
                        </View>
                        <View
                          style={{
                            marginTop: 10,
                            margin: 20,
                            paddingRight: 25,
                          }}>
                          <Text style={cs.addressTitle}>{item.Fld_Email}</Text>
                          <Text style={cs.addressSubTitle}>{item.Fld_Tel}</Text>
                        </View>
                      </View>
                    </View>
                  );
                })
              : null}
              
          </View>
        </View>
        
       {props.TypeSign==="student" &&
       <View>
       <View>
           <View style={{flexDirection:"row",paddingRight:20}}>
            <CheckBox
            value={Val}
              onValueChange={value => {
               setValue(value)
              }}
              tintColors={{true: '#5467fd'}}
              style={cs.checkboxCustom}
            />
            <Text style={[cs.checkEmailText,{}]}>
                  Ik geef toestemming om mijn gegevens te delen met 
                  andere collega's binnen deze app.
            </Text>
          </View>
       </View>
       <View style={cs.settingContainer}>
          
          <View style={cs.settingWrapper}>
         
            {/* <Text>skdfhksdfiusdfusidfisudfysiudfuy</Text> */}
          
          <View style={cs.infoSenderMessage}>
              <Text style={cs.messageProfileName}>U</Text>
            </View>
                  <View
                      style={{
                        flexDirection: 'row',
                        marginTop: 20,
                        // flex: 1,
                        marginTop:"10%",
                        // marginLeft: 'auto',
                        // paddingLeft: 15,
                      }}>
                      <View style={{flexDirection: 'column'}}>
                      {/* {console.warn( "================>",item.Fld_Photo), */}
                      {/* true?  */}
                      {/* <Image */}
                      {/* //     source={{ */}
                      {/* //       uri:
                      //         `${global.url}app/contact/pr-` + item.Fld_Photo,
                      //     }}
                      //     style={{borderRadius: 60 / 2, width: 60, height: 60}}
                      //   />: */}
                        <Image
                        source={require('./../../assets/images/student/message/NoPath-1.png')}
                        style={{borderRadius:60 / 2, width: 60,height:60,resizeMode:"contain"}}
                         />
                      </View>
                      <View style={{flexDirection: 'column'}}>
                        <View style={{marginLeft: 20, marginBottom: -10}}>
                          <Text style={cs.schoolTrainingTitle}>
                            jijoijo
                            {/* {item.Fld_Name} */}
                          </Text>
                        </View>
                        <View
                          style={{
                            marginTop: 10,
                            margin: 20,
                            paddingRight: 25,
                          }}>
                          <Text style={cs.addressTitle}>sdfsdf</Text>
                          <Text style={cs.addressSubTitle}>sdfsdf</Text>
                        </View>
                      </View>
                    </View>
            <View style={cs.infoSenderMessage}>
              <Text style={cs.messageProfileName}>Uw collega's</Text>
            </View>
            {personData
              ? personData.map(item => {
                  return (
                    <View
                      style={{
                        flexDirection: 'row',
                        marginTop: 20,
                        flex: 1,
                        marginTop:"10%",
                        // marginLeft: 'auto',
                        paddingLeft: 15,
                      }}>
                      <View style={{flexDirection: 'column'}}>
                      {console.warn( "================>",item.Fld_Photo),
                      item.Fld_Photo? 
                       <Image
                          source={{
                            uri:
                              `${global.url}app/contact/pr-` + item.Fld_Photo,
                          }}
                          style={{borderRadius: 60 / 2, width: 60, height: 60,resizeMode:"contain"}}
                        />:
                        <Image
                        source={require('./../../assets/images/student/message/NoPath-1.png')}
                        style={{borderRadius: 60 / 2, width: 60, height: 60}}
                      />}
                      </View>
                      <View style={{flexDirection: 'column'}}>
                        <View style={{marginLeft: 20, marginBottom: -10}}>
                          <Text style={cs.schoolTrainingTitle}>
                            {item.Fld_Name}
                          </Text>
                        </View>
                        <View
                          style={{
                            marginTop: 10,
                            margin: 20,
                            paddingRight: 25,
                          }}>
                          <Text style={cs.addressTitle}>{item.Fld_Email}</Text>
                          <Text style={cs.addressSubTitle}>{item.Fld_Tel}</Text>
                        </View>
                      </View>
                    </View>
                  );
                })
              : null}
              
          </View>
          </View>
        </View>}
      </View>
      
    </ScrollView>
  );
}

const mapStateToProps = state => {
  return {TypeSign:state.TypeSign};
};

export default connect(mapStateToProps)(MySchool);
