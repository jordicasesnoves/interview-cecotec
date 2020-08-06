# Cecotec Interview

Candidato: Jordi Casesnoves Martin

Postdata: este proyecto es solo una prueba técnica; no está preparado para producción, así que no intentes hacer deploy.

## Guía Rápida

Clonamos el repositorio:

`git clone https://github.com/jordicasesnoves/interview-cecotec.git`

Accedemos a la carpeta del proyecto:

`cd interview-cecotec`


Instalamos los servidores mockup de bbdd de manera global en nuestro equipo:

`npm i -g json-server graphql-faker`

Instalamos las dependencias del proyecto:

`npm i`

Arrancamos los servidores de bbdd:

`json-server --watch api/json/db.json --port 3001`

`graphql-faker --open api/graphql/db.sdl`

Por último, arrancamos el servidor de desarrollo:

`npm start`

## Tecnologías usadas

- React
- Create React App
- React Hooks
- GraphQL
- TailwindCSS
- PostCSS
- JSON
- ...
