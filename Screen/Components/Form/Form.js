import React, { useEffect, useRef, useState } from 'react'
import { ScrollView, TextInput, StyleSheet, Dimensions, Platform, View, Text, Pressable, KeyboardAvoidingView, ActivityIndicator, TouchableOpacity, Image } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { CheckBox } from 'react-native-elements';

import Toast from 'react-native-easy-toast';
import { CHECKPHONE, DISTRICT, USERS } from '../../../utils/apiConst';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';
// import * as ImagePicker from "react-native-image-picker"
import * as ImagePicker from 'expo-image-picker';
// import { launchImageLibrary } from 'react-native-image-picker';
// import { Constants, ImagePicker, Permissions } from 'expo';
import { AntDesign } from '@expo/vector-icons';
const window = Dimensions.get('window');


const InitialState = { "name": "", "age": "", "gender": "", "designation": "", "employeeNumber": "", "bloodGroup": "", "phoneNumber": "", "placeOfWork": "", "address": "", "avatar": "", check: false, "district": "", "taluka": "", "pincode": "" }


function Form() {

    const [isLoading, setIsLoading] = useState(false)

    const [isUser, setIsUser] = useState(false)

    const navigation = useNavigation();

    const [toast, setToast] = useState()

    const [data, setData] = useState([])

    const [district, setDistrict] = useState([
        {
            name: "Dharwad",
            value: "dharwad"
        },
        {
            name: "Hubli",
            value: "hubli"
        }
    ])
    const [taluka, setTaluka] = useState([
        {
            name: "Vidya nagar",
            value: "vidya nagar"
        },
        {
            name: "bnb",
            value: "bnb"
        }
    ])


    const showErrorToast = (error) => {
        toast?.show(error.message, 1500, () => {
            // callback is optional
        });
    };

    const [info, setInfo] = React.useState(InitialState)

    const handleChange = (value, key) => {
        setInfo({ ...info, [key]: value })
    }



    const validate = () => {

        if (!info?.check) {
            showErrorToast({ message: "Please sign the acknowledgement" })
            return false
        }

        if (!info?.name || !info?.age || !info?.gender || !info?.phoneNumber || !info?.designation || !info?.placeOfWork || !info?.password) {
            showErrorToast({ message: "Please fill all the fields" })
            return false
        }

        if (!imageFile) {
            showErrorToast({ message: "Upload your image" })
            return false
        }

        return true
    }

    const handleSubmit = async () => {

        setIsLoading(true)

        if (!validate()) return setIsLoading(false)

        const formData = new FormData();

        formData.append("name", info.name);
        formData.append("age", info.age);
        formData.append("gender", info.gender);
        formData.append("phoneNumber", info.phoneNumber);
        formData.append("designation", info.designation);
        formData.append("employeeNumber", info.employeeNumber);
        formData.append("bloodGroup", info.bloodGroup);
        formData.append("placeOfWork", info.placeOfWork);
        formData.append("address", info.address);
        formData.append("district", info.district);
        formData.append("taluka", info.taluka);
        formData.append("pincode", info.pincode);
        formData.append("avatar", imageFile);
        formData.append("password", info.password);
        formData.append("dateOfJoining", info.dateOfJoining);
        formData.append("dateOfBirth", info.dateOfBirth);


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
            AsyncStorage.setItem("user", JSON.stringify(res.data.data))
            navigation.replace("Payment")
        }).catch((err) => {
            setIsLoading(false)
            console.log("error", JSON.stringify(err))
            showErrorToast({ message: err?.response?.data?.message || "Some error occured, Try Again" })
        })
    }


    // const checkUser = async () => {
    //     setIsLoading(true)
    //     var config = {
    //         method: 'get',
    //         url: CHECKPHONE + `/` + info?.phoneNumber,
    //     }

    //     await axios(config).then((res) => {
    //         setIsLoading(false)
    //         console.log(res.data)
    //         setInfo(prev => ({ ...prev, ...res.data.data }))
    //         setIsUser(true)
    //     }).catch((err) => {
    //         setIsLoading(false)
    //         console.log(JSON.stringify(err?.response))
    //         showErrorToast({ message: err?.response?.data?.message || "Some error occured, Try Again" })
    //     })
    // }

    const getData = async () => {
        await axios.get(DISTRICT).then((res) => {
            setData(res.data.talukas)

            const valueArray = res?.data.talukas?.map(item => item?.district)
            const seen = new Set(valueArray)

            const arr = [...seen]

            const obj = arr.map(item => ({ name: item, value: item }))

            setDistrict(obj)
        })
            .catch((err) => {
                // console.log(err)
                console.log(JSON.stringify(err.response))
                return null
            })
    }

    useEffect(() => {

        getData()

    }, [])


    useEffect(() => {
        if (info?.district) {
            setTaluka(data.filter((item) => item.district === info.district).map(item => ({ name: item.taluka, value: item.taluka })))
        }
    }, [info])



    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [show2, setShow2] = useState(false);


    const changeDate = (event, selectedDate) => {
        const currentDate = selectedDate || "";
        setShow(Platform.OS === 'ios');
        setInfo(prev => ({ ...prev, 'dateOfJoining': new Date(new Date().setDate(new Date(currentDate).getDate() + 1)).toISOString(), dateOfJoiningPicker: currentDate }))
        console.log(info)
    };

    const changeDate2 = (event, selectedDate) => {
        const currentDate = selectedDate || "";
        setShow2(Platform.OS === 'ios');
        console.log(currentDate)
        setInfo(prev => ({ ...prev, 'dateOfBirth': new Date(new Date().setDate(new Date(currentDate).getDate() + 1)).toISOString(), dateOfBirthPicker: currentDate }));


        console.log(info)
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode("date")
    }


    const showMode2 = (currentMode) => {
        setShow2(true);
        setMode(currentMode);
    };

    const showDatepicker2 = () => {
        showMode2("date")
    }



    //////////////////// FILES ////////////////////////


    const ImageOptions = {
        title: 'select image', storageOptions: { skipBackup: true, path: 'images' },
        maxWidth: 150, maxHeight: 150, chooseFromLibraryButtonTitle: 'Choose from gallery',
    };


    const [imageFile, setImageFile] = useState(null);

    function ImageUpload() {
        console.log('UPLOADImage====')
        ImagePicker.showImagePicker(ImageOptions, (response) => {
            console.log('Image Response = ', response);
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                const source = { filename: response.fileName, type: response.type, uri: response.fileSize };
                const self = this;
                const userId = '';

                setImageFile(source)
                // formData.append("filename", source);
            }
        });
    }


    const pickImageAsync = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            console.log(result);

            let localUri = result.assets[0].uri;
            let filename = localUri.split('/').pop();

            // Infer the type of the image
            let match = /\.(\w+)$/.exec(filename);
            let type = match ? `image/${match[1]}` : `image`;

            console.log({ uri: localUri, name: filename, type })
            setImageFile({ uri: localUri, name: filename, type });
        } else {
            alert('You did not select any image.');
        }
    };


    // const pay = async () => {
    //     // try {
    //     //     const options = {
    //     //         app: 'npci',
    //     //         vpa: '9661396318@paytm',
    //     //         payeeName: 'Priyansh Raj',
    //     //         transactionRef: 'aksjdfn8',
    //     //         description: 'Description of the transaction',
    //     //         amount: '1.00',
    //     //         transactionNote: 'Additional Note',
    //     //         currencyUnit: 'INR'
    //     //     };

    //     //     function successCallback(data) {
    //     //         // do whatever with the data
    //     //         console.log(data)
    //     //     }

    //     //     function failureCallback(data) {
    //     //         // do whatever with the data
    //     //     }

    //     //     const response = await UPIModule.initializePayment(options, successCallback, failureCallback)


    //     //     console.log(response);
    //     // } catch (error) {
    //     //     console.log(error);
    //     // }

    //     const transactionId = "11223344";
    //     const message = `message`;
    //     const payTo = "9661396318@paytm";
    //     const payName = "Priyasnh Raj";
    //     const amount = 100;

    //     try {

    //         UPIModule.openUPIClient(
    //             `upi://pay?pa=${payTo}&pn=${payName}&tr=${transactionId}&tn=${message}&am=${amount}`
    //         ).then(res => {
    //             if (res !== null) {
    //                 let result = {};
    //                 let response = res.split("&").forEach(property => {
    //                     let temp = property.split("=");
    //                     result[temp[0]] = temp[1];
    //                 });
    //                 return result;
    //             }
    //         }).then(res => {
    //             console.log(res);
    //         });
    //     }
    //     catch (err) {
    //         console.log(err)
    //     }
    // }

    return (

        <View style={{ flex: 1, backgroundColor: "#364277", paddingBottom: 30 }}>
            <KeyboardAvoidingView behavior="padding" animated style={{ minHeight: window.height, paddingBottom: 20 }}>

                {isLoading && (
                    <View style={{ flex: 1, height: window.height, position: "absolute", width: window.width, zIndex: 20, justifyContent: 'center', alignItems: 'center', backgroundColor: "#00000080" }}>
                        <ActivityIndicator size="large" color="#0000ff" />
                    </View>
                )}

                <Toast ref={(toast) => setToast(toast)} position="top" />
                <ScrollView
                    style={{ display: "flex", flexDirection: "column", width: window.width, backgroundColor: "#364277", paddingVertical: 30 }}
                >


                    <View
                        style={{ display: "flex", justifyContent: "center", alignItems: "center", margin: 30, padding: 20, borderRadius: 10, backgroundColor: "white" }}>

                        {
                            !isUser && <Text style={{ color: "#00000080", fontSize: 16, marginBottom: 20 }}>Register using your Phone Number</Text>
                        }

                        <View style={{ width: "100%", marginBottom: 20 }}>
                            <Text style={styles.label}>Mobile no <Text style={styles.important}>*</Text></Text>
                            <TextInput
                                keyboardType="number-pad"
                                // onEndEditing={checkUser}
                                style={styles.input}
                                value={info?.phoneNumber}
                                placeholder="Mobile no"
                                onChangeText={(e) => handleChange(e, 'phoneNumber')}
                            />
                        </View>


                        <View style={{ width: "100%", marginBottom: 20 }}>
                            <Text style={styles.label}>Password <Text style={styles.important}>*</Text></Text>
                            <TextInput
                                style={styles.input}
                                value={info?.password}
                                placeholder="Password"
                                onChangeText={(e) => handleChange(e, 'password')}
                            />
                        </View>

                        <View style={{ width: "100%", marginBottom: 20 }}>
                            <Text style={styles.label}>Name <Text style={styles.important}>*</Text></Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Name"
                                value={info?.name}
                                onChangeText={(e) => handleChange(e, "name")}
                            />
                        </View>


                        <View style={{ width: "100%", marginBottom: 20 }}>
                            <Text style={styles.label}>Age <Text style={styles.important}>*</Text> </Text>
                            <TextInput
                                keyboardType="number-pad"
                                style={styles.input}
                                value={info?.age}

                                placeholder="Age"
                                onChangeText={(e) => handleChange(e, "age")}
                            />
                        </View>

                        <View style={{ width: "100%", marginBottom: 20, position: 'relative' }}>
                            <Text style={styles.label}>Gender <Text style={styles.important}>*</Text></Text>
                            <View style={styles.pickerContainer}>


                                <Picker
                                    selectedValue={info?.gender || 'null'}
                                    style={styles.pickerStyle}
                                    mode="dialog"
                                    onValueChange={(itemValue, itemIndex) => handleChange(itemValue, 'gender')}
                                    labelStyle={styles.pickerLabel}
                                    itemStyle={styles.pickerLabel}
                                >
                                    <Picker.Item label="Select" value="null" labelStyle={styles.pickerLabel} />
                                    <Picker.Item label="Male" value="MALE" labelStyle={styles.pickerLabel} />
                                    <Picker.Item label="Female" value="FEMALE" labelStyle={styles.pickerLabel} />
                                    <Picker.Item label="Others" value="OTHERS" labelStyle={styles.pickerLabel} />

                                </Picker>
                            </View>
                        </View>

                        <View style={{ width: "100%", marginBottom: 20 }}>
                            <Text style={styles.label}>Designation  <Text style={styles.important}>*</Text> </Text>
                            <TextInput
                                style={styles.input}
                                value={info?.designation}
                                placeholder="Designation"
                                onChangeText={(e) => handleChange(e, 'designation')}
                            />
                        </View>

                        <View style={{ width: "100%", marginBottom: 20 }}>
                            <Text style={styles.label}>Recipient / Employee Number</Text>
                            <TextInput
                                style={styles.input}
                                value={info?.employeeNumber}
                                placeholder="Recipient/Employee Number"
                                onChangeText={(e) => handleChange(e, 'employeeNumber')}
                            />
                        </View>

                        <View style={{ width: "100%", marginBottom: 20 }}>
                            <Text style={styles.label}>Blood Group</Text>
                            <View style={styles.pickerContainer}>
                                <Picker
                                    selectedValue={info?.bloodGroup || 'null'}
                                    style={styles.pickerStyle}
                                    mode="dialog"

                                    onValueChange={(itemValue, itemIndex) => handleChange(itemValue, 'bloodGroup')}
                                    labelStyle={styles.pickerLabel}
                                    itemStyle={styles.pickerLabel}
                                >
                                    <Picker.Item label="Select" value="null" labelStyle={styles.pickerLabel} />
                                    <Picker.Item label="A+" value="A+" labelStyle={styles.pickerLabel} />
                                    <Picker.Item label="O+" value="O+" labelStyle={styles.pickerLabel} />
                                    <Picker.Item label="B+" value="B+" labelStyle={styles.pickerLabel} />
                                    <Picker.Item label="AB+" value="AB+" labelStyle={styles.pickerLabel} />
                                    <Picker.Item label="A-" value="A-" labelStyle={styles.pickerLabel} />
                                    <Picker.Item label="O-" value="O-" labelStyle={styles.pickerLabel} />
                                    <Picker.Item label="B-" value="B-" labelStyle={styles.pickerLabel} />
                                    <Picker.Item label="AB-" value="AB-" labelStyle={styles.pickerLabel} />
                                </Picker>
                            </View>
                        </View>

                        <View style={{ width: "100%", marginBottom: 20, flexDirection: "column" }}>
                            <Text style={styles.label}>Date of Joining to Service</Text>

                            {
                                Platform.OS !== "ios" ? <View>
                                    <Pressable style={styles.buttonDatePicker} onPress={showDatepicker}>
                                        <Text style={{ color: "#000000", fontSize: 16 }}>{info?.dateOfJoining ? info?.dateOfJoining.split("T")[0] : "Select a date"}</Text>
                                    </Pressable>
                                </View> : null
                            }
                            {show && (<DateTimePicker
                                display="default"
                                mode='date'
                                style={{
                                    justifyContent: 'start',
                                    alignItems: 'start',
                                    margin: 0,
                                    padding: 0,
                                    height: 40,
                                    alignSelf: 'start',
                                    display: 'flex',
                                }}
                                value={info?.dateOfJoining ? info?.dateOfJoiningPicker : new Date()}
                                onChange={(e, selectedDate) => { changeDate(e, selectedDate) }}

                            />
                            )}

                        </View>

                        <View style={{ width: "100%", marginBottom: 20, flexDirection: "column" }}>
                            <Text style={styles.label}>Date of Birth</Text>

                            {
                                Platform.OS !== "ios" ? <View>
                                    <Pressable style={styles.buttonDatePicker} onPress={showDatepicker2}>
                                        <Text style={{ color: "#000000", fontSize: 16 }}>{info?.dateOfBirth ? info?.dateOfBirth.split("T")[0] : "Select a date"}</Text>
                                    </Pressable>
                                </View> : null
                            }
                            {show2 && (<DateTimePicker
                                display="default"
                                mode='date'
                                style={{
                                    justifyContent: 'start',
                                    alignItems: 'start',
                                    margin: 0,
                                    padding: 0,
                                    height: 40,
                                    alignSelf: 'start',
                                    display: 'flex',
                                }}
                                value={info?.dateOfBirth ? info?.dateOfBirthPicker : new Date()}
                                onChange={(e, selectedDate) => { changeDate2(e, selectedDate) }}
                            />
                            )}

                        </View>

                        <View style={{ width: "100%", marginBottom: 20 }}>
                            <Text style={styles.label}>Place of work  <Text style={styles.important}>*</Text></Text>
                            <TextInput
                                style={styles.input}
                                value={info?.placeOfWork}
                                placeholder="Place of work"
                                onChangeText={(e) => handleChange(e, 'placeOfWork')}
                            />
                        </View>




                        <View style={{ width: "100%", marginBottom: 20 }}>
                            <Text style={styles.label}>District</Text>

                            <View style={styles.pickerContainer}>

                                <Picker
                                    selectedValue={info?.district || 'null'}
                                    style={styles.pickerStyle}
                                    mode="dialog"
                                    onValueChange={(itemValue, itemIndex) => handleChange(itemValue, 'district')}
                                    labelStyle={styles.pickerLabel}
                                    itemStyle={styles.pickerLabel}
                                >
                                    <Picker.Item label="Select" value="null" />
                                    {
                                        district.map((item, index) => {
                                            return (
                                                <Picker.Item key={index} label={item.name} value={item.name} labelStyle={styles.pickerLabel} />
                                            )
                                        })
                                    }
                                </Picker>

                            </View>
                        </View>



                        <View style={{ width: "100%", marginBottom: 20 }}>
                            <Text style={styles.label}>Taluka</Text>

                            <View style={styles.pickerContainer}>

                                <Picker
                                    selectedValue={info?.taluka || 'null'}
                                    style={styles.pickerStyle}
                                    mode="dialog"
                                    onValueChange={(itemValue, itemIndex) => handleChange(itemValue, 'taluka')}
                                    labelStyle={styles.pickerLabel}
                                    itemStyle={styles.pickerLabel}
                                >
                                    <Picker.Item label="Select" value="null" labelStyle={styles.pickerLabel} />
                                    {
                                        taluka.map((item, index) => {
                                            return (
                                                <Picker.Item key={index} label={item.name} value={item.name} labelStyle={styles.pickerLabel} />
                                            )
                                        })
                                    }
                                </Picker>
                            </View>
                        </View>



                        <View style={{ width: "100%", marginBottom: 20 }}>
                            <Text style={styles.label}>Address</Text>
                            <TextInput
                                value={info?.address}
                                style={styles.input}
                                placeholder="Address"
                                onChangeText={(e) => handleChange(e, 'address')}
                            />
                        </View>

                        <View style={{ width: "100%", marginBottom: 20 }}>
                            <Text style={styles.label}>Pincode</Text>
                            <TextInput
                                keyboardType="number-pad"
                                value={info?.pinCode}
                                style={styles.input}
                                placeholder="Pincode"
                                onChangeText={(e) => handleChange(e, 'pinCode')}
                            />
                        </View>


                        <View style={{ width: "100%", marginBottom: 20 }}>
                            <Text style={styles.label}>Photo to upload  <Text style={styles.important}>*</Text></Text>
                            {
                                imageFile ? <View style={{ display: "flex", alignItems: "center", flexDirection: "row" }}>
                                    <Image source={{ uri: imageFile.uri }} style={{ width: 100, height: 100, borderRadius: 50 }}></Image>
                                    <TouchableOpacity style={{ marginLeft: 20 }} onPress={() => setImageFile("")}>
                                        <AntDesign name="delete" size={24} color={"lightcoral"} />
                                    </TouchableOpacity>
                                </View> :
                                    <TouchableOpacity
                                        style={styles.buttonStyle}
                                        activeOpacity={0.5}
                                        onPress={pickImageAsync}>
                                        <Text style={{ ...styles.button, color: "white", textAlign: "center" }}>Upload File</Text>
                                    </TouchableOpacity>
                            }
                        </View>

                        <View style={{ width: "100%", marginBottom: 20 }}>
                            <CheckBox
                                title="I agree to all terms and conditions"
                                checked={info?.check}
                                onPress={() => { setInfo(prev => ({ ...prev, "check": !prev.check })) }}
                                containerStyle={{ backgroundColor: 'white', borderWidth: 0, margin: 0, width: "100%", padding: 0, }}
                                textStyle={{ color: 'lightcoral', fontSize: 16, fontWeight: 'semibold' }}
                            />
                        </View>


                        <Pressable style={styles.button} onPress={handleSubmit}>
                            <Text style={styles.buttonText}>Submit</Text>
                        </Pressable>
                        {/* </>
                            : <Text style={{ color: "red", fontSize: 16, textAlign: "center" }}>Verify your phone number first</Text> */}



                        {/* {
                        <Pressable style={styles.button} onPress={pay}>
                            <Text style={styles.buttonText}>pay</Text>
                        </Pressable>
                    } */}

                    </View>

                </ScrollView>

            </KeyboardAvoidingView >
        </View>
    )
}




export default Form


const styles = StyleSheet.create({
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
    },
    pickerContainer: {
        // borderColor: Platform.OS === 'ios' && "#e5e5e580",
        // borderWidth: Platform.OS === 'ios' ? 0 : 1,
        borderRadius: 10,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#e5e5e580",
    },
    pickerStyle: {
        height: 40,
        borderRadius: 10,
        margin: 0,
        padding: 0,
        color: '#344953',
        justifyContent: 'center',
        overflow: "hidden",
        width: "100%",
        backgroundColor: "transparent"
    },
    pickerLabel: {
        fontSize: 14,
        textAlign: 'left',
        margin: 0,
        padding: 0,
        width: "100%",
        color: '#000000',
    },
    button: {
        backgroundColor: "#364277",
        borderRadius: 10,
        padding: 15,
        width: "100%",
    },
    buttonText: {
        color: "white",
        fontWeight: 'semibold',
        fontSize: 18,
        textAlign: "center",
    },
    buttonDatePicker: {
        backgroundColor: "#e5e5e580",
        borderRadius: 10,
        padding: 10,
        color: '#000000',
    },
    important: {
        color: "red",
        fontWeight: 'bold',
        marginLeft: 10
    }
})