import React, {Component} from 'react';
import { StyleSheet,PanResponder,Animated,FlatList,TouchableOpacity,ToastAndroid,TouchableWithoutFeedback, Platform,ImageBackground,Dimensions, BackHandler, StatusBar,Text, View, Image} from 'react-native';
import storage from './gStorage';
import MyFetch from './myFetch';
import Myheader from './components/Myheader'

var {height,width} =  Dimensions.get('window');
let StatusBarHeight = StatusBar.currentHeight;
let myPt = width/375;

export default class Menu extends Component {

    constructor(props){
        super(props)
        this.state={
            type:false,
            mainHeight:new Animated.Value(myPt*120),
            itemImageTop:new Animated.Value(myPt*10),
            mainItemWidth:new Animated.Value(myPt*60),
            dataSource: [{key:'a'},{key:'b'},{key:'c'}],
            loaded: false,
            index:1, //页数
            hasNext:true,
            Current:new Animated.Value(0),
            colorArr:['#C05959','#757575','#5984C0','#68E180']
        }
    }
    componentWillMount() {
        this._panResponder = PanResponder.create({
          // 要求成为响应者：
          onStartShouldSetPanResponder: (evt, gestureState) => true,
          onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
          onMoveShouldSetPanResponder: (evt, gestureState) => true,
          onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
    
          onPanResponderGrant: (evt, gestureState) => {
            // 开始手势操作。给用户一些视觉反馈，让他们知道发生了什么事情！
            // gestureState.{x,y} 现在会被设置为0
          },
          onPanResponderMove: (evt, gestureState) => {
            // 最近一次的移动距离为gestureState.move{X,Y}
            // mainHeight:new Animated.Value(myPt*344),
            // itemImageTop:new Animated.Value(myPt*20),
            // mainItemWidth:new Animated.Value(myPt*103),
            //         mainHeight:new Animated.Value(myPt*120),
            //         itemImageTop:new Animated.Value(myPt*10),
            //         mainItemWidth:new Animated.Value(myPt*60),
            console.log(gestureState.dy)
            if(gestureState.dy>0 && gestureState.dy<100){
                this.setState({
                    mainHeight:new Animated.Value(myPt*120+224*gestureState.dy/100),
                    itemImageTop:new Animated.Value(myPt*10+10*gestureState.dy/100),
                    mainItemWidth:new Animated.Value(myPt*60+43*gestureState.dy/100),
                })
            }else if(gestureState.dy<0 && gestureState.dy>-100){
                this.setState({
                    mainHeight:new Animated.Value(myPt*344+224*gestureState.dy/100),
                    itemImageTop:new Animated.Value(myPt*20+10*gestureState.dy/100),
                    mainItemWidth:new Animated.Value(myPt*103+43*gestureState.dy/100),
                })
            }else if(gestureState.dy>=100){
                this.setState({
                    type:true,
                    mainHeight:new Animated.Value(myPt*344),
                    itemImageTop:new Animated.Value(myPt*20),
                    mainItemWidth:new Animated.Value(myPt*103),
                })
            }else if(gestureState.dy<=-100){
                this.setState({
                    type:false,
                    mainHeight:new Animated.Value(myPt*120),
                    itemImageTop:new Animated.Value(myPt*10),
                    mainItemWidth:new Animated.Value(myPt*60),
                })
            }
            // 从成为响应者开始时的累计手势移动距离为gestureState.d{x,y}
          },
          onPanResponderTerminationRequest: (evt, gestureState) => true,
          onPanResponderRelease: (evt, gestureState) => {
              if(gestureState.dy>50){
                  this.changeMain(true)
              }else if(gestureState.dy<-50){
                  this.changeMain(false)
              }else{
                  this.changeMain(this.state.type)
              }
            // 用户放开了所有的触摸点，且此时视图已经成为了响应者。
            // 一般来说这意味着一个手势操作已经成功完成。
          },
          onPanResponderTerminate: (evt, gestureState) => {
            // 另一个组件已经成为了新的响应者，所以当前手势将被取消。
          },
          onShouldBlockNativeResponder: (evt, gestureState) => {
            // 返回一个布尔值，决定当前组件是否应该阻止原生组件成为JS响应者
            // 默认返回true。目前暂时只支持android。
            return true;
          },
        });
      }
    componentDidMount(){
        //this._onload()
        this.changeMain(true)
        BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid);
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
    refreshing(type){
        if(type == undefined){
            type = this.state.type
        }
        let _this = this
        this.myPromise(true).then(function(){
            _this.setState({
                loaded:true,
                index:1,
                hasNext:true,
                dataSource:[{key:'1'},{key:'2'},{key:'3'}]
            })
        }).then(function(){
            _this._onload();
        })
    }

