const jwt = require('jsonwebtoken');

class ProtectedRoutesMiddleware {
  protect = (req, res, next) => {
    const token = req.get('Authorization');
  
    if (!token) { // verificando de o header Authorization foi passado!!!
      return res.status(401).json({
        type: 'Auth',
        message: 'Missing token',
      });
    }
  
    const tokenWithoutBearer = token.split(' ')[1];
  
    try {
      const tokenInfo = jwt.verify(tokenWithoutBearer, process.env.JWT_HASH_SECRET);
      
      req.user = tokenInfo; // criando dentro do objeto do request uma nova propriedade USER para conseguir acessar o id dele nas rotas
      return next();
      
    } catch (error) {
      return res.status(401).json({
        type: 'Auth',
        message: 'Invalid credentials',
      });
    }
  }
}

module.exports = new ProtectedRoutesMiddleware();

