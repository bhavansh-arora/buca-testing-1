import React, {Component, useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import Card from '../../components/Card';
import {TextInput} from 'react-native-gesture-handler';
import Input_header from '../../components/Input_header';
import Header from '../../components/Design_header';
import SvgUri from 'react-native-svg-uri';
import AsyncStorage from '@react-native-community/async-storage';

function Home({navigation}) {
  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const [address, setAddress] = useState('')
  const [linkedin, setLinkedin] = useState('')
  const [facebook, setFacebook] = useState('')
  const [instagram, setInstagram] = useState('')
  const [website, setWebsite] = useState('')
  const [position, setPosition] = useState('')
  const [fileUri, setFileUri] = useState('')
  
  const storeData = async () => {
    try {
      
      await AsyncStorage.setItem('address', address);
      await AsyncStorage.setItem('position', position);
     // alert('Data successfully saved')
    } catch (e) {
      alert(e);
    }
  }

  const readData = async () => {
    try {
      if(await AsyncStorage.getItem('name'))
        setName(await AsyncStorage.getItem('name'));
      if(await AsyncStorage.getItem('id'))
        setId(await AsyncStorage.getItem('id'))
        if(await AsyncStorage.getItem('address'))
        setAddress(await AsyncStorage.getItem('address'))
        if(await AsyncStorage.getItem('position'))
        setPosition(await AsyncStorage.getItem('position'))
    } catch (e) {
      alert('Failed to fetch the data from storage');
    }
  };
  useEffect(() => {
    readData();

    // Update the document title using the browser API
    //  document.title = `You clicked ${count} times`;
  });
  useEffect(() => {
    // Update the document title using the browser API
    storeData();
  },[address,position]);
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        hidden={false}
        backgroundColor="#ffffff"
        translucent={false}
      />
      <Header title="Your buca" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.footer}>

          <View style={{width: '90%'}}>
            <Card
              image_size="60"
              svg_width="12"
              svg_width_pin="14"
              value={1}
              big={true}
            />
          </View>

          <Input_header header="Address"  onChange={text => setAddress(text)}
      value={address}/>
          <TextInput
            value={address}
            onChangeText = {(val) => {
              setAddress(val)
              AsyncStorage.setItem('address', val)
              //console.log(val)
            }}
            placeholder="Enter your address"
            style={styles.add_input}
            multiline={true}
            numberOfLines={2}
            minHeight={60}
          />
          <Input_header header="Linkedin ID" />
          <View style={styles.input_view}>
            <SvgUri
              width="18"
              height="18"
              style={{marginRight: 10}}
              source={require('../../assets/linkedin.svg')}
            />
            <TextInput
               value={linkedin}
              onChangeText = {(val) => {
                setLinkedin(val)
                AsyncStorage.setItem('linkedinid', val)
                //console.log(val)
              }}
              placeholder="Enter your linkedin id"
              style={styles.password_input_style}
            />
          </View>
          <Input_header header="Instagram ID" />

          <View style={styles.input_view}>
            <SvgUri
              width="18"
              height="18"
              style={{marginRight: 10}}
              source={require('../../assets/instagram.svg')}
            />
            <TextInput
            value={instagram}
            onChangeText = {(val) => {
              setInstagram(val)
              AsyncStorage.setItem('instagramid', val)
              //console.log(val)
            }}
              placeholder="Enter your instagram id"
              style={styles.password_input_style}
            />
          </View>
          <Input_header header="Facebook ID" />

          <View style={styles.input_view}>
            <SvgUri
              width="18"
              height="18"
              style={{marginRight: 10}}
              source={require('../../assets/facebook.svg')}
            />

            <TextInput
            value={facebook}
            onChangeText = {(val) => {
              setFacebook(val)
              AsyncStorage.setItem('facebookid', val)
              //console.log(val)
            }}
              placeholder="Enter your facebook id"
              style={styles.password_input_style}
            />
          </View>
          <Input_header header="Website" />

          <View style={styles.input_view}>
            <SvgUri
              width="18"
              height="18"
              style={{marginRight: 10}}
              source={require('../../assets/cv.svg')}
            />

            <TextInput
            value={website}
            onChangeText = {(val) => {
              setWebsite(val)
              AsyncStorage.setItem('websitelink', val)
              //console.log(val)
            }}
              placeholder="Enter your Website Link"
              style={styles.password_input_style}
            />
          </View>
          <Input_header header="Position"  onChange={text => setPosition(text)}
      value={position} />
          <TextInput
          value={position}
          onChangeText = {(val) => {
            setPosition(val)
            AsyncStorage.setItem('position', val)
            //console.log(val)
          }}
            autoCapitalize="none"
            style={styles.position_input_style}
          />
          <View style={{width: '90%', alignItems: 'flex-end'}}></View>
          <View style={{width: '90%', alignItems: 'flex-start'}}>
            <TouchableOpacity
              style={{
                alignItems: 'flex-start',
                flexDirection: 'row',
                display: 'flex',
                marginTop: 20,
              }}
              onPress={() => navigation.navigate('Choose')}>
              <Text style={styles.text}>Change buca design</Text>
              <SvgUri
                width="22"
                height="22"
                style={{paddingLeft: 10}}
                source={require('../../assets/chevron_right.svg')}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{height: 10, marginTop: 20}} />
      </ScrollView>
      <View style={styles.bottom_bar}>
        <TouchableOpacity
          style={styles.touchable_login}
          onPress={() => navigation.navigate('Choose')}>
          <View style={styles.buuton_login}>
            <Text style={styles.button_text}>Continue</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
