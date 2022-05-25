const Service = require('egg').Service;

class FileInfoService extends Service {
  async findByRefId(refId) {
    const result = await this.app.mysql.select('file_info', {
      where: {
        refId
      }
    });
    // console.log('FileInfoService findByRefId', result);
    return result;
  }

  async deleteByRefId(refId) {
    const result = await this.app.mysql.delete('file_info', {
      refId
    });
    console.log('FileInfoService deleteByRefId', result);
  }

  async add(params) {
    const result = await this.app.mysql.insert('file_info', params);
    console.log('FileInfoService add', result);
  }
}

module.exports = FileInfoService;