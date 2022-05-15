import './config';
import App from './app';
import UsersRouter from './routes/users';
import PostsRouter from './routes/posts';
import ReactionsRouter from './routes/reactions';

export const app = new App([
    new UsersRouter(),
    new PostsRouter(),
    new ReactionsRouter()
]);

app.listen();