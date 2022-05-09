import { KeyboardAvoidingView, StyleSheet, Text, View } from "react-native";
import React from "react";

const LoginScreen = () => {
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
    ></KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
