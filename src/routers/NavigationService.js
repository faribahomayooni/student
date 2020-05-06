import {NavigationActions} from 'react-navigation';

let navigator;

function setTopLevelNavigator(navigatorRef) {
  navigator = navigatorRef;
}

function navigate(routeName, params) {
  navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
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
};
