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
  FlatList,
  RefreshControl,
  SafeAreaView,

} from 'react-native';
import axios from 'axios';

import {commonStyle as cs} from '../styles/common/styles';

Item=(props )=> {
  // console.warn("***********",props.title.FLD_PK_push_notification)
  return (
    <View index={props.title.FLD_PK_push_notification}>
      <View style={cs.messageContainer}>
        <TouchableOpacity style={cs.chatWrapper}>
          <View style={cs.infoSenderMessage}>
            {console.warn("&&&&***%%%,",props.title.FLD_image)}
           {( props.title.SenderImage== null) ?
            <Image
              style={cs.defaultTeacherImage}
              source={require('./../assets/images/teacher/teachedefault.jpg')}
            />:
            <Image   style={cs.defaultTeacherImage} source={{uri:global.url+`teachers/photo/img-${props.title.SenderImage}`}}/>
          //  <Image   style={cs.defaultTeacherImage} source={{uri:global.url+`/app/setting/notify/nt-${props.title.FLD_image}`}}/>
        }
            <Text style={cs.messageProfileName}>{props.title.Sender} </Text>
          </View>
          <View>
            <Text style={cs.noMessageSecondTitle}>{props.title.FLD_title}</Text>
          </View>
          <Text style={cs.messageText}>
             {props.title.FLD_content} 
          </Text>
          <TouchableOpacity
                style={{alignSelf: 'flex-end'}}
                onPress={() => {
                 props.navigation.navigate('ReadMessage', {
                  itemId:props.title
                  
                });
                }}>
                <Text style={cs.moreBtn}>lees meer...</Text>
              </TouchableOpacity>
          <View style={cs.messageBoxTriangle} />
        </TouchableOpacity>
      </View>
      <View style={cs.messageDateWrapper}>
    <Text style={cs.messageDateText}>{props.title.FLD_date.toString().slice(0,10)}  {props.title.FLD_date.toString().slice(11,16)}</Text>
      </View>
     
    </View>
  );}

export default class Archive extends Component {
  constructor(props) {
    super(props);
    this.page = 1;
    this.state = {
      allMessage:[],
      loading: false, // user list loading
      isRefreshing: false, //for pull to refresh
      data: [], //user list
      error: '',
      totalPage:""
    }
  }
 
componentDidMount(){
  this.getMessage(this.page)
}

getMessage=async(page)=>{
  // console.warn('page++++===============>',page)
  this.setState({ loading: true })
  axios
  .post(
    global.url + 'api/school/loadUserNotification',
    {
      type:2,
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
     console.warn("!!!!!!!!!!!!!!$$$$$$$$$$$$",res.data)
    if(res.data.msg=="success"){
      this.setState({allMessage:[...res.data.data,...this.state.allMessage]})
      this.setState({totalPage:res.data.data[0].CountPage})
    }
    this.setState({loading:false})
   
  })
  .catch(error => {
    this.setState({ loading: false, error: 'Something just went wrong' })
    // console.warn("===>error with page",error);
  });
}
 async onRefresh() {
  
   console.warn("fariiiiiiiiiiiiiiiiiiiiiiiiba",this.page)
  this.setState({isRefreshing:true}); // true isRefreshing flag for enable pull to refresh indicator
  axios
  .post(
    global.url + 'api/school/loadUserNotification',
    {
      type:2,
      page:this.page
     
    },
    {
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': await AsyncStorage.getItem('@token'),
      },
    },
  )
  .then(res => {
    // console.warn("!!!!!!!!!!!!!!$$$$$$$$$$$$",res.data)
    if(res.data.msg=="success"){
      const {allMessage}=this.state
      for(let i=0;i<this.state.totalPage;i++){
        if(this.state.allMessage[i].FLD_PK_push_notification!==res.data.data[i].FLD_PK_push_notification){
          console.warn("!!!!!!!!!!!=>test for new notification in teacher")
          this.state.allMessage= [
            Object.assign({}, res.data.data[i]),...this.state.allMessage
           
          ];
          // this.setState({allMessage})
          // this.state.allMessage.push(res.data.data[i])
        }
      }
      this.setState({totalPage:res.data.data[0].CountPage})
      this.setState({isRefreshing:false})
  
    }
 
   
  })
  .catch(error => {
    this.setState({ isRefreshing:false })
    // console.warn("===>error with page",error);
  });
  // axios
  // .post(
  //     global.url+'api/school/loadUserNotification',
  //   {
  //     type:2,
  //      page :this.page
  //   },
  //   {
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'x-access-token': await AsyncStorage.getItem('@token'),
  //     },
  //   },
  // )
  // .then(res => {
  //   this.setState({isRefreshing:false})
  //    console.warn("!!!!!!!!!!!!!!refresh response",res.data)
  //   if(res.data.msg=="success"){
     
  //     for(let i=0;i<this.state.allMessage.length;i++){
  //       for(let j=0;res.data.data.length;j++){
  //         console.warn("@@@@@@@@@@@@@@",this.state.allMessage[i]!==res.data.data[j])
  //         this.state.allMessage[i]!==res.data.data[j] &&  this.state.allMessage.push(res.data.data[j])

  //       }

  //     }
  // }
  // this.setState({isRefreshing:false})
  // })
  // .catch(error => {
  //   this.setState({isRefreshing:false})
  //    console.warn("===>error with page",error);
  // });
  
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

renderFooter = () => {
  //it will show indicator at the bottom of the list when data is loading otherwise it returns null
   if (!this.state.loading) return null;
   return (
     <View style={{alignItems:"center"}}>
       <ActivityIndicator
       style={{ color: '#000' }}
     />
    <Text>Load More</Text>
     </View>
     
   );
 };
  

 handleLoadMore = () => {
  if (!this.state.loading && this.state.totalPage!==this.page) {
    this.page = this.page + 1; // increase page by 1
    this.getMessage(this.page); // method for API call 
  }
};
  render() {
     console.warn("=========>all message",this.state.allMessage.length)
    return (
      // <SafeAreaView style={styles.container}>
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
              renderItem={({ item }) => <Item title={item} navigation={this.props.navigation} />}
              keyExtractor={item => item.FLD_PK_push_notification}
              ListFooterComponent={this.renderFooter.bind(this)}
              ItemSeparatorComponent={this.renderSeparator}
              onEndReachedThreshold={0.4}
              onEndReached={this.handleLoadMore.bind(this)}
              
              // RefreshControl={
              //   <RefreshControl
              //     refreshing={this.state.isRefreshing}
              //     onRefresh={this.onRefresh.bind(this)}
              // />
              // }
            />
      
      </View>
       
      </ScrollView>
      // </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
  },
  scrollView: {
    flex: 1,
    backgroundColor: 'pink',
    alignItems: 'center',
    justifyContent: 'center',
  },
});