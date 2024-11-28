import { Hono, Context } from 'hono';
import { decode, sign, verify } from 'hono/jwt';
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { signupSchema, signinSchema } from '@freerikato/blog-website-common';

const userRouter = new Hono();

userRouter.get('/', async (c: Context) => {
  try {
    const prisma = new PrismaClient({
      datasources: {
        db: { url: c.env.DATABASE_URL },
      },
    }).$extends(withAccelerate());

    const users = await prisma.user.findMany();

    return c.json(
      {
        users: users,
        msg: 'Successfully Retrieved the Users',
      },
      200
    );
  } catch (e: any) {
    return c.json(
      {
        error: e.message,
        msg: 'Error Retrieving the Users',
      },
      404
    );
  }
});

userRouter.post('/signup', async (c: Context) => {
  const SECRET_KEY = c.env.JWT_SECRET;
  if (!SECRET_KEY)
    return c.json({
      msg: 'No Secret key available in cloudflare environment',
    });

  try {
    const prisma = new PrismaClient({
      datasources: {
        db: { url: c.env.DATABASE_URL },
      },
    }).$extends(withAccelerate());

    const body = await c.req.json();
    const { success } = signupSchema.safeParse(body);

    if (!success)
      return c.json({
        msg: 'Wrong Datatype sent for Signup',
      });

    const userDetails = await prisma.user.create({
      data: {
        email: body.email,
        username: body.username,
        password: body.password,
      },
    });

    const payload = {
      id: userDetails.id,
    };

    const token = await sign(payload, SECRET_KEY);

    return c.json(
      {
        token: token,
        msg: 'Successfully Signed Up',
      },
      200
    );
  } catch (e: any) {
    return c.json(
      {
        error: e.message,
        msg: 'Error Signing Up',
      },
      404
    );
  }
});

userRouter.post('/signin', async (c: Context) => {
  const SECRET_KEY = c.env.JWT_SECRET;
  if (!SECRET_KEY)
    return c.json(
      {
        msg: 'No Secret key available in cloudflare environment',
      },
      404
    );

  try {
    const prisma = new PrismaClient({
      datasources: {
        db: { url: c.env.DATABASE_URL },
      },
    }).$extends(withAccelerate());

    const body = await c.req.json();
    console.log(body);

    const userDetails = await prisma.user.findUnique({
      where: {
        username: body.username,
      },
    });

    if (!userDetails)
      return c.json(
        {
          msg: 'No user found',
        },
        404
      );

    if (userDetails.password !== body.password)
      return c.json(
        {
          msg: 'Credentials wrong',
        },
        403
      );

    const payload = {
      id: userDetails.id,
    };

    const token = await sign(payload, SECRET_KEY);

    return c.json(
      {
        token: token,
        msg: 'Successfully Signed in',
      },
      200
    );
  } catch (e: any) {
    return c.json(
      {
        error: e.message,
        msg: 'Error Signing in',
      },
      403
    );
  }
});

export default userRouter;
