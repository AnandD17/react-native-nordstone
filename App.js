import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, Text, View, Dimensions, Image, Animated, TouchableOpacity, Platform } from 'react-native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import { NavigationContainer, NavigationHelpersContext } from '@react-navigation/native';
// import { useNavigation } from '@react-navigation/native';
import Form from './Screen/Components/Form/Form';
import SplashScreen from './Screen/SplashScreen';
import Success from './Screen/Components/Success';

import img1 from "./assets/main.png"
import img2 from "./assets/logo_bg_removed.png"
import { useEffect, useState } from 'react';
import Login from './Screen/Components/Login/Login';

import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Income from './Screen/Expense/Income';
import Expense from './Screen/Expense/Expense';
import Payment from './Screen/Components/Payment/Payment';
import Notification from './Screen/Notification/Notification';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator()

const window = Dimensions.get('window');


function Main({ navigation }) {
  // const navigation = useNavigation();

  const marginTop = new Animated.Value(-240);
  const opacity = new Animated.Value(0);

  const text = new Animated.Value(0);
  const button = new Animated.Value(0);

  const [animating, setAnimating] = useState(true);

  const appear = () => {
    Animated.timing(marginTop, {
      toValue: -180,
      duration: 500,
      useNativeDriver: false,
    }).start();

    Animated.timing(opacity, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: false,
    }).start();


    Animated.timing(text, {
      toValue: 1,
      duration: 4000,
      useNativeDriver: false,
    }).start();

  };

  const buttonAppear = () => {
    setTimeout(() => {
      Animated.timing(button, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: false,
      }).start();
    }, 1000)
  }

  useEffect(() => {
    appear();
    buttonAppear()
  }, []);

  return <View
    style={{ display: "flex", justifyContent: "center", alignItems: "center", height: window.height, paddingVertical: 30, backgroundColor: "white", flex: 1 }}
  >
    <Animated.View style={[{ width: 450, alignSelf: "center", height: 500, marginTop: -120, borderRadius: 190, backgroundColor: "#e5e5e5", position: 'absolute', top: 0, }, { marginTop: marginTop }]}></Animated.View>


    <View style={{ marginBottom: 30, marginTop: "25%" }}>
      <Animated.Image source={img2} style={[{ height: 150, borderRadius: 100, width: 150 }, { opacity: opacity }]} resizeMode={"contain"} />
    </View>


    <Animated.Text style={[{ fontSize: 18, color: "#00000080", marginBottom: 30, marginTop: "20%", textAlign: 'center' }, { opacity: text }]}>Get started with us today! {'\n'} Please Select a option.</Animated.Text>

    {/* <Animated.Image source={img1} style={[{ height: 320, marginBottom: 10 }, { opacity: opacity }]} resizeMode={"contain"} /> */}


    <TouchableOpacity onPress={() => navigation.navigate("Form")}>

      <Animated.View style={[{ backgroundColor: "#364277", width: 200, padding: 15, borderRadius: 10, marginBottom: 20 }, { opacity: button }]}

      >
        <Text
          style={{ color: "white", fontSize: 20, textAlign: 'center' }}

        >Register</Text>
      </Animated.View>

    </TouchableOpacity>


    <TouchableOpacity onPress={() => navigation.navigate("Login")}>

      <Animated.View style={[{ backgroundColor: "#364277", width: 200, padding: 15, borderRadius: 10 }, { opacity: button }]}

      >
        <Text
          style={{ color: "white", fontSize: 20, textAlign: 'center' }}

        >Login</Text>
      </Animated.View>

    </TouchableOpacity>

    <Text style={{ marginTop: "auto" }}>Made with ♥ Nexenstial LLP</Text>

  </View>
}


function User({ navigation }) {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          position: 'absolute', backgroundColor: '#364277', color: 'white', paddingTop: 20
        },
        headerShown: false,
        style: {
          bottom: 0,
          display: 'flex',
          justifyContent: 'center',
          backgroundColor: '#364277',
          color: 'white',
        },
        activeTintColor: 'white',
        inactiveTintColor: 'gray',
        tabBarShowLabel: false
      }}
      navigationOptions={{ header: null, }}
      initialRouteName="Success">
      <Tab.Screen name="Notification" component={Notification}

        options={{

          tabBarIcon: (tabInfo) => {
            return (
              <AntDesign name="home" size={24} color={tabInfo?.focused ? "#FF5E0080" : "white"} />
            );
          }
        }}>

      </Tab.Screen>
      <Tab.Screen name="Photo" component={Income}
        options={{
          tabBarIcon: (tabInfo) => {
            return (
              <MaterialCommunityIcons name="finance" size={24} color={tabInfo?.focused ? "#FF5E0080" : "white"} />
            );
          }
        }}
      />
      <Tab.Screen name="Text" component={Expense}
        options={{
          tabBarIcon: (tabInfo) => {
            return (
              <FontAwesome5 name="money-check" size={24} color={tabInfo?.focused ? "#FF5E0080" : "white"} />
            );
          }
        }}
      />
      <Tab.Screen name="Calculator" component={Success}
        options={{
          tabBarIcon: (tabInfo) => {
            return (
              <AntDesign name="logout" size={24} color={tabInfo?.focused ? "#FF5E0080" : "white"} />
            );
          }
        }}
        // listeners={{
        //   tabPress: e => {
        //     // Prevent default action
        //     navigation.replace("Main")
        //   },
        // }}
      />

    </Tab.Navigator>

  )
}


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          title: "",
          headerStyle: {
            backgroundColor: '#364277',
            height: 0
          }
        }}
      >


        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen title="" name="Success" component={User} />
        <Stack.Screen title="" name="Login" component={Login} options={{ headerShown: false }} />
        {/* <Stack.Screen name="Main" component={Main} options={{ headerShown: false }} /> */}
        {/* <Stack.Screen title="" name="Payment" component={Payment} options={{ headerShown: false }} /> */}
        {/* <Stack.Screen title="" name="Form" component={Form} options={{ headerShown: false }} /> */}


      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


// "splash": {
//   "image": "./assets/splash1.png",
//   "resizeMode": "contain",
//   "backgroundColor": "#ffffff"
// },