import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  Image,
  ScrollView,
  TouchableOpacity,
  AsyncStorage,
  FlatList
} from 'react-native';
import axios from 'axios';

import {commonStyle as cs} from '../styles/common/styles';

Item=(item )=> {
  console.warn("***********",global.url+`app/setting/notify/${item.title.FLD_image}`)
  return (
    <View>
    
  <Text style={cs.noMessageSecondTitle}>{item.title.FLD_title}</Text>
     
      <View style={cs.messageContainer}>
        <TouchableOpacity style={cs.chatWrapper}>
          <View style={cs.infoSenderMessage}>
            {/* <Image
              style={cs.messageProfile}
              source={require('./../assets/images/student/message/NoPath.png')}
            /> */}
           <Image   style={cs.messageProfile} source={{uri:global.url+`/app/setting/notify/nt-${item.title.FLD_image}`}}/>
            <Text style={cs.messageProfileName}>{item.title.SenderFIRST_NAME} {item.title.SenderLAST_NAME!==null && item.title.SenderLAST_NAME}</Text>
          </View>
          <Text style={cs.messageText}>
             {item.title.FLD_content} 
          </Text>
          <View style={cs.messageBoxTriangle} />
        </TouchableOpacity>
      </View>
      <View style={cs.messageDateWrapper}>
    <Text style={cs.messageDateText}>{item.title.FLD_date}</Text>
      </View>
     
    </View>
  );}

export default class Archive extends Component {

 state={
  allMessage:[]

  }
componentDidMount(){
  this.getMessage()
}

getMessage=async()=>{
  axios
  .post(
    global.url + 'api/school/loadUserNotification',
    {
      type:2,
    },
    {
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': await AsyncStorage.getItem('@token'),
      },
    },
  )
  .then(res => {
    console.warn("!!!!!!!!!!!!!!$$$$$$$$$$$$",res.data)
    if(res.data.msg=="success"){
    this.setState({allMessage:res.data.data})}
   
  })
  .catch(error => {
    console.log(error);
  });
}


  
  render() {
    return (
      <ScrollView>
         <View>
            <Text style={cs.archiveText}>
                Hieronder staan alle berichten van je docent. Hier kun je alles
                makkelijk teruglezen.
              </Text>
            <FlatList
              data={this.state.allMessage}
              renderItem={({ item }) => <Item title={item} />}
              keyExtractor={item => item.id}
      />
      </View>
       
      </ScrollView>
    );
  }
}
