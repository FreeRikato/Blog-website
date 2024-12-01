import { Hono, Context } from 'hono';
import userRouter from './routes/user';
import blogRouter from './routes/blog';
import authMiddleware from './middlewares/authUser';
import { cors } from 'hono/cors';

const app = new Hono();

app.use('/*', cors());

app.get('/', (c: Context) => {
  return c.text('Hello Hono!');
});

app.route('/api/v1/user', userRouter);
app.use('/api/v1/blog/*', authMiddleware);
app.route('/api/v1/blog', blogRouter);

export default app;
