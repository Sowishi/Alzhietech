import { View } from "react-native";
import QRCode from "react-native-qrcode-svg";

const Qrcode = ({ route }) => {
  const { currentUser } = route.params;

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <QRCode
        style={{ width: "100%", height: "100%" }}
        size={300}
        value={currentUser.schoolID}
        logo={require("../assets/laco-removebg-preview.png")}
      />
    </View>
  );
};

export default Qrcode;