import React, {Component} from 'react';
import { Text, TouchableOpacity,Linking,FlatList,ScrollView,Dimensions,StatusBar, StyleSheet, View, Image} from 'react-native';
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
        if(type==2 || type ==1){
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
            'ajaxEntfileRecord.do?method=init_all',
            {id:id,ect:Math.random()},
            res => {
                console.log(res)
                let arr=[]
                for(let i=0;i<res.length;i++){
                    let item = {}
                    item.key = res[i].def1;
                    item.title = res[i].displayname;
                    item.size = res[i].file_size;
                    arr.push(item)
                }
                this.setState({
                    dataSource:arr
                })
            },
            err => {
            Alert.alert('登录发生错误：', err.message, [
                { text: '确定' }
            ])
            }
        )
    }

    renderRow(item,index){
        return <TouchableOpacity style={styles.item} onPress={()=> Linking.openURL(MyFetch.rootUrl+item.key)}>
                        <View style={styles.item1First}>
                        </View>
                        <View style={[styles.item2First,{}]}>
                            <Text style={{textAlign:"left",paddingRight:10,width:myPt*222,borderRightColor:"#7082A6",borderRightWidth:1,color:"#9EA0B1",fontWeight:'600'}}>{item.title}</Text>
                        </View>
                        <View style={[styles.item3First,{flex:1}]}>
                            <Text style={{width:'100%',textAlign:'center',fontSize:12}}>{item.size}</Text>
                        </View>
                </TouchableOpacity>
    }

    render() {
        
        const htmlContent = this.state.htmlContent

        return (
          <View style={styles.container}>
            <Image source={require('./image/detailBackground.png')}  resizeMode='contain' style={[styles.backgroundTop,{height:myPt*170.75}]} /> 
            <Myheader leftBtn="back" navigation={this.props.navigation} title="消息详情"></Myheader>
            <View style={styles.title}>
                <Text style={{color:'#fff',maxHeight:myPt*40,overflow:'hidden',fontSize:myPt*16,marginBottom:8,textAlign:'left'}}>{this.state.title}</Text>
                <Text style={{color:'#fff',maxHeight:myPt*20,overflow:'hidden',fontSize:myPt*10,marginBottom:8,textAlign:'left'}}>推送人：{this.state.recorder}</Text>
                <Text style={{color:'#fff',maxHeight:myPt*20,overflow:'hidden',fontSize:myPt*10,textAlign:'left'}}>推送时间：{this.state.time}</Text>
            </View>
            <ScrollView style={{flex:1,width:myPt*355,marginTop:20}}>
                <HTMLView
                    value={htmlContent}
                    style={{paddingTop:myPt*20}}
                />
            </ScrollView>
            {this.state.dataSource.length>0?<View style={{width:myPt*355,height:myPt*150,marginTop:20}}>
                    <FlatList
                        data={this.state.dataSource}
                        refreshing={false}
                        renderItem={({item,index}) => this.renderRow(item,index)}
                        // onEndReached={this._onload.bind(this)
                        // }
                        // onEndReachedThreshold={0.3}
                        style={[{width:myPt*355,height:myPt*150,marginTop:20}]}
                    />
            </View>:<View></View>}
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
        top:-1,
        position:'absolute',
    },
    title:{
        width:'100%',
        height:myPt*100,
        flexDirection:'column',
        flexWrap:'wrap',
        alignItems:'flex-start',
        justifyContent:'flex-start',
        paddingLeft:myPt*28,
    },
    item:{
        width:myPt*355,
        height:myPt*60,
        backgroundColor:"#fff",
        borderRadius:5,
        flexDirection:'row',
        flexWrap:'nowrap',
        justifyContent:'flex-start',
        alignItems:'center',
        textAlign:'center',
        marginBottom:myPt*5,
        borderRadius:10,
        borderWidth:1,
        borderColor:'#aaa',
    },
    item1First:{
        backgroundColor:"#7082A6",
        width:myPt*10,height:myPt*10,
        borderRadius:myPt*5,
        marginLeft:20*myPt,
        marginRight:10*myPt
    },
    item2First:{
    },
    item3First:{

    },
  });

