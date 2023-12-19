export const serviceConfig = {
    identityApi: {
        BaseUrl:"https://dev-moneymanage-identity.originalcoin.online/",
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
        account: "api/account",
        balance_account: "api/account/{0}/balance",
        account_status: "api/account/status",
        transaction: "api/transaction",
        transaction_ammount: "api/transaction/ammount",
        transaction_types: "api/transaction/types",
        get_source: "api/transaction/sources/{0}",
        post_source: "api/transaction/sources",
        put_source: "api/transaction/sources",
        get_type: "api/transaction/types",
    }
}

export default serviceConfig