import React, {Component} from 'react';
import { Text, TouchableOpacity,FlatList,Dimensions,StatusBar, StyleSheet, View, Image} from 'react-native';
import HTMLView from 'react-native-htmlview';
import Myheader from './components/Myheader'
import MyFetch from './myFetch';


var {height,width} =  Dimensions.get('window');
let StatusBarHeight = StatusBar.currentHeight;
let myPt = width/375;

export default class List extends Component{

    constructor(props) {
        super(props);
        this.state = {
            title:'',
            index:'',
            dataSource:[],
            hasNext:true,
            loaded:false,
            searchText:''
         };
    }

    componentWillMount(){

        const {index} = this.props.navigation.state.params
        this.setState({
            index:index
        })
        this._onload()
    }

    _onload(){
        const {index} = this.props.navigation.state.params
        let url = '';
        let title = ''
        if(index==1){
            url = 'ajaxProjectMeeting'
            title = '投委会项目跟踪'
        }else if(index == 2){
            url = 'ajaxProgressNew'
            title = 'PPP项目'
        }else if(index == 3){
            url = 'ajaxFinancelgs'
            title = '类金融固收'
        }else if(index == 4){
            url = 'ajaxFinanceDz'
            title = '类金融定增'
        }else if(index == 5){
            url = 'ajaxFinanceSolid'
            title = '类金融并购'
        }else if(index == 6){
            url = 'ajaxFinanceFactoring'
            title = '类金融保理'
        }else if(index == 7){
            url = 'ajaxFinancePe'
            title = '类金融PE'
        }else if(index == 8){
            url = 'ajaxFinanceFund'
            title = '产业化基金'
        }else if(index == 9){
            url = 'ajaxEstateMerger'
            title = '房地产类（并购、股权投资）'
        }else if(index == 10){
            url = 'ajaxEstateAuction'
            title = '房地产（招拍挂）'
        }else if(index == 11){
            url = 'ajaxFinanceLease'
            title = '融资租赁'
        }
        this.setState({
            title:title
        })
        url = url+'.do?method=applist'
        this.getContent(url,index)
    }

    getContent(url,index){
        MyFetch.get(
            url,
            {ect:Math.random()},
            res => {
                console.log(res)
                let arr = [];
                if(index==1){
                    arr = this.index1(res)
                }else if(index == 2){
                    arr = this.index2(res)
                }else if(index == 3){
                    arr = this.index3(res)
                }else if(index == 4){
                    arr = this.index4(res)
                }else if(index == 5){
                    arr = this.index5(res)
                }else if(index == 6){
                    arr = this.index6(res)
                }else if(index == 7){
                    arr = this.index7(res)
                }else if(index == 8){
                    arr = this.index8(res)
                }else if(index == 9){
                    arr = this.index9(res)
                }else if(index == 10){
                    arr = this.index10(res)
                }else if(index == 10){
                    arr = this.index11(res)
                }
                this.setState({
                    loaded:false,
                    hasNext:false,
                    dataSource:arr,
                })
            },
            err => {
            Alert.alert('登录发生错误：', err.message, [
                { text: '确定' }
            ])
            }
        )
    }

