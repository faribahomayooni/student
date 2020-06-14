/* eslint-disable react-native/no-inline-styles */
import React, {Component, useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {commonStyle as cs} from '../../styles/common/styles';
import {View, ScrollView,ActivityIndicator,Text,ToastAndroid,AsyncStorage} from 'react-native';
import {Button} from '../../components/widgets';
import Icon from 'react-native-vector-icons/FontAwesome';
import {apiActions} from '../../actions';
import axios from 'axios';
import NavigationService from '../../../src/routers/NavigationService';

const PhotoPopUp = props => {
  const [addCost, setCost] = useState(false);
  const [Type,setType]=useState("")
  const id = props.navigation.getParam('id');
  const costTypeId = props.navigation.getParam('costTypeId');
  // const date = props.navigation.getParam('date');
  const date = '2020/02/04';
  const costFile = props.navigation.getParam('costFile');
  const costFileName = props.navigation.getParam('costFileName');
  const studentId = props.navigation.getParam('studentId');

  
const   addTravel=async(
  id,
  costTypeId,
  date,
  costFile,
  costFileName,
  studentId,
) =>{
  setType(await AsyncStorage.getItem('@typeofsignin'))
  console.warn("data for image in react native",id,
  costTypeId,
  date,
  costFile,
  costFileName,
  studentId)
    axios
      .post(
        global.url+'api/teacher/addTravelCost',
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
      console.warn('result', res);
        if (res.data.msg === 'success') {
          props.navigation.navigate('TravelsCostSetting');
          ToastAndroid.show(
            'Travel cost add successful',
            ToastAndroid.SHORT,
          );
    setCost(false)
          console.warn("suceess save image in travel cost",res.data)
         
          }
      })
    .catch(error => {
      console.warn("eror in travelCost for upload image",error)
       setCost(false)
    //     ToastAndroid.show(
    //      error,
    //       ToastAndroid.SHORT,
    //     );
         
    //     // );
    //      showToast(error);
    //     // console.warn('error2', error);
     });

   

}


  const addTravelCost = () => {
   setCost(true)
    // console.warn('costTypeId', costTypeId);
    // console.warn('date', date);
    addTravel(id,
      costTypeId,
      date,
      costFile,
      costFileName,
      studentId)
    // props.dispatch(
    //   apiActions.addTravelCost(
    //     id,
    //     costTypeId,
    //     date,
    //     costFile,
    //     costFileName,
    //     studentId,
    //   ),
    // );
  };
  
  const cancel = () => {
    NavigationService.navigate('Home');
  };
  return (
    <ScrollView>
     
     
      <View style={cs.mainContainer}>
      { addCost===true &&
      <View  style={{position:"absolute",top:150,left:160,zIndex:2}}>
        <ActivityIndicator   size={"large"}/>
        <Text style={{color:"green"}}>Please wait</Text>

     </View>

      }
        <View style={addCost!==true ? cs.textLoginContainer:cs.loading}>
          <View style={cs.ImageSectionsZone}>
            <View>{props.navigation.getParam('renderFileData')}</View>
          </View>
          <View style={{flexDirection: 'row', flex: 1}} />
          <View>
            <Button
              colorButton="#CD51C9"
              name="UPLOAD"
              onClick={addTravelCost}
            />
            <View style={cs.nextIconPresenceWrapper}>
              <Icon
                name="chevron-right"
                color="white"
                size={12}
                style={{marginLeft: 8, marginTop: 5}}
              />
            </View>
          </View>
          <View>
            <Button colorButton="#5467fd" name="ANNULEER" onClick={cancel} />
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
    </ScrollView>
  );
};

const mapStateToProps = state => {
  return {};
};

export default connect(mapStateToProps)(PhotoPopUp);
