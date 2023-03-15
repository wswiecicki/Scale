import React, {createContext, useContext} from "react";
import themeColors from "./styles/theme";
import {extendTheme, FavouriteIcon, HStack, NativeBaseProvider, Switch, Text, useColorMode,} from "native-base";
import Header from "./components/Header"
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Espresso from "./pages/Espresso";
import V60 from "./pages/V60";
import HomeScreen from "./pages/HomeScreen";
import RecipeDetails from "./components/RecipeDetails";
import {
    useFonts,
    Montserrat_400Regular,
    Montserrat_800ExtraBold,
    Montserrat_600SemiBold
} from '@expo-google-fonts/montserrat';
import Recipe from "./components/Recipe";
import RecipeCreator from "./components/RecipeCreator";
import BluetoothConnector from "./pages/BluetoothConnector";
import Toast from 'react-native-toast-message'
import create from 'zustand'

import {BleManager} from "react-native-ble-plx";
import {ThemeProvider, useTheme} from "./styles/ThemeProvider";


const config = {
    useSystemColorMode: false,
    initialColorMode: "dark",
    backgroundColor: themeColors.primaryFirst
};


export const useBLEStore = create((set) => ({
    manager: new BleManager(),
    weight: 'Device not found, connecting...',
    setWeight: (weight) => set(() => ({weight: weight})),
    deviceConnected: false,
    setDeviceConnected: (value) => set(() => ({deviceConnected: value})),
    flowRate: 0,
    setFlowRate: (value) => set(() => ({flowRate: value}))
}))

export const theme = extendTheme({config});
const Stack = createNativeStackNavigator();

export default function App() {

    let [fontsLoaded] = useFonts({
        Montserrat_400Regular,
        Montserrat_600SemiBold,
        Montserrat_800ExtraBold,
    });

    if (!fontsLoaded) {
        return null;
    }


    return (
        <ThemeProvider>
            <NativeBaseProvider>
                <NavigationContainer>
                    <Stack.Navigator screenOptions={{
                        headerStyle: {
                            backgroundColor: themeColors.light.primaryFirst,
                        },
                        headerTitleAlign: 'center',
                    }}>
                        <Stack.Screen name={'Home'} component={HomeScreen}
                                      options={{
                                          headerTitle: (props) => <Header tall={true} props={{...props}}/>,
                                      }}/>
                        <Stack.Screen name={'Espresso'} component={Espresso}
                                      options={{
                                          headerTitle: (props) => <Header {...props} />,
                                      }}/>

                        <Stack.Screen name={'V60'} component={V60}
                                      options={{
                                          headerTitle: (props) => <Header {...props} />,
                                      }}/>
                        <Stack.Screen name={'RecipeDetails'} component={RecipeDetails}
                                      options={{
                                          headerTitle: (props) => <Header {...props} />,

                                      }}/>
                        <Stack.Screen name={'Recipe'} component={Recipe}
                                      options={{
                                          headerTitle: (props) => <Header {...props} />,
                                      }}/>
                        <Stack.Screen name={'RecipeCreator'} component={RecipeCreator}
                                      options={{
                                          headerTitle: (props) => <Header {...props} />,
                                      }}/>

                        <Stack.Screen name={'BLE'} component={BluetoothConnector}
                                      options={{
                                          headerTitle: (props) => <Header {...props} />,
                                      }}/>


                    </Stack.Navigator>
                </NavigationContainer>
                <Toast/>
            </NativeBaseProvider>
        </ThemeProvider>
    );
};