    index1(res){
        let arr =[]
        for(let i=0;i<res.length;i++){
            let item = {}
            item.key = res[i].uuid;
            item.title = res[i].title;
            item.no = res[i].no;
            item.day = res[i].meetingDate;
            item.responsibleUnits = res[i].responsibleUnits;
            item.allowTime = res[i].def3;
            item.progress = res[i].projectProgress;
            item.show = true
            arr.push(item)
        }
        return arr
    }
    index2(res){
        let arr =[]
        for(let i=0;i<res.length;i++){
            let item = {}
            item.key = res[i].uuid;
            item.a = res[i].projectName;
            item.b = res[i].termCooperation;
            item.c = res[i].fundsSum;
            item.d = res[i].investmentSum;
            item.e = res[i].def1;
            item.show = true
            arr.push(item)
        }
        return arr
    }
    index3(res){
        let arr =[]
        for(let i=0;i<res.length;i++){
            let item = {}
            item.key = res[i].uuid;
            item.a = res[i].financialCompany;
            item.b = res[i].category;
            item.c = res[i].companySize;
            item.d = res[i].projectName;
            item.e = res[i].investmentMoney;
            item.f = res[i].investmentCost;
            item.g = res[i].def1;
            item.show = true
            arr.push(item)
        }
        return arr
    }
    index4(res){
        let arr =[]
        for(let i=0;i<res.length;i++){
            let item = {}
            item.key = res[i].uuid;
            item.a = res[i].financialCompany;
            item.b = res[i].fund;
            item.c = res[i].companySize;
            item.d = res[i].stockName;
            item.e = res[i].investmentMoney;
            item.f = res[i].investmentCost;
            item.g = res[i].def1;
            item.show = true
            arr.push(item)
        }
        return arr
    }
    index5(res){
        let arr =[]
        for(let i=0;i<res.length;i++){
            let item = {}
            item.key = res[i].uuid;
            item.a = res[i].financialCompany;
            item.b = res[i].fundName;
            item.c = res[i].fundSize;
            item.d = res[i].projectName;
            item.e = res[i].investmentDate;
            item.f = res[i].investmentMoney;
            item.g = res[i].investmentCost;
            item.h = res[i].def1;
            item.show = true
            arr.push(item)
        }
        return arr
    }
    index6(res){
        let arr =[]
        for(let i=0;i<res.length;i++){
            let item = {}
            item.key = res[i].uuid;
            item.a = res[i].financialCompany;
            item.b = res[i].fundName;
            item.c = res[i].fundDate;
            item.d = res[i].fundSize;
            item.e = res[i].fundSize2;
            item.f = res[i].projectName;
            item.g = res[i].investmentMoney;
            item.h = res[i].def1;
            item.show = true
            arr.push(item)
        }
        return arr
    }
    index7(res){
        let arr =[]
        for(let i=0;i<res.length;i++){
            let item = {}
            item.key = res[i].uuid;
            item.a = res[i].financialCompany;
            item.b = res[i].fundName;
            item.c = res[i].fundSize;
            item.d = res[i].projectName;
            item.e = res[i].investmentMoney;
            item.f = res[i].investmentCost;
            item.g = res[i].def1;
            item.show = true
            arr.push(item)
        }
        return arr
    }
    index8(res){
        let arr =[]
        for(let i=0;i<res.length;i++){
            let item = {}
            item.key = res[i].uuid;
            item.a = res[i].financialCompany;
            item.b = res[i].fundName;
            item.c = res[i].fundDate;
            item.d = res[i].fundSize;
            item.e = res[i].projectName;
            item.f = res[i].projectIntroduce;
            item.g = res[i].investmentMoney;
            item.h = res[i].investmentCost;
            item.i = res[i].def1;
            item.show = true
            
            arr.push(item)
        }
        return arr
    }
    index9(res){
        let arr =[]
        for(let i=0;i<res.length;i++){
            let item = {}
            item.key = res[i].uuid;
            item.a = res[i].projectName;
            item.b = res[i].buildArea;
            item.c = res[i].transactionPrice;
            item.d = res[i].payPrice;
            item.e = res[i].investmentYearSum;
            item.f = res[i].salesSum;
            item.g = res[i].def1;
            item.show = true
            
            arr.push(item)
        }
        return arr
    }
    index10(res){
        let arr =[]
        for(let i=0;i<res.length;i++){
            let item = {}
            item.key = res[i].uuid;
            item.a = res[i].projectName;
            item.b = res[i].buildArea;
            item.c = res[i].transactionPrice;
            item.d = res[i].payPrice;
            item.e = res[i].investmentYearSum;
            item.f = res[i].salesSum;
            item.g = res[i].def1;
            item.show = true
            
            arr.push(item)
        }
        return arr
    }
    index11(res){
        let arr =[]
        for(let i=0;i<res.length;i++){
            let item = {}
            item.key = res[i].uuid;
            item.a = res[i].financialCompany;
            item.b = res[i].projectFrom;
            item.c = res[i].projectTo;
            item.d = res[i].projectTime;
            item.e = res[i].projectPrice;
            item.f = res[i].projectReceipt;
            item.g = res[i].projectReceiptSum;
            item.h = res[i].def1;
            item.show = true
            
            arr.push(item)
        }
        return arr
    }

