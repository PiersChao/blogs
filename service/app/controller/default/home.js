'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi api';
  }
  async getArticleList() {
    const { ctx, app } = this;
    const sql = 'SELECT article.id as id,' +
                'article.title as title,' +
                'article.introduce as introduce,' +
                'article.addTime as addTime,' +
                'article.view_count as view_count, ' +
                'type.typeName as typeName ' +
                'FROM article LEFT JOIN type ON article.type_id = type.Id';
    const res = await app.mysql.query(sql);
    ctx.body = { data: res };
  }
}

module.exports = HomeController;
