import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View, Alert } from 'react-native';
import { Button, Input, Card, CustomText } from './src/components/base';
import { COLORS, SPACING } from './src/constants/theme';

export default function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSubmit = () => {
    // Simple validation
    const newErrors = {};
    
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!email.includes('@')) {
      newErrors.email = 'Invalid email format';
    }
    
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setLoading(true);
    
    setTimeout(() => {
      setLoading(false);
      Alert.alert('Success!', 'Components working perfectly! 🎉');
    }, 1500);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Title */}
        <CustomText variant="h1" center style={styles.title}>
          Component Library
        </CustomText>
        <CustomText variant="body" center color={COLORS.text.secondary}>
          Day 47: Base Components
        </CustomText>

        {/* Button Examples */}
        <Card variant="elevated" style={styles.section}>
          <CustomText variant="h3" style={styles.sectionTitle}>
            Buttons
          </CustomText>
          
          <Button 
            title="Primary Button"
            variant="primary"
            onPress={() => Alert.alert('Primary', 'Pressed!')}
            style={styles.buttonSpacing}
          />
          
          <Button 
            title="Secondary Button"
            variant="secondary"
            onPress={() => Alert.alert('Secondary', 'Pressed!')}
            style={styles.buttonSpacing}
          />
          
          <Button 
            title="Danger Button"
            variant="danger"
            onPress={() => Alert.alert('Danger', 'Pressed!')}
            style={styles.buttonSpacing}
          />
          
          <Button 
            title="Outline Button"
            variant="outline"
            onPress={() => Alert.alert('Outline', 'Pressed!')}
            style={styles.buttonSpacing}
          />
          
          <View style={styles.row}>
            <Button 
              title="Small"
              size="sm"
              onPress={() => {}}
              style={styles.buttonSmall}
            />
            <Button 
              title="Large"
              size="lg"
              onPress={() => {}}
              style={styles.buttonSmall}
            />
          </View>
        </Card>

        {/* Form Example */}
        <Card variant="elevated" style={styles.section}>
          <CustomText variant="h3" style={styles.sectionTitle}>
            Form Inputs
          </CustomText>
          
          <Input
            label="Email"
            placeholder="Enter your email"
            type="email"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              setErrors({...errors, email: ''});
            }}
            error={errors.email}
            required
          />
          
          <Input
            label="Password"
            placeholder="Enter your password"
            type="password"
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              setErrors({...errors, password: ''});
            }}
            error={errors.password}
            required
          />
          
          <Button
            title="Submit Form"
            onPress={handleSubmit}
            isLoading={loading}
          />
        </Card>

        {/* Card Variants */}
        <CustomText variant="h3" style={styles.sectionTitle}>
          Card Variants
        </CustomText>

        <Card variant="elevated" style={styles.cardExample}>
          <CustomText variant="bodyBold">Elevated Card</CustomText>
          <CustomText variant="caption" color={COLORS.text.secondary}>
            With shadow elevation
          </CustomText>
        </Card>

        <Card variant="outlined" style={styles.cardExample}>
          <CustomText variant="bodyBold">Outlined Card</CustomText>
          <CustomText variant="caption" color={COLORS.text.secondary}>
            With border outline
          </CustomText>
        </Card>

        <Card variant="flat" style={styles.cardExample}>
          <CustomText variant="bodyBold">Flat Card</CustomText>
          <CustomText variant="caption" color={COLORS.text.secondary}>
            With background color
          </CustomText>
        </Card>

        {/* Typography */}
        <Card variant="elevated" style={styles.section}>
          <CustomText variant="h1">Heading 1</CustomText>
          <CustomText variant="h2">Heading 2</CustomText>
          <CustomText variant="h3">Heading 3</CustomText>
          <CustomText variant="body">Body text - Regular weight</CustomText>
          <CustomText variant="bodyBold">Body text - Bold weight</CustomText>
          <CustomText variant="caption" color={COLORS.text.secondary}>
            Caption text - Small size
          </CustomText>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background.secondary,
  },
  content: {
    padding: SPACING.md,
    paddingTop: 60,
  },
  title: {
    marginBottom: SPACING.xs,
  },
  section: {
    marginTop: SPACING.lg,
  },
  sectionTitle: {
    marginBottom: SPACING.md,
  },
  buttonSpacing: {
    marginBottom: SPACING.sm,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonSmall: {
    flex: 1,
    marginHorizontal: SPACING.xs,
  },
  cardExample: {
    marginBottom: SPACING.sm,
  },
});
