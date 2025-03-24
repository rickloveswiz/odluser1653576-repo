import express from 'express';
import path from 'path';
import consolidate from 'consolidate';
import fs from 'fs';
import { fileURLToPath } from 'url';

// Define __filename and __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.engine('mustache', consolidate.mustache);
app.set('view engine', 'mustache');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    const filePath = path.join(__dirname, 'data', 'cars.json');
    
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading the cars.json file:', err);
            res.status(500).send('Error reading the inventory data');
            return;
        }

        const cars = JSON.parse(data);
        res.render('inventory', { cars });
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
