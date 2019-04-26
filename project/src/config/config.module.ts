import { Global, Module } from "@nestjs/common";
import { ConfigService } from './config.service';
import { from } from "rxjs";
/**
 * config文件是用来存放一些不宜硬编码的数据，如用户名/密码等。
 * 秉承一切皆模块的原则，这里的config是作为一个模块，暴露到全局。
 */
@Global()
@Module({
    providers: [{
        provide: ConfigService,
        useValue: new ConfigService(`env/${process.env.NODE_ENV}.env`)
    }],
    exports: [ConfigService]
})
export class ConfigModule{}