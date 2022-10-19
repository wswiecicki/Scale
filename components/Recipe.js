import {Button, Center, FavouriteIcon, Heading, ScrollView, Text, View} from "native-base";
import React, {useEffect, useState} from "react";
import {recipeGenerator} from "../backend/mocker";
import themeColors from "../styles/theme";

const addToFavourites = (title, parent) => {
    alert(title + ' ' + parent)
}

const Recipe = (props) => {
    const {title, parent} = props.route.params;
    const [data, setData] = useState();
    useEffect(() => {
        recipeGenerator(title, parent).then(res => {
            setData(res);
            props.navigation.setOptions({
                headerRight: () => (
                    <FavouriteIcon size={6}
                                   color={themeColors.pink}
                                   onPress={() => addToFavourites(title, parent)}/>
                ),
            });
        });
    }, [props.navigation]);

    return <View>
        <Center>
            <Text>{title + ' - ' + parent}</Text>
            <Text>This will be a play button</Text>
            <Text>On clicking play, new page will be generated</Text>
            <Text>With pause button, current weight, tips for faster/slower pour</Text>
            <Text>And small preview of few next steps</Text>
            <ScrollView>
                <View paddingTop={10} paddingBottom={40}>
                    <Text>{JSON.stringify(data, null, 2)}</Text>
                </View>
            </ScrollView>
        </Center>
    </View>
}

export default Recipe;