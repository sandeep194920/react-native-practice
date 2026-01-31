/**
 * 🔥 TASK 8: FORM WITH VALIDATION
 *
 * THE BRIEF:
 * "Build a login form with email and password validation. Disable submit
 * button until both are valid."
 *
 * TARGET TIME: 30-45 minutes
 *
 * WHAT TO SAY WHILE CODING:
 * "I'm tracking both value and 'touched' state for each field. This prevents
 * showing errors before the user interacts. Using useMemo for validation to
 * avoid recalculating on every render. The button is disabled until both
 * fields are valid.
 *
 * The email regex checks for basic email format: something@something.something
 *
 * Password must be at least 6 characters - a simple but common requirement.
 *
 * I only show error messages after the user has touched (blurred) the field -
 * this is better UX than showing errors immediately.
 *
 * The submit button changes opacity when disabled, providing visual feedback."
 *
 * KEY CONCEPTS:
 * - Track value AND touched state for each field
 * - useMemo for validation logic
 * - Only show errors after blur (touched = true)
 * - Email regex validation
 * - Password length validation
 * - Disable button until form is valid
 * - onBlur event to track touched state
 *
 * VALIDATION PATTERNS:
 *
 * Email regex explained:
 * /^[^\s@]+@[^\s@]+\.[^\s@]+$/
 * - ^         = start of string
 * - [^\s@]+   = one or more non-whitespace, non-@ characters
 * - @         = literal @ symbol
 * - [^\s@]+   = one or more non-whitespace, non-@ characters
 * - \.        = literal dot
 * - [^\s@]+   = one or more non-whitespace, non-@ characters
 * - $         = end of string
 *
 * This is a simple email validator. Production apps might use libraries
 * like validator.js for more robust validation.
 */

import React, { useState, useMemo } from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Validation logic with useMemo to avoid unnecessary recalculations
  const emailError = useMemo(() => {
    if (!emailTouched) return '';
    if (email.trim() === '') return 'Email is required';

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return 'Invalid email format';

    return '';
  }, [email, emailTouched]);

  const passwordError = useMemo(() => {
    if (!passwordTouched) return '';
    if (password.length === 0) return 'Password is required';
    if (password.length < 6) return 'Password must be at least 6 characters';

    return '';
  }, [password, passwordTouched]);

  const isValid = email.trim() !== '' &&
                  emailError === '' &&
                  password.length >= 6 &&
                  passwordError === '';

  const handleSubmit = async () => {
    if (!isValid) return;

    setSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      Alert.alert('Success', 'Login successful!');

      // Clear form
      setEmail('');
      setPassword('');
      setEmailTouched(false);
      setPasswordTouched(false);
    } catch (error) {
      Alert.alert('Error', 'Login failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      {/* Email Input */}
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, emailError && emailTouched && styles.inputError]}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          onBlur={() => setEmailTouched(true)}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />
        {emailError && emailTouched && (
          <Text style={styles.errorText}>{emailError}</Text>
        )}
      </View>

      {/* Password Input */}
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, passwordError && passwordTouched && styles.inputError]}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          onBlur={() => setPasswordTouched(true)}
          secureTextEntry
        />
        {passwordError && passwordTouched && (
          <Text style={styles.errorText}>{passwordError}</Text>
        )}
      </View>

      {/* Submit Button */}
      <TouchableOpacity
        style={[styles.button, (!isValid || submitting) && styles.buttonDisabled]}
        onPress={handleSubmit}
        disabled={!isValid || submitting}
      >
        <Text style={styles.buttonText}>
          {submitting ? 'Logging in...' : 'Login'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 32,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  inputError: {
    borderColor: '#d32f2f',
  },
  errorText: {
    color: '#d32f2f',
    fontSize: 14,
    marginTop: 4,
    marginLeft: 4,
  },
  button: {
    backgroundColor: '#0066cc',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default LoginForm;

/**
 * FORM VALIDATION UX BEST PRACTICES:
 *
 * ✅ DO:
 * - Show errors only after user touches field (onBlur)
 * - Disable submit button until form is valid
 * - Provide clear, specific error messages
 * - Use appropriate keyboard types (email-address, numeric)
 * - Turn off autocorrect for emails/passwords
 * - Use secureTextEntry for passwords
 * - Show loading state during submission
 *
 * ❌ DON'T:
 * - Show errors immediately on focus
 * - Use generic error messages ("Invalid input")
 * - Allow form submission while submitting
 * - Forget to handle API errors
 * - Use alerts for every validation error
 *
 * ADVANCED VALIDATION:
 *
 * For production apps, consider:
 * 1. Libraries: Formik, React Hook Form, Yup
 * 2. Real-time validation (as user types)
 * 3. Server-side validation
 * 4. Password strength indicators
 * 5. "Show password" toggle
 * 6. "Remember me" checkbox
 * 7. "Forgot password" link
 *
 * KEYBOARD TYPES:
 * - email-address: Shows @ and .com keys
 * - numeric: Number pad
 * - phone-pad: Phone number pad
 * - decimal-pad: Numbers with decimal
 * - url: Shows / and .com keys
 *
 * ACCESSIBILITY:
 * Add aria labels for screen readers:
 * - accessibilityLabel="Email input"
 * - accessibilityHint="Enter your email address"
 */
