import React from 'react'
import {StyleSheet,View,ScrollView,Text,TouchableOpacity,TextInput} from 'react-native'
import Template_header from '../../components/Template_header'
import Card from '../../components/Card'
import CreateDesign from '../../components/CreateDesign'
import Input_header from '../../components/Input_header'

function Choose_templates({navigation}) {
    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
          // do something
          navigation.navigate("Choose")
        });
    
        return unsubscribe;
      }, [navigation]);
    return (
        <View style={styles.container}>
        <View style={styles.container}>
<Template_header title="Choose Template" redirectTo="Design"/>

<ScrollView>
<View style={{justifyContent:"space-between",flexDirection:"row",marginHorizontal:10,paddingTop:20}}>
    <Text style={styles.header}>Basic</Text>
    <TouchableOpacity onPress={() => navigation.navigate("Templates")}>
    <Text style={styles.view}>view more</Text>
    </TouchableOpacity>

</View>
<ScrollView horizontal>
    <View style={{flexDirection:'row', flex:1}}>
        <View style={{width:350, paddingTop:15}}>
            <Card image_size="30" svg_width="8" svg_width_pin="10" value={1} big={false} />
        </View>
        <View style={{width:350, padding:15}}>
            <Card image_size="30" svg_width="8" svg_width_pin="10" value={2} big={false}  />
        </View>
    </View>
</ScrollView>

<View style={{justifyContent:"space-between",flexDirection:"row",marginHorizontal:10,paddingTop:10}}>
    <Text style={styles.header}>Premium</Text>
    <TouchableOpacity onPress={() => navigation.navigate("Templates")}>
    <Text style={styles.view}>view more</Text>
    </TouchableOpacity>
    

</View>
<ScrollView horizontal>
    <View style={{flexDirection:'row', flex:1}}>
        <View style={{width:350, paddingTop:15}}>
            <Card image_size="30" svg_width="8" svg_width_pin="10" value={1} big={false} />
        </View>
        <View style={{width:350, padding:15}}>
            <Card image_size="30" svg_width="8" svg_width_pin="10" value={2} big={false}  />
        </View>
    </View>
</ScrollView>

<Text style={{fontSize:17,
    color:"#2d2d2d",
    fontWeight:"bold",marginHorizontal:10}}>Customize it</Text>
    <CreateDesign />
    <View style={styles.input_container}>
    <Input_header header="Company code" />
    <TextInput
                autoCapitalize="none"

          placeholder="insert code"
          style={
               styles.password_input_focused
       
          }
          onChangeText={(val) => setpassword(val)}
          onFocus={() => onpassFocus()}
        />
        </View>
        </ScrollView>
        <View style={{height:20}}></View>
        </View>
        
         </View>
    )

}

export default Choose_templates
const styles=StyleSheet.create({
    container:{
        flex:1,
        display:"flex",
        backgroundColor:"#fff",
    
    },
    header:{
        fontSize:17,
    color:"#2d2d2d",
    fontWeight:"bold"
    },
    view:{
        color:"#00bd84",
        fontSize:17,
        fontWeight:"500"
    },
    password_input_focused: {
        borderWidth: 2,
        borderColor: '#00BD84',
        height: 42,
        borderRadius: 5,
        paddingLeft: 10,
        marginTop: 5,
        fontSize: 14,
        marginBottom:20
      },
      input_container:{
          marginHorizontal:"5%",
          paddingTop:10
      }
})
/* <Card image_size="30" svg_width="8" svg_width_pin="10" />
<Card image_size="30" svg_width="8" svg_width_pin="10" value={3} big={false} /> */

/*
    <View style={{flexDirection:"row"}}>
        <View style={{width:"70%"}}>
            <Card image_size="30" svg_width="8" svg_width_pin="10" value={1} big={false} />
        </View>
        <View style={{width:"70%",marginLeft:"5%"}}>
            <Card image_size="30" svg_width="8" svg_width_pin="10" value={2} big={false}  />
        </View>
    </View>

    <View style={{flexDirection:"row"}}>
<View style={{width:"70%"}}>
<Card image_size="30" svg_width="8" svg_width_pin="10" value={3} big={false} />

</View>
<View style={{width:"70%",marginLeft:"5%"}}>
<Card image_size="30" svg_width="8" svg_width_pin="10 " value={4} big={false}/>

</View>
</View>
*/