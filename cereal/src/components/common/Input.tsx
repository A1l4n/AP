import React from 'react';
import { TextInput, TextInputProps } from 'react-native-paper';

export default function Input(props: TextInputProps) {
  return <TextInput mode="outlined" {...props} />;
}
