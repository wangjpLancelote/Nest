import { Controller, Get, Res} from '@nestjs/common';
import { View } from '../common/libs/view';
@Controller()
export class HomeController {
    @Get()
    // index (@Res() res) {
    //     return res.render('home/home.art');
    // }
    index () : View {
        return new View('home/home.view');
    }
}
