import React, {Component} from 'react';
import { StyleSheet,PanResponder,Animated,BackAndroid,Linking,FlatList,TouchableOpacity,ToastAndroid,TouchableWithoutFeedback, Platform,ImageBackground,Dimensions, BackHandler, StatusBar,Text, View, Image} from 'react-native';
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
            type:true,
            mainHeight:new Animated.Value(myPt*344),
            itemImageTop:new Animated.Value(myPt*18),
            mainItemWidth:new Animated.Value(myPt*103),
            dataSource: [{key:'a'},{key:'b'},{key:'c'}],
            loaded: false,
            bottomType:2,
            hasNext:true,
            Current:new Animated.Value(0),
            colorArr:['#C05959','#757575','#5984C0','#68E180'],
            changeing:false
        }
    }
    componentWillMount() {
        this._onload()
        this._panResponder = PanResponder.create({
          // 要求成为响应者：
          onStartShouldSetPanResponder: (evt, gestureState) => false,
          onStartShouldSetPanResponderCapture: (evt, gestureState) => false,
          onMoveShouldSetPanResponder: (evt, gestureState) => {
            let {dx,dy} = gestureState;
            if((Math.abs(dx) > 20) || (Math.abs(dy) > 20)){
                return true
            }else{
                return false
            }
          },
          onMoveShouldSetPanResponderCapture: (evt, gestureState) => false,
    
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
                    itemImageTop:new Animated.Value(myPt*10+8*gestureState.dy/100),
                    mainItemWidth:new Animated.Value(myPt*50+53*gestureState.dy/100),
                })
            }else if(gestureState.dy<0 && gestureState.dy>-100){
                this.setState({
                    mainHeight:new Animated.Value(myPt*344+224*gestureState.dy/100),
                    itemImageTop:new Animated.Value(myPt*18+10*gestureState.dy/100),
                    mainItemWidth:new Animated.Value(myPt*103+53*gestureState.dy/100),
                })
            }else if(gestureState.dy>=100){
                this.setState({
                    type:true,
                    mainHeight:new Animated.Value(myPt*344),
                    itemImageTop:new Animated.Value(myPt*18),
                    mainItemWidth:new Animated.Value(myPt*103),
                })
            }else if(gestureState.dy<=-100){
                this.setState({
                    type:false,
                    mainHeight:new Animated.Value(myPt*120),
                    itemImageTop:new Animated.Value(myPt*10),
                    mainItemWidth:new Animated.Value(myPt*50),
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
        //this.changeMain(true)
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
    refreshing(index){
        let _this = this
        this.myPromise(true).then(function(){
            _this.setState({
                loaded:true,
                index:1,
                hasNext:true,
                dataSource:[],
                bottomType:index
            })
        }).then(function(){
            _this._onload();
        })
    }

    _onload(){
        const {bottomType} = this.state
        if(bottomType == 2){
            this.getTz(2);
        } else if(bottomType == 1){
            this.getTz(1);
        } else {
            this.getDownload(3)
        }
    }

    getTz(index){
            MyFetch.get(
                'ajaxNotice.do?method=GetIndex',
                {de:index,ect:Math.random()},
                res => {
                    console.log(res)
                    let arr=[]
                    for(let i=0;i<res.rows.length;i++){
                        let item = {}
                        item.key = res.rows[i].id;
                        item.title = res.rows[i].data[1];
                        item.day = res.rows[i].data[2].substring(0,10);
                        arr.push(item)
                    }
                    this.setState({
                        dataSource:arr,
                        loaded:false,
                        hasNext:false,
                        bottomType:index
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

    getDownload(index){
        MyFetch.get(
            'ajaxEntfileRecord.do?method=InitFirst2&ent_id=information',
            {ect:Math.random()},
            res => {
                console.log(res)
                let arr=[]
                for(let i=0;i<res.length;i++){
                    let item = {}
                    item.key = res[i].def1;
                    item.title = res[i].displayname;
                    item.day = res[i].file_size
                    arr.push(item)
                }
                this.setState({
                    dataSource:arr,
                    loaded:false,
                    hasNext:false,
                    bottomType:index
                })
                console.log(this.state.dataSource)
            },
            err => {
            Alert.alert('获取附件错误', err.message, [
                { text: '确定' }
            ])
            }
        )
    }

    godetail(item){
        const { navigate } = this.props.navigation; 
        const {bottomType} = this.state
        if(bottomType ==1 || bottomType == 2){
            navigate('Webview',{id:item.key,type:bottomType})
        }else{
            Linking.openURL(MyFetch.rootUrl+item.key)
        }
    }

    goList(index){
        const { navigate } = this.props.navigation; 
        navigate('List',{index:index})
    }

    renderRow(item,index){
            return <TouchableOpacity style={styles.item} onPress={()=> this.godetail(item)}>
                        <View style={styles.item1First}>
                        </View>
                        <View style={[styles.item2First,{}]}>
                            <Text style={{textAlign:"left",paddingRight:10,width:myPt*222,borderRightColor:"#7082A6",borderRightWidth:1,color:"#9EA0B1",fontWeight:'600'}}>{item.title}</Text>
                        </View>
                        <View style={[styles.item3First,{flex:1}]}>
                            <Text style={{width:'100%',textAlign:'center',fontSize:9}}>{item.day}</Text>
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
                  duration: 200,
                }),
                Animated.timing(this.state.itemImageTop, {
                    toValue: myPt*18,
                    duration: 200,
                }),
                Animated.timing(this.state.mainItemWidth, {
                    toValue: myPt*103,
                    duration: 200,
                }),
                // 可以添加其他动画
            ]).start(()=>{
                this.setState({
                    type:type,
                    changeing:false
                })
            })
        }else{//变小
            Animated.parallel([
                Animated.timing(this.state.mainHeight, {
                    toValue: myPt*120,
                    duration: 200,
                }),
                Animated.timing(this.state.itemImageTop, {
                    toValue: myPt*10,
                    duration: 200,
                }),
                Animated.timing(this.state.mainItemWidth, {
                    toValue: myPt*50,
                    duration: 200,
                }),
                // 可以添加其他动画
            ]).start(()=>{
                this.setState({
                    type:type,
                    changeing:false
                })
            })
        }
    }

    _onscroll(event){
        if(this.state.changeing){
            return ;
        }else if(event.nativeEvent.contentOffset.y>=100){
            this.changeMain(false)
        }
    }

    render() {
        return (
            <View style={styles.rootView}>
                <Image source={require('./image/menuTop.png')}  resizeMode='contain' style={[styles.backgroundTop,{height:myPt*244}]} /> 
                <Myheader leftBtn="exit" rightBtn='message' navigation={this.props.navigation} title="功能列表"></Myheader>
                
                <Animated.View {...this._panResponder.panHandlers} style={[styles.main,{height:this.state.mainHeight}]}> 
                    <TouchableOpacity onPress={()=>this.goList(1)}>
                        <Animated.View style={[styles.mainItem,{width:this.state.mainItemWidth}]}>
                                <Animated.Image source={require('./image/mainItem/1.png')} style={[styles.mainItemImage,{marginTop:this.state.itemImageTop}]}  resizeMode='contain' />
                                {this.state.type?<Text style={styles.mainItemText}>投委会项目跟踪</Text>:<View></View>}
                        </Animated.View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>this.goList(2)}>
                        <Animated.View style={[styles.mainItem,{width:this.state.mainItemWidth}]}>
                                <Animated.Image source={require('./image/mainItem/2.png')} style={[styles.mainItemImage,{marginTop:this.state.itemImageTop}]}  resizeMode='contain' />
                                {this.state.type?<Text style={styles.mainItemText}>PPP项目</Text>:<View></View>}
                        </Animated.View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>this.goList(3)}>
                        <Animated.View style={[styles.mainItem,{width:this.state.mainItemWidth}]}>
                                <Animated.Image source={require('./image/mainItem/3.png')} style={[styles.mainItemImage,{marginTop:this.state.itemImageTop}]}  resizeMode='contain' />
                                {this.state.type?<Text style={styles.mainItemText}>类金融固收</Text>:<View></View>}
                        </Animated.View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>this.goList(4)}>
                        <Animated.View style={[styles.mainItem,{width:this.state.mainItemWidth}]}>
                                <Animated.Image source={require('./image/mainItem/4.png')} style={[styles.mainItemImage,{marginTop:this.state.itemImageTop}]}  resizeMode='contain' />
                                {this.state.type?<Text style={styles.mainItemText}>类金融定增</Text>:<View></View>}
                        </Animated.View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>this.goList(5)}>
                        <Animated.View style={[styles.mainItem,{width:this.state.mainItemWidth}]}>
                                <Animated.Image source={require('./image/mainItem/5.png')} style={[styles.mainItemImage,{marginTop:this.state.itemImageTop}]}  resizeMode='contain' />
                                {this.state.type?<Text style={styles.mainItemText}>类金融并购</Text>:<View></View>}
                        </Animated.View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>this.goList(6)}>
                        <Animated.View style={[styles.mainItem,{width:this.state.mainItemWidth}]}>
                                <Animated.Image source={require('./image/mainItem/6.png')} style={[styles.mainItemImage,{marginTop:this.state.itemImageTop}]}  resizeMode='contain' />
                                {this.state.type?<Text style={styles.mainItemText}>类金融保理</Text>:<View></View>}
                        </Animated.View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>this.goList(7)}>
                        <Animated.View style={[styles.mainItem,{width:this.state.mainItemWidth}]}>
                                <Animated.Image source={require('./image/mainItem/7.png')} style={[styles.mainItemImage,{marginTop:this.state.itemImageTop}]}  resizeMode='contain' />
                                {this.state.type?<Text style={styles.mainItemText}>类金融PE</Text>:<View></View>}
                        </Animated.View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>this.goList(8)}>
                        <Animated.View style={[styles.mainItem,{width:this.state.mainItemWidth}]}>
                                <Animated.Image source={require('./image/mainItem/8.png')} style={[styles.mainItemImage,{marginTop:this.state.itemImageTop}]}  resizeMode='contain' />
                                {this.state.type?<Text style={styles.mainItemText}>产业化基金</Text>:<View></View>}
                        </Animated.View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>this.goList(9)}>
                        <Animated.View style={[styles.mainItem,{width:this.state.mainItemWidth}]}>
                                <Animated.Image source={require('./image/mainItem/9.png')} style={[styles.mainItemImage,{marginTop:this.state.itemImageTop}]}  resizeMode='contain' />
                                {this.state.type?<Text style={styles.mainItemText}>房地产类（并购、股权投资）</Text>:<View></View>}
                        </Animated.View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>this.goList(10)}>
                        <Animated.View style={[styles.mainItem,{width:this.state.mainItemWidth}]}>
                                <Animated.Image source={require('./image/mainItem/10.png')} style={[styles.mainItemImage,{marginTop:this.state.itemImageTop}]}  resizeMode='contain' />
                                {this.state.type?<Text style={styles.mainItemText}>房地产（招拍挂）</Text>:<View></View>}
                        </Animated.View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>this.goList(11)}>
                        <Animated.View style={[styles.mainItem,{width:this.state.mainItemWidth}]}>
                                <Animated.Image source={require('./image/mainItem/10.png')} style={[styles.mainItemImage,{marginTop:this.state.itemImageTop}]}  resizeMode='contain' />
                                {this.state.type?<Text style={styles.mainItemText}>融资租赁</Text>:<View></View>}
                        </Animated.View>
                    </TouchableOpacity>
                </Animated.View>
                <View style={styles.centerView}>
                    <TouchableWithoutFeedback onPress={() => this.refreshing(2)} style={{}}>
                        <Text style={this.state.bottomType==2?{width:'33%',borderRightColor:'#7082A6',borderRightWidth:1,fontSize:12,textAlign:'center',color:'#000',fontWeight:'600'}:{width:'33%',borderRightColor:'#7082A6',borderRightWidth:1,fontSize:12,textAlign:'center',color:'#9E9E9E'}}>投资动态</Text>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => this.refreshing(1)} style={{}}>
                        <Text style={this.state.bottomType==1?{width:'33%',borderRightColor:'#7082A6',borderRightWidth:1,fontSize:12,textAlign:'center',color:'#000',fontWeight:'600'}:{width:'33%',borderRightColor:'#7082A6',borderRightWidth:1,fontSize:12,textAlign:'center',color:'#9E9E9E'}}>投资分析</Text>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => this.refreshing(3)} style={{}}>
                        <Text style={this.state.bottomType==3?{width:'33%',fontSize:12,textAlign:'center',color:'#000',fontWeight:'600'}:{width:'33%',fontSize:12,textAlign:'center',color:'#9E9E9E'}}>管理制度</Text>
                    </TouchableWithoutFeedback>
                </View>
                <View style={[styles.list,]}>
                        <FlatList
                        data={this.state.dataSource}
                        ListFooterComponent={this._footer.bind(this)}
                        onRefresh={this.refreshing.bind(this)}
                        onScroll={this._onscroll.bind(this)}
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
        overflow:'hidden'
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


