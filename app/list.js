/**
 登录页面
 */

import React, {Component} from 'react';
import { FlatList, StyleSheet, StatusBar, Alert, BackAndroid, Text, TouchableOpacity, ToastAndroid, BackHandler, View, Image} from 'react-native';
import Myheader from './components/Myheader'
import storage from './gStorage';
import myFetch from './myFetch'

export default class List extends Component{

    constructor(props) {
        super(props);
        this.state = {
            refreshing:false,
            account:'',
            data:[],
            colorArr: ['#C05959','#A5C059','#8EA7E1','#E1D78E','#8EE1BE','#E18EDB']
        };
    }

    handleRefresh() {
        this.setState({
            refreshing: true
        }, () => {
            this.getData(this.state.account)
        });
    }

    itemLayout(item, index) {
        let status;
        let { colorArr } = this.state
        let n = Math.floor(Math.random()*6)
        return (
            <TouchableOpacity 
                onPress={() => this.onItemPress(item, index)}>
                <View style={styles.bodyBox}>
                    <View style={styles.timeBox}>
                        <Text style={[styles.textBox,{fontSize:20}]}>{item.day}日</Text>
                        <Text style={[styles.textBox,{fontSize:10,marginTop:4,color:'#a7a7a7'}]}>{item.year}.{item.month}</Text>
                    </View>
                    <View style={[styles.titleBox,{borderBottomColor:'#BEBEBE',borderBottomWidth:0.5,borderLeftColor:'#D0D0D0',borderLeftWidth:1}]}>
                        <View style={{width:'90%',alignItems:'flex-start',justifyContent:'center',borderRightWidth:2,borderColor:colorArr[n]}}>
                            <Text style={[styles.textBox,{fontSize:16}]}>{item.title}</Text>
                            <Text style={[styles.textBox,{fontSize:10,marginTop:8,color:'#a7a7a7'}]}>推送人:{item.creator}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
        
    }

    onItemPress(item, index) {
        const {navigate} = this.props.navigation;
        navigate('Detali',item)
    }

    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid);
        const {navigate} = this.props.navigation;
        storage.load({
            key:'user',
            autoSync: true,
            syncInBackground: true,
        }).then(ret => {
            console.log(ret)
            let account = ret.account;
            this.setState({account:account})
            this.getData(account)
            
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
                    navigate('Login')
                    break;
                case 'ExpiredError':
                    // TODO
                    break;
            }
        })
    }

    getData(account){
        const {navigate} = this.props.navigation;
        myFetch.getString(
            '/ajaxMonthTel.do?method=GetInfoAll',
            {username: account},
            (response) => {
                console.log(response);
                if (response['_bodyText'] != 'error' && response['_bodyText'] != 'no' ) {
                    let json = JSON.parse(response['_bodyText']);
                    if(json.code === '999'){
                        Alert.alert(
                            '提示',
                            '登陆过期，请重新登录',
                        );
                        navigate('Login')
                    }else {
                        const data = json.map(function (item) {

                            const res = {
                                title:item.year+'日'+item.month+'月投资情况完成通报',
                                titleYear:item.year,
                                titleMonth:item.month,
                                year:item.creationtime.substring(0,4),
                                month:item.creationtime.substring(5,7),
                                day:item.creationtime.substring(8,10),
                                creator:item.creator,
                                monthPay:item.monthPay,
                                monthRate:item.monthRate,
                                totalPay:item.totalPay,
                                totalRate:item.totalRate,
                                totalYoy:item.totalYoy
                            };
                            return res;
                        });
                        this.setState({
                            data:data,
                            refreshing:false
                        })
                    }
                }
            },
            err => {
                Alert.alert(
                    '提示',
                    '网络连接中断',
                );

                navigate('Login')
                console.log(err);
            }
        );
    }
    
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid);
    }
    onBackAndroid = () => {
        
        if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {
            BackAndroid.exitApp()
        }
        this.lastBackPressed = Date.now();
        ToastAndroid.show('再按一次退出应用',2000);
        return true;
        
    };

    

    render() {
        return (
          <View style={{flex: 1, backgroundColor: '#fff'}}>
            <StatusBar hidden={false}></StatusBar>
            <Myheader title='信息列表'  navigation={this.props.navigation} leftBtn='close' />
            <FlatList
                    style={{flex:1,borderColor:'#BEBEBE',borderBottomWidth:0.5,borderStyle:'solid'}}
                    onRefresh={() => this.handleRefresh()}
                    refreshing={this.state.refreshing}
                    numColumns={1}
                    data={this.state.data}
                    renderItem={({item, index}) => this.itemLayout(item, index)}
                    keyExtractor={(item, index) => index.toString()}
            />
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
  bodyBox: {
      width: '100%',
      height: 80,
      flexDirection:'row',
      flexWrap:'nowrap',
      borderBottomColor:'#BEBEBE',
      borderBottomWidth:1,
      borderStyle:'dashed'
  },
  timeBox: {
      flex:1,
      height:80,
      alignItems:'center',
      justifyContent:'center'
  },
  titleBox: {
      flex:3.5,
      height:80,
      alignItems:'center',
      justifyContent:'center'
  },
  textBox: {

  }

});
