import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Modal,
  TouchableOpacity,
  PanResponder,
  Animated,
  Dimensions,
  ViewStyle,
  TextStyle,
  Platform,
} from 'react-native';
import { Text, useTheme } from 'react-native-paper';

const { height: screenHeight } = Dimensions.get('window');

interface BottomSheetProps {
  visible: boolean;
  onDismiss: () => void;
  title?: string;
  children: React.ReactNode;
  snapPoints?: number[]; // Array of snap points as percentages (0.3, 0.6, 0.9)
  enableBackdropDismiss?: boolean;
  style?: ViewStyle;
  contentStyle?: ViewStyle;
}

export const BottomSheet: React.FC<BottomSheetProps> = ({
  visible,
  onDismiss,
  title,
  children,
  snapPoints = [0.5, 0.9],
  enableBackdropDismiss = true,
  style,
  contentStyle,
}) => {
  const theme = useTheme();
  const translateY = useRef(new Animated.Value(screenHeight)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const [currentSnapPoint, setCurrentSnapPoint] = useState(0);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gesture) => {
        if (gesture.dy > 0) { // Only allow downward movement
          translateY.setValue(gesture.dy);
        }
      },
      onPanResponderRelease: (_, gesture) => {
        const threshold = 100;
        if (gesture.dy > threshold) {
          // Dismiss if dragged down significantly
          handleDismiss();
        } else {
          // Snap back to current snap point
          snapToPoint(currentSnapPoint);
        }
      },
    })
  );

  useEffect(() => {
    if (visible) {
      show();
    } else {
      hide();
    }
  }, [visible]);

  const show = () => {
    setCurrentSnapPoint(0);
    Animated.parallel([
      Animated.spring(translateY, {
        toValue: 0,
        useNativeDriver: true,
        tension: 100,
        friction: 8,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const hide = () => {
    Animated.parallel([
      Animated.spring(translateY, {
        toValue: screenHeight,
        useNativeDriver: true,
        tension: 100,
        friction: 8,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleDismiss = () => {
    hide();
    setTimeout(() => {
      onDismiss();
    }, 300);
  };

  const snapToPoint = (index: number) => {
    const snapPoint = snapPoints[index];
    const targetHeight = screenHeight * (1 - snapPoint);

    Animated.spring(translateY, {
      toValue: targetHeight,
      useNativeDriver: true,
      tension: 100,
      friction: 8,
    }).start();

    setCurrentSnapPoint(index);
  };

  const getBackdropStyle = (): ViewStyle => {
    return {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    };
  };

  const getSheetStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: theme.colors.background,
      borderTopLeftRadius: theme.borderRadius.medium,
      borderTopRightRadius: theme.borderRadius.medium,
      maxHeight: screenHeight * snapPoints[0],
      ...theme.shadows.large,
    };

    return baseStyle;
  };

  const getHandleStyle = (): ViewStyle => {
    return {
      width: 40,
      height: 4,
      backgroundColor: theme.colors.textSecondary,
      borderRadius: 2,
      marginVertical: theme.spacing.md,
      alignSelf: 'center',
    };
  };

  const getHeaderStyle = (): ViewStyle => {
    return {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: theme.spacing.lg,
      paddingBottom: theme.spacing.md,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    };
  };

  const getTitleStyle = (): TextStyle => {
    return {
      fontSize: 18,
      fontWeight: '600',
      color: theme.colors.text,
    };
  };

  const getContentStyle = (): ViewStyle => {
    return {
      flex: 1,
      paddingHorizontal: theme.spacing.lg,
      paddingBottom: theme.spacing.lg,
      ...contentStyle,
    };
  };

  if (!visible) return null;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={handleDismiss}
    >
      {/* Backdrop */}
      <TouchableOpacity
        style={getBackdropStyle()}
        activeOpacity={1}
        onPress={enableBackdropDismiss ? handleDismiss : undefined}
      >
        <Animated.View style={{ opacity }} />
      </TouchableOpacity>

      {/* Bottom Sheet */}
      <Animated.View
        style={[
          getSheetStyle(),
          {
            transform: [{ translateY }],
          },
          style,
        ]}
      >
        {/* Drag Handle */}
        <View {...panResponder.current.panHandlers}>
          <View style={getHandleStyle()} />
        </View>

        {/* Header */}
        {title && (
          <View style={getHeaderStyle()}>
            <Text style={getTitleStyle()}>{title}</Text>
            <TouchableOpacity onPress={handleDismiss}>
              <Text style={{ fontSize: 24, color: theme.colors.textSecondary }}>×</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Content */}
        <View style={getContentStyle()}>
          {children}
        </View>
      </Animated.View>
    </Modal>
  );
};