import { AsyncStorage } from "react-native";

export default class StorageManager {
  keyPrefix: string;
  constructor() {
    this.keyPrefix = "@VideoHub";
  }

  public storeData = async (key: string, value: string): Promise<void> => {
    return AsyncStorage.setItem(this.keyFactory(key), value);
  };

  public storeGroupData = async (key: string, value: string): Promise<void> => {
    const retrievedData = await this.retrieveData(key);

    if (retrievedData) {
      const dataSet = new Set(JSON.parse(retrievedData));
      dataSet.add(value);

      await this.storeData(key, JSON.stringify(Array.from(dataSet)));
    } else {
      await this.storeData(key, JSON.stringify([value]));
    }
  };

  public eraseGroupItem = async (key: string, value: string): Promise<void> => {
    const retrievedData = await this.retrieveData(key);

    if (retrievedData) {
      const data = JSON.parse(retrievedData);

      await this.storeData(
        key,
        JSON.stringify(data.filter((element: string) => element !== value))
      );
    }
  };

  public eraseData = async (key: string): Promise<void> => {
    await AsyncStorage.removeItem(this.keyFactory(key));
  };

  public retrieveData = async (key: string): Promise<string | null> => {
    return AsyncStorage.getItem(this.keyFactory(key));
  };

  public keyFactory = (key: string): string => {
    return `${this.keyPrefix}:${key}`;
  };
}
