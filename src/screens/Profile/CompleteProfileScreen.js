import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View, Alert } from 'react-native';
import { Button, Input, Card, CustomText } from '../../components/base';
import { ImagePicker, ProgressIndicator } from '../../components/forms';
import { useAuth, useTheme } from '../../contexts';
import { useForm, useMultiStepForm } from '../../hooks';
import { SPACING } from '../../constants/theme';

// Validation for each step
const validateStep1 = (values) => {
  const errors = {};
  if (!values.name) errors.name = 'Name is required';
  if (!values.email) errors.email = 'Email is required';
  return errors;
};

const validateStep2 = (values) => {
  const errors = {};
  if (!values.phone) errors.phone = 'Phone is required';
  if (!values.location) errors.location = 'Location is required';
  return errors;
};

const validateStep3 = (values) => {
  const errors = {};
  if (!values.bio) errors.bio = 'Bio is required';
  if (values.bio && values.bio.length < 10) {
    errors.bio = 'Bio must be at least 10 characters';
  }
  return errors;
};

export default function CompleteProfileScreen({ navigation }) {
  const { updateUser } = useAuth();
  const { colors } = useTheme();
  const [loading, setLoading] = useState(false);

  const { 
    currentStep, 
    totalSteps, 
    isFirstStep, 
    isLastStep, 
    next, 
    previous, 
    reset 
  } = useMultiStepForm(3);

  const { values, errors, handleChange, setFieldValue } = useForm({
    name: '',
    email: '',
    phone: '',
    location: '',
    bio: '',
    avatar: '',
  });

  const validateCurrentStep = () => {
    let stepErrors = {};
    
    switch (currentStep) {
      case 0:
        stepErrors = validateStep1(values);
        break;
      case 1:
        stepErrors = validateStep2(values);
        break;
      case 2:
        stepErrors = validateStep3(values);
        break;
    }

    return Object.keys(stepErrors).length === 0;
  };

  const handleNext = () => {
    if (validateCurrentStep()) {
      next();
    } else {
      Alert.alert('Validation Error', 'Please fill all required fields');
    }
  };

  const handleSubmit = async () => {
    if (!validateCurrentStep()) {
      Alert.alert('Validation Error', 'Please complete all fields');
      return;
    }

    setLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      const result = await updateUser(values);

      if (result.success) {
        Alert.alert(
          'Success! 🎉',
          'Your profile has been completed!',
          [
            {
              text: 'Done',
              onPress: () => navigation.goBack(),
            },
          ]
        );
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <View>
            <CustomText variant="h3" style={styles.stepTitle}>
              Basic Information
            </CustomText>
            <CustomText variant="body" color={colors.text.secondary} style={styles.stepDesc}>
              Let's start with your basic details
            </CustomText>

            <Input
              label="Full Name"
              placeholder="John Doe"
              value={values.name}
              onChangeText={(text) => handleChange('name', text)}
              error={errors.name}
              required
            />

            <Input
              label="Email"
              placeholder="john@example.com"
              type="email"
              value={values.email}
              onChangeText={(text) => handleChange('email', text)}
              error={errors.email}
              required
            />
          </View>
        );

      case 1:
        return (
          <View>
            <CustomText variant="h3" style={styles.stepTitle}>
              Contact Details
            </CustomText>
            <CustomText variant="body" color={colors.text.secondary} style={styles.stepDesc}>
              How can we reach you?
            </CustomText>

            <Input
              label="Phone Number"
              placeholder="+1 234 567 8900"
              value={values.phone}
              onChangeText={(text) => handleChange('phone', text)}
              error={errors.phone}
              required
            />

            <Input
              label="Location"
              placeholder="San Francisco, CA"
              value={values.location}
              onChangeText={(text) => handleChange('location', text)}
              error={errors.location}
              required
            />
          </View>
        );

      case 2:
        return (
          <View>
            <CustomText variant="h3" style={styles.stepTitle}>
              Profile Picture & Bio
            </CustomText>
            <CustomText variant="body" color={colors.text.secondary} style={styles.stepDesc}>
              Tell us about yourself
            </CustomText>

            <ImagePicker
              label="Profile Picture"
              value={values.avatar}
              onChange={(uri) => setFieldValue('avatar', uri)}
            />

            <Input
              label="Bio"
              placeholder="Tell us about yourself..."
              value={values.bio}
              onChangeText={(text) => handleChange('bio', text)}
              error={errors.bio}
              required
              multiline
              numberOfLines={4}
            />
          </View>
        );

      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background.secondary }]}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Header */}
        <CustomText variant="h1" center style={styles.title}>
          Complete Your Profile
        </CustomText>

        {/* Progress */}
        <ProgressIndicator
          currentStep={currentStep}
          totalSteps={totalSteps}
          labels={['Basic Info', 'Contact', 'Profile']}
        />

        {/* Form Card */}
        <Card variant="elevated">
          {renderStep()}

          {/* Navigation Buttons */}
          <View style={styles.buttonContainer}>
            {!isFirstStep && (
              <Button
                title="← Previous"
                variant="outline"
                onPress={previous}
                style={styles.button}
              />
            )}

            {!isLastStep ? (
              <Button
                title="Next →"
                onPress={handleNext}
                style={[styles.button, isFirstStep && styles.buttonFull]}
              />
            ) : (
              <Button
                title="Complete Profile"
                onPress={handleSubmit}
                isLoading={loading}
                style={[styles.button, isFirstStep && styles.buttonFull]}
              />
            )}
          </View>
        </Card>

        {/* Skip Button */}
        <Button
          title="Skip for now"
          variant="outline"
          size="sm"
          onPress={() => navigation.goBack()}
          style={styles.skipButton}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: SPACING.md,
    paddingTop: 60,
  },
  title: {
    marginBottom: SPACING.xl,
  },
  stepTitle: {
    marginBottom: SPACING.xs,
  },
  stepDesc: {
    marginBottom: SPACING.lg,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: SPACING.sm,
    marginTop: SPACING.lg,
  },
  button: {
    flex: 1,
  },
  buttonFull: {
    flex: 1,
  },
  skipButton: {
    marginTop: SPACING.md,
  },
});
