import {Box, Center, Column, Input, Row, Select} from "native-base";
import SelectorWrapper from "../SelectorWrapper";
import _ from "lodash";
import StyledText from "../StyledText";
import React from "react";
import {useTheme} from "../../styles/ThemeProvider";

const SwitchTypeBox = (props) => {
    const themeColors = useTheme().colors;

    const type = props.type;
    const step = props.step;
    const setStep = props.setter;

    switch (type) {
        case 'bloom':
            return <Box flex={1}>
                <Column space={4}>
                    <Row space={4}>
                        {/* coffee */}
                        <SelectorWrapper
                            text={'Coffee'}
                            selectedValue={step.coffee}
                            placeholder={'Coffee amount'}
                            onValueChange={value => {
                                setStep({...step, coffee: value})
                            }}
                        >
                            {_.range(5, 105, 5).map(item => {
                                return <Select.Item label={'' + item + 'g'} value={item} key={item}/>
                            })}
                        </SelectorWrapper>

                        {/* water */}

                        <SelectorWrapper
                            text={'Water'}
                            selectedValue={step.water}
                            placeholder={'Water amount'}
                            onValueChange={value => {
                                setStep({...step, water: value})
                            }}>
                            {_.range(10, 501, 10).map(item => {
                                return <Select.Item label={'' + item + 'ml'} value={item} key={item}/>
                            })}
                        </SelectorWrapper>
                    </Row>
                    <Row space={4}>
                        {/* time */}
                        <SelectorWrapper
                            text={'Time'}
                            selectedValue={step.time}
                            placeholder={'Time'}
                            onValueChange={value => {
                                setStep({...step, time: value})
                            }}>
                            {_.range(5, 125, 5).map(item => {
                                return <Select.Item label={'' + item + 's'} value={item} key={item}/>
                            })}
                        </SelectorWrapper>
                        {/* description */}

                        <SelectorWrapper
                            text={'Speed'}
                            selectedValue={step.description}
                            placeholder={'Speed'}
                            onValueChange={value => {
                                setStep({...step, description: value})
                            }}>
                            {['slowly', 'fast'].map(item => {
                                return <Select.Item label={'' + item} value={item} key={item}/>
                            })}
                        </SelectorWrapper>
                    </Row>
                </Column>
            </Box>;
        case 'swirl':
        case 'wait':
            return <Box flex={1} alignItems='center'>
                <Column width='50%'>
                    <Row space={4}>
                        {/* time */}
                        <SelectorWrapper
                            text={'Time'}
                            selectedValue={step.time}
                            placeholder={'Time'}
                            onValueChange={value => {
                                setStep({...step, time: value})
                            }}>
                            {_.range(5, 125, 5).map(item => {
                                return <Select.Item label={'' + item + 's'} value={item} key={item}/>
                            })}
                        </SelectorWrapper>
                    </Row>
                </Column>
            </Box>;

        case 'stir':
            return <Box flex={1}>
                <Column>
                    <Row space={4}>
                        {/* time */}
                        <SelectorWrapper
                            selectedValue={step.time}
                            placeholder={'Time'}
                            onValueChange={value => {
                                setStep({...step, time: value})
                            }}>
                            {_.range(5, 125, 5).map(item => {
                                return <Select.Item label={'' + item + 's'} value={item} key={item}/>
                            })}
                        </SelectorWrapper>
                        {/* description */}
                        <Box flex={1}
                             borderRadius={16}
                             bgColor={themeColors.tertiarySecond}
                             alignSelf={'baseline'}>
                            <Center>
                                <Box
                                    width='100%'
                                    alignItems='center'
                                    p={2}
                                    borderBottomRadius={0}
                                    mt={2}>
                                    <StyledText fontSize={16}>Description</StyledText>
                                </Box>
                            </Center>
                            <Input
                                borderColor={themeColors.tertiarySecond}
                                borderRadius={16}
                                bgColor={themeColors.primaryFirst}
                                value={step.description} w="100%"
                                onChangeText={(text) => setStep({...step, description: text})}
                                placeholder="Description"/>
                        </Box>
                    </Row>
                </Column>
            </Box>;
        case 'pour':
            return <Box flex={1}>
                <Column alignItems='center' space={4}>
                    <Row space={4}>
                        {/* time */}
                        <SelectorWrapper
                            selectedValue={step.time}
                            placeholder={'Time'}
                            onValueChange={value => {
                                setStep({...step, time: value})
                            }}>
                            {_.range(5, 125, 5).map(item => {
                                return <Select.Item label={'' + item + 's'} value={item} key={item}/>
                            })}
                        </SelectorWrapper>
                        {/* description */}

                        <SelectorWrapper
                            selectedValue={step.description}
                            placeholder={'Speed'}
                            onValueChange={value => {
                                setStep({...step, description: value})
                            }}>
                            {['slowly', 'fast'].map(item => {
                                return <Select.Item label={'' + item} value={item} key={item}/>
                            })}
                        </SelectorWrapper>
                    </Row>
                    <Row space={4} width='50%'>
                        {/* water */}
                        <SelectorWrapper
                            selectedValue={step.water}
                            placeholder={'Water amount'}
                            onValueChange={value => {
                                setStep({...step, water: value})
                            }}>
                            {_.range(10, 501, 10).map(item => {
                                return <Select.Item label={'' + item + 'ml'} value={item} key={item}/>
                            })}
                        </SelectorWrapper>
                    </Row>
                </Column>
            </Box>;
        default:
            return null;
    }
}

export default SwitchTypeBox;