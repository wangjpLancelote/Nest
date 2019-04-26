/**这里是自定义各种的错误码 */
export enum ApiErrorCode {
    TIMEOUT =  1, /**超时 */
    SUCCESS = 0,  /**成功 */

    USER_ID_INVALID = 1001,  /**用户ID无效 */
    USER_NAME_INVALID = 1002, /**用户name无效 */
    USER_AGE_INVALID = 1003, /**用户age无效 */
}