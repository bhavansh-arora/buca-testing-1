import AsyncStorage from '@react-native-community/async-storage';
import React, {useRef, useState} from 'react';
import {
    View,
    StyleSheet,
    SafeAreaView,
    StatusBar,
    Text,
    Dimensions,
    TouchableOpacity
  } from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import Modal from 'react-native-modal'
import {showLoader, login} from '../../action/login-registration';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
var margin = 0.125 * windowHeight - 76 + 8;

export default function SettingsScreen({navigation}){
    async function Logout(){
        showLoader()
        await AsyncStorage.setItem('name', '');
      await AsyncStorage.setItem('id', '');
      await AsyncStorage.setItem('phone', '');
      await AsyncStorage.setItem('cc', '');
      await AsyncStorage.setItem('email', '');
      await AsyncStorage.setItem('background','',);
      await AsyncStorage.setItem('contacts', '');
      await AsyncStorage.setItem('authenticated', JSON.stringify(false))
      await AsyncStorage.setItem('biometery', JSON.stringify(false));
      await AsyncStorage.setItem('password', '');
        await AsyncStorage.setItem('toggle', '')
        navigation.navigate("Index")
        console.log("Redire")
        setIsVisible(false)
    }
    const [isVisible, setIsVisible]=useState(false)
    return (
        <SafeAreaView style={styles.container}>
          <StatusBar
            barStyle="dark-content"
            hidden={false}
            backgroundColor="#ffffff"
            translucent={false}
          />
          <View style={styles.header}>
            <Text style={styles.header_text}>Settings</Text>
            <TouchableOpacity onPress = {() => navigation.pop()} style={styles.back_text}>
                <Text style={styles.back_text}>Back</Text>
            </TouchableOpacity>
          </View>
          <ScrollView>
          <View style={styles.view_input}>
            <TextInput
                autoCapitalize="none"
                placeholder="Enter your Buca"
                style={styles.text_body}
            />
            </View>
            <View style={styles.view_header}>
                <Text style={styles.text_header}>Account</Text>
            </View>
            <View style={styles.view_body}>
                <Text style={styles.text_body}>Email</Text>
                <Text style={{fontSize:14,textAlign:'right',color:'#898989', marginRight:5}}>thomasfredrick@hotmail.com</Text>
            </View>
            <View style={styles.view_body}>
                <Text style={styles.text_body} >Change Password</Text>
            </View>
            <View style={styles.view_header}>
                <Text style={styles.text_header}>General</Text>
            </View>
            <View style={styles.view_body}>
                <Text style={styles.text_body}>Change Language</Text>
            </View>
            <View style={styles.view_body}>
                <Text style={styles.text_body}>Notification</Text>
            </View>
            <View style={styles.view_body}>
                <Text style={styles.text_body}>Privacy</Text>
            </View>
            <View style={styles.view_body}>
                <Text style={styles.text_body}>Help</Text>
            </View>
            <View style={styles.view_body}>
                <Text style={styles.text_body}>About Us</Text>
            </View>
            </ScrollView>
            <View style={{alignItems:'center'}}>
                <Modal isVisible={isVisible} style={{height:100}} coverScreen={true}>
                    <View style={{ backgroundColor:'#FFF', borderRadius:15, alignItems:'center', height:300, width:"100%",margin:15}}>
                        <Text style={{fontSize:25, fontWeight:'bold', paddingTop:45}}>Log Out?</Text>
                        <Text style={{fontSize:15, alignSelf:'center',textAlign:'center', justifyContent:'center', alignContent:'center', padding:10, paddingHorizontal:65,}}>To log back in you need to re-enter your username and password</Text>
                        <View style={{flexDirection:'row', justifyContent:'space-around', paddingTop:10, flex:0.7}}>
                            <TouchableOpacity onPress={() => setIsVisible(false)}>
                                <View style={styles.cancel_button}>
                                    <Text style={styles.button_text}>Cancel</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={Logout}>
                                <View style={styles.logout_button}>
                                <Text style={styles.button_text}>Logout</Text>
                                </View>
                            </TouchableOpacity>
                            </View>
                    </View>
                </Modal>
           </View>
            <TouchableOpacity style={{height:110, paddingTop:15,}} onPress={Logout}>
            <View style={styles.view_logout}>
                <Text style={{fontWeight:'bold', color:'#FFFFFF', fontSize:20}}>LOGOUT</Text>
            </View>
            </TouchableOpacity>
        </SafeAreaView>
      );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
      },
      header: {
        height: '10%',
        shadowOffset: {height: 2},
        shadowColor: '#bdbdbd',
        shadowOpacity: 0.5,
        elevation: 5,
        backgroundColor: '#fff',
        justifyContent:'flex-end',
        alignItems:'center',
        flexDirection: 'row',
        display: 'flex',
      },
      header_text: {
        marginLeft: windowWidth/2-35,
        marginBottom: 5,
        fontWeight: 'bold',
        fontSize: 17,
        flex:1,
        marginTop: '10%',
      },
      back_text:{
          marginBottom: 5,
          color:'#00bd89',
          marginRight:15,
          fontSize: 17,
          flex:1,
          textAlign:'right',
          marginTop: '30%',
          marginBottom: 5,
  
      },
      text_body:{
          fontSize:14,
          fontWeight:'bold',
      },
      view_body:{
          backgroundColor:'#F0F0F0',
          marginHorizontal:15,
          marginVertical:5,
          borderRadius:7,
          height:50,
          fontSize:20,
          fontWeight:'bold',
          paddingLeft:18,
          flexDirection:'row',
          alignItems:'center',
          justifyContent:'space-between',
          flex:1,
      },
      view_input:{
          backgroundColor:'#F0F0F0',
          marginHorizontal:15,
          marginTop:25,
          borderRadius:7,
          height:50,
          paddingLeft:17,
          fontSize:20,
          fontWeight:'bold',
          justifyContent:'center'
      },
      view_header:{
          marginHorizontal:15,
          borderRadius:7,
          height:70,
          fontSize:20,
          fontWeight:'bold',
          flexDirection:'row',
          alignItems:'center',
          justifyContent:'space-between',
          flex:1,
      },
      text_header:{
          fontSize:17,
          color:'#898989',
      },
      view_logout:{
          width:"90%",
          marginHorizontal:"5%",
          backgroundColor:'#FD6D6C',
          marginBottom:20,
          marginTop:5,
          borderRadius:7,
          height:50,
          fontSize:20,
          fontWeight:'bold',
          padding:18,
          flexDirection:'row',
          alignItems:'center',
          justifyContent:'center'
      },
    cancel_button:{
        backgroundColor:'#898989',
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        padding:15,
        width:160,
        flex:1,
        margin:15,
        padding:25,
      },
      logout_button:{
        backgroundColor:'#f40',
        borderRadius: 5,
        padding:15,
        alignItems: 'center',
        justifyContent: 'center',
        width:160,
        flex:1,
        margin:15,
        padding:25,
      },
      button_text:{
          fontSize:17,
          color:'#fff'
      }
  });
  