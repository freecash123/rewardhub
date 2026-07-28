const { AuditLog } = require('../models');

const auditLog = (action, resource) => {
  return async (req, res, next) => {
    const originalJson = res.json.bind(res);
    res.json = async function (body) {
      res.locals.responseBody = body;
      return originalJson(body);
    };
    res.on('finish', async () => {
      try {
        await AuditLog.create({
          userId: req.user?._id,
          action,
          resource,
          resourceId: req.params?.id || res.locals.resourceId,
          details: { method: req.method, path: req.originalUrl, statusCode: res.statusCode, ip: req.ip },
          ipAddress: req.ip,
          userAgent: req.get('user-agent'),
          status: res.statusCode < 400 ? 'success' : 'failure',
        });
      } catch (error) { console.error('[AuditLog] Error:', error.message); }
    });
    next();
  };
};

const createAuditLog = async ({ userId, action, resource, resourceId, details, req, status = 'success' }) => {
  try {
    await AuditLog.create({
      userId, action, resource, resourceId, details,
      ipAddress: req?.ip, userAgent: req?.get?.('user-agent'), status,
    });
  } catch (error) { console.error('[AuditLog] Create Error:', error.message); }
};

module.exports = { auditLog, createAuditLog };
