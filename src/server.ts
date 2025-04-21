import express from 'express';
import { addFunko, deleteFunko, getFunko, listFunkos, updateFunko } from './manager.js';
import { FunkoPop } from './types.js';

const app = express();
app.use(express.json());
const port = 3000;

//Añadir un nuevo Funko
app.post('/funkos', async (req, res) => {
  const user = req.query.user as string;
  const funko = req.body as FunkoPop;
  const response = await addFunko(user, funko);
  res.json(response);
});

//Actualizar un Funko existente
app.patch('/funkos', async (req, res) => {
  const user = req.query.user as string;
  const funko = req.body as FunkoPop;
  const response = await updateFunko(user, funko);
  res.json(response);
});

//Eliminar un Funko existente
app.delete('/funkos', async (req, res) => {
  const user = req.query.user as string;
  const id = Number(req.query.id);
  const response = await deleteFunko(user, id);
  res.json(response);
});

//Listar todos los Funkos de un usuario
app.get('/funkos', async (req, res) => {
  const user = req.query.user as string;
  if (req.query.id) {
    const id = Number(req.query.id);
    const response = await getFunko(user, id);
    res.json(response);
  } else {
    const response = await listFunkos(user);
    res.json(response);
  }
});


app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});

export default app;