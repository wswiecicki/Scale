import create from "zustand";
import * as ScreenOrientation from 'expo-screen-orientation';

export const useOrientationStore = create((set) => ({
    orientation: ScreenOrientation.Orientation.PORTRAIT_UP,

    // listener function to update the state with the current device orientation
    setOrientation: (orientation) => set({orientation}),

    // subscribe to orientation changes and update the state accordingly
    subscribeOrientationChange: async () => {
        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.ALL);
        const subscription = ScreenOrientation.addOrientationChangeListener(onOrientationChange);
        set({subscription});
    },

    // unsubscribe from orientation changes when component unmounts
    unsubscribeOrientationChange: async () => {
        await ScreenOrientation.unlockAsync();
        const {subscription} = useOrientationStore.getState();
        if (subscription) {
            ScreenOrientation.removeOrientationChangeListener(subscription);
            set({subscription: null});
        }
    },

    // lock the orientation to the specified lock mode
    lockOrientation: async (orientationLockMode = ScreenOrientation.OrientationLock.ALL) => {
        await ScreenOrientation.lockAsync(orientationLockMode);
    },

    // unlock the orientation
    unlockOrientation: async () => {
        await ScreenOrientation.unlockAsync();
    },
}));

// define the listener function outside the create function
const onOrientationChange = (event) => {
    const {orientationInfo} = event;
    useOrientationStore.getState().setOrientation(orientationInfo.orientation);
};