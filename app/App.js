import React from 'react';
import {StackNavigator} from 'react-navigation';
import {Platform, UIManager} from 'react-native';
import Ad from './ad'
import Login from './login'
import List from './list'
import Detali from './detail'


// ignore remote debugger warning
console.ignoredYellowBox = ['Remote debugger'];

// 启用layout动画
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

const AppRootStackNavigator = StackNavigator(
    {
        Ad:{
          screen:Ad
        },
        Login:{
          screen:Login
        },
        List:{
          screen:List
        },
        Detali:{
          screen:Detali
        }
    },
    {
      headerMode: 'none', // 头部标题不显示
      navigationOptions: {
        gesturesEnabled: false // 禁止iOS的右划后退动作
      }
    }
);

// export default AppRootStackNavigator

export default () =>
    <AppRootStackNavigator/>
