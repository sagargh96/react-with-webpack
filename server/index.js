import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';

const ROOT_PATH = path.resolve(__dirname);
const PUBLIC_PATH = path.join(ROOT_PATH, '/public');
console.log('Running on localhost: ' + ROOT_PATH);
let app = express();
// set the view engine to ejs
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
/*app.use('/static/script', express.static(path.join(ROOT_PATH, '/static/script')));
app.use('/static/css', express.static(path.join(ROOT_PATH, '/static/css')));
app.use('/static/fonts', express.static(path.join(ROOT_PATH, '/static/fonts')));
app.use('/static/images', express.static(path.join(ROOT_PATH, '/static/images')));*/

app.use('/static', express.static(path.join(ROOT_PATH, '/static'), {
	cacheControl: 'public',
	maxAge: 86400000
}));

app.set('views', path.join(__dirname, 'views'));

app.post("/order-confirmation", (req, res) => {
    const paymentData = {};
    for (const name in req.body) {
        paymentData[name] = req.body[name]
    } 
    res.render("orderConfirmationView.ejs", {resultData: "true", requestData: paymentData});
});

app.get('/*', (req, res) => {
	console.log('Running on localhost: ' + ROOT_PATH);
    res.sendFile(path.join(ROOT_PATH, '/index.html'));
});

const port = process.env.PORT || 3001;
app.listen(port, () => console.log('Running on localhost: ' + port));