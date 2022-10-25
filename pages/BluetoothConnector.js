import {Box, Text} from "native-base";
import {useContext, useEffect, useState} from "react";
import {BleManager} from "react-native-ble-plx";
import {sleep} from "../backend/mocker";


const BluetoothConnector = (props) => {
    const [manager] = useState(() => new BleManager())
    const [devices, setDevices] = useState([]);


    const scanAndConnect = () => {
        manager.startDeviceScan(null, {allowDuplicates: false}, (error, device) => {
            if (error) {
                // Handle error (scanning will be stopped automatically)
                console.log('error: ', error)
                return
            }
            device.name ? console.log(device) : null;

            if (device.name === 'TI BLE Sensor Tag' ||
                device.name === 'SensorTag') {

                // Stop scanning as it's not necessary if you are scanning for one device.
                manager.stopDeviceScan();
                // Proceed with connection.
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

    return <Box>
        {
            devices.map(device => {
                return (<Text key={device.id}>{`${device.name} - ${device.id} - ${device.localName} - `}</Text>)
            })}
    </Box>
}

export default BluetoothConnector;