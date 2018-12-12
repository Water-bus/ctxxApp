import React, { Component } from 'react'
import { View, Text,StatusBar, TouchableWithoutFeedback,Platform, Image, TouchableOpacity, Modal, StyleSheet } from 'react-native'
import { ifIphoneX } from 'react-native-iphone-x-helper'
import storage from '../gStorage';
import myFetch from '../myFetch'
import Login from '../login';

export default class MyHeader extends Component {

    constructor(props) {
      super(props);
      this.state = {
        isModal:false
       };
    }
  componentDidMount () {
    // 广告页隐藏状态栏
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor('#494c54')// 仅android
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

  renderRightBtn () {
    if (this.props.rightBtn) {
      return  (<TouchableOpacity style={styles.btnView} onPress={() => this.returnFun()}>
      
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
    } else if (this.props.leftBtn === 'close') {
        return (<TouchableOpacity style={styles.btnView} onPress={() => this.closeFun()}>
        <Image source={require('../image/Cancel.png')} resizeMode='contain' style={styles.leftBtn} />
        </TouchableOpacity>)
    } else {
      return <View style={styles.btnView}></View>
    }
  }

  goLogin(){
    console.log(this.props.navigation)
    const {navigate} = this.props.navigation;

    storage.save({
      key:'user',    // 注意:请不要在key中使用_下划线符号!
      rawData: {
          account:'',
          password:''
      },
    });
    navigate('Login')
  }

  render () {
    return (
      <View style={styles.rootView}>
        <StatusBar
          StatusBarStyle='light-content'
        />
        <Modal
          style={styles.modal}
          animationType='fade'           // 从底部滑入
          transparent={true}             //  透明
          visible={this.state.isModal}    // 根据isModal决定是否显示
          onRequestClose={() => {this.onRequestClose()}}  // android必须实现
        >
            <TouchableWithoutFeedback onPress={() => this.setState({isModal:false})}>
            {/* 关闭页面 */}
              <View style={styles.modalViewStyle}>

                <View style={{width:'100%',height:'100%',position:'absolute',backgroundColor:'#000',opacity:0.8,top:0,left:0}}>
                </View>
                <View style={styles.modalViewStyle}>
                  <View style={{width:250,opacity:1,height:144,backgroundColor:'white',borderRadius:15,flexDirection: 'column',alignItems: 'center',justifyContent: 'center'}}>
                    <View style={{flex:1,alignItems: 'center',justifyContent: 'center'}}><Text style={{fontSize:16,lineHeight:90}}>确定要退出登录吗</Text></View>
                    <View style={{flex:1,alignItems: 'center',flexDirection:'row',justifyContent: 'center'}}>
                      <TouchableOpacity style={{opacity:1,flex:1,alignItems: 'center',flexDirection:'row',justifyContent: 'center'}} onPress={() => this.setState({isModal:false})}>
                        <Image source={require('../image/no.png')} resizeMode='contain' style={{height:42,width:42}} />
                      </TouchableOpacity>
                      <TouchableOpacity style={{opacity:1,flex:1,alignItems: 'center',flexDirection:'row',justifyContent: 'center'}} onPress={() => this.goLogin()}>
                        <Image source={require('../image/ok.png')} resizeMode='contain' style={{height:42,width:42}} />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            </TouchableWithoutFeedback>
        </Modal>
        <View style={styles.viewBox}>
            {this.renderLeftBtn()}
            <View style={styles.titleView}>
                <Text style={styles.title}>{this.props.title}</Text>
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
        height: 84
    }, {
        height: 70
    }),
    backgroundColor: '#484c55',
    borderBottomWidth: 1,
    borderBottomColor: '#484c55',
    flexDirection: 'row',
    alignItems: 'flex-end'
  },
  viewBox: {
    backgroundColor: '#484c55',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  btnView: {
    height: 50,
    flex: 1,
    justifyContent: 'center',
    alignItems:'center',
  },
  titleView: {
    flex: 7,
    height:50,
    alignItems: 'center',
    justifyContent: 'flex-end',
    textAlign: 'center'
  },
  title: {
    fontSize: 16,
    lineHeight:50,
    color: '#fff',
    height: 50,
  },
  leftBtn: {
      height: 16
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
