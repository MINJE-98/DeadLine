import React from "react";
import { Text, View, Modal } from "react-native";
import { modalstyles } from "../styles/light/styles";

export default function ActionModal(props) {
  return (
    <Modal animationType={'slide'} transparent={true}>
      <View style={modalstyles.defaultStyle}>
        {/** VIEW */}
        <View
          style={[
            modalstyles.defaultBox,
            { width: props.width, height: props.height },
          ]}
        >
          {/** HEAD */}
          <View style={{ alignItems: "center" }}>
            <Text style={modalstyles.defaultFont}>{props.mainMessage}</Text>
            {props.exmessage()}
          </View>

          {/** BODY */}
          <View style={{ alignItems: "center" }}>{props.body()}</View>

          {/** FOOT */}
          <View
            style={{ flexDirection: props.flexDirection, alignItems: "center" }}
          >
            {props.foot()}
          </View>
        </View>
      </View>
    </Modal>
  );
}
