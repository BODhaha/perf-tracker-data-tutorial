const Controller = require('egg').Controller;

class TimeRecordController extends Controller {
  // 获取所有
  async index() {
    this.ctx.body = '获取所有记录';
  }

  // 创建一条记录
  async create() {
    this.ctx.body = '创建一条记录';

  }

  // 获取一条记录
  async show() {
    this.ctx.body = '一条记录';
  }

  // 删除一条记录
  async destroy() {
    this.ctx.body = '删除一条记录';
  }
}

module.exports = TimeRecordController;
