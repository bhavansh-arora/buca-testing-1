import React from 'react';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {
  View,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Qrgen from '../Qrgenerator/Qrgenerator';
import QRCodeScanner from 'react-native-qrcode-scanner';
import AsyncStorage from '@react-native-community/async-storage';

function QrContainer({navigation}) {
  const storeData = async (e) => {
    try {
      await AsyncStorage.setItem('sharing_id', e.data);
      navigation.navigate('ContactsList');

      // alert('Data successfully saved')
    } catch (e) {
      alert(e);
    }
  };
  function FirstRoute() {
    return (
      <View style={{backgroundColor: '#fff', flex: 1}}>
        <Qrgen />
      </View>
    );
  }
  function SecondRoute() {
    return (
      <QRCodeScanner
        cameraStyle={{backgroundColor: '#000'}}
        containerStyle={{backgroundColor: '#000'}}
        onRead={(e) => {
          storeData(e);
        }}
        permissionDialogMessage="Need Permission to Access Camera"
        reactivateTimeout={10}
        showMarker={true}
        markerStyle={{borderColor: '#fff', borderRadius: 10}}
      />
    );
  }
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'qr code'},
    {key: 'second', title: 'qr scanner'},
  ]);
  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
  });
  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={{backgroundColor: '#00bd89'}}
      style={{backgroundColor: 'white'}}
      activeColor="#00bd89"
      inactiveColor="#aaa"
      labelStyle={{fontWeight: '500'}}
      pressColor="#00bd89">
      <StatusBar
        barStyle="dark-content"
        hidden={false}
        backgroundColor="#ffffff"
        translucent={false}
      />
    </TabBar>
  );
  return (
    <TabView
      navigationState={{index, routes}}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
      renderTabBar={renderTabBar}
      style={{flex: 1}}
    />
  );
}

const initialLayout = {width: Dimensions.get('window').height};

export default QrContainer;
const styles = StyleSheet.create({});
