import React, { useState } from 'react';
import { View, Image, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import * as ImagePickerLib from 'expo-image-picker';
import { Button, CustomText } from '../base';
import { COLORS, SPACING, BORDER_RADIUS } from '../../constants/theme';

/**
 * ImagePicker Component
 * 
 * Upload/select images with preview
 * 
 * @param {string} value - Current image URI
 * @param {function} onChange - Called with new image URI
 * @param {string} label - Label text
 */
export default function ImagePicker({ value, onChange, label = 'Profile Picture' }) {
  const [loading, setLoading] = useState(false);

  const pickImage = async () => {
    try {
      // Request permission
      const { status } = await ImagePickerLib.requestMediaLibraryPermissionsAsync();
      
      if (status !== 'granted') {
        Alert.alert('Permission needed', 'Please allow access to your photos');
        return;
      }

      // Launch picker
      const result = await ImagePickerLib.launchImageLibraryAsync({
        mediaTypes: ImagePickerLib.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled) {
        onChange(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to pick image');
    }
  };

  const takePhoto = async () => {
    try {
      // Request permission
      const { status } = await ImagePickerLib.requestCameraPermissionsAsync();
      
      if (status !== 'granted') {
        Alert.alert('Permission needed', 'Please allow camera access');
        return;
      }

      // Launch camera
      const result = await ImagePickerLib.launchCameraAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled) {
        onChange(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to take photo');
    }
  };

  const showOptions = () => {
    Alert.alert(
      'Choose Option',
      'Select photo source',
      [
        { text: 'Camera', onPress: takePhoto },
        { text: 'Gallery', onPress: pickImage },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <CustomText variant="caption" style={styles.label}>
        {label}
      </CustomText>

      {value ? (
        <TouchableOpacity onPress={showOptions} style={styles.imageContainer}>
          <Image source={{ uri: value }} style={styles.image} />
          <View style={styles.overlay}>
            <CustomText variant="caption" color={COLORS.text.inverse}>
              Tap to change
            </CustomText>
          </View>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={showOptions} style={styles.placeholder}>
          <CustomText variant="h1">📷</CustomText>
          <CustomText variant="caption" color={COLORS.text.secondary}>
            Tap to add photo
          </CustomText>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: SPACING.md,
  },
  label: {
    fontWeight: '600',
    color: COLORS.text.primary,
    marginBottom: SPACING.xs,
  },
  imageContainer: {
    width: 120,
    height: 120,
    borderRadius: BORDER_RADIUS.xl,
    overflow: 'hidden',
    alignSelf: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: SPACING.xs,
    alignItems: 'center',
  },
  placeholder: {
    width: 120,
    height: 120,
    borderRadius: BORDER_RADIUS.xl,
    backgroundColor: COLORS.background.tertiary,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.border.light,
    borderStyle: 'dashed',
  },
});
