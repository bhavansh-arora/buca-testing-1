import React,{useState, useEffect} from 'react'
import {View,Text,StyleSheet,TouchableOpacity,ScrollView, Platform} from 'react-native'
import Template_header from '../../components/Template_header'
import Card_Design from '../../components/Card_Design'
import Card from '../../components/Card'
import AsyncStorage from '@react-native-community/async-storage'
import axios from 'axios'
import Modal from 'react-native-modal'

function BuiltDesign({navigation}) {
    const [number,setNumber] = useState(1)
    const [fileUri, setFileUri] = useState('')
    const [address, setAddress] = useState('')
    const [linkedin, setLinkedin] = useState('')
    const [facebook, setFacebook] = useState('')
    const [instagram, setInstagram] = useState('')
    const [website, setWebsite] = useState('')
    const [position, setPosition] = useState('')
    const [email, setEmail] = useState('');
    const [bg, setBg] = useState('')
    const [isVisible, setIsVisible]= useState(false)
    const [cardType, setCardType] = useState(-1)
    const [link, setLink] = useState('')
    const [color, setColor] = useState([])
    const [refresh, setRefersh ] = useState(0)
    const [leng, setLength] = useState(0)

    async function setColorCode()
    {
        const cc = JSON.parse(await AsyncStorage.getItem('cardType'))
        console.log("COLOR")
        if(cc)
        {
            fetch('https://api-buca.herokuapp.com/template', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          })
            .then((response) => response.json()) //If response is in json then in success
            .then((responseJson) => {
              //  dispatch({type:"SET_INVISIBLE"})
              //alert(responseJson.path);
              const data =[]
              for(let i=0;i<responseJson[cc].templates.length;i++)
                data.push(responseJson[cc].templates[i].colorCode)
            setColor(data)
            setLength(responseJson[cc].templates.length)
            })
            .catch((error) => {
              //dispatch({type:"SET_INVISIBLE"})
              console.log(error);
            });
        }     
    }

    const retrieveData = async () =>{
        try{
            const file = await AsyncStorage.getItem('fileUri')
        if(file)
        setFileUri(file)
        const background= await AsyncStorage.getItem('background')
        if(await AsyncStorage.getItem('email'))
            setEmail(await AsyncStorage.getItem('email'))
        if (background !== null) {
            setBg(background)
        const add = await AsyncStorage.getItem('address')
        const pos = await AsyncStorage.getItem('position')
        const web = await AsyncStorage.getItem('websitelink')
        const inst = await AsyncStorage.getItem('instagramid')
        const fb = await AsyncStorage.getItem('facebookid')
        const lkid = await AsyncStorage.getItem('linkedinid')
        const pfp = JSON.parse(await AsyncStorage.getItem('profilepicture'))
        const cc = JSON.parse(await AsyncStorage.getItem('cardType'))
        if(cc)
            setCardType(cc)
        if(web)
            setWebsite(web)
        if(inst)
            setInstagram(inst)
        if(fb)
            setFacebook(fb)
        if(lkid)
            setLinkedin(lkid)
        if(add)
            setAddress(add)
        if(pos)
            setPosition(pos)
        if(pfp)
            setFileUri(pfp)
        }
        }
        catch(e){
            console.log(e)
        }
        
    }

    useEffect(() => {
        retrieveData()
    },[refresh])
        useEffect(() => {
        setColorCode()
    },[])

    const createFormData = (photo, body) => {
        const data = new FormData();

        data.append("profileImage", {
            name: photo.filename,
            type: photo.type,
            uri:
                Platform.OS === 'android'?photo.uri:photo.uri.replace("file://","")
        })

        Object.keys(body).forEach(key => {data.append(key, body[key])})
        return data;
    }

    function make_api_call()
    {
        setIsVisible(false)
        if(email)
        var link = 'https://contact-api-task.herokuapp.com/updateprofile/user/'+email
        console.log(link)
        {
            
            try{
                fetch(link,{
                    method: 'POST',
                    headers:{
                        Accept: 'application/x-www-form-urlencoded',
                    },
                    body:JSON.stringify({
                        position: position,
                        address:address,
                        linkedinid:linkedin,
                        instagramid:instagram,
                        facebookid:facebook,
                        websitelink:website
                    })
                  })
                  .then((response) => {
                    alert(response);
                    
                  })
            }catch(e)
            {
                alert(e)
            }
            
              navigation.navigate('Design_buca_last')
        }
    }

    async function storeData(data)
    {
        await AsyncStorage.setItem('background', data).then(setRefersh(refresh+1))
    }

    function getColorsPath(num)
    {
        fetch('https://api-buca.herokuapp.com/template', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      })
        .then((response) => response.json()) //If response is in json then in success
        .then((responseJson) => {
          //  dispatch({type:"SET_INVISIBLE"})
          //alert(responseJson.path);
          storeData(responseJson[cardType].templates[num].path)
        })
        .catch((error) => {
          //dispatch({type:"SET_INVISIBLE"})
          console.log(error);
        });
    }
    function renderColor()
    {
        return [...Array(leng)].map((elementInArray, index) => (
            <TouchableOpacity onPress={() => getColorsPath(index)}>
                <View style={{
                    height:60,
                    width:60,
                    backgroundColor:color[index],
                    margin:10,
                    alignSelf:"center",
                    borderRadius:5}} />
            </TouchableOpacity>))
    }
    return (
        <>
       <View style={styles.container}>
        <Template_header title="Built Your Design" redirectTo="Choose"/>
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.card_container}>
                <View style={{width:"90%"}}>
                    <Card image_size="60" svg_width="12" svg_width_pin="14" value={number} big={true} />
                </View>
                <Text style={styles.choose_text}>Choose Colors</Text>
                <ScrollView horizontal>
                <View style={styles.color_picker_container}>
                    {renderColor()}
                </View>
                </ScrollView>
            </View>
            <Text style={styles.header}>Front Card</Text>
            <View>
                <View  style={{flexDirection:"row",justifyContent:"space-around",width:"100%",alignItems:"center"}}>
                    <TouchableOpacity style={{width:"45%",display:"flex"}} onPress={()=>setNumber(1)}>
                        <View style={(number==1)?styles.card_selected:styles.card}></View>
                    </TouchableOpacity>
                    <TouchableOpacity style={{width:"45%"}} onPress={()=>setNumber(2)} >
                        <View style={(number==2)?styles.card_right_selected:styles.card_right}></View>
                    </TouchableOpacity>
                </View>
                <View  style={{flexDirection:"row",justifyContent:"space-around",width:"100%",alignItems:"center"}}>
                    <TouchableOpacity style={{width:"45%"}} onPress={()=>setNumber(3)}>
                        <View style={(number==3)?styles.card_selected:styles.card}></View>
                    </TouchableOpacity>
                    <TouchableOpacity style={{width:"45%"}} onPress={()=>setNumber(4)}>
                        <View style={(number==4)?styles.card_right_selected:styles.card_right}></View>    
                    </TouchableOpacity>
                </View>
                <Text style={styles.header}>Back Card</Text>
                <View  style={{flexDirection:"row",width:"100%",marginLeft:5,marginBottom:15}}>
                    <TouchableOpacity style={{width:"45%"}} onPress={()=>{}}>
                        <View style={styles.card_selected}></View>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView> 
       </View>
       <View style={styles.bottom_bar}>
           <View style={{alignItems:'center'}}>
                <Modal isVisible={isVisible} style={{height:100}} coverScreen={true}>
                    <View style={{ backgroundColor:'#FFF', borderRadius:15, alignItems:'center', height:300, width:"100%",margin:15}}>
                        <Text style={{fontSize:25, fontWeight:'bold', paddingTop:45, textAlign:'center'}}>Are you sure you want to save changes?</Text>
                        <View style={{ justifyContent:'space-around', paddingTop:10, flex:1, width:"100%",}}>
                            <TouchableOpacity
                                onPress={() => make_api_call()}
                                style={{marginTop:'2%'}}>
                                <View style={styles.save_button}>
                                <Text style={styles.button_text}>Yes, I want to change it</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => setIsVisible(false)}
                                style={{marginTop:'2%'}}>
                                <View style={styles.dont_save_button}>
                                <Text style={styles.button_text}>No, I don't want to change it</Text>
                                </View>
                            </TouchableOpacity>
                            </View>
                    </View>
                </Modal>
           </View>
            <TouchableOpacity  style={styles.touchable_login}  onPress={() => make_api_call()}>
                <View style={styles.buuton_login}>
                    <Text style={styles.button_text}>Confirm</Text>
                </View>
            </TouchableOpacity>  
        </View> 
        </>
            
    )
}