    _onload(){
        const {index,type} = this.state
    }

    getTodo(index){
        if(!this.state.hasNext){
            return ;
        }
        else{
            MyFetch.get(
                '/snaker/task/app',
                {page:index,pageSize:5},
                res => {
                    console.log(res)
                    let arr=[]
                    for(let i=0;i<res.data.result.length;i++){
                        let item = {}
                        item.key = res.data.result[i].taskVariableMap.id+'';
                        item.title = res.data.result[i].processName;
                        item.taskName = res.data.result[i].taskName;
                        item.creator = res.data.result[i].creator;
                        item.day = res.data.result[i].taskCreateTime.substring(8,10);
                        item.month = res.data.result[i].taskCreateTime.substring(5,7);
                        item.year = res.data.result[i].taskCreateTime.substring(0,4)
                        arr.push(item)

                    }
                    this.setState({
                        dataSource:this.state.dataSource.concat(arr),
                        loaded:false,
                        index:index+1,
                        hasNext:res.data.hasNext
                    })
                    console.log(this.state.dataSource)
                },
                err => {
                Alert.alert('登录发生错误：', err.message, [
                    { text: '确定' }
                ])
                }
            )
            }
        
    }

    renderRow(item,index){
            return <TouchableOpacity style={styles.item} onPress={()=>alert('选择啦')}>
                        <View style={styles.item1First}>
                        </View>
                        <View style={[styles.item2First,{}]}>
                            <Text style={{textAlign:"left",width:myPt*222,borderRightColor:"#7082A6",borderRightWidth:1,color:"#9EA0B1",fontWeight:'600'}}>2018年上半年投资计划</Text>
                        </View>
                        <View style={[styles.item3First,{flex:1}]}>
                            <Text style={{width:'100%',textAlign:'center',fontSize:9}}>2018-10-15</Text>
                        </View>
                </TouchableOpacity>
    }

    _footer(){
        if(!this.state.hasNext){
            return <Text style={{color:'#fff',textAlign:"center"}}>没有更多了</Text>
        }
        else if(this.state.hasNext){
            return <Text style={{color:'#fff',textAlign:"center"}}></Text>;
        }
    }

