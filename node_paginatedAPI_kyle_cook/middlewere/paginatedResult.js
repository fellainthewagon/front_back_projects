function paginatedResults(model) {
  return (req, res, next) => {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);

    const start = (page - 1) * limit;
    const end = page * limit;

    const results = {};

    if (end < model.length) {
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

    results.result = model.slice(start, end);

    res.paginatedResults = results;
    next();
  };
}

module.exports = paginatedResults;
