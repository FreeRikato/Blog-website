import { Context } from 'hono';
import { verify } from 'hono/jwt';

const authMiddleware = async (c: Context, next: any) => {
  const SECRET_KEY = c.env.JWT_SECRET;
  if (!SECRET_KEY)
    return c.json(
      {
        msg: 'No Secret key available in cloudflare environment',
      },
      400
    );
  const bearerToken = c.req.header('authorization');
  if (!bearerToken)
    return c.json(
      {
        msg: 'No Authorization Token',
      },
      404
    );
  const token = bearerToken.split(' ')[1];
  try {
    const userId = await verify(token, SECRET_KEY);
    c.set('userId', { userId });
  } catch (e: any) {
    return c.json(
      {
        e: e.message,
        msg: 'Error authenticating the user',
      },
      404
    );
  }

  await next();
};

export default authMiddleware;
