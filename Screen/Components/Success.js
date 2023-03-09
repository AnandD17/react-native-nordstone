import React, { useEffect, useState } from 'react'
import { View, Text, Dimensions, StyleSheet, Image, Animated, TouchableOpacity, ScrollView, ImageBackground, Pressable } from 'react-native'
import img1 from "../../assets/success2.png"
import img2 from "../../assets/team-7.jpg"

const window = Dimensions.get('window');

import * as Print from "expo-print";
import * as MediaLibrary from "expo-media-library";
import * as FileSystem from 'expo-file-system';
import * as IntentLauncher from 'expo-intent-launcher';
import * as Sharing from "expo-sharing";
import { CardContent } from './cardContent';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import img3 from "../../assets/logo_bg_removed.png"


const Tab = createBottomTabNavigator()



function Success() {

    const opacity = new Animated.Value(0);

    const [user, setUser] = useState(null)

    const appear = () => {
        Animated.timing(opacity, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: false,
        }).start();
    }

    useEffect(() => {
        appear()

        AsyncStorage.getItem('user').then((value) => {
            const use = JSON.parse(value);
            console.log("success page", use)
            setUser(use)
        })
    }, [])


    const createAndSavePDF = async (html) => {
        try {
            const { uri } = await Print.printToFileAsync({ html: html });
            if (Platform.OS === "ios") {
                await Sharing.shareAsync(uri);
            } else {
                const permission = await MediaLibrary.requestPermissionsAsync();


                if (permission.granted) {

                    try {

                        const cUri = await FileSystem.getContentUriAsync(uri);

                        await IntentLauncher.startActivityAsync("android.intent.action.VIEW", {
                            data: cUri,
                            flags: 1,
                            type: "application/pdf",
                        });
                    } catch (e) {
                        console.log(e.message);
                    }

                    // console.log(uri)
                    // await MediaLibrary.createAssetAsync(uri);

                    // Sharing.shareAsync(uri, { dialogTitle: 'Here is your PDF' })

                }
            }

        } catch (error) {
            console.error(error);
        }
    };


    return (
        <>

            <ScrollView style={{ display: "flex", paddingTop: 50,  flexDirection: "column", flex: 1,  maxHeight: window.height - 100, paddingBottom: 50 }}>
                <Animated.View style={styles.container}>

                    <View style={{width: '92%', paddingVertical: 0, display: 'flex'}}>
                    <View style={{ display: "flex", flexDirection: 'row', justifyContent: "center", alignItems: "center", padding: 10, backgroundColor: "#01499D" }}>
                        <Image source={img3} style={{ height: 70, width: 70, borderRadius: 50, marginRight: 10, backgroundColor: "#fff" }} resizeMode="contain" />

                        <View style={{ flex: 1 }}>
                            <Text style={{ fontSize: 17, color: "#fff", textAlign: "center" }}>
                                ಕರ್ನಾಟಕ ರಾಜ್ಯ ಆರೋಗ್ಯ ಮತ್ತು ಕುಟುಂಬ ಕಲ್ಯಾಣ ಇಲಾಖೆಯ NHM ಒಳಗುತ್ತಿಗೆ ನೌಕರರ ಸಂಘ (ರಿ)
                            </Text>
                            <Text style={{ color: "#fff", textAlign: "center" }}>ನೋಂದಣಿ ಸಂಖ್ಯೆ : DRB1/SOR/409/2022-2023</Text>
                            <Text style={{ color: "#fff", textAlign: "center" }}>ಕಲ್ಪವೃಕ್ಷ, ಎಸ್, ಎಸ್, ಎನ್‌ಕ್ಲೇವ್, ಪ್ಲಾಟ ನಂ. ಎಸ್-1, ಎರಡನೇ ಮಹಡಿ,
                                ಇಂಡಿಯನ್ ಎಕ್ಷಪ್ರೆಸ್ ಲೇಔಟ, ಕೊಡೆಗೆನಹಳ್ಳಿ, ಬೆಂಗಳೂರು-560097</Text>
                        </View>
                    </View>

                    <View style={{ paddingHorizontal: 10, paddingVertical: 20, backgroundColor: "#F0F8FE" }}>

                        <View style={{ display: "flex", alignItems: "center" }}>
                            <Image source={{ uri: user?.avatar['secure_url'] }} style={styles.cardImage} />
                        </View>
                        <View style={{ display: "flex", alignItems: "center", padding: 20, gap: 10 }}>
                            <Text>ID No.: DRB1/SOR/409/{user?.userId}</Text>
                            <Text style={{ fontSize: 24 }}>{user?.name}</Text>
                            <Text >{user?.designation}</Text>
                            <Text style={{ marginTop: 10 }}><Text style={{ fontWeight: '600' }}>Mobile</Text> : {user?.phoneNumber}</Text>
                            <Text style={{ marginTop: 10 }}> <Text style={{ fontWeight: '600' }}>Blood Group</Text> : {user?.bloodGroup}</Text>
                            <Text style={{ marginTop: 10 }}> <Text style={{ fontWeight: '600' }}>Date of Birth</Text> : {user?.dateOfBirth?.split("T")[0]}</Text>
                            <Text style={{ marginTop: 10 }}> <Text style={{ fontWeight: '600' }}>Date of Joining </Text>: {user?.dateOfJoining?.split("T")[0]}</Text>
                            <Text style={{ marginTop: 10 }}> <Text style={{ fontWeight: '600' }}>Working Place</Text> : {user?.placeOfWork}</Text>
                        </View>

                    </View>

                    </View>

                    <Pressable style={{ marginTop: 30, backgroundColor: "green", width: "80%", color: "white", padding: 10, borderRadius: 8, textAlign: "center" }}
                        onPress={() => createAndSavePDF(CardContent({ user }))}
                    >
                        <Text style={{ textAlign: "center", color: "#fff", fontSize: 18 }}> Download</Text>
                    </Pressable>



                </Animated.View>
            </ScrollView>

        </>
    )
}

export default Success


const styles = StyleSheet.create({
    container: {
        minHeight: window.height + 100,
        width: window.width,
        alignItems: "center",
        backgroundColor: "#ffffff",
        paddingTop: 20,
        paddingBottom: 100,
        borderRadius: 10
    },

    cardContainer: {
        width: "90%",
        borderRadius: 10,
        borderWidth: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        borderColor: "#e5e5e5",
        padding: 15
    },
    cardImage: {
        borderWidth: 1,
        width: 150,
        height: 150,
        resizeMode: "cover",
        zIndex: 100,
    },
    cardContent: {
        marginTop: 10,
        // width: "100%",
        display: "flex",
        flexDirection: "column",
    },
    text: {
        fontSize: 11,
        marginBottom: 20
    },
    cardHeader: {
        padding: 10
    }
})