import { TypeOrmModuleAsyncOptions, TypeOrmModuleOptions } from "@nestjs/typeorm"
import { Account } from "src/entities/account.entity"
import { Transaction } from "src/entities/transaction.entity"
import { User } from "src/entities/user.entity"

export const typeOrmAsyncConfig: TypeOrmModuleAsyncOptions={
    useFactory: async (): Promise<TypeOrmModuleOptions>=>{
        return { 
            type: 'mysql',
            host: process.env.DB_HOST,
            port: parseInt(process.env.DB_PORT, 10),
            username: process.env.DB_USERNAME,
            database: process.env.DB_NAME,
            password: process.env.DB_PASSWORD,
            
            entities: [User, Account, Transaction] ,
            autoLoadEntities:true,
            extra: {
                charset: 'utf8mb4_unicode_ci',
            },
         
            synchronize: true,
            // logging:true  
        }  
    }  
}