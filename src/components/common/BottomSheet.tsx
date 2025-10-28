import React, { useEffect } from 'react';
import { StyleSheet, View, Modal, TouchableOpacity, Dimensions } from 'react-native';
import { useTheme } from 'react-native-paper';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import { BorderRadius, Spacing } from '../../constants';

interface BottomSheetProps {
  visible: boolean;
  onDismiss: () => void;
  children: React.ReactNode;
  height?: number;
}

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export const BottomSheet: React.FC<BottomSheetProps> = ({
  visible,
  onDismiss,
  children,
  height = SCREEN_HEIGHT * 0.6,
}) => {
  const theme = useTheme();
  const translateY = useSharedValue(height);
  const opacity = useSharedValue(0);

  useEffect(() => {
    if (visible) {
      opacity.value = withTiming(1, { duration: 200 });
      translateY.value = withSpring(0, {
        damping: 20,
        stiffness: 300,
      });
    } else {
      opacity.value = withTiming(0, { duration: 200 });
      translateY.value = withTiming(height, { duration: 200 }, () => {
        runOnJS(onDismiss)();
      });
    }
  }, [visible]);

  const backdropStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const sheetStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  if (!visible) return null;

  return (
    <Modal
      transparent
      visible={visible}
      onRequestClose={onDismiss}
      animationType="none"
    >
      <View style={styles.container}>
        <Animated.View style={[styles.backdrop, backdropStyle]}>
          <TouchableOpacity
            style={StyleSheet.absoluteFill}
            onPress={onDismiss}
            activeOpacity={1}
          />
        </Animated.View>
        <Animated.View
          style={[
            styles.sheet,
            sheetStyle,
            { backgroundColor: theme.colors.surface, height },
          ]}
        >
          <View style={styles.handle} />
          <View style={styles.content}>{children}</View>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  sheet: {
    borderTopLeftRadius: BorderRadius.xxl,
    borderTopRightRadius: BorderRadius.xxl,
    paddingTop: Spacing.md,
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: '#D1D5DB',
    borderRadius: BorderRadius.round,
    alignSelf: 'center',
    marginBottom: Spacing.lg,
  },
  content: {
    flex: 1,
    paddingHorizontal: Spacing.lg,
  },
});
