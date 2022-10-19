import React from "react";
import themeColors from "./styles/theme";
import {extendTheme, FavouriteIcon, NativeBaseProvider,} from "native-base";
import Header from "./components/Header"
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Espresso from "./pages/Espresso";
import V60 from "./pages/V60";
import HomeScreen from "./pages/HomeScreen";
import Recipe from "./components/Recipe";

const config = {
    useSystemColorMode: false,
    initialColorMode: "dark",
    backgroundColor: themeColors.white
};

export const theme = extendTheme({config});
const Stack = createNativeStackNavigator();

export default function App() {
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
                                      headerTitle: (props) => <Header {...props} />,
                                  }}/>
                    <Stack.Screen name={'Espresso'} component={Espresso}
                                  options={{
                                      headerTitle: (props) => <Header {...props} />,
                                  }}/>

                    <Stack.Screen name={'V60'} component={V60}
                                  options={{
                                      headerTitle: (props) => <Header {...props} />,
                                  }}/>
                    <Stack.Screen name={'Recipe'} component={Recipe}
                                  options={{
                                      headerTitle: (props) => <Header {...props} />,
                   
                                  }}/>
                </Stack.Navigator>
            </NavigationContainer>
        </NativeBaseProvider>
    );
};
