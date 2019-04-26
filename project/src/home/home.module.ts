import { Module } from '@nestjs/common';
import { HomeController } from './home.controller';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ViewInterCeptor } from '../common/Interceptors/view.interceptor';

/**
 * homeInterCeptor 拦截器
 * 作用于全局
 * 具体方法实现由controller提供
 * APP_INTERCEPTOR 表明提供者是拦截器的一种标识，若是管道，则用APP_PIPE 只是一组常量
 * 拦截器可以做更多的事，如记录日志，返回缓存
 */
@Module({
  controllers: [HomeController],
  providers: [{
    provide: APP_INTERCEPTOR,
    useClass: ViewInterCeptor
  }]
})
export class HomeModule {}
