import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function HomeScreen() {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Olá, administrador</Text>
            <Text style={styles.subtitle}>Deseja ver os usuários registrados?</Text>

            <TouchableOpacity style={styles.button} onPress={() => router.push("/ListUsers")}>
                <Text style={styles.buttonText}>Ver usuários</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        justifyContent: "center", 
        alignItems: "center", 
        backgroundColor: "#F5F7FA" 
    },
    title: { 
        fontSize: 24, 
        fontWeight: "bold",
        marginBottom: 10 
    },
    subtitle: { 
        fontSize: 16, 
        color: "#555", 
        marginBottom: 30 
    },
    button: { 
        backgroundColor: "#4F46E5", 
        paddingVertical: 14, 
        paddingHorizontal: 28, 
        borderRadius: 10
    },
    buttonText: { 
        color: "#FFF", 
        fontSize: 16, 
        fontWeight: "600"
    },
});
