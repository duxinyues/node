/*
 * @Author: yongyuan253015@gmail.com
 * @Date: 2021-08-08 17:41:35
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-09-20 10:08:25
 * @Description: 文件描述
 */
const Constant = require("../constant/constant");
const dateFormat = require("dateformat");
const token = require("./token");
const pool = require("../config");
const Common = require("./common");
function getArticleList(req, res) {

    //定义一个返回对象
    const resObj = Common.clone(Constant.DEFAULT_SUCCESS);
    //查询
    const sql = "SELECT * FROM admin  ";
    pool.getConnection(function (err, connection) {
        if (err) {
            console.log("mysql链接失败");
            res.send(Constant.DEFAULT_ERROR)
        } else {
            console.log("mysql链接成功！")
            connection.query(sql, function (err, results) {
                if (err) {
                    res.send(Constant.DEFAULT_ERROR)
                } else {
                    const result = JSON.parse(JSON.stringify(results));
                    resObj.data = result;
                    res.send(resObj)
                }
            })
        }
    })
}


module.exports = user;