    gosearch(text){
        let _this = this
        let {dataSource} = this.state;
        this.myPromise(true).then(function(){
            _this.setState({
                loaded:true,
            })
        }).then(function(){
            for(let i=0;i<dataSource.length;i++){
                dataSource[i].show = false
                for(let j in dataSource[i]){
                    if(text == ''){
                        dataSource[i].show = true
                    }
                    else if( typeof(dataSource[i][j]) == 'string' && dataSource[i][j].indexOf(text)>=0){
                        dataSource[i].show = true
                    }
                }
            }
            _this.setState({
                dataSource:dataSource,
                loaded:false
            })
        })
    }

    render() {
        
        const htmlContent = this.state.htmlContent

        return (
          <View style={styles.container}>
            <Image source={require('./image/menuTop.png')}  resizeMode='contain' style={[styles.backgroundTop,{height:myPt*244}]} /> 
            <Myheader gosearch={this.gosearch.bind(this)} leftBtn="back" rightBtn="search" navigation={this.props.navigation} title={this.state.title}></Myheader>
            <View style={{width:myPt*355,flex:1,marginTop:20}}>
                    <FlatList
                        data={this.state.dataSource}
                        ListFooterComponent={this._footer.bind(this)}
                        onRefresh={this.refreshing.bind(this)}
                        refreshing={this.state.loaded}
                        renderItem={({item,index}) => this.renderRow(item,index)}
                        // onEndReached={this._onload.bind(this)
                        // }
                        // onEndReachedThreshold={0.3}
                        style={[{width:myPt*355,flex:1,marginTop:20}]}
                    />
            </View>
          </View> 
        );
    }

    refreshing(index){
        let _this = this
        this.myPromise(true).then(function(){
            _this.setState({
                loaded:true,
                hasNext:true,
                dataSource:[],
            })
        }).then(function(){
            _this._onload();
        })
    }

    godetail(id){
        const { navigate } = this.props.navigation; 
        navigate('Detali',{id:id,index:this.state.index})
    }

