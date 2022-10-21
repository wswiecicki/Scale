import {
    Alert,
    Box,
    Button,
    Center, Column,
    FavouriteIcon,
    Heading, Modal,
    PlayIcon,
    Pressable,
    Row,
    ScrollView,
    Text,
    View
} from "native-base";
import React, {useEffect, useRef, useState} from "react";
import {recipeGenerator} from "../backend/mocker";
import themeColors from "../styles/theme";
import StyledText from "./StyledText";
import StyledHeading from "./StyledHeading";
import Spinner from 'react-native-loading-spinner-overlay';
import {Spacer} from "native-base/src/components/primitives/Flex";
import StepList from "./StepList";
import {ActionSheetIOS, FlatList, Platform, StyleSheet} from "react-native";
import {LinearGradient} from "expo-linear-gradient";
import MaskedView from "@react-native-masked-view/masked-view";
import BoldedText from "./BoldedText";
import {Picker} from '@react-native-picker/picker';
import {secondsToMinutes} from "../backend/utils";


const addToFavourites = (title, parent, favourite) => {
    favourite ? alert(title + ' ' + parent + ' is not your favourite anymore')
        : alert(title + ' ' + parent + ' is your favourite now')
}

const RecipeDetails = (props) => {
    const {title, parent} = props.route.params;
    const [data, setData] = useState();
    const [passedData, setPassedData] = useState();
    const [initialData, setInitialData] = useState();
    const [isLoading, setLoading] = useState(true);
    const [initialWater, setInitialWater] = useState(0);
    const [initialCoffee, setInitialCoffee] = useState(0);
    const [selectedWater, setSelectedWater] = useState(0);
    const [selectedCoffee, setSelectedCoffee] = useState(0);

    useEffect(() => {
        recipeGenerator(title, parent).then(res => {
            setData(res);
            setInitialData(res);
            setPassedData(res);
            setSelectedWater(totalCount(res.steps, 'water'));
            setSelectedCoffee(totalCount(res.steps, 'coffee'));
            setInitialWater(totalCount(res.steps, 'water'));
            setInitialCoffee(totalCount(res.steps, 'coffee'));
            setLoading(false);
            props.navigation.setOptions({
                headerRight: () => (
                    <FavouriteIcon size={6}
                                   color={res.favourite ? themeColors.darkBlue : themeColors.pink}
                                   onPress={() => addToFavourites(title, parent, res.favourite)}/>
                ),
            });
        });
    }, [props.navigation]);

    const waterRef = useRef();
    const openWaterPicker = () => {
        Platform.OS === 'ios' ? iOSPicker() : waterRef.current.focus();
    }

    const totalCount = (list, prop) => {
        return list ?
            list?.map(item => item[prop]).reduce((p, n) => p + n)
            : 0;
    }
    const waterSelector = async (value) => {
        setSelectedWater(value);
        if (initialWater != value) {
            const ratio = initialCoffee / initialWater;
            setSelectedCoffee(Math.round(initialCoffee * value / initialWater))
            const newDataRatio = value / initialWater;
            const newData = initialData.steps.map(item => {
                return {
                    name: item.name,
                    time: item.time,
                    coffee: Math.round(item.coffee * newDataRatio),
                    water: Math.round(item.water * newDataRatio),
                    description: item.description,
                    id: item.id
                }
            });
            setPassedData(newData);
        } else {
            setSelectedCoffee(initialCoffee);
            setPassedData(initialData);
        }

    }

    const iOSPicker = () => {
        return ActionSheetIOS.showActionSheetWithOptions(
            {
                options: ["Cancel", "333ml", "500ml", "670ml", '1000ml'],
                cancelButtonIndex: 0,
                userInterfaceStyle: 'dark'
            },
            buttonIndex => {
                if (buttonIndex === 0) {
                    // cancel action
                } else {
                    switch (buttonIndex) {
                        case 1:
                            waterSelector(333);
                            return;
                        case 2:
                            waterSelector(500);
                            return;
                        case 3:
                            waterSelector(670);
                            return;
                        case 4:
                            waterSelector(1000);
                            return;
                    }

                }
            }
        )
    }

    return <View flex={1.5} bgColor={themeColors.white}>
        <Spinner
            visible={isLoading}
        />
        <Picker
            style={{display: 'none'}}
            ref={waterRef}
            selectedValue={selectedWater}
            onValueChange={(itemValue, itemIndex) =>
                waterSelector(itemValue)
            }>
            <Picker.Item label="333ml" value={333}/>
            <Picker.Item label="500ml" value={500}/>
            <Picker.Item label="670ml" value={670}/>
            <Picker.Item label="1000ml" value={1000}/>
        </Picker>

        <Center>
            <StyledHeading py={8}>{title + ' - ' + parent}</StyledHeading>

            <Row px={8} pb={2} space={2}>
                <Pressable flex={1} p={5} borderColor={themeColors.darkBlue} borderWidth={1} borderRadius={16}
                           alignItems={'center'} onPress={openWaterPicker}>
                    <BoldedText fontSize={16}>Total water:</BoldedText>


                    <StyledText paddingBottom={4}>{selectedWater}ml</StyledText>


                    <BoldedText fontSize={16}>Temperature:</BoldedText>
                    <StyledText>{data ? data.waterTemp : 0}°C</StyledText>
                </Pressable>
                <Box flex={1} p={5} borderColor={themeColors.darkBlue} borderWidth={1} borderRadius={16}
                     alignItems={'center'}>
                    <BoldedText fontSize={16}>Total coffee:</BoldedText>
                    <StyledText paddingBottom={4}>{selectedCoffee}g</StyledText>
                    <BoldedText fontSize={16}>Coffee grind:</BoldedText>
                    <StyledText>{data ? data.grind : "loading"}</StyledText>
                </Box>
            </Row>
            <Row px={8} pb={2} space={2}>
                <Box borderColor={themeColors.pink} flex={3} borderWidth={1} borderRadius={8}
                     alignItems={'center'}>
                    <StyledText p={3}>{data?.description}</StyledText>
                </Box>
                <Pressable borderColor={themeColors.pink} flex={1} p={2} borderWidth={1} borderRadius={8}
                           alignItems={'center'} justifyContent={'center'} bg={themeColors.darkBlue}
                           onPress={() => props.navigation.navigate('Recipe', {recipe: JSON.stringify(passedData)})}
                >
                    <PlayIcon size={16} color={themeColors.pink}/>
                </Pressable>
            </Row>
            <Row px={8} pb={2} space={2}>
                <Box borderColor={themeColors.pink} flex={3} borderWidth={1} borderRadius={8}
                     alignItems={'center'} justifyContent={'center'} bg={themeColors.pink}>
                    <BoldedText fontSize={16} p={2}>Expected time:</BoldedText>
                </Box>
                <Box borderColor={themeColors.pink} flex={1} p={2} borderWidth={1} borderRadius={8}
                     alignItems={'center'} justifyContent={'center'} bg={themeColors.pink}>
                    <StyledText>{secondsToMinutes(totalCount(data?.steps, 'time'))}</StyledText>
                </Box>
            </Row>

            <Row px={8} pb={2} space={2}>
                <Box borderColor={'transparent'} flex={1} borderWidth={1}
                     borderBottomColor={themeColors.pink}
                     borderTopColor={themeColors.pink}
                     alignItems={'center'} justifyContent={'center'}>
                    <BoldedText p={1} fontSize={16}>Steps</BoldedText>
                </Box>
            </Row>
        </Center>

        <MaskedView flex={1} maskElement={
            <LinearGradient
                colors={['rgb(237,237,237)', 'transparent']}
                style={{width: '100%', height: '100%', zIndex: 1}}
                start={{x: Platform.OS === 'ios' ? 0.5 : 0, y: 0.8}}
            />
        }>
            <StepList steps={data ? data.steps : []}/>
        </MaskedView>
    </View>
}


export default RecipeDetails;