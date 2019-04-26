import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/common/enums/transport.enum';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { ApiParamsValidationsPipe } from '../src/common/pipes/api-pipes-validation.pipe';

import { static as resource } from 'express';
import * as art from 'express-art-template';

import * as Authing from 'express-authing';
import { RolesGuard } from './users/guard/role.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const microService = app.connectMicroservice({transport: Transport.TCP});
  // await app.startAllMicroservicesAsync();

  /**处理静态文件 */
  app.use('/static', resource('resource'));
  /**配置模版引擎 */
  app.engine('art', art);
  /**设置模版引擎的配置项 */
  app.set('view options', {
    debug: process.env.NODE_ENV != 'production',
    minimize: true,
    rules: [
      {test: /<%(#?)((?:==|=#|[=-])?)[ \t]*([\w\W]*?)[ \t]*(-?)%>/},
      {test: /{%([@#]?)[ \t]*(\/?)([\w\W]*?)[ \t]*%}/}
    ]
  });

  /**设置视图文件所在目录 */
  app.setBaseViewsDir('resource/views');

  app.useGlobalFilters(new HttpExceptionFilter()); /**设置全局过滤器 这里是 [异常处理过滤器] */
  app.useGlobalPipes(new ApiParamsValidationsPipe()); /**设置全局参数验证器, [参数过滤器] */
  app.useGlobalGuards(new RolesGuard(new Reflector())); /**设置全局的看守器，检测接口的合法性 */

  /**装载Authing  也可以将这些配置信息都放在一个配置文件里*/
  app.use(Authing({
    clientId: '',
    secret: ''
  }))
  await app.listen(3000);
}
bootstrap();
