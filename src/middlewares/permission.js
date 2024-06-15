const permission = (role) => (req, res, next) => {
  if (req.user && req.user.role === role) {
    next();
  } else {
    res.status(403).json({ message: '접근 권한이 없습니다.' });
  }
};

export default permission;
