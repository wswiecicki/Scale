import create from "zustand";
import {BleManager} from "react-native-ble-plx";

export const useBLEStore = create((set) => ({
    manager: new BleManager(),
    weight: 'Device not found, connecting...',
    setWeight: (weight) => set(() => ({weight: weight})),
    deviceConnected: false,
    setDeviceConnected: (value) => set(() => ({deviceConnected: value})),
    flowRate: 0,
    setFlowRate: (value) => set(() => ({flowRate: value}))
}))