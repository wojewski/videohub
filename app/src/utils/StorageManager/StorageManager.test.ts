import StorageManager from "./StorageManager";
import { AsyncStorage } from "react-native";

const mockReturnValues = {
  videos: JSON.stringify(["001", "002", "003"]),
};

enum MockValues {
  videos = "videos",
}

jest.mock("react-native", () => ({
  AsyncStorage: {
    setItem: jest.fn(() => {
      return new Promise((resolve) => {
        resolve(null);
      });
    }),
    getItem: jest.fn((key: MockValues) => {
      return new Promise((resolve) => {
        if (mockReturnValues[key]) {
          resolve(mockReturnValues[key]);
        } else {
          resolve(null);
        }
      });
    }),
    removeItem: jest.fn(() => {
      return new Promise((resolve) => {
        resolve(null);
      });
    }),
  },
}));

describe("StorageManager", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const key = "videos";

  describe("storeData", () => {
    it("triggers AsyncStorage.setItem with proper properties", () => {
      const storageManager = new StorageManager();

      storageManager.storeData(key, "004");

      expect(AsyncStorage.setItem).toHaveBeenCalledWith(
        storageManager.keyFactory(key),
        "004"
      );
    });
  });

  describe("storeGroupData", () => {
    it("passes array extended by the new value to the storage", async () => {
      const storageManager = new StorageManager();

      jest
        .spyOn(storageManager, "retrieveData")
        .mockImplementation(() => Promise.resolve(mockReturnValues.videos));

      await storageManager.storeGroupData(key, "004");

      expect(AsyncStorage.setItem).toHaveBeenCalledWith(
        storageManager.keyFactory(key),
        JSON.stringify(["001", "002", "003", "004"])
      );
    });

    it("does not extend a group data by the new value that is not unique", async () => {
      const storageManager = new StorageManager();

      jest
        .spyOn(storageManager, "retrieveData")
        .mockImplementation(() => Promise.resolve(mockReturnValues.videos));

      await storageManager.storeGroupData(key, "003");

      expect(AsyncStorage.setItem).toHaveBeenCalledWith(
        storageManager.keyFactory(key),
        JSON.stringify(["001", "002", "003"])
      );
    });

    it("creates a new array of a single element if group data does not exist", async () => {
      const storageManager = new StorageManager();

      jest
        .spyOn(storageManager, "retrieveData")
        .mockImplementation(() => Promise.resolve(null));

      await storageManager.storeGroupData(key, "001");

      expect(AsyncStorage.setItem).toHaveBeenCalledWith(
        storageManager.keyFactory(key),
        JSON.stringify(["001"])
      );
    });
  });

  describe("eraseGroupItem", () => {
    it("passes properly filtered data to storage", async () => {
      const storageManager = new StorageManager();
      const value = "003";

      jest
        .spyOn(storageManager, "retrieveData")
        .mockImplementation(() => Promise.resolve(mockReturnValues.videos));

      await storageManager.eraseGroupItem(key, value);

      expect(AsyncStorage.setItem).toHaveBeenCalledWith(
        storageManager.keyFactory(key),
        JSON.stringify(["001", "002"])
      );
    });

    it("does not trigger storeData if retrievedData is undefined", () => {
      const storageManager = new StorageManager();
      storageManager.eraseGroupItem(key, "005");

      expect(AsyncStorage.setItem).not.toHaveBeenCalledWith();
    });
  });

  describe("eraseData", () => {
    it("triggers AsyncStorage.removeItem with a proper key", () => {
      const storageManager = new StorageManager();
      storageManager.eraseData(key);

      expect(AsyncStorage.removeItem).toHaveBeenCalledWith(
        storageManager.keyFactory(key)
      );
    });
  });

  describe("retrieveData", () => {
    it("triggers AsyncStorage.getItem with a proper key", () => {
      const storageManager = new StorageManager();
      storageManager.retrieveData(key);

      expect(AsyncStorage.getItem).toHaveBeenCalledWith(
        storageManager.keyFactory(key)
      );
    });
  });

  describe("keyFactory", () => {
    it("generates proper storage key", () => {
      const storageManager = new StorageManager();
      const newKey = storageManager.keyFactory(key);

      expect(newKey).toEqual(`${storageManager.keyPrefix}:${key}`);
    });
  });
});
