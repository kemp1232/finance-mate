import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "expo-router";
import { ActivityIndicator, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useAuth } from "@/features/auth/AuthProvider";
import { loginSchema, type LoginFormValues } from "@/features/auth/schemas";

export default function LoginScreen() {
  const { signIn } = useAuth();
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (values: LoginFormValues) => {
    setFormError(null);
    setIsSubmitting(true);
    const { error } = await signIn(values.email, values.password);
    setIsSubmitting(false);
    if (error) setFormError(error);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Log in</Text>

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

      <Text style={styles.label}>Password</Text>
      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            secureTextEntry
            placeholder="••••••••"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.password ? <Text style={styles.errorText}>{errors.password.message}</Text> : null}

      {formError ? <Text style={styles.errorText}>{formError}</Text> : null}

      <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)} disabled={isSubmitting}>
        {isSubmitting ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Log in</Text>}
      </TouchableOpacity>

      <Link href="/(auth)/forgot-password" style={styles.link}>
        Forgot password?
      </Link>
      <Link href="/(auth)/signup" style={styles.link}>
        Don't have an account? Sign up
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
