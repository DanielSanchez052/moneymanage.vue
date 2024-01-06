import { useInfiniteQuery } from "vue-query";
import BudgetService from "@/services/budget/budget.service"

export default function UseBudgets(token, accountId, filters) {
    return useInfiniteQuery(["budgets", {
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

            const budget_filter = {
                pageIndex: pageParam,
                pageSize: filters.pageSize,
                accountId: accountId,
            }

            if (filters.typeId && filters.typeId !== 0) {
                budget_filter.targetTypeId = filters.typeId;
            }

            if (filters.sourceId && filters.sourceId !== 0) {
                budget_filter.targetSourceId = filters.sourceId;
            }

            const data = await BudgetService.getBudgets(token, {
                ...budget_filter
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