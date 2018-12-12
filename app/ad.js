import React, {Component} from 'react';
import { StyleSheet, Platform, Text, StatusBar, View, Image} from 'react-native';
import storage from './gStorage';


export default class Ad extends Component {

    constructor(props){
        super(props)
        this.state={

        }
    }
    componentDidMount(){
        // 广告页隐藏状态栏
        if (Platform.OS === 'android') {
            StatusBar.setTranslucent(true)
            StatusBar.setBackgroundColor('transparent')// 仅android
        }
        const {navigate} = this.props.navigation;
        setTimeout(() => { navigate('Login'); }, 2000) 
    }

    render() {
        return (
            <View style={styles.rootView}>
                <StatusBar hidden={true}></StatusBar>
                <Image source={require('./image/loginBackground.png')} resizeMode='cover' style={styles.backgroundImage} />
                <Image source={require('./image/logo.png')} resizeMode='contain' style={styles.logo} />
                <Text style={styles.bottom}>杭州市城市建设投资有限公司</Text>
            </View>
        );
    }
}
//bolt cogs file phone address-book-o wrench

const styles = StyleSheet.create({
    rootView: {
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
      width:'100%',
      height:'100%'
    },
    logo:{
        width:'50%'
    },
    bottom: {
        position:'absolute',
        top:'90%',
        color:'#fff',
        fontSize:9
    }
});


