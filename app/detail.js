import React, {Component} from 'react';
import { Text, TouchableOpacity, StyleSheet, View, Image} from 'react-native';
import Myheader from './components/Myheader'

export default class Detail extends Component{

    constructor(props) {
        super(props);
        this.state = { };
    }

    render() {
        const params = this.props.navigation.state.params

        return (
          <View style={styles.container}>
            <Myheader title='消息详情' navigation={this.props.navigation} leftBtn='back' />
            <View style={ styles.titleBox }>
                <View style={{width:'85%',alignItems:'flex-start',justifyContent:'center'}}>
                    <Text style={[styles.textBox,{fontSize:15}]}>{params.title}</Text>
                    <Text style={[styles.textBox,{fontSize:10,marginTop:9}]}>推送人: {params.creator}</Text>
                    <Text style={[styles.textBox,{fontSize:10,marginTop:8}]}>推送时间: {params.year}年{params.month}月{params.day}日</Text>
                </View>
                <View style={styles.dateBox}>
                    <Text style={styles.date}>{params.titleYear}/{params.titleMonth}</Text>
                </View>
            </View>
            <View style={styles.messageBox}>
                    <View style={styles.textRow}>
                        <Text style={styles.textLeft}>01-{params.titleMonth}</Text>
                    </View>
                    <View style={styles.textRow}>
                        <Text style={styles.textLeft}>累计完成投资额</Text><Text style={styles.textRight}>{params.totalPay}亿元</Text>
                    </View>
                    <View style={styles.textRow}>
                        <Text style={styles.textLeft}>完成年度计划的</Text><Text style={styles.textRight}>{params.totalRate}%</Text>
                    </View>
                    <View style={styles.textRow}>
                        <Text style={styles.textLeft}>同比去年增长</Text><Text style={styles.textRight}>{params.totalYoy}%</Text>
                    </View>
                    <View style={[styles.textRow,{marginTop:30}]}>
                        <Text style={styles.textLeft}>其中</Text>
                    </View>
                    <View style={styles.textRow}>
                        <Text style={styles.textLeft}>{params.titleMonth}月完成投资额</Text><Text style={styles.textRight}>{params.monthPay}亿元</Text>
                    </View>
                    <View style={styles.textRow}>
                        <Text style={styles.textLeft}>完成年度计划的</Text><Text style={styles.textRight}>{params.monthRate}%</Text>
                    </View>
            </View>
          </View> 
        );
    }

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:'#FFF',
      flexDirection:'column',
      flexWrap:'wrap',
    },
    titleBox: {
      width:'100%',
      height:100,
      alignItems:'center',
      justifyContent:'center',
      backgroundColor:'#4E5667'
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
    }
  });