    renderRow(item,index){
        if(this.state.index==1 && item.show){
            return <TouchableOpacity style={styles.item} onPress={()=> this.godetail(item.key)}>
                        <View style={styles.item1First}>
                            <Text style={styles.itemTitle}>{item.title}</Text>
                        </View>
                        <View style={styles.item1First}>
                            <Text style={styles.itemlabel}>投委会次数</Text>
                            <Text style={styles.itemContent}>{item.no}</Text>
                        </View>
                        <View style={styles.item1First}>
                            <Text style={styles.itemlabel}>会议日期</Text>
                            <Text style={styles.itemContent}>{item.day}</Text>
                        </View>
                        <View style={styles.item1First}>
                            <Text style={styles.itemlabel}>责任单位</Text>
                            <Text style={styles.itemContent}>{item.responsibleUnits}</Text>
                        </View>
                        <View style={styles.item1First}>
                            <Text style={styles.itemlabel}>董事会通过时间</Text>
                            <Text style={styles.itemContent}>{item.allowTime}</Text>
                        </View>
                </TouchableOpacity>
        }
        else if(this.state.index==2 && item.show){
            return <TouchableOpacity style={styles.item} onPress={()=> this.godetail(item.key)}>
                        <View style={styles.item1First}>
                            <Text style={styles.itemTitle}>{item.a}</Text>
                        </View>
                        <View style={styles.item1First}>
                            <Text style={styles.itemlabel}>合作期限</Text>
                            <Text style={styles.itemContent}>{item.b}（年）</Text>
                        </View>
                        <View style={styles.item1First}>
                            <Text style={styles.itemlabel}>注册资金</Text>
                            <Text style={styles.itemContent}>{item.c}（万元）</Text>
                        </View>
                        <View style={styles.item1First}>
                            <Text style={styles.itemlabel}>项目总投资计划</Text>
                            <Text style={styles.itemContent}>{item.d}（万元）</Text>
                        </View>
                        <View style={styles.item1First}>
                            <Text style={styles.itemlabel}>责任单位</Text>
                            <Text style={styles.itemContent}>{item.e}</Text>
                        </View>
                </TouchableOpacity>
        }
        else if(this.state.index==3 && item.show){
            return <TouchableOpacity style={styles.item} onPress={()=> this.godetail(item.key)}>
                        <View style={styles.item1First}>
                            <Text style={styles.itemTitle}>{item.a}</Text>
                        </View>
                        <View style={styles.item1First}>
                            <Text style={styles.itemlabel}>所属类别</Text>
                            <Text style={styles.itemContent}>{item.b}</Text>
                        </View>
                        <View style={styles.item1First}>
                            <Text style={styles.itemlabel}>规模</Text>
                            <Text style={styles.itemContent}>{item.c}（万元）</Text>
                        </View>
                        <View style={styles.item1First}>
                            <Text style={styles.itemlabel}>投资项目</Text>
                            <Text style={styles.itemContent}>{item.d}</Text>
                        </View>
                        <View style={styles.item1First}>
                            <Text style={styles.itemlabel}>投资金额</Text>
                            <Text style={styles.itemContent}>{item.e}（万元）</Text>
                        </View>
                        <View style={styles.item1First}>
                            <Text style={styles.itemlabel}>投资成本</Text>
                            <Text style={styles.itemContent}>{item.f}（元/股）</Text>
                        </View>
                        <View style={styles.item1First}>
                            <Text style={styles.itemlabel}>责任单位</Text>
                            <Text style={styles.itemContent}>{item.g}</Text>
                        </View>
                </TouchableOpacity>
        }
        else if(this.state.index==4 && item.show){
            return <TouchableOpacity style={styles.item} onPress={()=> this.godetail(item.key)}>
                        <View style={styles.item1First}>
                            <Text style={styles.itemTitle}>{item.a}</Text>
                        </View>
                        <View style={styles.item1First}>
                            <Text style={styles.itemlabel}>所属基金</Text>
                            <Text style={styles.itemContent}>{item.b}</Text>
                        </View>
                        <View style={styles.item1First}>
                            <Text style={styles.itemlabel}>规模</Text>
                            <Text style={styles.itemContent}>{item.c}（万元）</Text>
                        </View>
                        <View style={styles.item1First}>
                            <Text style={styles.itemlabel}>股票名称</Text>
                            <Text style={styles.itemContent}>{item.d}</Text>
                        </View>
                        <View style={styles.item1First}>
                            <Text style={styles.itemlabel}>投资金额</Text>
                            <Text style={styles.itemContent}>{item.e}（万元）</Text>
                        </View>
                        <View style={styles.item1First}>
                            <Text style={styles.itemlabel}>投资成本</Text>
                            <Text style={styles.itemContent}>{item.f}（元/股）</Text>
                        </View>
                        <View style={styles.item1First}>
                            <Text style={styles.itemlabel}>责任单位</Text>
                            <Text style={styles.itemContent}>{item.g}</Text>
                        </View>
                </TouchableOpacity>
        }
        else if(this.state.index==5 && item.show){
            return <TouchableOpacity style={styles.item} onPress={()=> this.godetail(item.key)}>
                        <View style={styles.item1First}>
                            <Text style={styles.itemTitle}>{item.a}</Text>
                        </View>
                        <View style={styles.item1First}>
                            <Text style={styles.itemlabel}>基金名称</Text>
                            <Text style={styles.itemContent}>{item.b}</Text>
                        </View>
                        <View style={styles.item1First}>
                            <Text style={styles.itemlabel}>基金规模</Text>
                            <Text style={styles.itemContent}>{item.c}（万元）</Text>
                        </View>
                        <View style={styles.item1First}>
                            <Text style={styles.itemlabel}>已投项目</Text>
                            <Text style={styles.itemContent}>{item.d}</Text>
                        </View>
                        <View style={styles.item1First}>
                            <Text style={styles.itemlabel}>投资日期</Text>
                            <Text style={styles.itemContent}>{item.e}</Text>
                        </View>
                        <View style={styles.item1First}>
                            <Text style={styles.itemlabel}>投资金额</Text>
                            <Text style={styles.itemContent}>{item.f}（万元）</Text>
                        </View><View style={styles.item1First}>
                            <Text style={styles.itemlabel}>投资成本</Text>
                            <Text style={styles.itemContent}>{item.g}（万元）</Text>
                        </View>
                        <View style={styles.item1First}>
                            <Text style={styles.itemlabel}>责任单位</Text>
                            <Text style={styles.itemContent}>{item.h}</Text>
                        </View>
                </TouchableOpacity>
        }
        else if(this.state.index==6 && item.show){
            return <TouchableOpacity style={styles.item} onPress={()=> this.godetail(item.key)}>
                        <View style={styles.item1First}>
                            <Text style={styles.itemTitle}>{item.a}</Text>
                        </View>
                        <View style={styles.item1First}>
                            <Text style={styles.itemlabel}>项目公司</Text>
                            <Text style={styles.itemContent}>{item.b}</Text>
                        </View>
                        <View style={styles.item1First}>
                            <Text style={styles.itemlabel}>成立时间</Text>
                            <Text style={styles.itemContent}>{item.c}</Text>
                        </View>
                        <View style={styles.item1First}>
                            <Text style={styles.itemlabel}>公司注册资本</Text>
                            <Text style={styles.itemContent}>{item.d}（万元）</Text>
                        </View>
                        <View style={styles.item1First}>
                            <Text style={styles.itemlabel}>实际到位资金</Text>
                            <Text style={styles.itemContent}>{item.e}（万元）</Text>
                        </View>
                        <View style={styles.item1First}>
                            <Text style={styles.itemlabel}>投资项目</Text>
                            <Text style={styles.itemContent}>{item.f}</Text>
                        </View><View style={styles.item1First}>
                            <Text style={styles.itemlabel}>投资金额</Text>
                            <Text style={styles.itemContent}>{item.g}（万元）</Text>
                        </View>
                        <View style={styles.item1First}>
                            <Text style={styles.itemlabel}>责任单位</Text>
                            <Text style={styles.itemContent}>{item.h}</Text>
                        </View>
                </TouchableOpacity>
        }
        else if(this.state.index==7 && item.show){
            return <TouchableOpacity style={styles.item} onPress={()=> this.godetail(item.key)}>
                        <View style={styles.item1First}>
                            <Text style={styles.itemTitle}>{item.a}</Text>
                        </View>
                        <View style={styles.item1First}>
                            <Text style={styles.itemlabel}>基金名称</Text>
                            <Text style={styles.itemContent}>{item.b}</Text>
                        </View>
                        <View style={styles.item1First}>
                            <Text style={styles.itemlabel}>基金规模</Text>
                            <Text style={styles.itemContent}>{item.c}（万元）</Text>
                        </View>
                        <View style={styles.item1First}>
                            <Text style={styles.itemlabel}>投资项目</Text>
                            <Text style={styles.itemContent}>{item.d}</Text>
                        </View>
                        <View style={styles.item1First}>
                            <Text style={styles.itemlabel}>投资金额</Text>
                            <Text style={styles.itemContent}>{item.e}（万元）</Text>
                        </View>
                        <View style={styles.item1First}>
                            <Text style={styles.itemlabel}>投资成本</Text>
                            <Text style={styles.itemContent}>{item.f}（元/股）</Text>
                        </View>
                        <View style={styles.item1First}>
                            <Text style={styles.itemlabel}>责任单位</Text>
                            <Text style={styles.itemContent}>{item.g}</Text>
                        </View>
                </TouchableOpacity>
        }
        else if(this.state.index==8 && item.show){
            return <TouchableOpacity style={styles.item} onPress={()=> this.godetail(item.key)}>
                        <View style={styles.item1First}>
                            <Text style={styles.itemTitle}>{item.a}</Text>
                        </View>
                        <View style={styles.item1First}>
                            <Text style={styles.itemlabel}>基金名称</Text>
                            <Text style={styles.itemContent}>{item.b}</Text>
                        </View>
                        <View style={styles.item1First}>
                            <Text style={styles.itemlabel}>基金成立时间</Text>
                            <Text style={styles.itemContent}>{item.c}</Text>
                        </View>
                        <View style={styles.item1First}>
                            <Text style={styles.itemlabel}>基金规模</Text>
                            <Text style={styles.itemContent}>{item.d}（万元）</Text>
                        </View>
                        <View style={styles.item1First}>
                            <Text style={styles.itemlabel}>投资项目</Text>
                            <Text style={styles.itemContent}>{item.e}</Text>
                        </View>
                        <View style={styles.item1First}>
                            <Text style={styles.itemlabel}>项目公司情况</Text>
                            <Text style={styles.itemContent}>{item.f}</Text>
                        </View>
                        <View style={styles.item1First}>
                            <Text style={styles.itemlabel}>投资规模</Text>
                            <Text style={styles.itemContent}>{item.g}（万元）</Text>
                        </View>
                        <View style={styles.item1First}>
                            <Text style={styles.itemlabel}>项目楼面价</Text>
                            <Text style={styles.itemContent}>{item.h}（元/平方）</Text>
                        </View>
                        <View style={styles.item1First}>
                            <Text style={styles.itemlabel}>填报单位</Text>
                            <Text style={styles.itemContent}>{item.i}</Text>
                        </View>
                </TouchableOpacity>
        }
        else if(this.state.index==9 && item.show){
            return <TouchableOpacity style={styles.item} onPress={()=> this.godetail(item.key)}>
                        <View style={styles.item1First}>
                            <Text style={styles.itemTitle}>{item.a}</Text>
                        </View>
                        <View style={styles.item1First}>
                            <Text style={styles.itemlabel}>建筑面积</Text>
                            <Text style={styles.itemContent}>{item.b}（平方米）</Text>
                        </View>
                        <View style={styles.item1First}>
                            <Text style={styles.itemlabel}>成交总价</Text>
                            <Text style={styles.itemContent}>{item.c}（万元）</Text>
                        </View>
                        <View style={styles.item1First}>
                            <Text style={styles.itemlabel}>已付土地款</Text>
                            <Text style={styles.itemContent}>{item.d}（万元）</Text>
                        </View>
                        <View style={styles.item1First}>
                            <Text style={styles.itemlabel}>项目总投资</Text>
                            <Text style={styles.itemContent}>{item.e}（万元）</Text>
                        </View>
                        <View style={styles.item1First}>
                            <Text style={styles.itemlabel}>可售价值</Text>
                            <Text style={styles.itemContent}>{item.f}（万元）</Text>
                        </View>
                        <View style={styles.item1First}>
                            <Text style={styles.itemlabel}>责任单位</Text>
                            <Text style={styles.itemContent}>{item.g}（万元）</Text>
                        </View>
                </TouchableOpacity>
        }else if(this.state.index==10 && item.show){
            return <TouchableOpacity style={styles.item} onPress={()=> this.godetail(item.key)}>
                        <View style={styles.item1First}>
                            <Text style={styles.itemTitle}>{item.a}</Text>
                        </View>
                        <View style={styles.item1First}>
                            <Text style={styles.itemlabel}>建筑面积</Text>
                            <Text style={styles.itemContent}>{item.b}（平方米）</Text>
                        </View>
                        <View style={styles.item1First}>
                            <Text style={styles.itemlabel}>成交总价</Text>
                            <Text style={styles.itemContent}>{item.c}（万元）</Text>
                        </View>
                        <View style={styles.item1First}>
                            <Text style={styles.itemlabel}>已付土地款</Text>
                            <Text style={styles.itemContent}>{item.d}（万元）</Text>
                        </View>
                        <View style={styles.item1First}>
                            <Text style={styles.itemlabel}>项目总投资</Text>
                            <Text style={styles.itemContent}>{item.e}（万元）</Text>
                        </View>
                        <View style={styles.item1First}>
                            <Text style={styles.itemlabel}>可售价值</Text>
                            <Text style={styles.itemContent}>{item.f}（万元）</Text>
                        </View>
                        <View style={styles.item1First}>
                            <Text style={styles.itemlabel}>责任单位</Text>
                            <Text style={styles.itemContent}>{item.g}（万元）</Text>
                        </View>
                </TouchableOpacity>
        }else if(this.state.index==11 && item.show){
            return <TouchableOpacity style={styles.item} onPress={()=> this.godetail(item.key)}>
                        <View style={styles.item1First}>
                            <Text style={styles.itemTitle}>{item.a}</Text>
                        </View>
                        <View style={styles.item1First}>
                            <Text style={styles.itemlabel}>合同起始日期</Text>
                            <Text style={styles.itemContent}>{item.b}</Text>
                        </View>
                        <View style={styles.item1First}>
                            <Text style={styles.itemlabel}>合同结束日期</Text>
                            <Text style={styles.itemContent}>{item.c}</Text>
                        </View>
                        <View style={styles.item1First}>
                            <Text style={styles.itemlabel}>合同期限</Text>
                            <Text style={styles.itemContent}>{item.d}（年）</Text>
                        </View>
                        <View style={styles.item1First}>
                            <Text style={styles.itemlabel}>合同金额</Text>
                            <Text style={styles.itemContent}>{item.e}（万元）</Text>
                        </View>
                        <View style={styles.item1First}>
                            <Text style={styles.itemlabel}>收款金额</Text>
                            <Text style={styles.itemContent}>{item.f}（万元）</Text>
                        </View>
                        <View style={styles.item1First}>
                            <Text style={styles.itemlabel}>已收金额</Text>
                            <Text style={styles.itemContent}>{item.g}（万元）</Text>
                        </View>
                        <View style={styles.item1First}>
                            <Text style={styles.itemlabel}>责任单位</Text>
                            <Text style={styles.itemContent}>{item.h}（万元）</Text>
                        </View>
                </TouchableOpacity>
        }
    }

