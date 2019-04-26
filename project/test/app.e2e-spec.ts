import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { Observable } from 'rxjs';

describe('AppController (e2e)', () => {
  let app;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => { /**测试接口的返回response /接口 是否是期待(expect)的200, 以及预期返回是否是helloword*/
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });
  it ('test1', () => {
    console.log('test1');
  });
  it ('test4Observable', () => {
    let a = [1,2,3,4];
    const ob = Observable.create(a);
    console.log('ob', ob);
    Observable.create((observer: any) => {
      observer.next('1')
    }).subscribe((v : Number) => {
      console.log('v', v);
    })

    // console.log("Observable", new Observable(ob).subscribe(a => {
    //   console.log('a', a);
    // }));
    // new Observable(ob).subscribe(a => {
    //   console.log('a', a);
    // })

    // console.log('ob', ob);
  });
});
