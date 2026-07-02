import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "expo-router";
import { ActivityIndicator, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useAuth } from "@/features/auth/AuthProvider";
import { forgotPasswordSchema, type ForgotPasswordFormValues } from "@/features/auth/schemas";

export default function ForgotPasswordScreen() {
  const { resetPassword } = useAuth();
  const [formError, setFormError] = useState<string | null>(null);
  const [emailSent, setEmailSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = async (values: ForgotPasswordFormValues) => {
    setFormError(null);
    setIsSubmitting(true);
    try {
      const { error } = await resetPassword(values.email);
      if (error) {
        setFormError(error);
      } else {
        setEmailSent(true);
      }
    } catch (err) {
      setFormError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (emailSent) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Check your email</Text>
        <Text>We sent a password reset link if that email exists.</Text>
        <Link href="/(auth)/login" style={styles.link}>
          Back to login
        </Link>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Forgot password</Text>

      <Text style={styles.label}>Email</Text>
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            keyboardType="email-address"
            placeholder="you@example.com"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.email ? <Text style={styles.errorText}>{errors.email.message}</Text> : null}

      {formError ? <Text style={styles.errorText}>{formError}</Text> : null}

      <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)} disabled={isSubmitting}>
        {isSubmitting ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Send reset link</Text>}
      </TouchableOpacity>

      <Link href="/(auth)/login" style={styles.link}>
        Back to login
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 24, gap: 4 },
  title: { fontSize: 28, fontWeight: "700", marginBottom: 24 },
  label: { fontSize: 14, fontWeight: "600", marginTop: 12 },
  input: {
    borderWidth: 1,
    borderColor: "#d0d0d0",
    borderRadius: 8,
    padding: 12,
    marginTop: 4,
    fontSize: 16,
  },
  errorText: { color: "#c0392b", fontSize: 13, marginTop: 4 },
  button: {
    backgroundColor: "#111827",
    borderRadius: 8,
    padding: 14,
    alignItems: "center",
    marginTop: 24,
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "600" },
  link: { marginTop: 16, textAlign: "center", color: "#2563eb" },
});
