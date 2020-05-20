/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {Text, View, Image, TouchableOpacity, ScrollView,AsyncStorage,FlatList,RefreshControl,ActivityIndicator,DeviceEventEmitter} from 'react-native';
import {commonStyle as cs} from './../styles/common/styles';
import axios from 'axios';
import {getMessageData} from '../actions/MessageAction'
import {getIcondata} from '../actions/notificationAction';
import { withNavigationFocus } from 'react-navigation';
import {connect} from 'react-redux';
import { State } from 'react-native-gesture-handler';


Data=(props,item )=> {
  // {console.warn(props.item.FLD_date.toString())}
return(
  <View index={props.item.FLD_PK_push_notification}>  
       <View style={cs.messageContainer}>
            <View style={cs.chatWrapper}>
              <View style={cs.infoSenderMessage}>
                <Image   style={cs.schoolLogo} source={{uri:global.url+`school/favicon/fv-${props.Icon}`}}/>
                <Text style={cs.messageProfileName}>{props.item.Sender}</Text>
              </View>
              <View>
                  <Text style={cs.noMessageSecondTitle}>{props.item.FLD_title}</Text>
              </View>
                <Text style={cs.messageText}>
                {props.item.FLD_content}
                </Text>
              <TouchableOpacity
                style={{alignSelf: 'flex-end'}}
                onPress={() => {
                 props.navigation.navigate('ReadMessage', {
                  itemId: props.item,
                  school:true,
                  
                });
                }}>
                <Text style={cs.moreBtn}>lees meer...</Text>
              </TouchableOpacity>
              <View style={cs.messageBoxTriangle} />
            </View>
          </View>
          <View style={cs.messageDateWrapper}>
              <Text style={cs.messageDateText}>{props.item.FLD_date.toString().slice(0,10)}  {props.item.FLD_date.toString().slice(11,16)}</Text>
          </View>
  </View>

);}
 class SchoolMessage extends Component {
  constructor(props) {
    super(props);
    this.page = 1;
    this.state={allMessage:[],
      loading: false, // user list loading
      isRefreshing: false, //for pull to refresh
      data: [], //user list
      error: '',
      totalPage:""
    }
  }


  componentDidMount(){
    this.getMessage(this.page)
    this.getDynamicIcon()    
  }
   

  getDynamicIcon=async()=>{
    axios
    .post(
      global.url + 'api/school/loadInfo',
      {},
      
      {
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': await AsyncStorage.getItem('@token'),
        },
      },
    )
    .then(res => {
      if(res.data.msg=="success"){
       this.setState({Icon:res.data.data[0].FLD_Favicon})
    }
     
    })
    .catch(error => {
    });

  }
  getMessage=async(page)=>{
    this.setState({ loading: true })  
    axios
    .post(
      global.url + 'api/school/loadUserNotification',
      {
        type:1,
        page:page
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': await AsyncStorage.getItem('@token'),
        },
      },
    )
    .then(res => {
      // console.warn("response in user notification!!!!!!!!!!!!!!!!!",res.data.data)
      if(res.data.msg=="success"){
        this.setState({allMessage:[...this.state.allMessage,...res.data.data]})}
        this.setState({totalPage:res.data.data[0].CountPage})
        this.setState({loading:false})
     
    })
    .catch(error => {
      this.setState({loading:false})
      // console.warn("error user notification",error);
    });
  }

  async onRefresh() {
    this.setState({ isRefreshing: true }); // true isRefreshing flag for enable pull to refresh indicator
    axios
    .post(
      global.url + 'api/school/loadUserNotification',
      {
        type:1,
        page:this.pag
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': await AsyncStorage.getItem('@token'),
        },
      },
    )
    .then(res => {
      if(res.data.msg=="success"){
        const {allMessage}=this.state
        for(let i=0;i<this.state.totalPage;i++){
          if(this.state.allMessage[i].FLD_PK_push_notification!==res.data.data[i].FLD_PK_push_notification){
            this.state.allMessage= [
              Object.assign({}, res.data.data[i]),...this.state.allMessage
             
            ];
            
          }
        }
        this.setState({totalPage:res.data.data[0].CountPage})
        this.setState({isRefreshing:false})
      }
   
    })
    .catch(error => {
      this.setState({ isRefreshing:false })
      // console.warn("error user notification",error);
    });
    
  }
  renderSeparator = () => {
    return (
      <View
        style={{
          height: 2,
          width: '100%',
          backgroundColor: '#CED0CE'
        }}
      />
    );
  };
   componentWillUnmount(){
     this.setState({allMessage:[]})
   }
  renderFooter = () => {
     if (!this.state.loading) return null;
     return (
       <View style={{alignItems:"center"}}>
          { (this.state.totalPage!==this.page) ? 
                <View>
                    <ActivityIndicator
                      style={{ color: '#000' }}
                    />
                    <Text>Load More</Text>
                </View>:
                < View>
                    <Text>there arent any item</Text>
                </View>
          }
       </View>
       
     );
   };
    
  
   handleLoadMore = () => {
    if (!this.state.loading && this.state.totalPage!==this.page) {
      this.page = this.page + 1; // increase page by 1
      this.getMessage(this.page); // method for API call 
    }
  };


  
  componentWillUpdate(prevProps) {
  //  console.warn("page when update page again",this.page)
     if (prevProps.isFocused !== this.props.isFocused) {
       console.warn("!!!!!!!!!!!!!!!!!!!!!!!!!!!")
       this.setState({allMessage:[]})
       this.page = 1
      this.getMessage(this.page)
      this.getDynamicIcon()
       }
     }


  render() {
  
 
    let {} = this.props;
    return (
      <ScrollView 
      refreshControl={
        <RefreshControl refreshing={this.state.isRefreshing} onRefresh={this.onRefresh.bind(this)} /> }
      >
        <View>
          <Text style={cs.archiveText}>
            Hieronder staan alle berichten van je docent. Hier kun je alles
            makkelijk teruglezen.
          </Text>
          <FlatList
              data={this.state.allMessage}
              renderItem={({ item }) => <Data item={item} navigation={this.props.navigation}  Icon={this.state.Icon} />}
              keyExtractor={item =>  item.FLD_PK_push_notification}
              ListFooterComponent={this.renderFooter.bind(this)}
              ItemSeparatorComponent={this.renderSeparator}
              onEndReachedThreshold={0.4}
              onEndReached={this.handleLoadMore.bind(this)}
              
      />
         
        </View>
      </ScrollView>
    );
  }
}
const mapStateToProps = state => {
  // console.warn(state,"stateaaaaaaaaaaaaaaaaaaaaaaaa")
  
  return {
    Icons:state.Icons,
    Message:state.Message
  };
};

const mapDispatchToProps= {
  getIcondata,getMessageData
 }

export default   withNavigationFocus (SchoolMessage);