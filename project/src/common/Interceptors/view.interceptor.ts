
/**
 * 拦截器
 * 实现对视图的拦截，并将数据源传递到视图, 返回一个value
 */
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as util from 'util';
import { View } from '../libs/view';
import { NestInterceptor, Injectable, ExecutionContext } from '@nestjs/common';
import { async } from 'rxjs/internal/scheduler/async';

@Injectable()
export class ViewInterCeptor implements NestInterceptor {
    intercept (context: ExecutionContext, call$: Observable<any>) : Observable<any> {
        /**获取reponse对象 */
        const response = context.switchToHttp().getResponse();

        /**将render转成一个promisify, 然后绑定执行的上下文 */
        const render = util.promisify(response.render.bind(response));
        /**Rxjs 流式操作 */
        return call$.pipe(map(async value => {
            if (value instanceof View) {
                /**这里就是渲染 view的操作 */
                value = await render(value.name, value.data);
            }
            return value;
        }))
    }
}