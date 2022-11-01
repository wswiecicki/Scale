import {Center, Column, FavouriteIcon, Image} from "native-base";
import themeColors from "../styles/theme";
import {images} from "../imports";
import React, {useEffect} from "react";
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
import RecipeList from "../components/RecipeList";

const Espresso = (props) => {
    const Tab = createMaterialTopTabNavigator();

    useEffect(() => {
        props.navigation.setOptions({
            headerRight: () => (
                <Image source={images.Espresso}
                       tintColor={themeColors.darkBlue}
                       size={8}
                       alt={'v60'}
                />
            ),
        });
    })

    return <>
        <Center _dark={{bg: themeColors.darkBlue}} _light={{bg: themeColors.white}} flex={1}>
            <Column space={5} minWidth={'100%'}>
                <Tab.Navigator screenOptions={{
                    tabBarStyle: {backgroundColor: themeColors.white},
                    tabBarLabelStyle: {fontSize: 10, color: themeColors.darkBlue, fontFamily: 'Montserrat_400Regular'},
                    tabBarIndicatorStyle: {backgroundColor: themeColors.pinkishBlue}
                }}>
                    <Tab.Screen
                        initialParams={{parent: props.route.name}}
                        name={'Roasters'}
                        component={RecipeList}
                        options={{
                            tabBarIcon: (props) =>
                                <Image size={6}
                                       tintColor={themeColors.darkBlue}
                                       source={images.roaster_icon}
                                       alt={'roasters'}
                                />
                        }}
                    />
                    <Tab.Screen name={'Your Own'} component={RecipeList}
                                initialParams={{parent: props.route.name}}
                                options={{
                                    tabBarIcon: (props) =>
                                        <Image size={6}
                                               tintColor={themeColors.darkBlue}
                                               source={images.user_icon}
                                               alt={'roasters'}
                                        />
                                }}/>
                    <Tab.Screen name={'Favourites'} component={RecipeList}
                                initialParams={{parent: props.route.name}}

                                options={{
                                    tabBarIcon: (props) =>
                                        <FavouriteIcon size={6}
                                                       color={themeColors.darkBlue}
                                                       alt={'roasters'}
                                        />
                                }}/>
                </Tab.Navigator>

            </Column>
        </Center>
    </>
}

export default Espresso;