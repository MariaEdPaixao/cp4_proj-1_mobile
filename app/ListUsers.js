import { useQuery } from "@tanstack/react-query";
import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import getUsers from "../api/users";
import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import { useRouter } from "expo-router";

export default function ListUsers() {
    const router = useRouter()
    //dados que retornam da função | controle inicial de carregamento | armazena o erro | controle de erro | controla se os dados estão sendo buscados | função que permite fazer a requisição manualmente   
    const { data, isLoading, error, isError, isFetching, refetch } = useQuery({
        queryKey: ['users'],
        queryFn: getUsers
    })

    const [tooltip, setTooltip] = useState("");

    // páginação dos dados
    // setando a página - começando pela 1°
    const [page, setPage] = useState(1)
    const nPage = 3; // 3 users por pág

    //setando inicio e fim da página | e claro, recortando dos dados na integra para a paginação
    const startIndex = (page - 1) * nPage;
    const endIndex = startIndex + nPage;
    const currentUsers = data?.slice(startIndex, endIndex); // passando esse recorte dos dados para o flatlist


    if (isLoading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" />
                <Text>Carregando usuários...</Text>
            </View>
        )
    }

    if (isError) {
        return (
            <View style={styles.center}>
                <Text style={{ color: 'red' }}>Erro ao carregar usuários!</Text>
            </View>
        )
    }

    return (
        <SafeAreaView style={styles.containerPag}>
            <View style={styles.header}>
                <Text style={styles.titlePage}>Usuários</Text>
                <View style={styles.icons}>
                    <TouchableOpacity
                        onPress={() => router.push("/")}
                        onPressIn={() => setTooltip("Voltar para Home")}
                        onPressOut={() => setTooltip("")}
                    >
                        <MaterialIcons name="home" size={28} color="#4F46E5" />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={refetch}
                        onPressIn={() => setTooltip("Recarregar lista")}
                        onPressOut={() => setTooltip("")}
                    >
                        <MaterialIcons name="refresh" size={28} color="#4F46E5" />
                    </TouchableOpacity>
                </View>
            </View>

            {tooltip !== "" && (
                <Text style={styles.tooltip}>{tooltip}</Text>
            )}

            <FlatList
                style={{ width: '100%' }}
                data={currentUsers}
                refreshing={isFetching}
                onRefresh={refetch}
                renderItem={({ item }) => (
                    <View style={styles.containerList}>
                        <View style={styles.containerPhoto}>
                            <MaterialIcons name="person" size={24} color="#fff" />
                        </View>
                        <View>
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
            <View style={styles.pagination}>
                <TouchableOpacity
                    onPress={() => setPage(prev => prev - 1)}
                    disabled={page === 1}
                    style={styles.paginationButton}
                >
                    <Text>
                        <MaterialIcons name="chevron-left" size={32} color="#fff" />
                    </Text>
                </TouchableOpacity>

                <Text style={styles.pageText}>Página {page}</Text>

                <TouchableOpacity
                    onPress={() => setPage(prev => prev + 1)}
                    disabled={endIndex >= data.length}
                    style={styles.paginationButton}
                >
                    <MaterialIcons name="chevron-right" size={32} color="#fff" />
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    containerPag: {
        flex: 1,
        width: '100%',
        paddingHorizontal: 15,
        backgroundColor: '#f5f5f5',
        padding: 30
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10
    },
    icons: {
        flexDirection: "row",
        gap: 15
    },
    tooltip: {
        alignSelf: "flex-end",
        marginBottom: 10,
        color: "#555",
        fontSize: 14,
        backgroundColor: "#e0e0e0",
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 5
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8
    },
    alignSideways: {
        flexDirection: 'row',
        gap: 5,
        alignItems: 'center'
    },
    containerPhoto: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#4F46E5',
        justifyContent: 'center',
        alignItems: 'center',
    },
    containerList: {
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
    nameTitle: {
        fontSize: 20,
        fontWeight: "600",
    },
    itensUser: {
        fontSize: 16,
        fontWeight: "400",
        color: "#3f3f3fff"
    },
    titlePage: {
        fontSize: 30,
        fontWeight: "600",
    },
    pagination: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 2
    },
    paginationButton: {
        backgroundColor: '#4F46E5',
        padding: 10,
        borderRadius: 5
    },
    pageText: {
        alignSelf: 'center'
    }

});