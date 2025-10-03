import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Portal, Modal } from 'react-native-paper';

interface BottomSheetProps {
  visible: boolean;
  onDismiss: () => void;
  children: React.ReactNode;
}

export default function BottomSheet({ visible, onDismiss, children }: BottomSheetProps) {
  return (
    <Portal>
      <Modal visible={visible} onDismiss={onDismiss} contentContainerStyle={styles.container}>
        <View>{children}</View>
      </Modal>
    </Portal>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 16,
    backgroundColor: 'white',
  },
});
