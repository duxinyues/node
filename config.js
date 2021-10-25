/*
 * @Author: yongyuan253015@gmail.com
 * @Date: 2021-08-08 17:41:35
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-10-25 19:48:33
 * @Description: 文件描述
 */
const mysql = require("mysql");
const config = {
    MYSQL: {
        database: 'new_blog',
        username: 'root',
        password: '1234567',
        host: 'localhost',
        port: 3306
    },
}
const pool = mysql.createPool({
    host: config.MYSQL.host,
    port: config.MYSQL.port,
    user: config.MYSQL.username,
    password: config.MYSQL.password,
    database: config.MYSQL.database
})
module.exports = pool;