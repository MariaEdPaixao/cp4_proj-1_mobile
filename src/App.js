import { useQuery } from "@tanstack/react-query";
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import getUsers from "./api/users";
import { MaterialIcons } from "@expo/vector-icons";

export default function App() {
    //dados que retornam da função | controle inicial de carregamento | armazena o erro | controle de erro | controla se os dados estão sendo buscados | função que permite fazer a requisição manualmente   
    const { data, isLoading, error, isError, isFetching, refetch } = useQuery({
        queryKey: ['users'],
        queryFn: getUsers
    })

    if (isLoading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" />
                <Text>Carregando usuários...</Text>
            </View>
        )
    }

    if (isError) {
        <View style={styles.center}>
            <ActivityIndicator size="large" />
            <Text>Erro ao carregar usuários!</Text>
        </View>

    }


    return (
        <SafeAreaView style={styles.containerPag}>
            <Text style={styles.titlePage}>Usuários</Text>
            <FlatList
                style={{ width: '100%' }}
                data={data}
                refreshing={isFetching}
                onRefresh={refetch}
                renderItem={({ item }) => (
                    <View style={styles.containerList}>
                        <View style={styles.containerPhoto}>
                            <MaterialIcons name="person" size={24} color="#fff" />
                        </View>
                        <View >
                            <Text style={styles.nameTitle}>{item.name}</Text>
                            <View style={styles.alignSideways}>
                                <MaterialIcons name="email" size={18} color="#555" />
                                <Text style={styles.itensUser}>{item.email}</Text>
                            </View>
                            <View style={styles.alignSideways}>
                                <MaterialIcons name="location-on" size={18} color="#555" />
                                <Text style={styles.itensUser}>{item.address.city}</Text>
                            </View>
                        </View>
                    </View>
                )}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    containerPag: {
        flex: 1,
        width: '100%',
        paddingHorizontal: 10,
        backgroundColor: '#f5f5f5'
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    alignSideways: {
        flex: 1,
        flexDirection: 'row',
        gap: 5,
        alignItems: 'center'
    },
    containerPhoto: {
        width: 40,
        height: 40,
        borderRadius: 20, // metade da largura/altura
        backgroundColor: '#0077FF', // azul bonito
        justifyContent: 'center',
        alignItems: 'center',
    },
    containerList: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        width: '100%',
        borderWidth: 0.2,
        borderColor: '#e4e3e3ff',
        padding: 10,
        marginTop: 2,
        borderRadius: 5,
        backgroundColor: '#fff'
    },
    containerUser: {
        flex: 1,
    },
    nameTitle: {
        fontSize: 20,
        fontWeight: 600,
    },
    itensUser: {
        fontSize: 16,
        fontWeight: 400,
        color: "#3f3f3fff"
    },
    titlePage: {
        fontSize: 30,
        fontWeight: 600,
        marginBottom: 15
    }
})