// import React, {Component} from 'react';
// import {Router, Scene} from 'react-native-router-flux';
// import {connect} from 'react-redux';
// import {AsyncStorage, Text} from 'react-native';
// import Loader from './../components/Loader';

// import StudentSignIn from '../screens/StudentSignIn';
// // import Home from '../screens/Home';
// // import News from '../screens/News';

// const RouterWithRedux = connect()(Router);

// class Root extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       token: null,
//       isStorageLoaded: false,
//     };
//   }

//   componentDidMount() {
//     AsyncStorage.getItem('token').then(token => {
//       this.setState({
//         token: token !== null,
//         isStorageLoaded: true,
//       });
//     });
//   }

//   render() {
//     let {isLogged} = this.props.login;
//     let {token, isStorageLoaded} = this.state;
//     if (!isStorageLoaded) {
//       return <Loader loading={true} />;
//       // return <NewsBox />;
//     } else {
//       return (
//         <RouterWithRedux>
//           <Scene key="root">
//             <Scene
//               component={StudentSignIn}
//               initial={!token}
//               hideNavBar={true}
//               key="StudentSignIn"
//               title="StudentSignIn"
//             />
//             {/* <Scene
//               component={Home}
//               initial={token}
//               hideNavBar={true}
//               key="Main"
//               title="Main"
//             />
//             <Scene
//               component={News}
//               initial={token}
//               hideNavBar={false}
//               key="News"
//               title="News"
//             /> */}
//           </Scene>
//         </RouterWithRedux>
//       );
//     }
//   }
// }

// const mapStateToProps = state => {
//   return {
//     StudentSignIn: state.StudentSignIn,
//   };
// };

// export default connect(mapStateToProps)(Root);
