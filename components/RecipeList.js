import {mocker} from "../backend/mocker";
import {FlatList, SafeAreaView} from "react-native";
import {Box, Center, FavouriteIcon, Pressable, Row, Text} from "native-base";
import React, {useEffect, useState} from "react";
import StyledHeading from "./StyledHeading";
import StyledText from "./StyledText";
import {useTheme} from "../styles/ThemeProvider";
import {database} from "../middleware/sqlite";

const RecipeList = (props) => {
    const themeColors = useTheme().colors;

    const parentName = props.route.params.parent;
    const routeName = props.route.name;

    const [data, setData] = useState([]);
    const [isUpToDate, setUpToDate] = useState(true);

    useEffect(() => {
        props.navigation.addListener("tabPress", async (e) => {
            setUpToDate(false);
        })
        database.transaction(tx => {
            tx.executeSql('SELECT * FROM Recipes', null,
                (_, {rows: {_array}}) => {
                    setData(_array.map(recipe => {
                        return {
                            title: recipe.title,
                            id: recipe.id,
                            description: recipe.description,
                            favourite: !!recipe.favourite,
                            grind: recipe.grind,
                            own: !!recipe.own,
                            steps: JSON.parse(recipe.steps),
                            waterTemp: recipe.waterTemp,
                        }
                    }))
                }
            )
        })
        setUpToDate(true);
    }, [isUpToDate, routeName]);

    const toggleFavorite = (recipeId) => {
        database.transaction((tx) => {
            tx.executeSql(
                'SELECT favourite FROM Recipes WHERE id = ?',
                [recipeId],
                (_, {rows: {_array}}) => {
                    if (_array.length > 0) {
                        const currentFavorite = _array[0].favourite;
                        const newFavorite = currentFavorite === 1 ? 0 : 1;

                        tx.executeSql(
                            'UPDATE Recipes SET favourite = ? WHERE id = ?',
                            [newFavorite, recipeId],
                            () => {
                                setUpToDate(false)
                            },
                            (_, error) => {
                                console.error(`Error updating favorite for recipe ${recipeId}:`, error);
                            }
                        );
                    }
                },
                (_, error) => {
                    console.error(`Error retrieving recipe ${recipeId} favorite:`, error);
                }
            );
        });
    };


    return <SafeAreaView>
        <Center paddingTop={10} bg={themeColors.primaryFirst}>
            <Box w={'80%'} paddingBottom={12}>

                <Center><StyledHeading py={2}>{parentName}</StyledHeading></Center>
                <FlatList
                    keyExtractor={item => item.title}
                    data={data.filter(item => {
                        if (routeName === 'Roasters') return !item.own
                        else if (routeName === 'Your Own') return item.own;
                        else if (routeName === 'Favourites') return item.favourite;
                    })}
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
                                                  recipe: JSON.stringify(item),
                                                  title: item.title,
                                                  parent: parentName// TODO: pass proper recipe here
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
                                        toggleFavorite(item.id)
                                        setUpToDate(true)
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