const Service = require('egg').Service;
class TimeRecordService extends Service {
  async find({pageIndex, limit}) {
    const timeRecordList = await this.app.mysql.select('time_records', {
      limit: limit * 1, // string 转 number
      offset: pageIndex * limit
    });
    // console.log('TimeRecordService find', timeRecord)
    return timeRecordList;
  }

  async findById(id) {
    const timeRecord = await this.app.mysql.get('time_records', {
      id
    });
    console.log('TimeRecordService findById', timeRecord)
    return timeRecord;
  }

  async add(params) {
    const result = await this.app.mysql.insert('time_records', params);
    console.log('TimeRecordService add', result);
  }

  async deleteById(id) {
    const result = await this.app.mysql.delete('time_records', {
      id
    });
    console.log('TimeRecordService deleteById', result)
  }
}

module.exports = TimeRecordService;
