import React, {useEffect} from "react";
import themeColors from "./styles/theme";
import {extendTheme, NativeBaseProvider,} from "native-base";
import Header from "./components/Header"
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import V60 from "./pages/V60";
import HomeScreen from "./pages/HomeScreen";
import RecipeDetails from "./components/RecipeDetails";
import {
    Montserrat_400Regular,
    Montserrat_600SemiBold,
    Montserrat_800ExtraBold,
    useFonts
} from '@expo-google-fonts/montserrat';
import Recipe from "./components/Recipe";
import RecipeCreator from "./components/RecipeCreator";
import BluetoothConnector from "./pages/BluetoothConnector";
import Toast from 'react-native-toast-message'
import {ThemeProvider} from "./styles/ThemeProvider";
import * as SQLite from "expo-sqlite";
import {AppRegistry} from "react-native";
import {database} from "./middleware/sqlite";
import {mocker, rps} from "./backend/mocker";


const config = {
    useSystemColorMode: false,
    initialColorMode: "dark",
    backgroundColor: themeColors.primaryFirst
};


export const theme = extendTheme({config});
const Stack = createNativeStackNavigator();


let init = true;

export default function App() {

    if (init) {
        database.transaction(tx => {
            tx.executeSql('CREATE TABLE Recipes (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, waterTemp INTEGER, grind TEXT, description TEXT, favourite INTEGER, steps TEXT, own INTEGER)');
            tx.executeSql('DELETE FROM Recipes');
            rps.forEach(recipe => {
                tx.executeSql('INSERT INTO Recipes (title, waterTemp, grind, description, favourite, steps, own) values (?, ?, ?, ?, ?, ?, ?)', [recipe.title, recipe.waterTemp, recipe.grind, recipe.description, 0, JSON.stringify(recipe.steps), 0]);
            })

        });
        init = false;
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

AppRegistry.registerComponent('scale', () => App);