export default BuiltDesign
const styles = StyleSheet.create({
    container:{
        flex:1,
        display:"flex",
        backgroundColor:"#fff",
    },
    card_container:{
        backgroundColor:"#f9f9f9",
        alignItems:"center",
        paddingTop:10,
        
    },
    buuton_login: {
        backgroundColor: '#00bd84',
        borderRadius: 5,
        height: 42,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal:"5%"
      },
      button_text: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 17,
      },
      touchable_login:{
        height:42,
        paddingTop:15
       
    },
    bottom_bar:{
        backgroundColor:"#fff",
        height:100,
        shadowColor: '#bdbdbd',
       borderColor:"#bdbdbd",
       shadowOffset: { height: 0 },
    shadowColor: '#bdbdbd',
    shadowOpacity: 20,
    elevation: 5,
    },
    choose_text:{
        fontSize:15
    },
    color_picker_one:{
        height:60,
        width:60,
        backgroundColor:"#ae83ff",
        margin:10,
        alignSelf:"center",
        borderRadius:5
    },
    color_picker_two:{
        height:70,
        width:70,
        backgroundColor:"#ff6664",
        margin:10,
        alignSelf:"center",
        borderColor:"#fff",
        borderWidth:4,
        borderRadius:5,
        elevation:5,
        shadowColor:"#bdbdbd",
        shadowOffset:{
            width:0,
            height:0
        },
        shadowOpacity:1
        
    },
    color_picker_three:{
        height:60,
        width:60,
        backgroundColor:"#7aafff",
        margin:10,
        alignSelf:"center",
        borderRadius:5
    },
    color_picker_four:{
        height:60,
        width:60,
        backgroundColor:"#7aafff",
        margin:10,
        alignSelf:"center",
        borderRadius:5
    },
    color_picker_five:{
        height:60,
        width:60,
        backgroundColor:"#7aafff",
        margin:10,
        alignSelf:"center",
        borderRadius:5
    },
    color_picker_container:{
        flexDirection:"row"
    },
    header:{
        fontSize:17,
    color:"#2d2d2d",
    fontWeight:"bold",
    paddingTop:20,
    marginHorizontal:"5%"
    },
    card:{
         width:"100%",
    backgroundColor:"#fff",
    height:110,
    borderRadius:5,
      shadowColor: '#bdbdbd',
      shadowOpacity: 1,
      elevation: 20, 
    shadowOffset:{
        width:2,height:2
    },borderColor:"#fff",
    borderWidth:2,
    flexDirection:"row",
    marginTop:10,
    marginLeft:5,
    borderWidth:1,
    },
     card_selected:{
         width:"100%",
    backgroundColor:"#fff",
    height:110,
    borderRadius:5,
      shadowColor: '#bdbdbd',
      shadowOpacity: 1,
      elevation: 20, 
    shadowOffset:{
        width:2,height:2
    },borderColor:"#fff",
    borderWidth:2,
    flexDirection:"row",
    marginTop:10,
    marginLeft:5,
    borderWidth:1,
    borderColor:"#00bd84"
    },
    card_right:{
           width:"100%",
    backgroundColor:"#fff",
    height:110,
    borderRadius:5,
      shadowColor: '#bdbdbd',
      shadowOpacity: 1,
      elevation: 20, 
    shadowOffset:{
        width:2,height:2
    },borderColor:"#fff",
    borderWidth:2,
    flexDirection:"row",
    marginTop:10,
    marginRight:5,
    borderWidth:1,
    },
    card_right_selected:{
       
           width:"100%",
    backgroundColor:"#fff",
    height:110,
    borderRadius:5,
      shadowColor: '#bdbdbd',
      shadowOpacity: 1,
      elevation: 20, 
    shadowOffset:{
        width:2,height:2
    },borderColor:"#fff",
    borderWidth:2,
    flexDirection:"row",
    marginTop:10,
    marginRight:5,
    borderWidth:1,
    borderColor:"#00bd84"
    
    },
    save_button:{
        backgroundColor:'#0D8',
        borderRadius: 5,
        height: 52,
        alignItems: 'center',
        justifyContent: 'center',
        padding:25,
        flex:1,
        margin:15,
        
      },
      dont_save_button:{
        backgroundColor:'#898989',
        borderRadius: 5,
        height: 102,
        padding:25,
        marginTop:10,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom:25,
        flex:1,
        margin:15,
      },
      button_text:
      {
          fontSize:20,
          fontWeight:'200',
          color:'#FFF'
      }
})