    changeMain(type){
        if(type){//变大
            Animated.parallel([
                Animated.timing(this.state.mainHeight, {
                  toValue: myPt*344,
                  duration: 500,
                }),
                Animated.timing(this.state.itemImageTop, {
                    toValue: myPt*20,
                    duration: 500,
                }),
                Animated.timing(this.state.mainItemWidth, {
                    toValue: myPt*103,
                    duration: 500,
                }),
                // 可以添加其他动画
            ]).start(()=>{
                this.setState({
                    type:type
                })
            })
        }else{//变小
            Animated.parallel([
                Animated.timing(this.state.mainHeight, {
                    toValue: myPt*120,
                    duration: 500,
                }),
                Animated.timing(this.state.itemImageTop, {
                    toValue: myPt*10,
                    duration: 500,
                }),
                Animated.timing(this.state.mainItemWidth, {
                    toValue: myPt*60,
                    duration: 500,
                }),
                // 可以添加其他动画
            ]).start(()=>{
                this.setState({
                    type:type
                })
            })
        }
    }
    render() {
        return (
            <View style={styles.rootView}>
                <Image source={require('./image/menuTop.png')}  resizeMode='contain' style={[styles.backgroundTop,{height:myPt*244}]} /> 
                <Myheader leftBtn="exit" rightBtn='message' navigation={this.props.navigation} title="功能列表"></Myheader>
                
                <Animated.View {...this._panResponder.panHandlers} style={[styles.main,{height:this.state.mainHeight}]}> 
                    <TouchableWithoutFeedback>
                        <Animated.View style={[styles.mainItem,{width:this.state.mainItemWidth}]}>
                                <Animated.Image source={require('./image/mainItem/1.png')} style={[styles.mainItemImage,{marginTop:this.state.itemImageTop}]}  resizeMode='contain' />
                                {this.state.type?<Text style={styles.mainItemText}>投委会项目跟踪</Text>:<View></View>}
                        </Animated.View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback>
                        <Animated.View style={[styles.mainItem,{width:this.state.mainItemWidth}]}>
                                <Animated.Image source={require('./image/mainItem/2.png')} style={[styles.mainItemImage,{marginTop:this.state.itemImageTop}]}  resizeMode='contain' />
                                {this.state.type?<Text style={styles.mainItemText}>PPP项目</Text>:<View></View>}
                        </Animated.View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback>
                        <Animated.View style={[styles.mainItem,{width:this.state.mainItemWidth}]}>
                                <Animated.Image source={require('./image/mainItem/3.png')} style={[styles.mainItemImage,{marginTop:this.state.itemImageTop}]}  resizeMode='contain' />
                                {this.state.type?<Text style={styles.mainItemText}>类金融固收</Text>:<View></View>}
                        </Animated.View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback>
                        <Animated.View style={[styles.mainItem,{width:this.state.mainItemWidth}]}>
                                <Animated.Image source={require('./image/mainItem/4.png')} style={[styles.mainItemImage,{marginTop:this.state.itemImageTop}]}  resizeMode='contain' />
                                {this.state.type?<Text style={styles.mainItemText}>类金融定增</Text>:<View></View>}
                        </Animated.View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback>
                        <Animated.View style={[styles.mainItem,{width:this.state.mainItemWidth}]}>
                                <Animated.Image source={require('./image/mainItem/5.png')} style={[styles.mainItemImage,{marginTop:this.state.itemImageTop}]}  resizeMode='contain' />
                                {this.state.type?<Text style={styles.mainItemText}>类金融并购</Text>:<View></View>}
                        </Animated.View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback>
                        <Animated.View style={[styles.mainItem,{width:this.state.mainItemWidth}]}>
                                <Animated.Image source={require('./image/mainItem/6.png')} style={[styles.mainItemImage,{marginTop:this.state.itemImageTop}]}  resizeMode='contain' />
                                {this.state.type?<Text style={styles.mainItemText}>类金融保理</Text>:<View></View>}
                        </Animated.View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback>
                        <Animated.View style={[styles.mainItem,{width:this.state.mainItemWidth}]}>
                                <Animated.Image source={require('./image/mainItem/7.png')} style={[styles.mainItemImage,{marginTop:this.state.itemImageTop}]}  resizeMode='contain' />
                                {this.state.type?<Text style={styles.mainItemText}>类金融PE</Text>:<View></View>}
                        </Animated.View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback>
                        <Animated.View style={[styles.mainItem,{width:this.state.mainItemWidth}]}>
                                <Animated.Image source={require('./image/mainItem/8.png')} style={[styles.mainItemImage,{marginTop:this.state.itemImageTop}]}  resizeMode='contain' />
                                {this.state.type?<Text style={styles.mainItemText}>产业化基金</Text>:<View></View>}
                        </Animated.View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback>
                        <Animated.View style={[styles.mainItem,{width:this.state.mainItemWidth}]}>
                                <Animated.Image source={require('./image/mainItem/9.png')} style={[styles.mainItemImage,{marginTop:this.state.itemImageTop}]}  resizeMode='contain' />
                                {this.state.type?<Text style={styles.mainItemText}>并购、股权投资</Text>:<View></View>}
                        </Animated.View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback>
                        <Animated.View style={[styles.mainItem,{width:this.state.mainItemWidth}]}>
                                <Animated.Image source={require('./image/mainItem/10.png')} style={[styles.mainItemImage,{marginTop:this.state.itemImageTop}]}  resizeMode='contain' />
                                {this.state.type?<Text style={styles.mainItemText}>招拍挂</Text>:<View></View>}
                        </Animated.View>
                    </TouchableWithoutFeedback>
                </Animated.View>
                <View style={styles.centerView}>
                    <TouchableWithoutFeedback onPress={() => alert('1')} style={{}}>
                        <Text style={{width:'33%',borderRightColor:'#7082A6',borderRightWidth:1,fontSize:12,textAlign:'center',color:'#9E9E9E'}}>投资动态</Text>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => alert('2')} style={{}}>
                        <Text style={{width:'33%',borderRightColor:'#7082A6',borderRightWidth:1,fontSize:12,textAlign:'center',color:'#9E9E9E'}}>投资分析</Text>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => alert('3')} style={{}}>
                        <Text style={{width:'33%',fontSize:12,textAlign:'center',color:'#9E9E9E'}}>附件下载</Text>
                    </TouchableWithoutFeedback>
                </View>
                <View style={[styles.list,]}>
                        <FlatList
                        data={this.state.dataSource}
                        ListFooterComponent={this._footer.bind(this)}
                        onRefresh={this.refreshing.bind(this)}
                        refreshing={this.state.loaded}
                        initialNumToRender={2}
                        renderItem={({item,index}) => this.renderRow(item,index)}
                        onEndReached={this._onload.bind(this)
                        }
                        onEndReachedThreshold={0.3}
                        style={[styles.list,]}
                        />
                </View>
            </View>
        );
    }
    myPromise (flag) {
        var promise = new Promise(function (resolve, reject) {
            if (flag) {
                resolve("resolve");
            } else {
                reject("reject");
            }
        });
        return promise;
    }
}

