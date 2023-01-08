//import React, {createContext, useContext} from "react";
import * as React from 'react';
import { StyleSheet, Text, AppRegistry, View, TextInput, Button } from 'react-native';
import themeColors from "./styles/theme";
import {extendTheme, FavouriteIcon, NativeBaseProvider,} from "native-base";
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
import Toast from 'react-native-toast-message'
import create from 'zustand'
import * as SQLite from 'expo-sqlite';

const config = {
    useSystemColorMode: false,
    initialColorMode: "dark",
    backgroundColor: themeColors.white
};

export const theme = extendTheme({config});
const Stack = createNativeStackNavigator();
const database = SQLite.openDatabase("SQLite\\database.db");
export { database };

var initialization = true;

export default function App() {
    if(initialization){
        database.transaction(tx => {
            tx.executeSql('CREATE TABLE IF NOT EXISTS V60_Roasters (id INTEGER PRIMARY KEY AUTOINCREMENT, Recipe TEXT)');
        });
        database.transaction(tx => {
            tx.executeSql('CREATE TABLE IF NOT EXISTS V60__YourOwn (id INTEGER PRIMARY KEY AUTOINCREMENT, Recipe TEXT)');
        });
        database.transaction(tx => {
            tx.executeSql('CREATE TABLE IF NOT EXISTS V60_Favourites (id INTEGER PRIMARY KEY AUTOINCREMENT, Recipe TEXT)');
        });
        database.transaction(tx => {
            tx.executeSql('CREATE TABLE IF NOT EXISTS Espresso_Roasters (id INTEGER PRIMARY KEY AUTOINCREMENT, Recipe TEXT)');
        });
        database.transaction(tx => {
            tx.executeSql('CREATE TABLE IF NOT EXISTS Espresso_YourOwn (id INTEGER PRIMARY KEY AUTOINCREMENT, Recipe TEXT)');
        });
        database.transaction(tx => {
            tx.executeSql('CREATE TABLE IF NOT EXISTS Espresso_Favourites (id INTEGER PRIMARY KEY AUTOINCREMENT, Recipe TEXT)');
        });

        initialization = false;
    }

    let [fontsLoaded] = useFonts({
        Montserrat_400Regular,
        Montserrat_600SemiBold,
        Montserrat_800ExtraBold,
    });

    if (!fontsLoaded) {
        return null;
    }


    return (
        <NativeBaseProvider>
            <NavigationContainer>
                <Stack.Navigator screenOptions={{
                    headerStyle: {
                        backgroundColor: themeColors.white,
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

                </Stack.Navigator>
            </NavigationContainer>
            <Toast/>
        </NativeBaseProvider>
    );
};

AppRegistry.registerComponent('scale', () => App);