import React, {Component} from 'react';
import {Text, View, StyleSheet, ActivityIndicator, Image,TouchableOpacity,Alert} from 'react-native';
import {commonStyle as cs} from '../styles/common/styles';
import messaging from '@react-native-firebase/messaging';

export default class BlankMessage extends Component {
  state={
     notification:[],
     date:""
  }
  componentDidMount(){

    messaging().onMessage( remoteMessage => {
      console.warn("remotemessaging",remoteMessage)
      // this.setState({notification:remoteMessage})
      this.setState({notification:{...this.state.notification,...remoteMessage}})
    //  this.state.notification.push(remoteMessage)
    //  console.warn("!!!!!!!!!!!!!!!!",this.state.notification.length)
    //  this.setState({notification:remoteMessage})
     
    // var dd= new Date(this.state.notification.sentTime * 1000).toISOString().slice(0, 19).replace('T', ' ')
    // this.setState({date:dd})
      // this.setState({count:this.state.count+1})
     // const data = JSON.stringify(remoteMessage);
      // Alert.alert('this is blank page!',remoteMessage);
    });
   
  // this.setState({date:formattedTime})
    
  }
  render() {
    
console.warn(this.state.notification)
   
    return (
      <View>
       {this.state.notification.length==0 ?
      <View>
          <View>
          <Text style={cs.noMessageTitle}>Geen berichten</Text>
                <Text style={cs.noMessageSecondTitle}>Je hebt alles gelezen!</Text>
                <Text style={cs.noMessageText}>
                  Er zijn op dit moment geen nieuwe berichten van de school of je
                  docent.
                </Text>
            </View>
      </View>
        
        
      :
    
         <View>
          <View style={cs.messageContainer}>
            <View style={cs.chatWrapper}>
              <View style={cs.infoSenderMessage}>
              <Image   style={cs.messageProfile} source={{uri:global.url+`/app/setting/notify/nt-${this.state.notification.data.image}`}}/>
                  <Text style={cs.messageProfileName}>
                  {this.state.notification.notification.title}
                  </Text>
              </View>
              <Text style={cs.messageText}>
                  {this.state.notification.notification.body}
              </Text>
              <TouchableOpacity
                style={{alignSelf: 'flex-end'}}
                onPress={() => {
                this.props.navigation.navigate('ReadMessage', {
                  
                  
                });
                }}>
                <Text style={cs.moreBtn}>lees meer...</Text>
              </TouchableOpacity>
              <View style={cs.messageBoxTriangle} />
            </View>
          </View>
          <View style={cs.messageDateWrapper}>
            <Text style={cs.messageDateText}>{ this.state.date}</Text>
          </View>
        </View>
        
  }
  </View>
    );
  }
}
