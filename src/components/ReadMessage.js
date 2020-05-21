import React, {Component, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import {connect} from 'react-redux';
import {commonStyle as cs} from './../styles/common/styles';
   


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
function ReadMessage(props) {
  const [showdetail, setshowdetail] = useState(true);
  const [icon,seticon]=useState("")
  const { params } = props.navigation.state;
  const itemId = params ? params.itemId : null;
  const Icons = params ? params.Icons : null;
  const page =params ?params.page:null ||  undefined;
  const school =params ?params.school:null ;
  const otherParam = params ? params.otherParam : null;
 console.warn("**************$$$$$$$$$$$$$$",itemId.SenderImage)


  return (
    <View style={{backgroundColor: '#F2F3F7',minHeight:windowHeight}}>
    {/* {console.warn("******props.cons",props.Icons.data[0].FLD_LOGO)}  */}

     { showdetail==true ?
     (<View>
     <View style={cs.messageContainer}>
        <View style={cs.chatWrapper}>
          <View style={cs.infoSenderMessage}>
            {/* <Image
              style={cs.messageProfile}
              source={require('./../assets/images/student/message/kt-test.png')}
            /> */}
       { school && school!=undefined && <Image   style={cs.schoolLogo} source={{uri:`http://192.168.1.46:3100/school/favicon/fv-${Icons}`}}/>}
       {( itemId.SenderImagee== null  && itemId.SenderImage==="Teacher") &&
            <Image
              style={cs.defaultTeacherImage}
              source={require('./../assets/images/teacher/teachedefault.jpg')}
            />}
             <Image  style={cs.schoolLogo} source={{uri:global.url+`teachers/photo/img-${itemId.SenderImage}`}}/>
           
            <Text style={cs.messageProfileName}>{itemId.sender}</Text>
          </View>
          <Text style={cs.noMessageSecondTitle}>
          {itemId.FLD_title}
         
          </Text>
          {/* <Text>itemId: {JSON.stringify(itemId)}</Text> */}
          <Text style={cs.messageText}>
          {itemId.FLD_content}
          </Text>
          {console.warn("&&&&& this is fld-image",itemId.FLD_image)}
          {itemId.FLD_image!==null &&
            <TouchableOpacity   onPress={()=>setshowdetail(false)}>
               <Image   style={styles.messageimage} source={{uri:global.url+`/app/setting/notify/nt-${itemId.FLD_image}`}}/>
           </TouchableOpacity>}
          {/* <Text style={cs.messageText}>
            Wees er snel bij! Reserveer hieronder je plaats.{' '}
          </Text>

          <TouchableOpacity style={cs.reserveBtnText}>
            <Text style={cs.reserveBtn}>
              Ik geef me op! Reserveer mijn plaats
            </Text>
          </TouchableOpacity> */}
          <View style={cs.messageBoxTriangle} />
        </View>
      </View>
      <View style={cs.messageDateWrapper}>
        <Text style={cs.messageDateText}>
        {itemId.FLD_date.toString().slice(0,10)} {itemId.FLD_date.toString().slice(11,16)}
        </Text>
      </View>
      </View>):  
      <View>     
        {/* <Text>HSDFHKDSFHKSHD</Text> */}
       <Image   style={{resizeMode:"contain",width:windowWidth-10,height:windowHeight,alignSelf:"center"}} source={{uri:global.url+`/app/setting/notify/nt-${itemId.FLD_image}`}}/>
       </View>
       }
    </View>
  );
}

const styles = StyleSheet.create({
  messageimage: {
    resizeMode:"contain",
    width:windowWidth/2,
    height:windowWidth/2
   
      }   

    })

    const mapStateToProps = state => {
      console.warn(state,"stateaaaaaaaaaaaaaaaaaaaaaaaa")
      
      return {Icons:state.Icons};
    };
    
            
    // };
    
    // const mapDispatchToProps= {
    //   getIcondata
    //  }


export default connect(mapStateToProps)(ReadMessage);
