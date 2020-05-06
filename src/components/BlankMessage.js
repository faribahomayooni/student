import React, {Component} from 'react';
import {Text, View, StyleSheet, ActivityIndicator, Image,TouchableOpacity,Alert,ScrollView, Dimensions} from 'react-native';
import {commonStyle as cs} from '../styles/common/styles';
import messaging from '@react-native-firebase/messaging';
import {getnotification} from '../actions/notificationAction'
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
  
    for(let i=0;i<this.props.notification.length;i++){
      this.state.textStatus[i]=false
      // console.warn("+++++++++++1",this.state.textStatus)
    }

  }
  componentDidUpdate=()=>{
  
    // for(let i=0;i<this.props.notification.length;i++){
    //   this.state.textStatus[i]=false
    //   console.warn("+++++++++++1",this.state.textStatus)
    // }

  }
  // componentDidUpdate(){
  //   this.handleMoreLess()
  // }

  handleMoreLess=(index,item)=>{
const {textStatus}=this.state
    
     this.state.textStatus[index]==true?this.state.textStatus[index]=false:this.state.textStatus[index]=true
     this.setState({textStatus})
    // console.warn("&&&**",this.state.textStatus, this.state.textStatus[index])
   
    
  }
  render() {
    
// console.warn("test redux in react native project &&&*****",this.props.notification)
   
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
          // this.state.textStatus[index]=false
          let  data=item.notification.body.toString()
          // console.warn("SSSSSSSSSSSSSSSSSSSSSSSSS",index,this.state.textStatus)
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
  // console.warn(state,"stateaaaaaaaaaaaaaaaaaaaaaaaa")
  
 
 return { loadBasicList: state.api.loadBasic,
         notification:state.notification}
};

const mapDispatchToProps= {
  getnotification
 }

export default connect(mapStateToProps,mapDispatchToProps)(BlankMessage);