// criando o provedor de consultas e cache de dados para a aplicação
import { QueryClient, QueryClientProvider as TanstackProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function QueryClientProvider({children}){
    return(
        <TanstackProvider client={queryClient}>
            {children}
        </TanstackProvider>
    )
}