export default Home;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    backgroundColor: '#fff',
  },
  header: {
    height: '10%',
    shadowOffset: {height: 2},
    shadowColor: '#bdbdbd',
    shadowOpacity: 0.5,
    elevation: 5,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 7,
  },
  footer: {
    flex: 1,
    alignItems: 'center',
    height: '90%',
    marginTop: 10,
  },
  header_text: {
    fontSize: 17,
    color: '#2d2d2d',
    fontWeight: 'bold',
  },
  password_input_style: {
    height: 42,
    borderRadius: 5,
    paddingLeft: 10,
    marginTop: 5,
    fontSize: 14,
    width: '90%',
    paddingRight: 10,
  },
  password_input_focused: {
    borderWidth: 2,
    borderColor: '#00BD84',
    height: 42,
    borderRadius: 5,
    paddingLeft: 10,
    marginTop: 5,
    fontSize: 14,
    width: '90%',
  },
  text: {
    color: '#00bd84',
    fontSize: 17,
    fontWeight: 'bold',
    paddingRight: 10,
  },
  bottom_bar: {
    backgroundColor: '#fff',
    height: 100,
    shadowColor: '#bdbdbd',
    borderColor: '#bdbdbd',
    shadowOffset: {height: 0},
    shadowColor: '#bdbdbd',
    shadowOpacity: 20,
    elevation: 5,
  },
  buuton_login: {
    backgroundColor: '#00bd84',
    borderRadius: 5,
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: '5%',
  },
  button_text: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 17,
  },
  touchable_login: {
    height: 42,
    paddingTop: 15,
  },
  position_input_style: {
    borderWidth: 2,
    borderColor: '#BDBDBD',
    height: 42,
    borderRadius: 5,
    paddingLeft: 10,
    marginTop: 7,
    fontSize: 17,
    width: '90%',
  },
  input_view: {
    borderWidth: 2,
    borderColor: '#BDBDBD',
    height: 42,
    borderRadius: 5,
    paddingLeft: 10,
    marginTop: 5,
    fontSize: 17,
    width: '90%',
    paddingRight: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  add_input: {
    height: 42,
    borderRadius: 5,
    paddingLeft: 10,
    marginTop: 5,
    fontSize: 17,
    width: '90%',
    paddingRight: 10,
    borderWidth: 2,
    borderColor: '#bdbdbd',
  },
});
