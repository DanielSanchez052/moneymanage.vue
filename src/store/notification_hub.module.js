import { defineStore } from "pinia"
import settings from "@/services/services.config"
import {
    HubConnectionBuilder,
    HttpTransportType,
    LogLevel,
} from "@microsoft/signalr";
import util from "@/libs/utilities"


export const UseNotificationHub = defineStore('notification-hub', {
    state: () => {
        return {
            connection: null,
            connectionStarted: false
        }
    },
    actions: {
        async startSignalR(jwtToken){
            console.log("...Starting")
            this.connection = this.createConnection({
                url: settings.moneyManageApi.signalRHubUrl,
                token: jwtToken
            })

            const start = () => {
                this.connection.start()
                    .then(() => {
                        this.connectionStarted = true
                    })
                    .catch((err) => {
                        console.log(err)
                        this.connectionStarted = false
                        setTimeout(start, 5000);
                    })
            }
            
            // connection.invoke
            this.connection.onclose(() => {
                this.connectionStarted = false
                start()
            })
        
            start()

            console.log(this.connection)
        },

        async stopSignalR(){
            await this.connection.stop()
             
            this.connection = null
            this.connectionStarted = false
        },

        createConnection(config){
            return new HubConnectionBuilder()
            .withUrl(config.url, {
                accessTokenFactory: () => config.token,
                skipNegotiation: true,
                transport: HttpTransportType.WebSockets,
                withCredentials: true
            })
            .configureLogging(LogLevel.Information)
            .build()
        },
        
        signalOn(methodName, newMethod = () => {}) {
            // tryOnScopeDispose(() => {
            //     this.connection.off(methodName)
            // })
            
            return this.connection.on(methodName, (...arg) => {
                newMethod(...arg);
            });
        },
    }
})