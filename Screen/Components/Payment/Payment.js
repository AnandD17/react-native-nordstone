import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Pressable, Text, TextInput } from 'react-native'
import { StyleSheet, TouchableOpacity, Dimensions, KeyboardAvoidingView } from 'react-native'
import { View } from 'react-native'
import { USERS } from '../../../utils/apiConst';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'
import Toast from 'react-native-easy-toast';

const window = Dimensions.get('window');

function Payment() {

    const [info, setInfo] = React.useState({})
    const [isLoading, setIsLoading] = React.useState(false)
    const [toast, setToast] = useState()

    const [submitted, setSubmitted] = useState(false)

    const handleChange = (value, key) => {
        setInfo({ ...info, [key]: value })
    }

    const [user, setUser] = useState({})

    const navigation = useNavigation();


    const showErrorToast = (error) => {
        toast?.show(error.message, 1500, () => {
            // callback is optional
        });
    };


    const handleSubmit = async () => {
        const formData = new FormData();

        if (!user || !user?.phoneNumber) {
            showErrorToast({ message: "Please Register" })
            return
        }

        if (!info?.transactionId) {
            showErrorToast({ message: "Please Enter the transaction ID" })
            return
        }
        formData.append("phoneNumber", user?.phoneNumber);
        formData.append("transactionId", info.transactionId);
        setIsLoading(true)
        console.log("formData", formData)

        var config = {
            method: 'post',
            url: USERS,
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            data: formData
        }

        await axios(config).then((res) => {
            setIsLoading(false)
            console.log("response", JSON.stringify(res))
            // setShow(true)
            showErrorToast({ message: "Submitted Successfully" })
            setSubmitted(true)

            // AsyncStorage.setItem("payment", JSON.stringify(res.data.data) || "success")
            // navigation.replace("Success")
        }).catch((err) => {
            setIsLoading(false)
            console.log("error", JSON.stringify(err))
            showErrorToast({ message: err?.response?.data?.message || "Some error occured, Try Again" })
        })
    }

    useEffect(() => {
        AsyncStorage.getItem("user").then((res) => {
            setUser(JSON.parse(res) || {})
        })
    }, [])




    return (
        <View style={styles.container}>
            <Toast ref={(toast) => setToast(toast)} position="top" />

            {isLoading && (
                <View style={{ flex: 1, height: window.height, position: "absolute", width: window.width, zIndex: 20, justifyContent: 'center', backgroundColor: "#00000080" }}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            )}
            <Text style={{ marginBottom: 20, textAlign: "center", color: "red",  marginTop: 50 }}>Please Pay the Amount and Enter the transaction ID</Text>

            <KeyboardAvoidingView behavior="padding" animated >
                <View style={styles.row}>
                    <TouchableOpacity style={{ display: 'flex' }}>
                        <Text style={styles.label}>
                            Account No : <Text style={{ fontWeight: "600" }} >110095396170 </Text>
                        </Text>

                        <Text style={styles.label}>
                            Account Name : <Text style={{ fontWeight: "600" }} >Karnataka Rajya Arogya </Text>
                        </Text>
                        <Text style={styles.label}>
                            IFSC code :<Text style={{ fontWeight: "600" }} > CNRB0008401 </Text>
                        </Text>

                        {
                            submitted && <Text style={styles.label}>
                                Transaction ID :<Text style={{ fontWeight: "600" }} > {info?.transactionId} </Text>
                            </Text>
                        }

                    </TouchableOpacity>

                    {
                        submitted ? <Text style={{ color: "red", textAlign: "center", fontSize: 18 }}>Under Verification</Text>
                            : <View style={{width: "100%"}}>
                                <View style={{ width: "100%", marginBottom: 20, marginTop: 30 }}>
                                    <Text style={[styles.label, { fontSize: 18, fontWeight: '600' }]}>Transaction Id <Text style={styles.important}>*</Text> </Text>
                                    <TextInput
                                        style={styles.input}
                                        value={info?.transactionId}
                                        placeholder="Enter the transaction id"
                                        onChangeText={(e) => handleChange(e, 'transactionId')}
                                    />
                                </View>

                                <Pressable style={styles.button} onPress={handleSubmit}>
                                    <Text style={styles.buttonText}>Get Verified</Text>
                                </Pressable>
                            </View>
                    }
                </View>
            </KeyboardAvoidingView>
        </View>
    )
}

export default Payment

const styles = StyleSheet.create({
    container: {
        display: "flex",
        height: window.height,
        backgroundColor: '#ffffff',
        paddingHorizontal: 30,
        paddingVertical: 40,

    },
    row: {
        flexDirection: 'row',
        flexWrap: 'wrap',
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
        justifyContent: "center"
    },
    label: {
        fontSize: 18,
        color: '#00000080',
        textAlign: "left",
        fontWeight: 'semibold',
        marginBottom: 10,
    },
    important: {
        color: "red"
    },
    button: {
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