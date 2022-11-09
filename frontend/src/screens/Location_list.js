import React,{useEffect} from 'react';
import { TouchableWithoutFeedback,Keyboard, SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar, Image, TouchableOpacity, Alert } from 'react-native';
import styled from 'styled-components/native';
import { Button } from '../components';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useState } from "react";
import axios from 'axios'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';

const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: '하파서프',
      category: '숙박레저 패키지',
      location: '강릉',
      content: '서핑 강습 + 바베큐 파티 + 게스트하우스',
      iU: require('../images/leisure_fishing.jpg'),
    }
  ];


  const Item = ({ item }) => (
    <TouchableOpacity onPress={()=>Alert.alert('이동')}>
    <View>
    <View style={styles.item}>
        <Image style={styles.tinyLogo}
        source={item.iU}
        />
    </View>
    <View style={styles.itemcontent}>
      <View style={styles.content}>
        <Text >{item.title}</Text>
        <Text >#{item.category}</Text>
        <Text >#{item.location}</Text>
      </View>
    </View>
    </View>
    </TouchableOpacity>
  );  

const Container = styled.View`
    flex : 1;
    justify-content : center;
    align-items : center;
    background-color : ${({ theme }) => theme.background};
    padding : 20px;
`;

const Location_list = ({route, navigation}) => {
  


  const data1 = route.params.data1;
  const data2 = route.params.data2;
  const dataleis = route.params.leis;


  const data = useContext(UserContext)
  const [jwt,setjwt]=useState('')
  useEffect(()=>{
    if(data.userdata){
      AsyncStorage.getItem('access_token', (err, result) => {
      setjwt(result)});
    }
  },[data.userdata]);

  const [DATAAAA, setDATAAAA] = useState([
  ]);

  const access = ''
  const config = {
    headers : {
    //  Authorization : `Bearer ${access}`,
    }
  }
  axios.get(`http://3.34.181.178/tourapi/locationlist/`,
          {params: 
            {areacode: data1,
            sigungucode: data2,
            cat1: 'A03',
            cat2: 'A0303',
            cat3: dataleis,
            pageid: '1'}
          })
      .then(function (response) {
      // response  
      
      if(response) {
      const valor = JSON.stringify(response.data)
      const report = JSON.parse(valor)
          setDATAAAA(report.response.body.items.item);
      }
      else {
      Alert.alert("검색 결과가 없습니다");
      
      }
  }).catch(function (error) {
    Alert.alert("검색 결과가 없습니다");
      // 오류발생시 실행
  }).then(function() {
      // 항상 실행
  });


    const renderItem = ({ item }) => (
        <Item item={item} />
      );

    return (
        <KeyboardAwareScrollView 
            contentContainerStyle = {{flex : 1}}
            extraScrollHeight = {20}
        >
        <TouchableWithoutFeedback>
        <Container>
            <SafeAreaView style={styles.btbt}>
                  {DATAAAA?DATAAAA.map((data) => {
                   return <Button title = {data.title} 
                   onPress={()=>navigation.navigate('Enterprise', 
                            {title:data.title, 
                              conid:data.contentid, 
                              img:data.firstimage,
                              typeid:data.contenttypeid, 
                              access:jwt})}
                   />
                }):<Text>검색 결과가 없습니다.</Text>} 

            </SafeAreaView>
        </Container>
        </TouchableWithoutFeedback>
        </KeyboardAwareScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: StatusBar.currentHeight || 0,
    },
    item: {
      padding: 10,
      marginVertical: 8,
      marginHorizontal: 8,
      flexDirection: 'row',
      borderRadius: 3,
      flex: 1,
      justifyContent: 'center',
    },
    itemcontent: {
      flex: 1,
      marginLeft: 20,
      marginRight: 20,
    },
    content: {
      padding: 3,
      fontSize: 15,
      flex: 1,
      width: '100%',
    },
    btbt: {
      width: 300,
      marginVertical: 3,
    },
  });

export default Location_list