import {Box, Button, Center, Column, FormControl, Input, Modal, Pressable, Row, Select, TextArea} from "native-base";
import themeColors from "../styles/theme";
import Tile from "./Tile";
import React, {useState} from "react";
import StyledText from "./StyledText";
import StepList from "./StepList";
import {Picker} from "@react-native-picker/picker";
import {capitalize, finalStep, initialStep} from "../backend/utils";
import * as PropTypes from "prop-types";
import StyledHeading from "./StyledHeading";
import {Alert} from "react-native";
import SelectorWrapper from "./SelectorWrapper";
import SwitchTypeBox from "./recipeCreator/SwitchTypeBox";
import { openDatabase } from "expo-sqlite";

var _ = require('lodash');
const availableTypes = ['bloom', 'swirl', 'wait', 'pour', 'stir',];
import { database } from "../App";

const RecipeCreator = (props) => {
    const emptyStep = {
        name: availableTypes[0],
        time: 0, // bloom, swirl, wait, pour, stir
        coffee: 0, // just bloom
        water: 0, // bloom, pour
        description: '', // bloom, pour, stir
        id: 0,
    }
    const [selectedType, setSelectedType] = useState(availableTypes[0]);
    const [data, setData] = useState({
        title: '',
        waterTemp: 0,
        grind: '',
        description: '',
        steps: []
    });
    const [currentStep, setCurrentStep] = useState(emptyStep);
    const listTypes = availableTypes.map(type =>
        <Select.Item label={capitalize(type)} value={type} key={type}/>
    );
    const [modalVisible, setModalVisible] = useState(true);

    const stepSanitizer = () => {
        switch (currentStep.name) {
            case 'bloom':
                if (currentStep.coffee === 0) return false;
            case 'pour':
                if (currentStep.water === 0) return false;
            case 'stir':
                if (!currentStep.description) return false;
            case 'swirl':
            case 'wait':
                if (currentStep.time === 0) return false;
        }
        return true;
    }

    return <>
        <Modal closeOnOverlayClick={false} isOpen={modalVisible} onClose={setModalVisible}>
            <Modal.Content maxH="100%">
                <Modal.Header>
                    <StyledText>Set details for your recipe</StyledText>
                </Modal.Header>
                <Modal.Body>
                    <Column alignItems="center" space={4}>
                        <Input fontFamily={'Montserrat_400Regular'} mx="3" placeholder="Recipe title" w="100%"
                               onChangeText={(text) => {
                                   setData({...data, title: text})
                               }
                               }/>
                        <Select
                            w="100%"
                            selectedValue={data.waterTemp}
                            fontFamily={'Montserrat_400Regular'}
                            placeholder={'Water Temperature'}
                            onValueChange={value => {
                                setData({...data, waterTemp: value})
                            }}>
                            {_.range(80, 101, 1).map(item => {
                                return <Select.Item label={'' + item + '°C'} value={item} key={item}/>
                            })}
                        </Select>
                        <Select
                            w="100%"
                            selectedValue={data.grind}
                            fontFamily={'Montserrat_400Regular'}
                            placeholder={'Grind size'}
                            onValueChange={value => {
                                setData({...data, grind: value})
                            }}>
                            {['coarse', 'medium coarse', 'medium', 'fine-ish', 'fine'].map(item => {
                                return <Select.Item label={'' + item} value={item} key={item}/>
                            })}
                        </Select>
                        <TextArea
                            fontFamily={'Montserrat_400Regular'}
                            placeholder={'Recipe description'}
                            value={data.description}
                            onChangeText={text => setData({...data, description: text})}/>
                    </Column>
                </Modal.Body>
                <Modal.Footer>
                    <Button.Group space={4}>
                        <Pressable
                            p={4}
                            borderRadius={8}
                            onPress={() => {
                                props.navigation.goBack();
                            }}>
                            <StyledText>Cancel</StyledText>
                        </Pressable>
                        <Pressable
                            bgColor={themeColors.pink}
                            p={4}
                            borderRadius={8}
                            onPress={() => {
                                if (data.title !== '' && data.waterTemp !== 0 && data.grind !== '') {
                                    setModalVisible(false);
                                } else alert('You must fill all the fields.')
                            }}>
                            <StyledText>Accept</StyledText>
                        </Pressable>
                    </Button.Group>
                </Modal.Footer>
            </Modal.Content>
        </Modal>

        <Center _dark={{bg: themeColors.darkBlue}} _light={{bg: themeColors.white}} flex={1}>
            <Column space={4} alignItems="center" px={8} pt={8} flex={1}>
                <StyledHeading p={4}>Input a step:</StyledHeading>
                <Row>
                    <Box flex={1}>
                        <Select
                            fontFamily={'Montserrat_400Regular'}
                            selectedValue={selectedType}
                            onValueChange={type => {
                                setSelectedType(type)
                                setCurrentStep({...emptyStep, name: type})
                            }}>
                            {listTypes}
                        </Select>
                    </Box>
                </Row>
                <Row>
                    <SwitchTypeBox type={selectedType} step={currentStep} setter={setCurrentStep}/>
                </Row>
                <Column pt={4} space={4} alignItems='center' width={'auto'}>
                    <Pressable
                        flexDir={'row'}
                        onPress={() => {
                            Alert.alert(
                                "Adding the step",
                                `Current step:
                                ${JSON.stringify(currentStep, null, 2)}`,
                                [
                                    {
                                        text: "Cancel",
                                        style: "cancel"
                                    },
                                    {
                                        text: "OK", onPress: () => {
                                            if (!stepSanitizer()) {
                                                alert('Step invalid');
                                            } else {
                                                setData({
                                                    ...data,
                                                    steps: [...data.steps, {...currentStep, id: data.steps.length}]
                                                })
                                            }
                                        }
                                    }
                                ]
                            );
                        }}>
                        <Box width='100%' bgColor={themeColors.pink} alignItems='center' p={2} borderRadius={16}>
                            <StyledText fontSize={16}>Add step</StyledText>
                        </Box>
                    </Pressable>
                    <Pressable
                        flexDir={'row'}
                        onPress={() => {
                            alert('adding the recipe');
                            database.transaction(tx => {
                                tx.executeSql('INSERT INTO table (Recipe) VALUES (?)', JSON.stringify(data)); // TODO: Add source of function call as 'table'
                            });
                        }}>
                        <Box width='100%' bgColor={themeColors.darkBlue} alignItems='center' p={2} borderRadius={16}>
                            <StyledText style={{color: themeColors.white, fontFamily: 'Montserrat_400Regular'}}
                                        fontSize={16}>Finish</StyledText>
                        </Box>
                    </Pressable>
                </Column>

                <Row flex={1}>
                    <StepList steps={data ? data.steps : []}/>
                </Row>
            </Column>

        </Center>
    </>
}

export default RecipeCreator;