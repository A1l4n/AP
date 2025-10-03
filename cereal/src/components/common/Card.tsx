import React from 'react';
import { Card as PaperCard, CardProps } from 'react-native-paper';

export default function Card(props: CardProps) {
  return <PaperCard {...props} />;
}
