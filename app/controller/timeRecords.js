const Controller = require('egg').Controller;

class TimeRecordController extends Controller {
  // 获取所有
  async index() {
    const { ctx, service } = this;
    const resultList = [];
    const timeRecordList = await service.timeRecord.find({
      pageIndex: ctx.query.pageIndex || 0,
      limit: ctx.query.limit || 10
    });
    for(let i = 0; i < timeRecordList.length; i++) {
      const timeRecord = timeRecordList[i];
      const zipParseTime = await service.timeInfo.findByRefId(timeRecord.zipParseTimeId);
      const pageParseTime = await service.timeInfo.findByRefId(timeRecord.pageParseTimeId);
      const pageRenderTime = await service.timeInfo.findByRefId(timeRecord.pageRenderTimeId);
      const fileReadTime = await service.fileInfo.findByRefId(timeRecord.fileReadTimeId);
      const imageParseTime = await service.resTimeInfo.findById(timeRecord.imageParseTimeId);
      const fontParseTime = await service.resTimeInfo.findById(timeRecord.fontParseTimeId);
      const imageRenderTime = await service.resTimeInfo.findById(timeRecord.imageRenderTimeId);
      const textRenderTime = await service.resTimeInfo.findById(timeRecord.textRenderTimeId);
      resultList[i] = {
        id: timeRecord.id,
        docId: timeRecord.docId,
        docSize: timeRecord.docSize,
        zipParseTime,
        pageParseTime,
        pageRenderTime,
        fileReadTime,
        imageParseTime,
        fontParseTime,
        imageRenderTime,
        textRenderTime,
      }
    }
    console.log(resultList)
    this.ctx.body = resultList;
  }

  // 创建一条记录
  async create() {
    this.ctx.body = '创建一条记录';
    const { body: reqBody } = this.ctx.request;
    const {
      timeRecord: timeRecordService,
      resTimeInfo: resTimeInfoService,
      timeInfo: timeInfoService,
      fileInfo: fileInfoService,
    } = this.ctx.service;
    const stampTime = new Date().getTime();
    const zipParseTimeId = `zipParseTime_${stampTime}`;
    const pageParseTimeId = `pageParseTime_${stampTime}`;
    const pageRenderTimeId = `pageRenderTime_${stampTime}`;
    const fileReadTimeId = `fileReadTime_${stampTime}`;
    const imageParseTimeId = `imageParseTime_${stampTime}`;
    const fontParseTimeId = `fontParseTime_${stampTime}`;
    const imageRenderTimeId = `imageRenderTime_${stampTime}`;
    const textRenderTimeId = `textRenderTime_${stampTime}`;
    
    // 插入一条 timeRecord
    await timeRecordService.add({
      docId: reqBody.docId,
      docSize: reqBody.docSize,
      pageIndex: reqBody.pageIndex,
      zipParseTimeId,
      pageParseTimeId,
      pageRenderTimeId,
      fileReadTimeId,
      imageParseTimeId,
      fontParseTimeId,
      imageRenderTimeId,
      textRenderTimeId,
    });
    // 插入 zipParseTime 到 time_info 表中
    await timeInfoService.add({
      ...reqBody.zipParseTime,
      refId: zipParseTimeId
    });
    // 插入 pageParseTime 到 time_info 表中
    await timeInfoService.add({
      ...reqBody.pageParseTime,
      refId: pageParseTimeId
    });
    // 插入 pageRenderTime 到 time_info 表中
    await timeInfoService.add({
      ...reqBody.pageRenderTime,
      refId: pageRenderTimeId
    });
    // 插入 fileReadTime 到 file_info 表中
    for(let i = 0; i < reqBody.fileReadTime.length; i++) {
      await fileInfoService.add({
        ...reqBody.fileReadTime[i],
        refId: fileReadTimeId,
      });
    }
    
    // 插入 imageParseTime 到 res_time_info 表中
    for(let i = 0; i < reqBody.imageParseTime.length; i++) {
      await resTimeInfoService.add({
        ...reqBody.imageParseTime[i],
        refId: imageParseTimeId,
      });
    }

    // 插入 fontParseTime 到 res_time_info 表中
    for(let i = 0; i < reqBody.fontParseTime.length; i++) {
      await resTimeInfoService.add({
        ...reqBody.fontParseTime[i],
        refId: fontParseTimeId,
      });
    }

    // 插入 imageRenderTime 到 res_time_info 表中
    for(let i = 0; i < reqBody.imageRenderTime.length; i++) {
      await resTimeInfoService.add({
        ...reqBody.imageRenderTime[i],
        refId: imageRenderTimeId,
      });
    }

    // 插入 textRenderTime 到 res_time_info 表中
    for(let i = 0; i < reqBody.textRenderTime.length; i++) {
      await resTimeInfoService.add({
        ...reqBody.textRenderTime[i],
        refId: textRenderTimeId,
      });
    }
    
  }

  // 获取一条记录
  async show() {
    const { timeRecord: timeRecordService } = this.ctx.service;
    const result = await timeRecordService.findById(this.ctx.params.id);
    this.ctx.body = result;
    console.log('result: ', result)
  }

  // 删除一条记录
  async destroy() {
    // 错误处理，比如删除没有的数据
    const {
      timeRecord: timeRecordService,
      timeInfo: timeInfoService,
      fileInfo: fileInfoService,
      resTimeInfo: resTimeInfoService,
    } = this.ctx.service;
    const timeRecord = await timeRecordService.findById(this.ctx.params.id);
    await timeInfoService.deleteByRefId(timeRecord.zipParseTimeId);
    await timeInfoService.deleteByRefId(timeRecord.pageParseTimeId);
    await timeInfoService.deleteByRefId(timeRecord.pageRenderTimeId);
    await fileInfoService.deleteByRefId(timeRecord.fileReadTimeId);
    await resTimeInfoService.deleteByRefId(timeRecord.imageParseTimeId);
    await resTimeInfoService.deleteByRefId(timeRecord.fontParseTimeId);
    await resTimeInfoService.deleteByRefId(timeRecord.imageRenderTimeId);
    await resTimeInfoService.deleteByRefId(timeRecord.textRenderTimeId);
    await timeRecordService.deleteById(timeRecord.id);
    this.ctx.body = '删除一条记录';
  }
}

module.exports = TimeRecordController;