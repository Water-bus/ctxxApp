/**
 登录页面
 */

import React, {Component} from 'react';
import { StyleSheet, Alert, BackAndroid, Platform, StatusBar, Text,  TouchableOpacity, KeyboardAvoidingView, ToastAndroid, BackHandler, View, Image} from 'react-native';
import Input from './components/input'
import storage from './gStorage'
import MyFetch from './myFetch'

export default class Login extends Component{

    constructor(props) {
        super(props);
        this.state = {
            account:'',
            password:''
        };
    }

    componentWillMount() {
        if (Platform.OS === 'android') {
            StatusBar.setTranslucent(true)
            StatusBar.setBackgroundColor('transparent')// 仅android
        }
        
        BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid);
        const {navigate} = this.props.navigation;
        storage.load({
            key:'user',
            autoSync: true,
            syncInBackground: true,
        }).then(ret => {
            console.log(ret)
            let account = ret.account;
            let password = ret.password;
            if(account!='')
            this.loginFetch(account,password)
            
        }).catch(err => {
            //如果没有找到数据且没有sync方法，
            //或者有其他异常，则在catch中返回
            console.log(err);
            switch (err.name) {
                case 'NotFoundError':
                    // 更新
                    this.setState({
                        account:'',
                        psw:''
                    });
                    break;
                case 'ExpiredError':
                    // TODO
                    break;
            }
        })
    }
    
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid);
    }
    onBackAndroid = () => {
        
        if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {
            BackAndroid.exitApp()
        }
        this.lastBackPressed = Date.now();
        ToastAndroid.show('再按一次退出应用',1000);
        return true;
        
    };

    login() {
        const {account, password} = this.state;
        this.loginFetch(account,password)
    }

    loginFetch(account,password){
        const {navigate} = this.props.navigation;
        MyFetch.postString(
            '/ajaxUser.do?method=Login',
            `username=${account}&password=${password}`,
            (response) => {
                console.log(response);
                if (response['_bodyText'] === 'ok') {
                    storage.save({
                        key:'user',    // 注意:请不要在key中使用_下划线符号!
                        rawData: {
                            account:account,
                            password:password
                        },
                    });
        
                    navigate('Menu')
                } else {
                    Alert.alert(
                        '提示',
                        '账号或密码错误',
                    );
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

    render() {
        return (
        <View style={styles.container}>  
            <StatusBar hidden={false}></StatusBar>
            <Image source={require('./image/loginBackground.png')}  resizeMode='stretch' style={styles.backgroundImage} />
            <Image source={require('./image/city.png')} resizeMode='contain' style={{flex:1,marginTop:0,width:'100%'}} />
            <KeyboardAvoidingView style={{alignItems:'center',justifyContent:'flex-end',width:'100%',height:300}} behavior="padding">
                <Input iconLeft='account' content={this.state.account} type='account' onChangeText={account => this.setState({account})}/>
                <Input iconLeft='password' content={this.state.password} type='password' onChangeText={password => this.setState({password})}/>
            </KeyboardAvoidingView>
            <TouchableOpacity onPress={() => this.login()} style={styles.loginBtn}>
                <Text style={{color:'#fff'}}>登录</Text>
            </TouchableOpacity>
            <View style={{flex:0.4}}></View>
        </View>  
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:'column',
    flexWrap:'wrap',
    alignItems:'center',
    justifyContent:'center'
  },
  backgroundImage:{
    position:'absolute',
    top:0,
    left:0,
  },
  loginBtn: {
    marginTop:40,
    width:80,
    height:80,
    borderRadius:40,
    backgroundColor:'#7082A6',
    alignItems:'center',
    justifyContent:'center',
  }
});
