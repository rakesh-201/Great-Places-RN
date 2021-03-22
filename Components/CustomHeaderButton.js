import React from "react";
import { HeaderButton } from "react-navigation-header-buttons";
import { Ionicons } from "@expo/vector-icons";

const CustomHeaderButton = (props) => {
  return <HeaderButton IconComponent={Ionicons} {...props} />;
};

export default CustomHeaderButton;
