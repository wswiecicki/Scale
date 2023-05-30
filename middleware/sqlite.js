import * as SQLite from "expo-sqlite";

const database = SQLite.openDatabase("SQLite\\data.db");
export {database};