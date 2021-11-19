/*
 * @Author: yongyuan253015@gmail.com
 * @Date: 2021-11-14 03:06:31
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-11-19 22:18:26
 * @Description: cateController
 */
const formatDate = require("../utils")
const Common = require("./common");
const CateModel = require("../models/cate");
const Constant = require("../constant/constant");
const dateFormat = require('dateformat');
const pool = require('../config');

const list = (req, res) => {
    const sql = `SELECT * FROM cate LIMIT ${(req.body.page - 1) * req.body.pageSize},${req.body.pageSize}`
    const resObj = Common.clone(Constant.DEFAULT_SUCCESS);
    pool.query(sql, (err, result) => {
        if (err) {
            res.send(Constant.DEFAULT_LOGIN_FAIL);
            return;
        }

        if (result) {
            resObj.data = result
            res.send(resObj);
        }
    })
}
const info = (req, res) => {
    const resObj = Common.clone(Constant.DEFAULT_SUCCESS);
    let tasks = {
        checkParams: (cb) => {
            Common.checkParams(req.params, ['id'], cb);
        },
        query: ['checkParams', (results, cb) => {
            CateModel
                .findByPk(req.params.id)
                .then((result) => {
                    if (result) {
                        resObj.data = {
                            id: result.id,
                            name: result.name,
                            createdAt: dateFormat(result.createdAt, 'yyyy-mm-dd HH:MM:ss')
                        }

                        cb(null);
                    } else {
                        cb("cate not exsit")
                    }
                })
                .catch((err) => {
                    cb(Constant.DEFAULT_ERROR);
                })
        }]
    }
    Common.autoFn(tasks, res, resObj);
}
const add = (req, res) => {
    const  params = {
        cate_name:JSON.stringify(req.body.name),
        create_at:JSON.stringify(formatDate.checkDate()),
        update_at:JSON.stringify(formatDate.checkDate())
    }
    const sql = `insert into cate(cate_name,create_at,update_at) values(${params.cate_name},${params.create_at},${params.update_at})`;
    const  querySql = `select * from cate where cate_name=${params.cate_name}`
    pool.query(querySql, (err, result) => {
        if (err) {
            console.log(err)
            res.send(Constant.DEFAULT_ADD_CATE_FAIL);
            return;
        }
        if(result && result.length === 0) {
            pool.query(sql,(err, result)=>{
                if (err) {
                    console.log(err)
                    res.send(Constant.DEFAULT_ADD_CATE_FAIL);
                    return;
                }
                res.send(Common.clone(Constant.DEFAULT_SUCCESS));
            })
        }else{
            res.send(Constant.DEFAULT_CATE_FAIL_REPEAT)
        }
    })
}
const update = (req, res) => {
    const resObj = Common.clone(Constant.DEFAULT_SUCCESS);
    let tasks = {
        checkParams: (cb) => {
            Common.checkParams(req.body, ['id', 'name'], cb);
        },
        update: ['checkParams', (results, cb) => {
            CateModel
                .update({
                    name: req.body.name
                }, {
                    where: {
                        id: res.body.id
                    }
                })
                .then(results => {
                    if (results[0]) {
                        cb(null);
                    } else {
                        console.log("分类更新失败");
                        cb("cate not exsit")
                    }
                })
        }]
    }
    Common.autoFn(tasks, res, resObj);
}
const remove = (req, res) => {
    const resObj = Common.clone(Constant.DEFAULT_SUCCESS);
    let tasks = {
        checkParams: (cb) => {
            Common.checkParams(req.body, ['id'], cb);
        },
        remove: ['checkParams', (results, cb) => {
            CateModel
                .destroy({
                    where: {
                        id: req.body.id
                    }
                })
                .then(function (result) {
                    if (result) {
                        cb(null);
                    } else {
                        cb("cate not  exsit");
                    }
                })
                .catch(err => {
                    cb(Constant.DEFAULT_ERROR);
                })
        }]
    }
    Common.autoFn(tasks, res, resObj);
}

module.exports = {
    list,
    info,
    add,
    update,
    remove
}