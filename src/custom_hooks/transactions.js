import {
    useInfiniteQuery
} from "vue-query";
import TransactionService from "@/services/transactions/transactions.service"

export default function UseTransactions(token, accountId, pageSize, type, source) {
    return useInfiniteQuery(["transactions", {
        token,
        accountId,
        pageSize,
        type,
        source
    }], async ({
        pageParam = 1,
        queryKey
    }) => {
        try {
            const {
                token,
                accountId,
                pageSize,
                type,
                source
            } = queryKey[1];

            const transaction_filter = {
                pageIndex: pageParam,
                pageSize: pageSize,
                accountId: accountId,
            }

            if (type && type !== 0) {
                transaction_filter.typeId = type;
            }

            if (source && source !== 0) {
                transaction_filter.sourceId = source;
            }

            const data = await TransactionService.GetTransactions(token, {
                ...transaction_filter
            })

            return data.data

        } catch (error) {
            console.log(error)
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