//bolt cogs file phone address-book-o wrench

const styles = StyleSheet.create({
    rootView: {
        flex: 1,
        flexDirection:'column',
        flexWrap:'wrap',
        alignItems:'center',
        justifyContent:'flex-start',
        backgroundColor:'#FCFCFC',
        marginTop:0-StatusBarHeight,paddingTop:StatusBarHeight
    },
    main:{
        width:myPt*318,
        marginTop:myPt*30,
        backgroundColor:'#fff',
        borderRadius:10,
        borderWidth:1,
        borderColor:'#aaa',
        flexDirection:'row',
        flexWrap:'wrap',
        alignItems:'flex-start',
        justifyContent:'center',
    },
    mainItem:{
        flexDirection:'column',
        flexWrap:'nowrap',
        justifyContent:'flex-start',
        alignItems:'center'
    },
    mainItemImage:{
        height:myPt*40,
        width:myPt*40,
        marginBottom:myPt*10
    },
    mainItemText:{
        width:'100%',
        fontSize:10*myPt,
        textAlign:'center'
    },
    backgroundTop:{
        width:'100%',
        top:0,
        position:'absolute',
    },
    centerView:{
        width:300*myPt,
        height:38*myPt,
        flexDirection:'row',
        backgroundColor:'#fff',
        borderRadius:10,
        borderWidth:1,
        borderColor:'#aaa',
        marginTop:myPt*10,
        marginBottom:myPt*10,
        flexWrap:'wrap',
        justifyContent:'flex-start',
        alignItems:'center'
    },
    list:{
        backgroundColor:'transparent',
        flex:1,width:myPt*355
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


