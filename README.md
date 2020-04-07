MADEMAKER

Aplicacion web para el diseño , fabricacion e instalacion DE


///////////////////////////////////////////////////////////////////////
INSTALACION PARA DESARROLLO 

PROGRAMAS : 

NODEJS: https://nodejs.org/en/ (DESCARGAR la version --lastest features)
VISUALSTUDIO CODE: https://code.visualstudio.com/
MONGODB: https://www.mongodb.com/download-center/community 
GITHUB ESCRITORIO : https://desktop.github.com/


///////////////////////////////////////////////////////////////////////
CONFIGURACIONES

MONGODB ( Modificar las variable de entorno)  --para que funcione en todo el compu

PASOS:

C:\Program Files\MongoDB\Server\4.2\bin (SHIFT CLIK DERECHO y seleccionar (abrir la ventana de powerShell aqui) )

IR
este quipo - propiedades - configuracion avanzada - variables de entorno  (dobleclicka path) nueva y pegar C:\Program Files\MongoDB\Server\4.2\bin

(CREAR UNA CARPETA EN C LLAMADA data Y DENTRO DE LA CARPETA UNA CARPETA LLAMADA DB)

VER SI SI QUEDO EN EL PATH
Abrir cmd y digitar
mongod --version  

///////////////////////////////////////////////////////////////////////
INICIAR APLICACION

Clonar el repositorio desde github y configurarlo en github escritorio y (crear una reama (branch))

EN VISUAL STUDIO CODE  (ABRIR 2 CONSOLAS UNA PARA MONGO Y OTRA PARA NODE JS )
1 TERMINAL
mongod -- inicializar base de datos 

2 TERMINAL 

npm run dev 

finalmente es servicio correra en http://localhost:4000/ 

