import { useQuery } from "@tanstack/react-query";
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useAuth } from "@/features/auth/AuthProvider";
import { apiFetch } from "@/lib/api";
import type { MeResponse } from "@finance-mate/shared";

export default function HomeScreen() {
  const { signOut } = useAuth();

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["me"],
    queryFn: () => apiFetch<MeResponse>("/me"),
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Finance Mate</Text>

      {isLoading ? (
        <ActivityIndicator style={styles.spacing} />
      ) : isError ? (
        <View style={styles.spacing}>
          <Text style={styles.errorText}>Couldn't load your account info.</Text>
          <TouchableOpacity onPress={() => refetch()}>
            <Text style={styles.link}>Try again</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <Text style={styles.spacing}>Logged in as {data?.data.email}</Text>
      )}

      <TouchableOpacity style={styles.button} onPress={signOut}>
        <Text style={styles.buttonText}>Log out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24 },
  title: { fontSize: 24, fontWeight: "700" },
  spacing: { marginTop: 16 },
  errorText: { color: "#c0392b" },
  link: { color: "#2563eb", marginTop: 8 },
  button: {
    backgroundColor: "#111827",
    borderRadius: 8,
    padding: 14,
    alignItems: "center",
    marginTop: 32,
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "600" },
});
