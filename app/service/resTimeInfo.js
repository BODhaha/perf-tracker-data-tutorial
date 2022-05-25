const Service = require('egg').Service;

class ResTimeInfoService extends Service {
  async findById(refId) {
    const result = await this.app.mysql.select('res_time_info', {
      where: {
        refId
      }
    });
    console.log('ResTimeInfoService findById', result);
    return result;
  }

  async deleteByRefId(refId) {
    const result = await this.app.mysql.delete('res_time_info', {
      refId
    });
    console.log('ResTimeInfoService deleteByRefId', result);
  }

  async add(params) {
    const result = await this.app.mysql.insert('res_time_info', params);
    console.log('ResTimeInfoService add', result);
  }
}

module.exports = ResTimeInfoService;