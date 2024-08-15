const asyncHandler = (routeHandler) => (req, res, next) =>
  Promise.resolve(routeHandler(req, res, next)).catch(next);

export default asyncHandler;
