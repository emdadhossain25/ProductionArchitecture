import React from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { Button, CustomText } from '../base';
import { COLORS, SPACING } from '../../constants/theme';

/**
 * ErrorBoundary Component
 * 
 * Catches React component errors and displays fallback UI
 * 
 * @example
 * <ErrorBoundary>
 *   <App />
 * </ErrorBoundary>
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error) {
    // Update state so next render shows fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log error to service
    console.error('ErrorBoundary caught:', error, errorInfo);
    
    this.setState({
      error,
      errorInfo,
    });

    // Log to error reporting service
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });

    if (this.props.onReset) {
      this.props.onReset();
    }
  };

  render() {
    if (this.state.hasError) {
      // Fallback UI
      return (
        <SafeAreaView style={styles.container}>
          <View style={styles.content}>
            <Text style={styles.emoji}>💥</Text>
            
            <CustomText variant="h2" center style={styles.title}>
              Oops! Something went wrong
            </CustomText>
            
            <CustomText 
              variant="body" 
              center 
              color={COLORS.text.secondary}
              style={styles.message}
            >
              We're sorry for the inconvenience. The error has been logged 
              and we'll fix it soon.
            </CustomText>

            {__DEV__ && this.state.error && (
              <View style={styles.errorBox}>
                <CustomText variant="caption" color={COLORS.danger}>
                  {this.state.error.toString()}
                </CustomText>
              </View>
            )}

            <View style={styles.buttons}>
              <Button
                title="Try Again"
                onPress={this.handleReset}
                style={styles.button}
              />
              
              <Button
                title="Go to Home"
                variant="outline"
                onPress={() => {
                  this.handleReset();
                  // Navigate to home if navigation prop provided
                  if (this.props.navigation) {
                    this.props.navigation.navigate('Home');
                  }
                }}
                style={styles.button}
              />
            </View>
          </View>
        </SafeAreaView>
      );
    }

    return this.props.children;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background.primary,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.xl,
  },
  emoji: {
    fontSize: 80,
    marginBottom: SPACING.lg,
  },
  title: {
    marginBottom: SPACING.md,
  },
  message: {
    marginBottom: SPACING.xl,
    maxWidth: 300,
  },
  errorBox: {
    backgroundColor: COLORS.danger + '10',
    padding: SPACING.md,
    borderRadius: 8,
    marginBottom: SPACING.lg,
    width: '100%',
  },
  buttons: {
    width: '100%',
    gap: SPACING.sm,
  },
  button: {
    width: '100%',
  },
});

export default ErrorBoundary;
