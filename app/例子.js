import React, {Component} from 'react';
import { Text, TouchableOpacity,Dimensions,StatusBar, StyleSheet, View, Image} from 'react-native';
import HTMLView from 'react-native-htmlview';
import Myheader from './components/Myheader'
import MyFetch from './myFetch';


var {height,width} =  Dimensions.get('window');
let StatusBarHeight = StatusBar.currentHeight;
let myPt = width/375;

export default class Webview extends Component{

    constructor(props) {
        super(props);
        this.state = {
            title:'',
            htmlContent:''
         };
    }

    componentWillMount(){
        const {id,type} = this.props.navigation.state.params
        if(type==1){
            this.getContent(id)
        }
    }

    getContent(id){
        MyFetch.get(
            'ajaxNotice.do?method=GetNotice2',
            {NoticeID:id,ect:Math.random()},
            res => {
                console.log(res)
                this.setState({
                    title:res.fldzcbt,
                    htmlContent:res.fldtznr,
                })
            },
            err => {
            Alert.alert('登录发生错误：', err.message, [
                { text: '确定' }
            ])
            }
        )
    }

    render() {
        
        const htmlContent = this.state.htmlContent

        return (
          <View style={styles.container}>
            <Image source={require('./image/menuTop.png')}  resizeMode='contain' style={[styles.backgroundTop,{height:myPt*244}]} /> 
            <Myheader leftBtn="back" navigation={this.props.navigation} title="消息详情"></Myheader>
                
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
        justifyContent:'flex-start',
        backgroundColor:'#FCFCFC',
        marginTop:0-StatusBarHeight,paddingTop:StatusBarHeight
    },
    backgroundTop:{
        width:'100%',
        top:0,
        position:'absolute',
    },
  });

