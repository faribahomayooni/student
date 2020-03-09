/* eslint-disable react-native/no-inline-styles */
import React, {Component, useState, useEffect, Fragment} from 'react';
import {connect} from 'react-redux';
import {commonStyle as cs} from '../../styles/common/styles';
import {
  View,
  Text,
  Picker,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import axios from 'axios';
import {Button} from '../../components/widgets';
import Icon from 'react-native-vector-icons/FontAwesome';
import Modal from 'react-native-modal';
import DateTimePicker from './../../components/DatePicker';
import ImagePicker from 'react-native-image-picker';
import {apiActions} from '../../actions';
import AsyncStorage from '@react-native-community/async-storage';

const TravelsCostSetting = props => {
  const [selected, changeSelected] = useState();
  const [isModalVisible, updateModalVisible] = useState(false);
  const [fileData, updateFileData] = useState('');
  const [fileUri, updateFileUri] = useState('');
  const [filePath, updateFilePath] = useState([]);
  const [date, updateDate] = useState('');
  const [travelType] = useState(props.dispatch(apiActions.loadBasicList(30)));
  const Item = Picker.Item;
  // const date = new Date();
  const getDateFunction = newDate => {
    updateDate(newDate);
  };
  const changeDateFormat = selectDate => {
    console.warn('date', selectDate.split('-').join('/'));
    return selectDate.split('-').join('/');
  };

  let basicListData = [];

  if (props.navigation.getParam('basicListData')) {
    basicListData = props.navigation.getParam('basicListData');
    // console.warn('basicListData', basicListData);
  }

  // const travelType = props.dispatch(apiActions.loadBasicList(30));
  console.log(`'travel'` + JSON.stringify(travelType));

  // if (basicListData) {
  //   basicListData.forEach(data => {
  //     basicListData.push({
  //       code: data.code,
  //       title: data.title,
  //     });
  //   });
  // }

  const id = -1;

  const renderFileData = source => {
    if (!!source) {
      return <Image source={source} style={cs.imagesSelected} />;
    } else {
      return (
        <Image
          source={require('./../../assets/images/student/setting/no-image-png-6.png')}
          style={cs.imagesSelected}
        />
      );
    }
  };

  const renderFileUri = () => {
    if (fileUri) {
      return <Image source={{uri: fileUri}} style={cs.imagesSelected} />;
    } else {
      return (
        <Image
          source={require('./../../assets/images/student/setting/no-image-png-6.png')}
          style={cs.imagesSelected}
        />
      );
    }
  };

  const launchCamera = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.launchCamera(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = {uri: `data:image/jpeg;base64,${response.data}`};
        updateModalVisible(!isModalVisible);
        updateFilePath(response);
        updateFileData(response.data);
        updateFileUri(response.uri);
        props.navigation.navigate('PhotoPopUp', {
          renderFileData: renderFileData(source),
          renderFileUri: renderFileUri(),
          id: id,
          costTypeId: selected,
          date: changeDateFormat(date),
          costFile: response.data,
          costFileName: response.fileName,
          studentId: -1,
        });
      }
    });
  };

  const launchImageLibrary = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        let source = {uri: 'data:image/jpeg;base64,' + response.data};
        updateModalVisible(!isModalVisible);
        updateFilePath(response);
        updateFileData(response.data);
        updateFileUri(response.uri);
        props.navigation.navigate('PhotoPopUp', {
          renderFileData: renderFileData(source),
          renderFileUri: renderFileUri(),
          id: id,
          costTypeId: selected,
          date: changeDateFormat(date),
          costFile: source.uri,
          costFileName: response.fileName,
          studentId: -1,
        });
      }
    });
  };

  useEffect = async () => {
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
        console.warn('responseeee', res);
        if (res.data.msg === 'success') {
          // dispatch(NavigationService.navigate('Presence'));
          return;
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  const toggleModal = () => {
    updateModalVisible(!isModalVisible);
  };

  return (
    <View style={cs.mainContainer}>
      <View style={cs.textLoginContainer}>
        <Text style={cs.titleSettingPage}>Reiskosten</Text>
        <Text style={cs.subTitleSettingPage}>
          Vul hieronder de details in en kies of maak een foto van de bon.
        </Text>
        <View style={cs.pickerContainer}>
          <Picker
            placeholder="Selecteer type kosten"
            style={cs.pickerWrapper}
            mode="dropdown"
            iosIcon={<Icon name="arrow-down" />}
            selectedValue={selected}
            onValueChange={value => {
              changeSelected(value);
              console.warn('selected', selected);
            }}
            itemStyle={{backgroundColor: '#5467FD'}}>
            {basicListData
              ? basicListData.map(item => {
                  return (
                    <Item color="#fff" label={item.title} value={item.code} />
                  );
                })
              : ''}
          </Picker>
          <View style={cs.dropDownBtn}>
            <Icon
              name="chevron-down"
              color="white"
              size={12}
              style={{marginLeft: 5, marginTop: 5}}
            />
          </View>
        </View>
        <DateTimePicker getDate={getDateFunction} />
        <View>
          <Button
            colorButton="#CD51C9"
            sizeText="21"
            name="FOTO TOEVOEGEN"
            onClick={toggleModal}
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
        <Modal
          animationIn="fadeIn"
          animationOut="fadeOut"
          style={cs.modalCamera}
          isVisible={isModalVisible}>
          <View style={{flex: 1}}>
            <View style={cs.iconModalOpen}>
              <Icon
                name="chevron-right"
                color="white"
                size={14}
                style={{marginLeft: 9, marginTop: 6}}
              />
            </View>
            <Text style={cs.modalCameraTitle}>FOTO TOEVOEGEN</Text>
            <TouchableOpacity
              style={{
                textAlign: 'left',
                backgroundColor: '',
                marginTop: 20,
                marginLeft: 10,
              }}
              onClick={!toggleModal}
            />
            <TouchableOpacity style={cs.modalCameraBtn} onPress={launchCamera}>
              <Text style={{color: '#fff', fontSize: 21, fontWeight: '700'}}>
                Maak een foto
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={cs.modalCameraBtn}
              onPress={launchImageLibrary}>
              <Text style={{color: '#fff', fontSize: 21, fontWeight: '700'}}>
                Kies een foto
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={toggleModal} style={cs.iconModalClose}>
              <Icon
                name="close"
                color="white"
                size={16}
                style={{marginLeft: 6, marginTop: 4}}
              />
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    </View>
  );
};

const mapStateToProps = state => {
  return {};
};

export default connect(mapStateToProps)(TravelsCostSetting);
