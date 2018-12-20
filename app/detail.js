import React, {Component} from 'react';
import { Text, TouchableOpacity,Dimensions,StatusBar, StyleSheet, View, Image} from 'react-native';
import HTMLView from 'react-native-htmlview';
import Myheader from './components/Myheader'
import MyFetch from './myFetch';
import { ScrollView } from 'react-native-gesture-handler';


var {height,width} =  Dimensions.get('window');
let StatusBarHeight = StatusBar.currentHeight;
let myPt = width/375;


export default class Detail extends Component{

    constructor(props) {
        super(props);
        this.state = {
            dataSource:{},
            title:'',
            index:''
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
        const {id,index} = this.props.navigation.state.params
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
            title:title+'详情'
        })
        url = url+'.do?method=GetInfo'
        this.getContent(id,url,index)
    }

    getContent(id,url,index){
        MyFetch.get(
            url,
            {id:id,ect:Math.random()},
            res => {
                console.log(res)
                if(this.state.index==1){
                    res.xxxx = res.title
                }else if(this.state.index==2){
                    res.xxxx = res.projectName
                }else if(this.state.index==3){
                    res.xxxx = res.projectName
                }else if(this.state.index==4){
                    res.xxxx = res.stockName
                }else if(this.state.index==5){
                    res.xxxx = res.projectName
                }else if(this.state.index==6){
                    res.xxxx = res.projectName
                }else if(this.state.index==7){
                    res.xxxx = res.projectName
                }else if(this.state.index==8){
                    res.xxxx = res.projectName
                }else if(this.state.index==9){
                    res.xxxx = res.projectName
                }else if(this.state.index==10){
                    res.xxxx = res.projectName
                }else if(this.state.index==11){
                    res.xxxx = res.projectName
                }
                this.setState({
                    dataSource:res,
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
        const item = this.state.dataSource
        const params = this.props.navigation.state.params
        return (
                <View style={styles.container}>
                    <Image source={require('./image/detailBackground.png')}  resizeMode='contain' style={[styles.backgroundTop,{height:myPt*171}]} /> 
                    <Myheader leftBtn="back" navigation={this.props.navigation} title={this.state.title}></Myheader>
                    <View style={styles.title}>
                        <Text style={{color:'#fff',maxHeight:myPt*100,overflow:'hidden',fontSize:16,marginBottom:8,textAlign:'left'}}>{item.xxxx}</Text>
                    </View>
                    
                    {this.main()}
                </View> 
        );
    }

    main(){
        const item = this.state.dataSource
        if(this.state.index==1){
            return  <ScrollView><View style={styles.item}>
                        <View style={styles.item1First}>
                            <Text style={styles.itemlabel}>投委会次数</Text>
                            <Text style={styles.itemContent}>{item.no}（年）</Text>
                        </View>
                        <View style={styles.item1First}>
                            <Text style={styles.itemlabel}>会议日期</Text>
                            <Text style={styles.itemContent}>{item.meetingDate}</Text>
                        </View>
                        <View style={styles.item1First}>
                            <Text style={styles.itemlabel}>投委会通过时间</Text>
                            <Text style={styles.itemContent}>{item.def2}</Text>
                        </View>
                        <View style={styles.item1First}>
                            <Text style={styles.itemlabel}>董事会通过时间</Text>
                            <Text style={styles.itemContent}>{item.def3}</Text>
                        </View>
                        <View style={styles.item1First}>
                            <Text style={styles.itemlabel}>公司项目名称</Text>
                            <Text style={styles.itemContent}>{item.projectUnit}</Text>
                        </View>
                        <View style={styles.item1First}>
                            <Text style={styles.itemlabel}>总投资</Text>
                            <Text style={styles.itemContent}>{item.allInvest}（万元）</Text>
                        </View>
                        <View style={styles.item1First}>
                            <Text style={styles.itemlabel}>股东结构</Text>
                            <Text style={styles.itemContent}>{item.stockStructure}</Text>
                        </View>
                        <View style={styles.item1First}>
                            <Text style={styles.itemlabel}>项目公司设立时间</Text>
                            <Text style={styles.itemContent}>{item.def1}</Text>
                        </View>
                        <View style={styles.item1First}>
                            <Text style={styles.itemlabel}>项目公司注册资本金</Text>
                            <Text style={styles.itemContent}>{item.loginMoney}（万元）</Text>
                        </View>
                        <View style={styles.item1First}>
                            <Text style={styles.itemlabel}>实缴注册资本</Text>
                            <Text style={styles.itemContent}>{item.realPayMoney}（万元）</Text>
                        </View>
                        <View style={styles.item1First}>
                            <Text style={styles.itemlabel}>简复意见</Text>
                            <Text style={styles.itemContent}>{item.def4}</Text>
                        </View>
                        <View style={styles.item1First}>
                            <Text style={styles.itemlabel}>项目累计完成投资额</Text>
                            <Text style={styles.itemContent}>{item.haveInverst}（万元）</Text>
                        </View>
                        <View style={styles.item1First}>
                            <Text style={styles.itemlabel}>形象进度</Text>
                            <Text style={styles.itemContent}>{item.imageProgress}</Text>
                        </View>
                        <View style={styles.item1First}>
                            <Text style={styles.itemlabel}>责任单位</Text>
                            <Text style={styles.itemContent}>{item.responsibleUnits}</Text>
                        </View>
                </View>
                </ScrollView>
        }else if(this.state.index==2){
                return  <ScrollView>
                            <View style={styles.item}>
                                <View style={styles.item1First}>
                                    <Text style={styles.itemlabel}>项目实施单位</Text>
                                    <Text style={styles.itemContent}>{item.getUnit}</Text>
                                </View>
                                <View style={styles.item1First}>
                                    <Text style={styles.itemlabel}>中标时间</Text>
                                    <Text style={styles.itemContent}>{item.getTime}</Text>
                                </View>
                                <View style={styles.item1First}>
                                    <Text style={styles.itemlabel}>责任单位</Text>
                                    <Text style={styles.itemContent}>{item.def1}</Text>
                                </View>
                                <View style={styles.item1First}>
                                    <Text style={styles.itemlabel}>项目类型</Text>
                                    <Text style={styles.itemContent}>{item.projectType}</Text>
                                </View>
                                <View style={styles.item1First}>
                                    <Text style={styles.itemlabel}>项目总投资</Text>
                                    <Text style={styles.itemContent}>{item.transactionPrice}（万元）</Text>
                                </View>
                                <View style={styles.item1First}>
                                    <Text style={styles.itemlabel}>拟合作期限</Text>
                                    <Text style={styles.itemContent}>{item.termCooperation}（年）</Text>
                                </View>
                                <View style={styles.item1First}>
                                    <Text style={styles.itemlabel}>所属行业</Text>
                                    <Text style={styles.itemContent}>{item.projectType1}</Text>
                                </View>
                                <View style={styles.item1First}>
                                    <Text style={styles.itemlabel}>运作方式</Text>
                                    <Text style={styles.itemContent}>{item.projectWay}</Text>
                                </View>
                                <View style={styles.item1First}>
                                    <Text style={styles.itemlabel}>回报机制</Text>
                                    <Text style={styles.itemContent}>{item.projectBack}</Text>
                                </View>
                                <View style={styles.item1First}>
                                    <Text style={styles.itemlabel}>项目发起类型</Text>
                                    <Text style={styles.itemContent}>{item.projectPushType}</Text>
                                </View>
                                <View style={styles.item1First}>
                                    <Text style={styles.itemlabel}>项目概况</Text>
                                    <Text style={styles.itemContent}>{item.projectIntroduce}</Text>
                                </View>
                                <View style={styles.item1First}>
                                    <Text style={styles.itemlabel}>项目当前状态</Text>
                                    <Text style={styles.itemContent}>{item.projectStatus}</Text>
                                </View>
                        </View>
                        <View style={styles.item}>
                                <View style={styles.item1First}>
                                    <Text style={styles.itemlabel}>中标商务条件</Text>
                                    <Text style={styles.itemContent}>{item.businessRule}</Text>
                                </View>
                                <View style={styles.item1First}>
                                    <Text style={styles.itemlabel}>中标商务条件有何变化</Text>
                                    <Text style={styles.itemContent}>{item.businessRuleChange}</Text>
                                </View>
                        </View>
                        <View style={styles.item}>
                                <View style={styles.item1First}>
                                    <Text style={styles.itemlabel}>项目公司注册资金</Text>
                                    <Text style={styles.itemContent}>{item.fundsSum}（万元）</Text>
                                </View>
                                <View style={styles.item1First}>
                                    <Text style={styles.itemlabel}>已到位资本金</Text>
                                    <Text style={styles.itemContent}>{item.fundsGet}（万元）</Text>
                                </View><View style={styles.item1First}>
                                    <Text style={styles.itemlabel}>融资计划</Text>
                                    <Text style={styles.itemContent}>{item.fundsPlan}</Text>
                                </View>
                                <View style={styles.item1First}>
                                    <Text style={styles.itemlabel}>融资进展</Text>
                                    <Text style={styles.itemContent}>{item.fundsProgress}</Text>
                                </View>
                        </View>
                        <View style={styles.item}>
                                <View style={styles.item1First}>
                                    <Text style={styles.itemlabel}>项目总投资计划</Text>
                                    <Text style={styles.itemContent}>{item.investmentSum}（万元）</Text>
                                </View>
                                <View style={styles.item1First}>
                                    <Text style={styles.itemlabel}>本年度投资计划</Text>
                                    <Text style={styles.itemContent}>{item.investmentYearSum}（万元）</Text>
                                </View><View style={styles.item1First}>
                                    <Text style={styles.itemlabel}>本月完成投资</Text>
                                    <Text style={styles.itemContent}>{item.investmentYearMonth}（万元）</Text>
                                </View>
                                <View style={styles.item1First}>
                                    <Text style={styles.itemlabel}>本年累计完成投资</Text>
                                    <Text style={styles.itemContent}>{item.investmentYearGet}（万元）</Text>
                                </View>
                                <View style={styles.item1First}>
                                    <Text style={styles.itemlabel}>项目累计完成投资</Text>
                                    <Text style={styles.itemContent}>{item.investmentGet}（万元）</Text>
                                </View>
                        </View>
                        <View style={styles.item}>
                                <View style={styles.item1First}>
                                    <Text style={styles.itemlabel}>计划工程进展</Text>
                                    <Text style={styles.itemContent}>{item.engineeringPlan}</Text>
                                </View>
                                <View style={styles.item1First}>
                                    <Text style={styles.itemlabel}>实际工程进程</Text>
                                    <Text style={styles.itemContent}>{item.engineeringReal}</Text>
                                </View><View style={styles.item1First}>
                                    <Text style={styles.itemlabel}>存在问题</Text>
                                    <Text style={styles.itemContent}>{item.otherProblem}</Text>
                                </View>
                                <View style={styles.item1First}>
                                    <Text style={styles.itemlabel}>措施</Text>
                                    <Text style={styles.itemContent}>{item.otherMeasure}</Text>
                                </View>
                                <View style={styles.item1First}>
                                    <Text style={styles.itemlabel}>需集团公司协调解决的问题</Text>
                                    <Text style={styles.itemContent}>{item.otherNeed}</Text>
                                </View>
                                <View style={styles.item1First}>
                                    <Text style={styles.itemlabel}>备注</Text>
                                    <Text style={styles.itemContent}>{item.otherNote}</Text>
                                </View>
                        </View>
                    </ScrollView>
            }else if(this.state.index==3){
                return  <ScrollView>
                            <View style={styles.item}>
                            <View style={styles.item1First}>
                                    <Text style={styles.itemlabel}>投资公司</Text>
                                    <Text style={styles.itemContent}>{item.financialCompany}</Text>
                                </View>
                                <View style={styles.item1First}>
                                    <Text style={styles.itemlabel}>责任单位</Text>
                                    <Text style={styles.itemContent}>{item.def1}</Text>
                                </View>
                            <View style={styles.item1First}>
                                    <Text style={styles.itemlabel}>所属类别</Text>
                                    <Text style={styles.itemContent}>{item.category}</Text>
                                </View>
                                <View style={styles.item1First}>
                                    <Text style={styles.itemlabel}>规模</Text>
                                    <Text style={styles.itemContent}>{item.companySize}（万元）</Text>
                                </View>
                            <View style={styles.item1First}>
                                    <Text style={styles.itemlabel}>投资日期</Text>
                                    <Text style={styles.itemContent}>{item.projectName}</Text>
                                </View>
                                <View style={styles.item1First}>
                                    <Text style={styles.itemlabel}>投资金额</Text>
                                    <Text style={styles.itemContent}>{item.investmentMoney}（万元）</Text>
                                </View>
                            <View style={styles.item1First}>
                                    <Text style={styles.itemlabel}>到期日</Text>
                                    <Text style={styles.itemContent}>{item.expiryDate}</Text>
                                </View>
                                <View style={styles.item1First}>
                                    <Text style={styles.itemlabel}>年化收益率</Text>
                                    <Text style={styles.itemContent}>{item.annualizeReturn}（%）</Text>
                                </View>
                            <View style={styles.item1First}>
                                    <Text style={styles.itemlabel}>投资期限</Text>
                                    <Text style={styles.itemContent}>{item.investmentPeriod}</Text>
                                </View>
                                <View style={styles.item1First}>
                                    <Text style={styles.itemlabel}>付息方式</Text>
                                    <Text style={styles.itemContent}>{item.paymentMethod}</Text>
                                </View>
                            <View style={styles.item1First}>
                                    <Text style={styles.itemlabel}>每期付息</Text>
                                    <Text style={styles.itemContent}>{item.payedPeriod}</Text>
                                </View>
                            <View style={styles.item1First}>
                                    <Text style={styles.itemlabel}>投资成本</Text>
                                    <Text style={styles.itemContent}>{item.investmentCost}（元/股）</Text>
                                </View>
                                <View style={styles.item1First}>
                                    <Text style={styles.itemlabel}>当前股价</Text>
                                    <Text style={styles.itemContent}>{item.currentPrice}（元/股）</Text>
                                </View>
                                <View style={styles.item1First}>
                                    <Text style={styles.itemlabel}>退出收益</Text>
                                    <Text style={styles.itemContent}>{item.withdrawalIncome}（万元）</Text>
                                </View><View style={styles.item1First}>
                                    <Text style={styles.itemlabel}>保障措施</Text>
                                    <Text style={styles.itemContent}>{item.safetyMeasures}（万元）</Text>
                                </View>
                                <View style={styles.item1First}>
                                    <Text style={styles.itemlabel}>存在问题</Text>
                                    <Text style={styles.itemContent}>{item.problem}（万元）</Text>
                                </View>
                                <View style={styles.item1First}>
                                    <Text style={styles.itemlabel}>备注</Text>
                                    <Text style={styles.itemContent}>{item.vnote}（万元）</Text>
                                </View>
                            </View>
                        </ScrollView>
            }else if(this.state.index==4){
                return  <ScrollView>
                            <View style={styles.item}>
                                <View style={styles.item1First}>
                                    <Text style={styles.itemlabel}>投资公司</Text>
                                    <Text style={styles.itemContent}>{item.financialCompany}</Text>
                                </View>
                                <View style={styles.item1First}>
                                    <Text style={styles.itemlabel}>责任单位</Text>
                                    <Text style={styles.itemContent}>{item.def1}</Text>
                                </View>
                                <View style={styles.item1First}>
                                    <Text style={styles.itemlabel}>所述基金</Text>
                                    <Text style={styles.itemContent}>{item.fund}</Text>
                                </View>
                                <View style={styles.item1First}>
                                    <Text style={styles.itemlabel}>规模</Text>
                                    <Text style={styles.itemContent}>{item.companySize}（万元）</Text>
                                </View>
                                <View style={styles.item1First}>
                                    <Text style={styles.itemlabel}>投资日期</Text>
                                    <Text style={styles.itemContent}>{item.investmentDate}</Text>
                                </View>
                                <View style={styles.item1First}>
                                    <Text style={styles.itemlabel}>解禁日期</Text>
                                    <Text style={styles.itemContent}>{item.liftingDate}</Text>
                                </View>
                                <View style={styles.item1First}>
                                    <Text style={styles.itemlabel}>投资金额</Text>
                                    <Text style={styles.itemContent}>{item.investmentMoney}（万元）</Text>
                                </View>
                                <View style={styles.item1First}>
                                    <Text style={styles.itemlabel}>投资成本</Text>
                                    <Text style={styles.itemContent}>{item.investmentCost}（元/股）</Text>
                                </View>
                                <View style={styles.item1First}>
                                    <Text style={styles.itemlabel}>退出收益</Text>
                                    <Text style={styles.itemContent}>{item.withdrawalIncome}（万元）</Text>
                                </View>
                                <View style={styles.item1First}>
                                    <Text style={styles.itemlabel}>目前持股</Text>
                                    <Text style={styles.itemContent}>{item.currentShareholding}（万股）</Text>
                                </View>
                                <View style={styles.item1First}>
                                    <Text style={styles.itemlabel}>当前股价</Text>
                                    <Text style={styles.itemContent}>{item.currentPrice}（元/股）</Text>
                                </View>
                                <View style={styles.item1First}>
                                    <Text style={styles.itemlabel}>账面浮赢</Text>
                                    <Text style={styles.itemContent}>{item.bookFloats}（万元）</Text>
                                </View>
                                <View style={styles.item1First}>
                                    <Text style={styles.itemlabel}>备注</Text>
                                    <Text style={styles.itemContent}>{item.vnote}</Text>
                                </View>
                            </View>
                        </ScrollView>
            }else if(this.state.index==5){
                return  <ScrollView>
                            <View style={styles.item}>
                                <View style={styles.item1First}>
                                    <Text style={styles.itemlabel}>投资公司</Text>
                                    <Text style={styles.itemContent}>{item.financialCompany}</Text>
                                </View>
                                <View style={styles.item1First}>
                                    <Text style={styles.itemlabel}>责任单位</Text>
                                    <Text style={styles.itemContent}>{item.def1}</Text>
                                </View>
                                <View style={styles.item1First}>
                                    <Text style={styles.itemlabel}>基金名称</Text>
                                    <Text style={styles.itemContent}>{item.fundName}</Text>
                                </View>
                                <View style={styles.item1First}>
                                    <Text style={styles.itemlabel}>基金规模</Text>
                                    <Text style={styles.itemContent}>{item.fundSize}（万元）</Text>
                                </View>
                                <View style={styles.item1First}>
                                    <Text style={styles.itemlabel}>投资日期</Text>
                                    <Text style={styles.itemContent}>{item.investmentDate}</Text>
                                </View>
                                <View style={styles.item1First}>
                                    <Text style={styles.itemlabel}>投资金额</Text>
                                    <Text style={styles.itemContent}>{item.investmentMoney}（万元）</Text>
                                </View>
                                <View style={styles.item1First}>
                                    <Text style={styles.itemlabel}>股权占比</Text>
                                    <Text style={styles.itemContent}>{item.shareholding}%</Text>
                                </View>
                                <View style={styles.item1First}>
                                    <Text style={styles.itemlabel}>投资成本</Text>
                                    <Text style={styles.itemContent}>{item.investmentCost}（元/股）</Text>
                                </View>
                                <View style={styles.item1First}>
                                    <Text style={styles.itemlabel}>退出方式</Text>
                                    <Text style={styles.itemContent}>{item.withdrawalWay}</Text>
                                </View>
                                <View style={styles.item1First}>
                                    <Text style={styles.itemlabel}>存在问题</Text>
                                    <Text style={styles.itemContent}>{item.problem}</Text>
                                </View>
                                <View style={styles.item1First}>
                                    <Text style={styles.itemlabel}>项目进展</Text>
                                    <Text style={styles.itemContent}>{item.bookFloats}</Text>
                                </View>
                                <View style={styles.item1First}>
                                    <Text style={styles.itemlabel}>退出收益</Text>
                                    <Text style={styles.itemContent}>{item.withdrawalIncome}（万元）</Text>
                                </View>
                                <View style={styles.item1First}>
                                    <Text style={styles.itemlabel}>保障措施</Text>
                                    <Text style={styles.itemContent}>{item.safetyMeasures}</Text>
                                </View>
                                <View style={styles.item1First}>
                                    <Text style={styles.itemlabel}>备注</Text>
                                    <Text style={styles.itemContent}>{item.note}</Text>
                                </View>
                            </View>
                        </ScrollView>
            }else if(this.state.index==6){
                return  <ScrollView>
                            <View style={styles.item}>
                                <View style={styles.item1First}>
                                    <Text style={styles.itemlabel}>投资公司</Text>
                                    <Text style={styles.itemContent}>{item.financialCompany}</Text>
                                </View>
                                <View style={styles.item1First}>
                                    <Text style={styles.itemlabel}>责任单位</Text>
                                    <Text style={styles.itemContent}>{item.def1}</Text>
                                </View>
                                <View style={styles.item1First}>
                                    <Text style={styles.itemlabel}>项目公司</Text>
                                    <Text style={styles.itemContent}>{item.fundName}</Text>
                                </View>
                                <View style={styles.item1First}>
                                    <Text style={styles.itemlabel}>成立时间</Text>
                                    <Text style={styles.itemContent}>{item.fundDate}</Text>
                                </View>
                                <View style={styles.item1First}>
                                    <Text style={styles.itemlabel}>股东结构</Text>
                                    <Text style={styles.itemContent}>{item.fundStructure}</Text>
                                </View>
                                <View style={styles.item1First}>
                                    <Text style={styles.itemlabel}>公司注册资本</Text>
                                    <Text style={styles.itemContent}>{item.fundSize}（万元）</Text>
                                </View>
                                <View style={styles.item1First}>
                                    <Text style={styles.itemlabel}>实际到位注册资金</Text>
                                    <Text style={styles.itemContent}>{item.fundSize2}（万元）</Text>
                                </View>
                                <View style={styles.item1First}>
                                    <Text style={styles.itemlabel}>投资金额</Text>
                                    <Text style={styles.itemContent}>{item.investmentMoney}（万元）</Text>
                                </View>
                                <View style={styles.item1First}>
                                    <Text style={styles.itemlabel}>投出时间</Text>
                                    <Text style={styles.itemContent}>{item.investmentDate}</Text>
                                </View>
                                <View style={styles.item1First}>
                                    <Text style={styles.itemlabel}>（预期）收回时间</Text>
                                    <Text style={styles.itemContent}>{item.recoveryDate}</Text>
                                </View>
                                <View style={styles.item1First}>
                                    <Text style={styles.itemlabel}>（预期）年化收益率</Text>
                                    <Text style={styles.itemContent}>{item.yearInterest}%</Text>
                                </View>
                                <View style={styles.item1First}>
                                    <Text style={styles.itemlabel}>已获收益</Text>
                                    <Text style={styles.itemContent}>{item.shareholding}（万元）</Text>
                                </View>
                                <View style={styles.item1First}>
                                    <Text style={styles.itemlabel}>退出总收益</Text>
                                    <Text style={styles.itemContent}>{item.withdrawalIncome}（万元）</Text>
                                </View>
                                <View style={styles.item1First}>
                                    <Text style={styles.itemlabel}>风险措施</Text>
                                    <Text style={styles.itemContent}>{item.safetyMeasures}</Text>
                                </View>
                                <View style={styles.item1First}>
                                    <Text style={styles.itemlabel}>备注</Text>
                                    <Text style={styles.itemContent}>{item.note}</Text>
                                </View>
                            </View>
                        </ScrollView>
            }else if(this.state.index==7){
                return  <ScrollView>
                            <View style={styles.item}>
                                <View style={styles.item1First}>
                                    <Text style={styles.itemlabel}>投资公司</Text>
                                    <Text style={styles.itemContent}>{item.financialCompany}</Text>
                                </View>
                                <View style={styles.item1First}>
                                    <Text style={styles.itemlabel}>责任单位</Text>
                                    <Text style={styles.itemContent}>{item.def1}</Text>
                                </View>
                                <View style={styles.item1First}>
                                    <Text style={styles.itemlabel}>基金名称</Text>
                                    <Text style={styles.itemContent}>{item.fundName}</Text>
                                </View>
                                <View style={styles.item1First}>
                                    <Text style={styles.itemlabel}>基金规模</Text>
                                    <Text style={styles.itemContent}>{item.fundSize}（万元）</Text>
                                </View>
                                <View style={styles.item1First}>
                                    <Text style={styles.itemlabel}>投资日期</Text>
                                    <Text style={styles.itemContent}>{item.investmentDate}</Text>
                                </View>
                                <View style={styles.item1First}>
                                    <Text style={styles.itemlabel}>投资金额</Text>
                                    <Text style={styles.itemContent}>{item.investmentMoney}（万元）</Text>
                                </View>
                                <View style={styles.item1First}>
                                    <Text style={styles.itemlabel}>持股比例</Text>
                                    <Text style={styles.itemContent}>{item.shareholding}%</Text>
                                </View>
                                <View style={styles.item1First}>
                                    <Text style={styles.itemlabel}>预期收回时间</Text>
                                    <Text style={styles.itemContent}>{item.recoveryDate}</Text>
                                </View>
                                <View style={styles.item1First}>
                                    <Text style={styles.itemlabel}>计划申报时间</Text>
                                    <Text style={styles.itemContent}>{item.plannedDate}</Text>
                                </View>
                                <View style={styles.item1First}>
                                    <Text style={styles.itemlabel}>投资成本</Text>
                                    <Text style={styles.itemContent}>{item.investmentCost}（元/股）</Text>
                                </View>
                                <View style={styles.item1First}>
                                    <Text style={styles.itemlabel}>当前股价</Text>
                                    <Text style={styles.itemContent}>{item.currentPrice}（元/股）</Text>
                                </View>
                                <View style={styles.item1First}>
                                    <Text style={styles.itemlabel}>账面浮赢</Text>
                                    <Text style={styles.itemContent}>{item.bookFloats}（万元）</Text>
                                </View>
                                <View style={styles.item1First}>
                                    <Text style={styles.itemlabel}>退出收益</Text>
                                    <Text style={styles.itemContent}>{item.withdrawalIncome}（万元）</Text>
                                </View>
                            </View>
                        </ScrollView>
            }else if(this.state.index==8){
                return  <ScrollView>
                            <View style={styles.item}>
                                <View style={styles.item1First}>
                                    <Text style={styles.itemlabel}>公司名称</Text>
                                    <Text style={styles.itemContent}>{item.financialCompany}</Text>
                                </View>
                                <View style={styles.item1First}>
                                    <Text style={styles.itemlabel}>责任单位</Text>
                                    <Text style={styles.itemContent}>{item.def1}</Text>
                                </View>
                                <View style={styles.item1First}>
                                    <Text style={styles.itemlabel}>基金名称</Text>
                                    <Text style={styles.itemContent}>{item.fundName}</Text>
                                </View>
                                <View style={styles.item1First}>
                                    <Text style={styles.itemlabel}>基金成立时间</Text>
                                    <Text style={styles.itemContent}>{item.fundDate}</Text>
                                </View>
                                <View style={styles.item1First}>
                                    <Text style={styles.itemlabel}>基金规模</Text>
                                    <Text style={styles.itemContent}>{item.fundSize}（万元）</Text>
                                </View>
                                <View style={styles.item1First}>
                                    <Text style={styles.itemlabel}>交易架构</Text>
                                    <Text style={styles.itemContent}>{item.transactionArchitecture}</Text>
                                </View>
                                <View style={styles.item1First}>
                                    <Text style={styles.itemlabel}>项目公司情况</Text>
                                    <Text style={styles.itemContent}>{item.projectIntroducet}</Text>
                                </View>
                                <View style={styles.item1First}>
                                    <Text style={styles.itemlabel}>投资规模</Text>
                                    <Text style={styles.itemContent}>{item.investmentMoney}（万元）</Text>
                                </View>
                                <View style={styles.item1First}>
                                    <Text style={styles.itemlabel}>按股权比例实际出资</Text>
                                    <Text style={styles.itemContent}>{item.shareholding}（万元）</Text>
                                </View>
                                <View style={styles.item1First}>
                                    <Text style={styles.itemlabel}>项目楼面价</Text>
                                    <Text style={styles.itemContent}>{item.investmentCost}（元/平方米）</Text>
                                </View>
                                <View style={styles.item1First}>
                                    <Text style={styles.itemlabel}>取的《不动产产权证》</Text>
                                    <Text style={styles.itemContent}>{item.get1}</Text>
                                </View>
                                <View style={styles.item1First}>
                                    <Text style={styles.itemlabel}>取的《建设工程规划许可证》</Text>
                                    <Text style={styles.itemContent}>{item.get2}</Text>
                                </View>
                                <View style={styles.item1First}>
                                    <Text style={styles.itemlabel}>取的《建筑工程施工许可证》</Text>
                                    <Text style={styles.itemContent}>{item.get3}</Text>
                                </View>
                                <View style={styles.item1First}>
                                    <Text style={styles.itemlabel}>取的《商品房预售许可证》</Text>
                                    <Text style={styles.itemContent}>{item.get4}</Text>
                                </View>
                                <View style={styles.item1First}>
                                    <Text style={styles.itemlabel}>销售单价</Text>
                                    <Text style={styles.itemContent}>{item.currentPrice}（元/平方米）</Text>
                                </View>
                                <View style={styles.item1First}>
                                    <Text style={styles.itemlabel}>存在问题</Text>
                                    <Text style={styles.itemContent}>{item.problem}</Text>
                                </View>
                                <View style={styles.item1First}>
                                    <Text style={styles.itemlabel}>项目进展</Text>
                                    <Text style={styles.itemContent}>{item.bookFloats}</Text>
                                </View>
                                <View style={styles.item1First}>
                                    <Text style={styles.itemlabel}>去化率</Text>
                                    <Text style={styles.itemContent}>{item.interest}%</Text>
                                </View>
                                <View style={styles.item1First}>
                                    <Text style={styles.itemlabel}>退出收益</Text>
                                    <Text style={styles.itemContent}>{item.withdrawalIncome}（万元）</Text>
                                </View>
                            </View>
                        </ScrollView>
            }else if(this.state.index==9){
                return  <ScrollView>
                            <View style={styles.item}>
                                <View style={styles.item1First}>
                                    <Text style={styles.itemlabel}>责任单位</Text>
                                    <Text style={styles.itemContent}>{item.def1}</Text>
                                </View>
                                <View style={styles.item1First}>
                                    <Text style={styles.itemlabel}>土地面积</Text>
                                    <Text style={styles.itemContent}>{item.landArea}（平方米）</Text>
                                </View>
                                <View style={styles.item1First}>
                                    <Text style={styles.itemlabel}>容积率</Text>
                                    <Text style={styles.itemContent}>{item.volumeRate}%</Text>
                                </View>
                                <View style={styles.item1First}>
                                    <Text style={styles.itemlabel}>建筑面积</Text>
                                    <Text style={styles.itemContent}>{item.buildArea}（平方米）</Text>
                                </View>
                                <View style={styles.item1First}>
                                    <Text style={styles.itemlabel}>成交总价</Text>
                                    <Text style={styles.itemContent}>{item.transactionPrice}（万元）</Text>
                                </View>
                                <View style={styles.item1First}>
                                    <Text style={styles.itemlabel}>股权比率</Text>
                                    <Text style={styles.itemContent}>{item.equityRatio}%</Text>
                                </View>
                                <View style={styles.item1First}>
                                    <Text style={styles.itemlabel}>竞得日期</Text>
                                    <Text style={styles.itemContent}>{item.getDate}</Text>
                                </View>
                                <View style={styles.item1First}>
                                    <Text style={styles.itemlabel}>已付土地款</Text>
                                    <Text style={styles.itemContent}>{item.payPrice}</Text>
                                </View>
                                <View style={styles.item1First}>
                                    <Text style={styles.itemlabel}>股权结构</Text>
                                    <Text style={styles.itemContent}>{item.equityStructure}</Text>
                                </View>
                                <View style={styles.item1First}>
                                    <Text style={styles.itemlabel}>工程进度</Text>
                                    <Text style={styles.itemContent}>{item.engineering}</Text>
                                </View>
                            </View>
                            <View style={styles.item}>
                                <View style={styles.item1First}>
                                    <Text style={styles.itemlabel}>项目总投资</Text>
                                    <Text style={styles.itemContent}>{item.investmentSum}（万元）</Text>
                                </View>
                                <View style={styles.item1First}>
                                    <Text style={styles.itemlabel}>本年度投资计划</Text>
                                    <Text style={styles.itemContent}>{item.investmentYearSum}（万元）</Text>
                                </View>
                                <View style={styles.item1First}>
                                    <Text style={styles.itemlabel}>本月完成投资</Text>
                                    <Text style={styles.itemContent}>{item.investmentYearMonth}（万元）</Text>
                                </View>
                                <View style={styles.item1First}>
                                    <Text style={styles.itemlabel}>本年累计完成投资</Text>
                                    <Text style={styles.itemContent}>{item.investmentYearGet}（万元）</Text>
                                </View>
                                <View style={styles.item1First}>
                                    <Text style={styles.itemlabel}>项目累计完成投资</Text>
                                    <Text style={styles.itemContent}>{item.investmentGet}（万元）</Text>
                                </View>
                            </View>
                            <View style={styles.item}>
                            <View style={styles.item1First}>
                                    <Text style={styles.itemlabel}>可售价值</Text>
                                    <Text style={styles.itemContent}>{item.salesSum}（万元）</Text>
                                </View>
                                <View style={styles.item1First}>
                                    <Text style={styles.itemlabel}>项目累计销售额</Text>
                                    <Text style={styles.itemContent}>{item.salesGet}（万元）</Text>
                                </View>
                                <View style={styles.item1First}>
                                    <Text style={styles.itemlabel}>销售情况</Text>
                                    <Text style={styles.itemContent}>{item.salesYearSum}</Text>
                                </View>
                                <View style={styles.item1First}>
                                    <Text style={styles.itemlabel}>本月销售额</Text>
                                    <Text style={styles.itemContent}>{item.salesYearMonth}（万元）</Text>
                                </View>
                                <View style={styles.item1First}>
                                    <Text style={styles.itemlabel}>本年累计销售额</Text>
                                    <Text style={styles.itemContent}>{item.salesYearGet}（万元）</Text>
                                </View>
                            </View>
                        </ScrollView>
            }else if(this.state.index==10){
                return  <ScrollView>
                            <View style={styles.item}>
                                <View style={styles.item1First}>
                                    <Text style={styles.itemlabel}>责任单位</Text>
                                    <Text style={styles.itemContent}>{item.def1}</Text>
                                </View>
                                <View style={styles.item1First}>
                                    <Text style={styles.itemlabel}>土地面积</Text>
                                    <Text style={styles.itemContent}>{item.landArea}（平方米）</Text>
                                </View>
                                <View style={styles.item1First}>
                                    <Text style={styles.itemlabel}>容积率</Text>
                                    <Text style={styles.itemContent}>{item.volumeRate}%</Text>
                                </View>
                                <View style={styles.item1First}>
                                    <Text style={styles.itemlabel}>建筑面积</Text>
                                    <Text style={styles.itemContent}>{item.buildArea}（平方米）</Text>
                                </View>
                                <View style={styles.item1First}>
                                    <Text style={styles.itemlabel}>成交总价</Text>
                                    <Text style={styles.itemContent}>{item.transactionPrice}（万元）</Text>
                                </View>
                                <View style={styles.item1First}>
                                    <Text style={styles.itemlabel}>竞得日期</Text>
                                    <Text style={styles.itemContent}>{item.getDate}</Text>
                                </View>
                                <View style={styles.item1First}>
                                    <Text style={styles.itemlabel}>已付土地款</Text>
                                    <Text style={styles.itemContent}>{item.payPrice}</Text>
                                </View>
                                <View style={styles.item1First}>
                                    <Text style={styles.itemlabel}>股权结构</Text>
                                    <Text style={styles.itemContent}>{item.equityStructure}</Text>
                                </View>
                                <View style={styles.item1First}>
                                    <Text style={styles.itemlabel}>工程进度</Text>
                                    <Text style={styles.itemContent}>{item.engineering}</Text>
                                </View>
                            </View>
                            <View style={styles.item}>
                                <View style={styles.item1First}>
                                    <Text style={styles.itemlabel}>项目总投资</Text>
                                    <Text style={styles.itemContent}>{item.investmentSum}（万元）</Text>
                                </View>
                                <View style={styles.item1First}>
                                    <Text style={styles.itemlabel}>本年度投资计划</Text>
                                    <Text style={styles.itemContent}>{item.investmentYearSum}（万元）</Text>
                                </View>
                                <View style={styles.item1First}>
                                    <Text style={styles.itemlabel}>本月完成投资</Text>
                                    <Text style={styles.itemContent}>{item.investmentYearMonth}（万元）</Text>
                                </View>
                                <View style={styles.item1First}>
                                    <Text style={styles.itemlabel}>本年累计完成投资</Text>
                                    <Text style={styles.itemContent}>{item.investmentYearGet}（万元）</Text>
                                </View>
                                <View style={styles.item1First}>
                                    <Text style={styles.itemlabel}>项目累计完成投资</Text>
                                    <Text style={styles.itemContent}>{item.investmentGet}（万元）</Text>
                                </View>
                            </View>
                            <View style={styles.item}>
                            <View style={styles.item1First}>
                                    <Text style={styles.itemlabel}>可售价值</Text>
                                    <Text style={styles.itemContent}>{item.salesSum}（万元）</Text>
                                </View>
                                <View style={styles.item1First}>
                                    <Text style={styles.itemlabel}>项目累计销售额</Text>
                                    <Text style={styles.itemContent}>{item.salesGet}（万元）</Text>
                                </View>
                                <View style={styles.item1First}>
                                    <Text style={styles.itemlabel}>销售情况</Text>
                                    <Text style={styles.itemContent}>{item.salesYearSum}</Text>
                                </View>
                                <View style={styles.item1First}>
                                    <Text style={styles.itemlabel}>本月销售额</Text>
                                    <Text style={styles.itemContent}>{item.salesYearMonth}（万元）</Text>
                                </View>
                                <View style={styles.item1First}>
                                    <Text style={styles.itemlabel}>本年累计销售额</Text>
                                    <Text style={styles.itemContent}>{item.salesYearGet}（万元）</Text>
                                </View>
                            </View>
                        </ScrollView>
            }else if(this.state.index==11){
                return  <ScrollView>
                            <View style={styles.item}>
                                <View style={styles.item1First}>
                                    <Text style={styles.itemlabel}>客户名称</Text>
                                    <Text style={styles.itemContent}>{item.financialCompany}</Text>
                                </View>
                                <View style={styles.item1First}>
                                    <Text style={styles.itemlabel}>责任单位</Text>
                                    <Text style={styles.itemContent}>{item.def1}</Text>
                                </View>
                                <View style={styles.item1First}>
                                    <Text style={styles.itemlabel}>合同起始日期</Text>
                                    <Text style={styles.itemContent}>{item.projectFrom}</Text>
                                </View>
                                <View style={styles.item1First}>
                                    <Text style={styles.itemlabel}>合同结束日期</Text>
                                    <Text style={styles.itemContent}>{item.projectTo}</Text>
                                </View>
                                <View style={styles.item1First}>
                                    <Text style={styles.itemlabel}>合同期限</Text>
                                    <Text style={styles.itemContent}>{item.projectTime}（年）</Text>
                                </View>
                                <View style={styles.item1First}>
                                    <Text style={styles.itemlabel}>合同金额</Text>
                                    <Text style={styles.itemContent}>{item.projectPrice}（万元）</Text>
                                </View>
                                <View style={styles.item1First}>
                                    <Text style={styles.itemlabel}>收款金额</Text>
                                    <Text style={styles.itemContent}>{item.projectReceipt}（万元）</Text>
                                </View>
                                <View style={styles.item1First}>
                                    <Text style={styles.itemlabel}>每期应收款</Text>
                                    <Text style={styles.itemContent}>{item.projectReceiptEvery}（万元）</Text>
                                </View>
                                <View style={styles.item1First}>
                                    <Text style={styles.itemlabel}>最新收款日期</Text>
                                    <Text style={styles.itemContent}>{item.projectReceiptDate}</Text>
                                </View>
                                <View style={styles.item1First}>
                                    <Text style={styles.itemlabel}>当期收款金额</Text>
                                    <Text style={styles.itemContent}>{item.projectReceiptGet}（万元）</Text>
                                </View>
                                <View style={styles.item1First}>
                                    <Text style={styles.itemlabel}>已收金额</Text>
                                    <Text style={styles.itemContent}>{item.projectReceiptSum}（万元）</Text>
                                </View>
                                <View style={styles.item1First}>
                                    <Text style={styles.itemlabel}>待收金额</Text>
                                    <Text style={styles.itemContent}>{item.projectReceiptWait}（万元）</Text>
                                </View>
                            </View>
                        </ScrollView>
            }
        }

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:'#FFF',
      flexDirection:'column',
      flexWrap:'wrap',
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
        marginBottom:myPt*10
    },
    textBox:{
        color:'#fff'
    },
    messageBox:{
        flex:1,
        paddingTop:46,
        justifyContent:'flex-start',
        alignItems:'center'
    },
    text:{
        width:'70%',
        marginTop:48,
        fontSize:15,
        color:'#000',
        lineHeight:20
    },
    dateBox: {
        width:'100%',
        height:'100%',
        position:'absolute',
        left:0,
        top:0,
        alignItems:'flex-end',
        justifyContent:'flex-end',

    },
    date:{
        height:50,
        fontSize:50,
        color:'#4c5362',
        marginBottom:10,
    },
    textRow: {
        height:30,
        width:'71%',
        alignItems:'flex-start',
        justifyContent:'flex-start',
        flexDirection:'row',
        flexWrap:'wrap',
    },
    textLeft:{
        height:30,
        fontSize:16,
        lineHeight:30,
        width:'50%',
        textAlign:'left'
    },
    textRight:{
        height:30,
        fontSize:16,
        lineHeight:30,
        width:'50%',
        textAlign:'right'
    },
    item:{
        width:myPt*375,

        backgroundColor:"#fff",
        flexDirection:'column',
        flexWrap:'nowrap',
        justifyContent:'flex-start',
        alignItems:'flex-start',
        textAlign:'center',
        marginTop:myPt*22,
        paddingLeft:myPt*30,
        paddingRight:myPt*30,
    },
    item1First:{
        marginBottom:myPt*12,
        flexDirection:'row',
        flexWrap:'nowrap',
        alignItems:'flex-start',
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
        width:myPt*170,
        fontSize:13,
        color:'#8E8E8E',
        textAlign:'left',
    }
  });

