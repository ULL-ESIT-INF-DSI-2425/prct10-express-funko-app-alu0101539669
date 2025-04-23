// Implemente una función findSpell:
// La función debe recibir tres argumentos opcionales: un nombre de hechizo, un tipo de hechizo y 
// la manera de invocar el hechizo (son los campos de la query string de la ruta /Spells).
// La función debe devolver una promesa, que se resolverá siempre y cuando la petición HTTP 
// realizada a la ruta /Spells haya devuelto, al menos, la información de un hechizo. 
// La promesa se rechazará cuando surja cualquier tipo de error durante la petición HTTP 
// o en el caso de que no se obtenga información para los hechizos.

import request from "request";

export function findSpell(name: string = "" , type: string = "", incantation: string= ""): Promise<request.Response> {
  const url = `https://wizard-world-api.herokuapp.com/Spells?Name=${name}&Type=${type}&Incantation=${incantation}`;
  return new Promise<request.Response>((resolve, reject) => {
    request(
      { url: url, json: true}, 
      (error: Error, response: request.Response, body) => {
        if (error) {
          return reject(new Error("Error during the HTTP request: " + error.message));
        } 
        if (!body || body.length === 0) {
          return reject(new Error("No spell information found."));
        }
        else {
          return resolve(body);
        }
      },
    );
  });
};

// findSpell("Opening Charm", "Charm", "Aberto") 
//   .then((result) => {
//     console.log("Success:", result);
//   })
//   .catch((error) => {
//     console.log("Error:", error);
//   });

// findSpell("Opening Charm", "Charm", "") 
//   .then((result) => {
//     console.log("Success:", result);
//   })
//   .catch((error) => {
//     console.log("Error:", error);
//   });

//   findSpell("Opening Charm", "Charm", "DSI") 
//   .then((result) => {
//     console.log("Success:", result);
//   })
//   .catch((error) => {
//     console.log("Error:", error);
//   });