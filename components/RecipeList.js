import {mocker} from "../backend/mocker";
import {FlatList, SafeAreaView} from "react-native";
import {Box, Center, FavouriteIcon, Pressable, Row, Text} from "native-base";
import React, {useEffect, useState} from "react";
import StyledHeading from "./StyledHeading";
import StyledText from "./StyledText";
import {useTheme} from "../styles/ThemeProvider";

const RecipeList = (props) => {
    const themeColors = useTheme().colors;

    const parentName = props.route.params.parent;
    const routeName = props.route.name;

    const [data, setData] = useState();
    const [isUpToDate, setUpToDate] = useState(true);

    useEffect(() => {
        setData(mocker[parentName][routeName]);
        setUpToDate(true);
    }, [isUpToDate]);


    return <SafeAreaView>
        <Center paddingTop={10} bg={themeColors.primaryFirst}>
            <Box w={'80%'} paddingBottom={12}>

                <Center><StyledHeading py={2}>{parentName}</StyledHeading></Center>
                <FlatList
                    keyExtractor={item => item.title}
                    data={data}
                    renderItem={({item}) => {
                        return <Pressable style={{
                            width: '100%',
                            padding: 20,
                            borderWidth: 1,
                            borderColor: themeColors.secondaryFirst,
                            borderRadius: 10,
                            marginVertical: 8
                        }}
                                          onPress={() => {
                                              props.navigation.navigate('RecipeDetails', {
                                                  title: item.title,
                                                  parent: parentName
                                              })
                                          }}
                        >
                            <Row>
                                <Box flex={6}>
                                    <StyledText>{item.title}</StyledText>
                                </Box>
                                <Pressable
                                    onPress={() => {
                                        item.favourite ? alert('removing from favourites') : alert('adding to favourites');
                                        setUpToDate(false);
                                        //TODO: database call here (adding/removing from favourites)
                                    }}>
                                    <Center flex={1}>
                                        <FavouriteIcon
                                            size={6}
                                            color={item.favourite ? themeColors.secondaryFirst : themeColors.tertiaryFirst}/>
                                    </Center>
                                </Pressable>
                            </Row>
                        </Pressable>
                    }}/>
            </Box>
        </Center>
    </SafeAreaView>
}

export default RecipeList;