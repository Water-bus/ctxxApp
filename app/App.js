import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation'
import {Platform, UIManager,NetInfo,} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import Login from './login'
import List from './list'
import Detali from './detail'
import Menu from './menu'
import Webview from './webView'


// ignore remote debugger warning
console.ignoredYellowBox = ['Remote debugger'];

// 启用layout动画

setTimeout(() => {
  SplashScreen.hide()
}, 2000)

if (Platform.OS === 'android') {
    UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
}
// release版本中屏蔽控制台输出, 提高性能
if (!__DEV__) {
    global.console = {
        info: () => {
        },
        log: () => {
        },
        warn: () => {
        },
        error: () => {
        },
    };
}
const AppRootStackNavigator = createStackNavigator({
    Login:{
      screen:Login
    },
    List:{
      screen:List
    },
    Detali:{
      screen:Detali
    },
    Menu:{
      screen:Menu
    },
    Webview:{
      screen:Webview
    }
  },
  {
    initialRouteName: 'Login',
    headerMode: 'none',
  });


  const App = createAppContainer(AppRootStackNavigator)

  export default App