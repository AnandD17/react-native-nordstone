import React from 'react'
import { View, StyleSheet, KeyboardAvoidingView, Text, TextInput, Pressable, Dimensions, ActivityIndicator, TouchableOpacity } from 'react-native'
import { LOGIN } from '../../../utils/apiConst'
import axios from 'axios'
// import { AntDesignIcon } from 'react-native-vector-icons/AntDesign';
import { Icon } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'


const window = Dimensions.get('window');

const InitialState = { "phoneNumber": "", "password": "" }

function Login() {

    const [info, setInfo] = React.useState(InitialState)

    const [errTxt, setErrTxt] = React.useState("")

    const navigation = useNavigation();

    const [isLoading, setIsLoading] = React.useState(false)

    const handleChange = (value, key) => {
        setInfo({ ...info, [key]: value })
    }

    const handleSubmit = async () => {

        setIsLoading(true)

        console
        var config = {
            method: 'post',
            url: LOGIN,
            data: { phoneNumber: info?.phoneNumber, password: info?.password }
        }

        navigation.replace("Success")

        // await axios(config).then((res) => {
        //     setIsLoading(false)
        //     console.log(res.data)
        //     AsyncStorage.setItem("user", JSON.stringify(res.data.data))
        //     navigation.replace("Success")
        // }).catch((err) => {
        //     setIsLoading(false)
        //     console.log(err)
        //     setErrTxt(err?.response?.data?.message || "Some error occured, Try Again");
        //     clear()
        // })
    }

    const clear = () => {
        setTimeout(() => {
            setInfo(InitialState)
            setErrTxt("")
        }, 5000)
    }

    return (
        <>
            <View style={{ minHeight: window.height, backgroundColor: "#fff", paddingVertical: 30 }}>
                {isLoading && (
                    <View style={{ height: window.height, position: "absolute", width: window.width, zIndex: 20, justifyContent: 'center', alignItems: 'center', backgroundColor: "#00000080", }}>

                        <ActivityIndicator size="large" color="#0000ff" />
                    </View>
                )}

                <View style={styles.container}>
                    <View style={[{ width: 450, alignSelf: "center", height: 450, marginTop: -200, borderRadius: 190, backgroundColor: "#364277", position: 'absolute', top: 0, display: "flex", alignItems: "center", justifyContent: "flex-end" }]}>
                        <Text style={{ color: "white", marginBottom: 100, fontSize: 18, fontWeight: '600' }}>Sign In Using Registered Mobile Number</Text>
                    </View>
                    <KeyboardAvoidingView style={{width: '100%', display: "flex"}} behavior="padding" animated >

                        <View style={{ width: "100%",  marginTop: 'auto', paddingBottom: 40 }}>
                            <View style={{ marginTop: -20, marginBottom: 20 }}>
                                <Text style={{ color: 'red' }}>{String(errTxt)}</Text>
                            </View>
                            <View style={{ width: "100%", marginBottom: 20 }}>
                                <Text style={styles.label}>Phone Number <Text style={styles.important}>*</Text> </Text>
                                <TextInput
                                    keyboardType="number-pad"
                                    style={styles.input}
                                    value={info?.phoneNumber}
                                    placeholder="Enter your phone number"
                                    onChangeText={(e) => handleChange(e, "phoneNumber")}
                                />
                            </View>

                            <View style={{ width: "100%", marginBottom: 20 }}>
                                <Text style={styles.label}>Password <Text style={styles.important}>*</Text> </Text>
                                <TextInput
                                    style={styles.input}
                                    secureTextEntry={true}
                                    value={info?.password}
                                    placeholder="Enter your password"
                                    onChangeText={(e) => handleChange(e, "password")}
                                />
                            </View>
                            <Pressable style={styles.button} onPress={handleSubmit}>
                                <Text style={styles.buttonText}>Sign In</Text>
                            </Pressable>
                        </View>


                    </KeyboardAvoidingView>
                </View>

            </View>

        </>
    )
}

export default Login

const styles = StyleSheet.create({
    container: {
        display: "flex",
        height: window.height,
        backgroundColor: '#ffffff',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        paddingHorizontal: 30,
        paddingVertical: 30,
    },
    input: {
        backgroundColor: "#e5e5e580",
        borderWidth: 0,
        padding: 10,
        fontSize: 16,
        width: '100%',
        height: 40,
        borderRadius: 10,
        color: '#000000',
        boxShadow: "0 0.4 #dfd9d9",
        cursor: 'pointer',
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    label: {
        fontSize: 16,
        color: '#00000080',
        fontWeight: 'semibold',
        marginBottom: 5,
    }, button: {
        backgroundColor: "#364277",
        borderRadius: 10,
        padding: 10,
        width: "100%",
    },
    buttonText: {
        color: "white",
        fontWeight: 'semibold',
        fontSize: 18,
        textAlign: "center",
    },
})