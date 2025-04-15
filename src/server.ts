//SERVIDOR
import net from 'net';
import { RequestType, ResponseType } from './type.js';
import { addFunko, eliminarFunko, listaFunkos, mostrarFunko, modificarFunko } from './funciones.js';

// Crear un servidor que escucha conexiones de clientes
net.createServer((connection) => {
    console.log('A client has connected.');

    // Enviar un mensaje inicial al cliente indicando que la conexión se ha establecido
    connection.write(JSON.stringify({ message: 'Connection established.' }));

    // Manejar los datos recibidos del cliente
    connection.on('data', (data) => {
        const request: RequestType = JSON.parse(data.toString()); // Parsear la solicitud del cliente
        let response: ResponseType;

        // Procesar la solicitud según el tipo
        switch (request.type) {
            case 'add':
                // Agregar un nuevo Funko
                const addSuccess = addFunko(
                    request.funkoPop!.id,
                    request.funkoPop!.usuario,
                    request.funkoPop!.nombre,
                    request.funkoPop!.descripcion,
                    request.funkoPop!.tipo,
                    request.funkoPop!.genero,
                    request.funkoPop!.franquicia,
                    request.funkoPop!.numero,
                    request.funkoPop!.exclusivo,
                    request.funkoPop!.caracteristicasEspeciales,
                    request.funkoPop!.valorMercado
                );
                response = {
                    type: 'add',
                    success: addSuccess,
                    message: addSuccess ? 'Funko added successfully' : 'Failed to add Funko',
                };
                break;

            case 'modify':
                // Modificar un Funko existente
                const modifySuccess = modificarFunko(
                    request.funkoPop!.id,
                    request.funkoPop!.usuario,
                    request.funkoPop!.nombre,
                    request.funkoPop!.descripcion,
                    request.funkoPop!.tipo,
                    request.funkoPop!.genero,
                    request.funkoPop!.franquicia,
                    request.funkoPop!.numero,
                    request.funkoPop!.exclusivo,
                    request.funkoPop!.caracteristicasEspeciales,
                    request.funkoPop!.valorMercado
                );
                response = {
                    type: 'modify',
                    success: modifySuccess,
                    message: modifySuccess ? 'Funko modified successfully' : 'Failed to modify Funko',
                };
                break;

            case 'remove':
                // Eliminar un Funko
                const removeSuccess = eliminarFunko(
                    request.funkoPop!.usuario,
                    request.funkoPop!.id
                );
                response = {
                    type: 'remove',
                    success: removeSuccess,
                    message: removeSuccess ? 'Funko removed successfully' : 'Failed to remove Funko',
                };
                break;

            case 'read':
                // Leer los detalles de un Funko específico
                const funko = mostrarFunko(
                    request.funkoPop!.usuario,
                    request.funkoPop!.id
                );
                response = {
                    type: 'read',
                    success: funko !== null,
                    message: funko !== null ? 'Funko found' : 'Funko not found',
                    funkoPops: funko && typeof funko === 'object' ? [funko] : undefined,
                };
                break;

            case 'list':
                // Listar todos los Funkos de un usuario
                const funkos = listaFunkos(request.funkoPop!.usuario);
                response = {
                    type: 'list',
                    success: Array.isArray(funkos) && funkos.length > 0,
                    message: Array.isArray(funkos) && funkos.length > 0 ? 'Funkos listed successfully' : 'No Funkos found for the user',
                    funkoPops: Array.isArray(funkos) ? funkos : undefined,
                };
                break;

            default:
                // Manejar solicitudes no válidas
                response = {
                    type: 'error',
                    success: false,
                    message: 'Invalid request type',
                };
                break;
        }

        // Enviar la respuesta al cliente y cerrar la conexión
        connection.write(JSON.stringify(response)); // Enviar respuesta al cliente
        connection.end(); // Cerrar la conexión
    });

    // Manejar errores en la conexión
    connection.on('error', (err) => {
        if ((err as NodeJS.ErrnoException).code === 'ECONNRESET') {
            console.error('Client disconnected abruptly:', err.message);
        } else {
            console.error('Error:', err);
        }
    });

    // Manejar el cierre de la conexión por parte del cliente
    connection.on('end', () => {
        console.log('Client disconnected.');
    });

    connection.on('close', () => {
        console.log('Client disconnected.');
    });

    // Manejar el tiempo de espera de la conexión
    connection.on('timeout', () => {
        console.log('Connection timed out.');
        connection.end();
    });

}).listen(60300, () => {
    // Mensaje indicando que el servidor está esperando conexiones
    console.log('Waiting for clients to connect.');
});