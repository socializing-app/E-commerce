exports.catchErrorMiddleware = ( method ) => (req, res, next) => {
    try {
        method(req, res, next);
    } catch (error) {
        return next({error});
    }
} 