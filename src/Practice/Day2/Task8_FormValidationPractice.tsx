/**
 * 🔥 TASK 8: FORM WITH VALIDATION - PRACTICE
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
 * YOUR TASK:
 * Implement the validation logic and form handling!
 */

import React, { useState, useMemo } from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";

function LoginFormPractice() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // TODO: Implement email validation with useMemo
  // HINTS:
  // 1. If not touched, return empty string (no error)
  // 2. If empty after trim, return 'Email is required'
  // 3. Test with regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  // 4. If regex fails, return 'Invalid email format'
  // 5. Otherwise, return empty string
  const emailError = useMemo(() => {
    if (!emailTouched) return;

    if (email.trim() === "") return "Email is required";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) return "Invalid email format";

    return "";
  }, [email, emailTouched]);

  // TODO: Implement password validation with useMemo
  // HINTS:
  // 1. If not touched, return empty string
  // 2. If length === 0, return 'Password is required'
  // 3. If length < 6, return 'Password must be at least 6 characters'
  // 4. Otherwise, return empty string
  const passwordError = useMemo(() => {
    if (!passwordTouched) return "";

    if (password.length === 0) return "Password is required";

    if (password.length < 6) return "Password must be at least 6 characters";

    return "";
  }, [password, passwordTouched]);

  // TODO: Calculate isValid
  // HINT: Form is valid when:
  // - email is not empty (after trim)
  // - emailError is empty string
  // - password length >= 6
  // - passwordError is empty string
  const isValid = !emailError && !passwordError; // Replace with your logic

  // TODO: Implement handleSubmit
  // HINTS:
  // 1. Check if valid, return early if not
  // 2. Set submitting to true
  // 3. Simulate API call with setTimeout (2000ms)
  // 4. Show success Alert
  // 5. Clear form (reset all states)
  // 6. Set submitting to false in finally
  const handleSubmit = async () => {
    // Your code here
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      {/* Email Input */}
      <View style={styles.inputContainer}>
        <TextInput
          style={[
            styles.input,
            emailTouched && emailError && styles.inputError,
          ]}
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
          style={[
            styles.input,
            passwordError && passwordTouched && styles.inputError,
          ]}
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
        style={[
          styles.button,
          (!isValid || submitting) && styles.buttonDisabled,
        ]}
        onPress={handleSubmit}
        disabled={!isValid || submitting}
      >
        <Text style={styles.buttonText}>
          {submitting ? "Logging in..." : "Login"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 32,
    textAlign: "center",
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 8,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  inputError: {
    borderColor: "#d32f2f",
  },
  errorText: {
    color: "#d32f2f",
    fontSize: 14,
    marginTop: 4,
    marginLeft: 4,
  },
  button: {
    backgroundColor: "#0066cc",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonDisabled: {
    backgroundColor: "#ccc",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default LoginFormPractice;

/**
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
 * IMPLEMENTATION CHECKLIST:
 * □ Implement emailError with useMemo
 *   □ Return '' if not touched
 *   □ Check if empty
 *   □ Validate with regex
 *   □ Return appropriate error message
 * □ Implement passwordError with useMemo
 *   □ Return '' if not touched
 *   □ Check if empty
 *   □ Check length >= 6
 *   □ Return appropriate error message
 * □ Calculate isValid boolean
 * □ Implement handleSubmit
 *   □ Guard clause for !isValid
 *   □ Set submitting true
 *   □ Simulate API call
 *   □ Show success alert
 *   □ Clear all form fields
 *   □ Set submitting false
 *
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
 * TESTING YOUR IMPLEMENTATION:
 * 1. Type invalid email → Should show error after blur
 * 2. Type valid email → Error should disappear
 * 3. Type short password → Should show error after blur
 * 4. Type 6+ char password → Error should disappear
 * 5. Submit button should enable only when both valid
 * 6. Submitting should show loading text
 */
