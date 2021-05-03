import express from 'express';
import morgan from 'morgan';
import { adminPanel } from './routes/adminPanel';
import { router as catRouter } from './routes/categoryRoutes';
import { router as indexRoutes} from './routes/indexRoutes';
import exphbs from 'express-handlebars';
import path from 'path';

const bodyParser = require('body-parser');
// Initializations
export const app = express();

// Settings
app.set('port', process.env.PORT || 8080);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
    defaultLayout: "main",
    layoutsDir: path.join(app.get("views"), "layouts"),
    partialsDir: path.join(app.get("views"), "partials"),
    extname: ".hbs"
}));

app.set('view engine', '.hbs')

// Midlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

// Routes
app.use('/category', catRouter);
app.use('/product', indexRoutes);
app.use('/', adminPanel);