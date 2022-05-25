const Service = require('egg').Service;

class TimeInfoService extends Service {
  async findByRefId(refId) {
    const result = await this.app.mysql.select('time_info', {
      where: {
        refId
      }
    });
    // console.log('TimeInfoService findByRefId', result);
    return result;
  }

  async deleteByRefId(refId) {
    const result = await this.app.mysql.delete('time_info', {
      refId
    });
    console.log('TimeInfoService deleteByRefId', result);
  }

  async add(params) {
    const result = await this.app.mysql.insert('time_info', params);
    console.log('TimeInfoService add', result);
  }
}

module.exports = TimeInfoService;