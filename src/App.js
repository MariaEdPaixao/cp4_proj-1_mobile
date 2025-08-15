import { useQuery } from "@tanstack/react-query";
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import getUsers from "./api/users";

export default function App() {
    //dados que retornam da função | controle inicial de carregamento | armazena o erro | controle de erro | controla se os dados estão sendo buscados | função que permite fazer a requisição manualmente   
    const { data, isLoading, error, isError, isFetching, refetch } = useQuery({
        queryKey: ['users'],
        queryFn: getUsers
    })


    return (
        <SafeAreaView>
            <Text>Usuários</Text>
        </SafeAreaView>
    )
}
