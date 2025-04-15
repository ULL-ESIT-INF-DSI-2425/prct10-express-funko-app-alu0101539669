import express from 'express';
import { addFunko, deleteFunko, getFunko, listFunkos, updateFunko } from './manager.js';
const app = express();
app.use(express.json());
const port = 3000;
app.post('/funkos', async (req, res) => {
    const user = req.query.user;
    const funko = req.body;
    const response = await addFunko(user, funko);
    res.json(response);
});
app.patch('/funkos', async (req, res) => {
    const user = req.query.user;
    const funko = req.body;
    const response = await updateFunko(user, funko);
    res.json(response);
});
app.delete('/funkos', async (req, res) => {
    const user = req.query.user;
    const id = Number(req.query.id);
    const response = await deleteFunko(user, id);
    res.json(response);
});
app.get('/funkos', async (req, res) => {
    const user = req.query.user;
    if (req.query.id) {
        const id = Number(req.query.id);
        const response = await getFunko(user, id);
        res.json(response);
    }
    else {
        const response = await listFunkos(user);
        res.json(response);
    }
});
app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});
