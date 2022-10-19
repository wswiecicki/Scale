import {mocker} from "../backend/mocker";
import {FlatList, SafeAreaView} from "react-native";
import {Box, Center, Pressable, Text} from "native-base";
import themeColors from "../styles/theme";
import React from "react";

const RecipeList = (props) => {
    const parentName = props.route.params.parent;
    const routeName = props.route.name;
    const data = mocker[parentName][routeName];
    return <SafeAreaView>
        <Center paddingTop={10} bg={themeColors.white}><Box w={'80%'}>
            <FlatList
                keyExtractor={item => item.title}
                data={data}
                renderItem={({item}) => {
                    return <Pressable style={{
                        width: '100%',
                        padding: 20,
                        borderWidth: 1,
                        borderColor: themeColors.darkBlue,
                        borderRadius: 10,
                        marginVertical: 8
                    }}
                                      onPress={() => {
                                          props.navigation.navigate('Recipe', {title: item.title, parent: parentName})
                                      }}
                    >
                        <Text>{item.title}</Text>
                        <Text textAlign={'right'}>123</Text>
                    </Pressable>
                }}/>
        </Box></Center>
    </SafeAreaView>
}

export default RecipeList;