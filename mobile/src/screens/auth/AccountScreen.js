import React, { useContext } from "react";
import { Button } from "react-native-elements";
import { SafeAreaView } from "react-navigation";
import { Context as AuthContext } from "../../context/authContext";

const AccountScreen = () => {
  const { signout } = useContext(AuthContext);

  return (
    <SafeAreaView forceInset={{ top: "always" }}>
      <Button title="Sign Out" onPress={signout} />
    </SafeAreaView>
  );
};

export default AccountScreen;
