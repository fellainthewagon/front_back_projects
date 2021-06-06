function paginatedResultsDB(model) {
  return async (req, res, next) => {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);

    const start = (page - 1) * limit;
    const end = page * limit;

    const results = {};

    if (end < (await model.countDocuments().exec())) {
      results.next = {
        page: page + 1,
        limit,
      };
    }

    if (start > 0) {
      results.prev = {
        page: page - 1,
        limit,
      };
    }

    try {
      results.result = await model.find().limit(limit).skip(start).exec();
      res.paginatedResults = results;
      next();
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
}

module.exports = paginatedResultsDB;
