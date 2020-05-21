import React, {Component} from 'react';
import {Text, View, StyleSheet, ActivityIndicator, Image,TouchableOpacity,Alert,ScrollView, Dimensions,AsyncStorage} from 'react-native';
import {commonStyle as cs} from '../styles/common/styles';
import messaging from '@react-native-firebase/messaging';
import {getnotification} from '../actions/notificationAction'
import { withNavigationFocus } from 'react-navigation';
import {connect} from 'react-redux';


const {width,height}=Dimensions.get("window")
 class BlankMessage extends React.Component {
  state={
     notification:[],
     date:"",
     changeHeight:false,
     textStatus:[]

  }
  componentDidMount(){
    // var data=   AsyncStorage.getItem('@notification')
    // console.warn("@@@@@@@@@@@@@@@@notification async",data)
    for(let i=0;i<this.props.notification.length;i++){
      this.state.textStatus[i]=false
    }
  }

 componentWillReceiveProps=async()=>{
  var data= await  AsyncStorage.getItem('@notification')
  console.warn("@@@@@@@@@@@@@@@@sdasdsdsd async",data)
 }

  componentWillUpdate(prevProps) {
    console.warn("hiiiiiiiiiiiiiiiiiiiii")
    //  console.warn("page when update page again",this.page)
       if (prevProps.isFocused !== this.props.isFocused) {
       
        this.props.getnotification([])
         }
       }
 

  handleMoreLess=(index,item)=>{
    const {textStatus}=this.state
     this.state.textStatus[index]==true?this.state.textStatus[index]=false:this.state.textStatus[index]=true
     this.setState({textStatus}) 
  }
  render() {
    return (
      <ScrollView>
      <View>
       {this.props.notification.length==0 ?
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
        this.props.notification.map((item,index)=>{
        let  data=item.notification.body.toString()
          return(
            <View>
              <View style={cs.messageContainer}> 
                <View style={cs.chatWrapper}>
                  
                 <View style={cs.contentmessage}>
                   <View>
                   <View style={cs.titleimage}>
                      {item.data.image ?
                          (<Image style={cs.messageProfile} source={{uri:global.url+`/app/setting/notify/nt-${item.data.image}`}}/>) :
                         ( <Image
                                style={styles.imagedefault}
                                source={require('../assets/images/common/noti.png')}
                              />)}
                    
                    <View>
                         <View>
                            <Text style={cs.noMessageSecondTitle}>{this.state.textStatus}{item.notification.title} </Text>
                          </View>
                       
                     </View>   
                     </View>
                 </View>
                   
             
                 
                  <View style={cs.messageBoxTriangle} />
                
              </View>
                    <View>
                   
                         <Text style={cs.notificationText}>
                        
                         
                            {this.state.textStatus[index]?data:(data.slice(4,150))}
                            
                        </Text>
                     </View>
                     <TouchableOpacity
                    style={{alignSelf: 'flex-end'}}
                    onPress={() => 
                    // this.props.navigation.navigate('ReadMessage', {
                    //   itemId:item,
                    //   page:"notification"
                      
                    // });
                this.handleMoreLess(index,item)
                    }>
                 <Text style={cs.moreBtn}>lees meer...</Text>
                  </TouchableOpacity>
              </View>
              </View>
              <View style={cs.messageDateWrapper}>
                <Text style={cs.messageDateText}>{ this.state.date}</Text>
              
              </View>
             
            </View>
    
          )
        }
        ) 
       
        
  }
  </View>
  </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  imagedefault: {
   width:width/6,
   height:width/6,
   resizeMode:"contain",
   marginTop:20,
  //  tintColor:"blue"
  }
})

const mapStateToProps = state => {
 return { loadBasicList: state.api.loadBasic,
         notification:state.notification}
};

const mapDispatchToProps= {
  getnotification
 }


 export default  connect(mapStateToProps,mapDispatchToProps)(BlankMessage) ;
// export default connect(mapStateToProps,mapDispatchToProps)(BlankMessage);