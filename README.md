# RestauranteBackEnd

1.- Crear la rama dev
1.1 .- Clonar una copia de nuestro repositorio en local
1.2.- git checkout -b dev


2.- Crear proyecto de node
2.1 npm init

3.- Crear tsconfig.json
3.1 tsc --init

{
  "compilerOptions": {
      "module": "commonjs",
      "moduleResolution": "node",
      "pretty": true,
      "sourceMap": true,
      "target": "es6",
      "outDir": "./dist",
      "baseUrl": "./lib"
  },
  "include": [
      "lib/**/*.ts"
  ],
  "exclude": [
      "node_modules"
  ]
}

4.- Crear el archivo app.ts
4.1 Crear carpeta lib

5.1 Subir cambios con mi nueva rama dev

git add .
git commit -m 'mensaje'
git push origin dev


Instalación de nodemon

sudo npm install nodemon -g