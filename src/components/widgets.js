/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
const {height: screenHeight, width: screenWidth} = Dimensions.get('window');
import COLORS from './../styles/variables';

export class InputField extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let {
      value,
      heading,
      onSubmit,
      reference,
      onChange,
      onfocus,
      returnKey = 'next',
      keyboardType,
      secure = false,
      active = false,
      placeholder = '',
      _style = {},
      star = true,
      capitalize = 'none',
    } = this.props;
    return (
      <View style={{flex: 1}}>
        <Text style={styles.headingText}>
          {heading}
          {/* {star ? '*' : ''} */}
        </Text>
        <TextInput
          placeholderTextColor="#D4D4D4"
          style={[
            styles.textInput,
            _style,
            {borderColor: active ? 'transparent' : 'transparent'},
          ]}
          value={value}
          returnKeyType={returnKey}
          ref={reference}
          onFocus={onfocus}
          onSubmitEditing={onSubmit}
          placeholder={placeholder}
          keyboardType={keyboardType}
          onChangeText={onChange}
          secureTextEntry={secure}
          autoCapitalize={capitalize}
        />
      </View>
    );
  }
}

export class Button extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let {
      name,
      onClick,
      theme = 'primary',
      _style = {},
      icon,
      imgSource,
      text,
      colorButton,
      subText = '',
    } = this.props;
    let buttonStyle = [
      styles.button,
      _style,
      {
        backgroundColor:
          theme === 'primary'
            ? `${colorButton}`
            : theme === 'error'
            ? '#c83436'
            : 'white',
      },
    ];
    let textStyle = [
      styles.buttonText,
      {
        color: theme === 'primary' || theme === 'error' ? 'white' : '#5467fd',
      },
    ];
    return (
      <TouchableOpacity style={buttonStyle} onPress={onClick}>
        <View style={{flexDirection: 'row'}}>
          {imgSource !== '' ? (
            <Image style={{width: 25, height: 25}} source={imgSource} />
          ) : null}
          <Text style={{color: '#fff', fontSize: 21, fontWeight: '700'}}>
            {name}
          </Text>

          {subText !== '' ? (
            <Text style={styles.subText}>{subText}</Text>
          ) : null}
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          {text ? (
            <Text style={[textStyle, {marginRight: 10}]}>{text}</Text>
          ) : null}
          {icon ? <Icon name={icon} color="white" size={25} /> : null}
        </View>
      </TouchableOpacity>
    );
  }
}
export class ModalButton extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let {
      name,
      onClick,
      theme = 'primary',
      _style = {},
      icon,
      text,
      colorText,
      subText = '',
    } = this.props;
    let buttonStyle = [
      styles.modalButton,
      _style,
      {
        backgroundColor:
          theme == 'primary'
            ? '#F2F3F7'
            : theme === 'error'
            ? '#c83436'
            : 'white',
      },
    ];
    let textStyle = [
      styles.modalButtonText,
      {color: theme == 'primary' || theme == 'error' ? `${colorText}` : '#fff'},
    ];
    return (
      <TouchableOpacity style={buttonStyle} onPress={onClick}>
        <View>
          <Text style={textStyle}>{name}</Text>
          {subText !== '' ? (
            <Text style={styles.subText}>{subText}</Text>
          ) : null}
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          {text ? (
            <Text style={[textStyle, {marginRight: 10}]}>{text}</Text>
          ) : null}
          {icon ? <Icon name={icon} color="white" size={25} /> : null}
        </View>
      </TouchableOpacity>
    );
  }
}

export class Header extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let {name} = this.props;
    return (
      <View style={{flex: 1, justifyContent: 'center'}}>
        <Text style={styles.headerText}>{name}</Text>
      </View>
    );
  }
}

const styles = {
  textInput: {
    height: screenHeight * 0.07,
    paddingLeft: 10,
    borderWidth: 1,
    borderRadius: 3,
    marginTop: -35,
    fontSize: 20,
    fontWeight: 'normal',
  },
  headingText: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  button: {
    height: 47,
    marginVertical: 8,
    justifyContent: 'center',
    borderRadius: 12,
    borderColor: 'transparent',
    borderWidth: 1,
    backgroundColor: '#5467fd',
    alignItems: 'center',
    margin: 10,
    marginBottom: -2,
  },
  modalButton: {
    height: 'auto',
    paddingTop: 8,
    paddingBottom: 8,
    marginVertical: 8,
    justifyContent: 'center',
    borderRadius: 12,
    borderColor: 'transparent',
    borderWidth: 1,
    backgroundColor: '#F2F3F7',
    alignItems: 'center',
    margin: 2,
    marginBottom: -2,
  },
  modalButtonText: {
    fontSize: 19,
    marginRight: 30,
    fontWeight: 'normal',
    paddingLeft: 12,
  },
  headerText: {
    color: '#31455e',
    fontSize: 26,
    marginTop: -20,
    // marginBottom: -40,
    alignSelf: 'center',
    fontWeight: 'normal',
  },
  subText: {
    color: '#31455E',
    fontSize: 18,
    paddingLeft: 15,
    marginTop: 25,
  },
};
