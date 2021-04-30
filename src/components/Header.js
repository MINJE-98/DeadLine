import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { headerstyles } from "../styles/light/styles";

export const HeaderTitle = (props) => {
  return (
    <Text style={[headerstyles.defaultFont, headerstyles.headerTitle]}>
      {props.text}
    </Text>
  )
};

export const HeaderLeftTitle = (props) => {
  return (
    <Text style={[headerstyles.defaultFont, headerstyles.HeaderLeftTitle]}>
      {props.text}
    </Text>
  );
};

export const HeaderLeftIcon = (props) => {
  return (
    <>
      <TouchableOpacity style={headerstyles.headerLeftIcon} onPress={props.onPress}>
        {props.iconType == "MaterialIcons" ? (
          <MaterialIcons name={props.name} size={25} color="#3c444f" />
        ) : (
          <MaterialCommunityIcons name={props.name} size={25} color="#3c444f" />
        )}
      </TouchableOpacity>
    </>
  );
};

export const HeaderRightIcon = (props) => {
  return (
    <>
        <TouchableOpacity
          style={headerstyles.headerRightIcon}
          onPress={props.onPress}
        >
          {props.iconType == "MaterialIcons" ? (
            <MaterialIcons name={props.name} size={25} color="#3c444f" />
          ) : (
            <MaterialCommunityIcons
              name={props.name}
              size={25}
              color="#3c444f"
            />
          )}
        </TouchableOpacity>
    </>
  );
};
