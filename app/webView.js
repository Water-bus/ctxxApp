import React, {Component} from 'react';
import { Text, TouchableOpacity,ScrollView,Dimensions,StatusBar, StyleSheet, View, Image} from 'react-native';
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
            htmlContent:'',
            time:'',
            recorder:'',
            dataSource:[]
         };
    }

    componentWillMount(){
        const {id,type} = this.props.navigation.state.params
        if(type==1){
            this.getContent(id)
        }
    }

    getContent(id){
        const _this = this
        MyFetch.get(
            'ajaxNotice.do?method=GetNotice2',
            {NoticeID:id,ect:Math.random()},
            res => {
                console.log(res)
                this.setState({
                    title:res.fldzcbt,
                    htmlContent:res.fldtznr,
                    recorder:res.recorder,
                    time:res.fldfbsj
                })
                _this.getFold(res.def2)
            },
            err => {
            Alert.alert('登录发生错误：', err.message, [
                { text: '确定' }
            ])
            }
        )
    }
    getFold(id){
        MyFetch.get(
            'ajaxNotice.do?method=GetNotice2',
            {NoticeID:id,ect:Math.random()},
            res => {
                console.log(res)
                this.setState({
                    title:res.fldzcbt,
                    htmlContent:res.fldtznr,
                    recorder:res.recorder,
                    time:res.fldfbsj
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
            <Image source={require('./image/detailBackground.png')}  resizeMode='contain' style={[styles.backgroundTop,{height:myPt*170}]} /> 
            <Myheader leftBtn="back" navigation={this.props.navigation} title="消息详情"></Myheader>
            <View style={styles.title}>
                <Text style={{color:'#fff',maxHeight:40,overflow:'hidden',fontSize:16,marginBottom:8,textAlign:'left'}}>{this.state.title}</Text>
                <Text style={{color:'#fff',maxHeight:40,overflow:'hidden',fontSize:10,marginBottom:8,textAlign:'left'}}>推送人：{this.state.recorder}</Text>
                <Text style={{color:'#fff',maxHeight:40,overflow:'hidden',fontSize:10,textAlign:'left'}}>推送时间：{this.state.time}</Text>
            </View>
            <ScrollView style={{flex:1,width:myPt*262}}>
                <HTMLView
                    value={htmlContent}
                />
            </ScrollView>
            <View style={{width:myPt*262,height:myPt*150,marginTop:20}}>
                    <FlatList
                        data={this.state.dataSource}
                        ListFooterComponent={this._footer.bind(this)}
                        onRefresh={this.refreshing.bind(this)}
                        refreshing={this.state.loaded}
                        initialNumToRender={2}
                        renderItem={({item,index}) => this.renderRow(item,index)}
                        // onEndReached={this._onload.bind(this)
                        // }
                        // onEndReachedThreshold={0.3}
                        style={[styles.list,]}
                    />
            </View>
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
    title:{
        width:'100%',
        height:myPt*100,
        flexDirection:'column',
        flexWrap:'wrap',
        alignItems:'flex-start',
        justifyContent:'flex-start',
        paddingLeft:myPt*28
    }
  });

