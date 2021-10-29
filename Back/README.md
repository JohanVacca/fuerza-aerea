# fuac-backend

Requisitos Backend
• Conocimientos en Node JS
• Conocimiento en MongoDB
• Conocimiento en Express
• Conocimiento en REST API
• NodeJS 14.17.0
• MongoDB
Versión de Backend construida sobre NodeJS usando versión 14.17.0 y base de datos MongoDB
Esta versión de Backend es usadas librerías como
• express
• mongoose
y sus peticiones están protegidas con un token bajo la librería jwt.middleware

Para iniciar el proyecto se deben instalar los paquetes necesarios en el package.json "npm install"

Para su despliegue en producción se requiere modificar la cadena de conexión en el archivo app.js "localConnection” una vez inicie la APP se creará la BD según posterior a esta modificación se procede a arrancar el servidor con el comando "npm run start"

inicialmente se requiere crear los roles en la Base de datos
db.getCollection('roles').insertMany([ {name: 'Administrador', description: '' }, {name: 'Investigador', description: '' }, {name: 'Evaluador', description: '' }, {name: 'Estrategico', description: '' }, {name: 'Operacional1', description: '' }, {name: 'Operacional2', description: '' }, ]);

Luego se debe tomar el id del administrador para crear un usuario con el rol de “Administrador” con el Endpoint: http: //Urlservidor/api /auth /register
Data:
En donde la informacion se encierra con ${} debe colocar la informacion correspondiente sin alterar el JSON
{“email": "${correo}", "password": "${password}", "profile" : { "names": "{Nombre}", "surname": "${Admin}" }, "role": "${idRole}", "isActive": true}
De la misma manera puede crea los demás roles cambiando el idRole
Una vez creado el administrador puede ingresar al Frontend con las credenciales

JavaScript
91.4%
HTML
8.6%
