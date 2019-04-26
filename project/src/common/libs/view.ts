
/**view == 视图
 * 这里就是一个基本的view的实例, 用来渲染数据
 * data默认是{}
 */
export class View {
    /**视图的名称 */
    public name : String;

    /**要渲染的数据 */
    public data : any;

    constructor (name: String, data : any = {}) {
        this.name = name;
        this.data = data;
    }
}