    _footer(){
        if(!this.state.hasNext){
            return <Text style={{color:'#fff',textAlign:"center"}}>没有更多了</Text>
        }
        else if(this.state.hasNext){
            return <Text style={{color:'#fff',textAlign:"center"}}></Text>;
        }
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
    item:{
        width:myPt*355,
        backgroundColor:"#fff",
        borderRadius:5,
        flexDirection:'column',
        flexWrap:'nowrap',
        justifyContent:'flex-start',
        alignItems:'flex-start',
        textAlign:'center',
        marginBottom:myPt*5,
        borderRadius:10,
        borderWidth:1,
        borderColor:'#aaa',
        paddingLeft:myPt*35,
        paddingRight:myPt*35
    },
    item1First:{
        marginBottom:myPt*12,
        flexDirection:'row',
        flexWrap:'nowrap',
        alignItems:'center',
        justifyContent:'flex-start'
    },
    itemTitle:{
        maxHeight:40,overflow:'hidden',fontSize:16,textAlign:'left',color:'#727272',fontWeight:'600',marginTop:10
    },
    itemlabel:{
        fontSize:13,
        color:'#8E8E8E',
        fontWeight:'600',
        textAlign:'left',
        width:myPt*130,
        marginRight:10
    },
    itemContent:{

        fontSize:13,
        color:'#8E8E8E',
        textAlign:'left',
    }
  });

