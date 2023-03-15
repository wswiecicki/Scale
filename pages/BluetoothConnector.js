import {Box, Center, Column, Select, Text} from "native-base";
import React, {useContext, useEffect, useState} from "react";
import {BleManager} from "react-native-ble-plx";
import {sleep} from "../backend/mocker";
import base64 from "react-native-base64";
import Toast from "react-native-toast-message";
import {useBLEStore} from "../App";
import StyledText from "../components/StyledText";
import {useTheme} from "../styles/ThemeProvider";

var Buffer = require("@craftzdog/react-native-buffer").Buffer;


const BluetoothConnector = (props) => {
    const themeColors = useTheme().colors;

    const manager = useBLEStore((state) => state.manager);
    const weight = useBLEStore((state) => state.weight);
    const setWeight = useBLEStore((state) => state.setWeight)
    const setDeviceConnected = useBLEStore((state) => state.setDeviceConnected)
    const flowRate = useBLEStore((state) => state.flowRate);

    const showErrorToast = () => {
        Toast.show({
            type: 'error',
            text1: 'Bluetooth error',
            text2: 'Something has gone wrong',
            visibilityTime: 2000
        });
    }

    const showHappyToast = () => {
        Toast.show({
            type: 'success',
            text1: 'Connected',
            text2: 'Device was successfully connected',
            visibilityTime: 2000
        });
    }

    function _base64ToArrayBuffer(base64) {
        const binary_string = window.atob(base64);
        const len = binary_string.length;
        const bytes = new Uint8Array(len);
        for (let i = 0; i < len; i++) {
            bytes[i] = binary_string.charCodeAt(i);
        }
        return bytes.buffer;
    }

    const readValue = (val) => {
        const readValueInRawBytes = Buffer.from(val, 'base64');

        const mostSignificantByte = readValueInRawBytes[1];
        const leastSignificantByte = readValueInRawBytes[0];
        return (mostSignificantByte << 8) | leastSignificantByte;
    }

    const writeValue = (val) => {
        const roundedVal = Math.round(val); // in case the height would be more precise i.e. 183.5

        const buf = Buffer.alloc(2);
        const ret = buf.writeUInt16LE(roundedVal, 0);
    }

    const scanAndConnect = () => {
        manager.startDeviceScan(null, {allowDuplicates: false}, (error, device) => {
            if (error) {
                // Handle error (scanning will be stopped automatically)
                console.log('error: ', error)
                showErrorToast();
                setDeviceConnected(false);
                return
            }

            if (device.name === 'scale') {
                // Stop scanning as it's not necessary if you are scanning for one device.
                manager.stopDeviceScan();
                console.log('found device');
                // Proceed with connection.
                device.connect()
                    .then((device) => {
                        return device.discoverAllServicesAndCharacteristics()
                    })
                    .then(async (device) => {
                        const services = await device.services()

                        const serviceUUIDs = services.map(service => service.uuid);
                        const serviceTypes = services.map(service => typeof service);

                        console.log('services: ', serviceUUIDs);
                        setDeviceConnected(true);

                        // "00001800-0000-1000-8000-00805f9b34fb",
                        // "00001801-0000-1000-8000-00805f9b34fb",
                        // "0000180a-0000-1000-8000-00805f9b34fb",
                        // "0000dfb0-0000-1000-8000-00805f9b34fb",

                        //  significant: "0000dfb0-0000-1000-8000-00805f9b34fb"


                        const a = await services[3].characteristics();
                        console.log(a.map(char => {
                            return {uuid: char.uuid, writable: char.isWritableWithoutResponse}
                        }));

                        const heightBuffer = await Buffer.alloc(2);

                        heightBuffer.writeUInt16LE(0, 0);

                        await a[0].writeWithResponse(heightBuffer.toString('base64'));

                        const scaleValue = readValue((await a[0].read()).value);
                        console.log('happy toast!', scaleValue);
                        if (scaleValue) {
                            showHappyToast();
                            setWeight(scaleValue);
                        }

                        a[0].monitor(async (error, update) => {
                            if (error) {
                                showErrorToast();
                                setDeviceConnected(false);
                            } else {
                                const scaleValue = readValue(update.value) / 10;
                                setWeight(scaleValue);

                                const heightBuffer = Buffer.alloc(2);
                                heightBuffer.writeUInt16LE(flowRate, 0);
                                console.log(flowRate);
                                await a[0].writeWithResponse(heightBuffer.toString('base64'));
                            }
                        })
                        return device;
                    })
                    .catch((error) => {
                        // Handle errors
                        console.warn(error);
                        setDeviceConnected(false);
                        showErrorToast();
                    });
            }
        });
    }

    useEffect(() => {
        const subscription = manager.onStateChange((state) => {
            if (state === 'PoweredOn') {
                scanAndConnect();
                subscription.remove();
            }
        }, true);
        return () => subscription.remove();
    }, [manager]);

    return <Center>
        <Column w='70%' h='100%' justifyContent='center'>
            <Center textAlign='center'>
                <Box
                    mb={8}
                    borderRadius={16}
                    bgColor={themeColors.tertiarySecond}
                    alignSelf={'center'}>

                    <Center>
                        <Box
                            width='100%'
                            alignItems='center'
                            p={4}
                            borderBottomRadius={0}>
                            <StyledText textAlign='center' fontSize={24}>Current weight:</StyledText>
                        </Box>
                    </Center>
                </Box>
                <StyledText textAlign='center' fontSize={24}>{weight}</StyledText>
            </Center>
        </Column>
    </Center>
}

export default BluetoothConnector;