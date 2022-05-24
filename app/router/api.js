module.exports = app => {
  const { router, controller } = app;
  router.resources('timeRecords', '/api/timeRecords', controller.timeRecords);
};
