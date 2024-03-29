export const serviceConfig = {
    identityApi: {
        BaseUrl:"https://mnw9y2xpf0.execute-api.us-east-1.amazonaws.com/dev/",
        // BaseUrl:"https://localhost:7094/",
        login: "api/security/create-token",
        register:"api/user",
        confim_email_request: "api/user/confirm-email-request",
        confim_email: "api/user/confirm-email",
        reset_password_request: "api/user/reset-password-request",
        reset_password: "api/user/reset-password",
        update_user: "/api/user/{id}"
    },
    moneyManageApi: {
        BaseUrl: "https://dev-moneymanage.originalcoin.online/",
        // BaseUrl: "https://localhost:5078/",
        signalRHubUrl: "wss://dev-moneymanage.originalcoin.online/notifications-hub",
        account: "api/account",
        balance_account: "api/account/{0}/balance",
        account_status: "api/account/status",
        transaction: "api/transaction",
        delete_transaction: "api/transaction/{0}",
        transaction_ammount: "api/transaction/ammount",
        transaction_types: "api/transaction/types",
        get_source: "api/transaction/sources/{0}",
        post_source: "api/transaction/sources",
        put_source: "api/transaction/sources",
        get_type: "api/transaction/types",
        budget: "api/budget",
        get_budget_by_id: "api/budget/{0}",
        budget_types: "api/budget/types",
    }
}

export default serviceConfig