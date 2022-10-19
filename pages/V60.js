import {Center, Column, FavouriteIcon, Image, Text} from "native-base";
import themeColors from "../styles/theme";
import React from "react";
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
import RecipeList from "../components/RecipeList";
import {images} from "../imports";

const V60 = (props) => {
    const Tab = createMaterialTopTabNavigator();
    return <>
        <Center _light={{bg: themeColors.white}} flex={1}>
            <Column space={5} minWidth={'100%'}>
                <Tab.Navigator screenOptions={{
                    tabBarStyle: {backgroundColor: themeColors.white},
                    tabBarLabelStyle: {fontSize: 10, color: themeColors.darkBlue},
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

export default V60;