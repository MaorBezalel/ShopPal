import express from 'express';
import 'reflect-metadata';

// Simple ExpressJS Server For Testing
const app = express();
const PORT = 3000;

app.use(express.json());

//  !!!!!!!! npm run start:dev !!!!!!!!
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
