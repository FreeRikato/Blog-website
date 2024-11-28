import { Hono, Context } from 'hono';
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';

const blogRouter = new Hono();

blogRouter.get('/bulk', async (c: Context) => {
  const prisma = new PrismaClient({
    datasources: {
      db: { url: c.env.DATABASE_URL },
    },
  }).$extends(withAccelerate());

  const response = await prisma.blog.findMany();

  return c.json({
    blogs: response,
    msg: 'Successfullly Retrieved the Blogs in Bulk',
  });
});

blogRouter.get('/:id', async (c: Context) => {
  const prisma = new PrismaClient({
    datasources: {
      db: { url: c.env.DATABASE_URL },
    },
  }).$extends(withAccelerate());

  const blogId = c.req.param('id');
  const blog = await prisma.blog.findUnique({
    where: { id: blogId },
  });

  return c.json({
    blog: blog,
    msg: 'Successfullly Retrieved the blog with id',
  });
});

blogRouter.post('/', async (c: Context) => {
  try {
    const prisma = new PrismaClient({
      datasources: { db: { url: c.env.DATABASE_URL } },
    }).$extends(withAccelerate());

    const body = await c.req.json();

    // Correctly extract the userId
    const userId = c.get('userId');
    console.log();
    if (!userId) {
      throw new Error('User ID is missing from the context');
    }

    // Optionally, verify that the User exists

    const blogDetails = await prisma.blog.create({
      data: {
        author: { connect: { id: userId['userId']['id'] } }, // Connect using the raw id
        title: body.title,
        content: body.content,
      },
    });

    console.log(body);

    return c.json(
      {
        bdDetails: blogDetails,
        msg: 'Successfully Published Blog',
      },
      200
    );
  } catch (e: any) {
    return c.json(
      {
        error: e.message,
        msg: 'Error Publishing the Blog',
      },
      404
    );
  }
});

blogRouter.put('/', async (c: Context) => {
  const prisma = new PrismaClient({
    datasources: { db: { url: c.env.DATABASE_URL } },
  }).$extends(withAccelerate());

  const body = await c.req.json();

  const updatedBlog = await prisma.blog.update({
    where: { id: body.id },
    data: {
      title: body.title,
      content: body.content,
    },
  });

  return c.json({
    blog: updatedBlog,
    msg: 'Successfullly Edited Blog',
  });
});

export default blogRouter;
