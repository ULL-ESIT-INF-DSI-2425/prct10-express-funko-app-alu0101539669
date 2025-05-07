import express from 'express';
import './db.js';
import { Song } from './songs.js';
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
// Crear una canción
app.post('/songs', (req, res) => {
    const song = new Song(req.body);
    song.save().then((song) => {
        res.status(201).send(song);
    }).catch((error) => {
        res.status(400).send(error);
    });
});
// Obtener las canciones
app.get('/songs', (req, res) => {
    Song.find().then((songs) => {
        res.send(songs);
    }).catch((error) => {
        res.send(error);
    });
});
//Obtener una canción concreta de la base de datos según su nombre y/o autor.
app.get('/songs/search', (req, res) => {
    const filter = req.query.title ? { title: req.query.title.toString() } : {};
    Song.find(filter).then((songs) => {
        if (songs.length !== 0) {
            res.send(songs);
        }
        else {
            res.status(404).send();
        }
    }).catch(() => {
        res.status(500).send();
    });
});
//Actualizar una canción concreta de la base de datos según el ID asignado por MongoDB.
app.patch('/songs/:id', (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['title', 'artist', 'album', 'genre', 'duration'];
    Song.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        .then((song) => {
        if (!song) {
            return res.status(404).send();
        }
        res.send(song);
    })
        .catch((error) => {
        res.status(400).send(error);
    });
});
app.delete('/songs/:id', (req, res) => {
    Song.findByIdAndDelete(req.params.id).then((songs) => {
        if (!songs) {
            res.status(404).send();
        }
        else {
            res.send(songs);
        }
    }).catch(() => {
        res.status(500).send();
    });
});
app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});
