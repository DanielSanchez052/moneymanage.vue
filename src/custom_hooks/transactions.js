import {
    useInfiniteQuery
} from "vue-query";
import TransactionService from "@/services/transactions/transactions.service"

export default function UseTransactions(token, accountId, filters) {
    return useInfiniteQuery(["transactions", {
        token,
        accountId,
        filters
    }], async ({
        pageParam = 1,
        queryKey
    }) => {
        try {
            const {
                token,
                accountId,
                filters
            } = queryKey[1];

            const transaction_filter = {
                pageIndex: pageParam,
                pageSize: filters.pageSize,
                accountId: accountId,
            }

            if (filters.typeId && filters.typeId !== 0) {
                transaction_filter.typeId = filters.typeId;
            }

            if (filters.sourceId && filters.sourceId !== 0) {
                transaction_filter.sourceId = filters.sourceId;
            }

            if(filters.dateFrom && filters.dateFrom != "" && filters.dateTo && filters.dateTo != ""){
                transaction_filter.dateFrom = filters.dateFrom
                transaction_filter.dateTo = filters.dateTo
            }

            const data = await TransactionService.GetTransactions(token, {
                ...transaction_filter
            })
            if(data.success){
                return data.data
            }else{
                return []
            }

        } catch (error) {
            console.error(error)
            return []
        }
    }, {
        getNextPageParam: (lastPage, pages) => lastPage.hasNextPage ? lastPage.page + 1 : undefined,
        getPreviousPageParam: (lastPage, pages) => lastPage.hasPreviousPage ? lastPage.page - 1 : undefined,
        select: (data) => ({
            pagesPlain: data.pages?.flatMap((page) => page.items) ?? [],
            pages: [...data.pages],
            pageParams: [...data.pageParams],
        }),
        refetchOnWindowFocus: false,
    })
}