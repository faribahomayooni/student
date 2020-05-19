import {NavigationActions,StackActions} from 'react-navigation';

let _navigator;;

function setTopLevelNavigator(navigatorRef) {
  console.warn("+++++++navigation props",navigatorRef)
  _navigator = navigatorRef;
}

function navigate(routeName, params) {
  console.warn(routeName,params,"@@@@@@@@@@@@@@@@@@@@@@@@@@@@@")
  _navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    }),
  );
}


function navigateReset(routeName, params) {
  console.warn("######################navigation reset")
  _navigator.dispatch(
    StackActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({
          routeName,
          params,
        }),
      ],
    }),
  );
}
// function replace(routeName, params) {
//   navigator.dispatch (
//     NavigationActions.replace({ routeName, params })
//   );
// }\

export default {
  navigate,
  setTopLevelNavigator,
  navigateReset
};
