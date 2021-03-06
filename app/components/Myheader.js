import React, { Component } from 'react'
import { View, Text,StatusBar,Dimensions,NativeModules,BackHandler,TextInput, TouchableWithoutFeedback,Platform, Image, TouchableOpacity, Modal, StyleSheet } from 'react-native'
import { ifIphoneX } from 'react-native-iphone-x-helper'
import storage from '../gStorage';
import MyFetch from '../myFetch';

var {height,width} =  Dimensions.get('window');
let myPt = width/375;

const { StatusBarManager } = NativeModules;
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBarManager.HEIGHT;
export default class MyHeader extends Component {

    constructor(props) {
      super(props);
      this.state = {
        isModal:false,
        isSearch:true
       };
    }
  componentDidMount () {
    // 广告页隐藏状态栏
    if (Platform.OS === 'android') {
      StatusBar.setTranslucent(true)// 仅android
    }
    if(this.props.leftBtn === 'back'){
      BackHandler.addEventListener('hardwareBackPress', this.returnFun.bind(this));
    }
  }

  componentWillUnmount() {
    if(this.props.leftBtn === 'back'){
      BackHandler.removeEventListener('hardwareBackPress', this.returnFun.bind(this));
    }
  }

  returnFun () {
    const { goBack } = this.props.navigation; 
    goBack()
  }

  closeFun () {
    this.setState({
      isModal:true
    })
  }

  Search(){
    this.setState({
      isSearch:!this.state.isSearch
    })
  }

  renderRightBtn () {
    if (this.props.rightBtn=="search") {
      return  (<TouchableOpacity style={styles.btnView} onPress={() => this.Search()}>
            <Image source={require('../image/search.png')} resizeMode='contain' style={styles.leftBtn} />
        </TouchableOpacity>)
    } else {
      return <View style={styles.btnView}></View>
    }
  }

  renderLeftBtn () {
    if (this.props.leftBtn === 'back') {
      return (<TouchableOpacity style={styles.btnView} onPress={() => this.returnFun()}>
      <Image source={require('../image/Back.png')} resizeMode='contain' style={styles.leftBtn} />
      </TouchableOpacity>)
    }else if (this.props.leftBtn=="exit") {
      return  (<TouchableOpacity style={styles.btnView} onPress={() => this.goLogin()}>
      <Image source={require('../image/Exit.png')} resizeMode='contain' style={styles.leftBtn} />
      </TouchableOpacity>)
    } else {
      return <View style={styles.btnView}></View>
    }
  }

  goLogin(){
    const { navigate } = this.props.navigation; 
    MyFetch.getString(
        '/ajaxUser.do?method=OffLine',
        {},
        (response) => {
            console.log(response);
            if (response['_bodyText'] === 'ok') {
              storage.remove({
                key:'user'
              });
              navigate('Login')
            } else {
                Alert.alert(
                    '提示',
                    '退出错误',
                );
                navigate('Login')
            }
        },
        err => {
            Alert.alert(
                '提示',
                '网络连接中断',
            );
            console.log(err);
        }
    );
  }

  render () {
    return (
      <View style={styles.rootView}>
        <View style={styles.viewBox}>
            {this.renderLeftBtn()}
            <View style={styles.titleView}>
                {this.state.isSearch?<Text style={styles.title}>{this.props.title}</Text>:
                <TextInput style={[styles.inputStyle]}
                           {...this.props}
                           placeholder={'请输入搜索内容'}
                           autoFocus={true}
                           underlineColorAndroid='transparent'
                           placeholderTextColor='#777'
                           autoCapitalize='none'
                           autoCorrect={false}
                           onChangeText={text => this.props.gosearch(text)}
                >
                </TextInput>
              }
            </View>
            {this.renderRightBtn()}
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  rootView: {
    ...ifIphoneX({
        height: myPt*64
    }, {
        height: myPt*44
    }),
    backgroundColor: 'transparent',
    borderBottomWidth: 0,
    marginTop:STATUSBAR_HEIGHT,
    borderBottomColor: '#6291F7',
    flexDirection: 'row',
    alignItems: 'flex-end'
  },
  viewBox: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  btnView: {
    height: myPt*50,
    flex: 1,
    justifyContent: 'center',
    alignItems:'center',
  },
  titleView: {
    flex: 7,
    height:myPt*50,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center'
  },
  title: {
    fontSize: myPt*16,
    lineHeight:myPt*50,
    fontWeight:"600",
    color: '#fff',
    height: myPt*50,
  },
  inputStyle:{
    backgroundColor:'#fff',
    width:'80%',
    height:myPt*30,
    fontSize:myPt*12,
    padding:0,
    textAlign:'center'

  },
  leftBtn: {
      height: myPt*17
  },
  modal:{
    flex:1,
    backgroundColor:'black',
    width:'100%',
    height:'100%'
  },
  modalViewStyle:{
    flex:1,
    justifyContent: 'center',
    alignItems:'center',
  }
})
