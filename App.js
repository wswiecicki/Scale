import React from "react";
import themeColors from "./styles/theme";
import {
  Center,
  Heading,
  NativeBaseProvider,
  extendTheme,
  Column,
  Row,
} from "native-base";
import Tile from "./components/Tile";
import ToggleDarkMode from "./components/ToggleDarkMode";

const config = {
  useSystemColorMode: false,
  initialColorMode: "dark",
};

export const theme = extendTheme({ config });

export default function App() {
  return (
    <NativeBaseProvider>
      <Center _dark={{ bg: themeColors.darkBlue }} _light={{ bg: themeColors.white }} px={4} flex={1}>
        <Column space={5} alignItems="center">
          <Heading size="lg">Welcome to Brewster</Heading>
          <Row space={4}>
            <Tile text='Espresso' />
            <Tile text='V60' />
          </Row>
          <ToggleDarkMode />
        </Column>
      </Center>
    </NativeBaseProvider>
  );
};
