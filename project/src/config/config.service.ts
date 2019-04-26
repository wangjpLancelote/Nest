import * as dotenv from 'dotenv'; //加载的.env文件的一个库
import * as fs from 'fs';
import * as Joi from 'joi';  //验证.env文件
import { from } from 'rxjs';

export interface EnvConfig {
    [prop: string] : string
};

export class ConfigService{
    private readonly envConfig : EnvConfig;
    constructor (filePath: string) {
        const config = dotenv.parse(fs.readFileSync(filePath));
        this.envConfig = this.validateInput(config)
    }
    /**
     * 验证函数
     * @param envConfig 
     */
    private validateInput (envConfig: EnvConfig): EnvConfig {
        const envVarsSchema: Joi.ObjectSchema = Joi.object({
            NODE_ENV: Joi.string()
            .valid(['development', 'prodution', 'test', 'provision'])
            .default('development'),
            PORT: Joi.number().default(8088),
            ORM_LOADING_PATH: Joi.string().required(),
            DATABASE_TYPE: Joi.string().default('mysql'),
            DATABASE_HOST: Joi.string().default('localhost'),

            DATABASE_PORT: Joi.number().default(3306),

            DATABASE_USER: Joi.string().default('root'),

            DATABASE_PWD: Joi.string(),

            DATABASE_DB: Joi.string().required(),

            DATABASE_SYNCHRONIZE: Joi.boolean().default(false),
            
            DATABASE_DROPSCHEMA: Joi.boolean().default(false),
        });

        const {error, value: validatedEnvConfig}  = Joi.valid(envConfig, envVarsSchema);
        if (error) {
            throw new Error(`config validation error: ${error.message}`);
        }
        return validatedEnvConfig;
    }
};