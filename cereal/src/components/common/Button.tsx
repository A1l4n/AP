import React from 'react';
import { Button as PaperButton, ButtonProps } from 'react-native-paper';

export default function Button(props: ButtonProps) {
  return <PaperButton mode="contained" {...props} />;
}
