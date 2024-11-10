import swaggerJSDoc from 'swagger-jsdoc'
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Express API with Swagger',
            version: '1.0.0',
            description: 'Documentation for Express API',
        },
    },
    apis: ['./routes/*.js'], // Ścieżki do plików zawierających komentarze JSDoc
};

export const swaggerSpec = swaggerJSDoc(options);


