import React from "react";
import themeColors from "./styles/theme";
import {
    Center,
    Heading,
    NativeBaseProvider,
    extendTheme,
    Column,
    Row, Text,
} from "native-base";
import Tile from "./components/Tile";
import Header from "./components/Header"
import ToggleDarkMode from "./components/ToggleDarkMode";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";

const config = {
    useSystemColorMode: false,
    initialColorMode: "dark",
};

export const theme = extendTheme({config});
const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <NativeBaseProvider>
            <NavigationContainer>
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                    <Stack.Screen name={'Home'} component={ HomeScreen }/>
                    <Stack.Screen name={'Espresso'} component={Espresso}/>
                    <Stack.Screen name={'V60'} component={V60}/>
                </Stack.Navigator>
            </NavigationContainer>
        </NativeBaseProvider>
    );
};

const HomeScreen = ({ navigation }) => {
    return <>
        <Center _dark={{bg: themeColors.darkBlue}} _light={{bg: themeColors.white}} px={4} flex={1}>
            <Header/>
            <Column space={5} alignItems="center">
                <Row space={4}>
                    <Tile text='Espresso' navigation={navigation}/>
                    <Tile text='V60' navigation={navigation}/>
                </Row>
                <ToggleDarkMode/>
            </Column>
        </Center>
    </>
}

const Espresso = ({ navigation }) => {
    return <>
        <Center _dark={{bg: themeColors.darkBlue}} _light={{bg: themeColors.white}} px={4} flex={1}>
            <Header/>
            <Column space={5} alignItems="center">
                <Text>Espresso</Text>
            </Column>
        </Center>
    </>
}

const V60 = ({ navigation }) => {
    return <>
        <Center _dark={{bg: themeColors.darkBlue}} _light={{bg: themeColors.white}} px={4} flex={1}>
            <Header/>
            <Column space={5} alignItems="center">
                <Text>V60</Text>
            </Column>
        </Center>
    </>
}