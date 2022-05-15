import './config';
import App from './app';
import UsersRouter from './routes/users';
import PostsRouter from './routes/posts';

export const app = new App([
    new UsersRouter(),
    new PostsRouter()
]);

app.listen();