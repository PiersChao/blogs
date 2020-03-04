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
                "FROM_UNIXTIME(article.addTime,'%Y-%m-%d %H:%i:%s' ) as addTime," +
                'article.view_count as view_count, ' +
                'type.typeName as typeName ' +
                'FROM article LEFT JOIN type ON article.type_id = type.Id';
    const res = await app.mysql.query(sql);
    ctx.body = { data: res };
  }
  async getArticleById() {
    const { ctx, app } = this;
    const id = ctx.params.id;
    const sql = 'SELECT article.id as id,' +
                'article.title as title,' +
                'article.introduce as introduce,' +
                'article.article_content as article_content,' +
                "FROM_UNIXTIME(article.addTime,'%Y-%m-%d %H:%i:%s' ) as addTime," +
                'article.view_count as view_count ,' +
                'type.typeName as typeName ,' +
                'type.id as typeId ' +
                'FROM article LEFT JOIN type ON article.type_id = type.Id ' +
                'WHERE article.id=' + id;

    const res = await app.mysql.query(sql);
    ctx.body = { data: res[0] };
  }
}

module.exports = HomeController;
