import { BarCodeScanner } from "expo-barcode-scanner";
import { showToast } from "../components/toast";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

const ScanBook = ({ navigation, route }) => {
  const { currentUser } = route.params;
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);

    const bookRef = doc(db, "borrowed", data);
    getDoc(bookRef).then((snapshot) => {
      navigation.navigate("view-book", {
        book: { ...snapshot.data(), borrowedID: data },
        currentUser: currentUser,
      });
    });
  };

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getBarCodeScannerPermissions();
  }, []);

  if (hasPermission === null) {
    showToast("info", "Requesting for camera");
  }
  if (hasPermission === false) {
    showToast("error", "No access to camera");
  }

  return (
    <BarCodeScanner
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
      }}
      onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
    />
  );
};

export default ScanBook;