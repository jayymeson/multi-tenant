import express, { Request, Response } from 'express';
import { faker } from '@faker-js/faker';
import User from './models/User';
import sequelize from './database';

const app = express();
app.use(express.json());
const port = 3000;

// Function to ensure schemas exist
async function ensureSchemaExists(schemaName: any) {
    await sequelize.createSchema(schemaName, { logging: false }).catch(err => console.log(`Schema ${schemaName} já existe ou não pode ser criado.`));
}

// Ensures the existence of schemas before starting the server
async function initialize() {
    await ensureSchemaExists('user_1');
    await ensureSchemaExists('user_2');

    // Start the server after checking the schemas
    app.listen(port, () => {
        console.log(`servidor rodando em http://localhost:${port}`);
    });
}

app.get('/users', async (req, res) => {
    const { schema } = req.query;
    if (!schema || (schema !== 'user_1' && schema !== 'user_2')) {
        return res.status(400).send('Schema inválido ou não fornecido.');
    }

    try {
        // Selecting the schema dynamically
        const userModel = User.schema(schema);

        // Fetching all users in the specified schema
        const users = await userModel.findAll();

        res.json(users);
    } catch (error) {
        console.error('Erro ao buscar usuários:', error);
        res.status(500).send('Erro ao buscar usuários');
    }
});



app.post('/create-user', async (req, res) => {
    const { schema, name, email } = req.body;
    if (!schema || (schema !== 'user_1' && schema !== 'user_2')) {
        return res.status(400).send('Schema inválido ou não fornecido.');
    }

    try {
        // Selecting the schema dynamically
        const userModel = User.schema(schema);

        // Trying to create a user with the provided data
        const userFake = await userModel.create({ name, email });

        res.json(userFake);
    } catch (error) {
        console.error('Erro ao criar usuário:', error);
        res.status(500).send('Erro ao criar usuário');
    }
});


app.post('/create-user', async (req, res) => {
    const { schema, name, email } = req.body;
    if (!schema || (schema !== 'user_1' && schema !== 'user_2')) {
        return res.status(400).send('Schema inválido ou não fornecido.');
    }
    

    try {
        // Selecting the schema dynamically
        const userModel = User.schema(schema);

        // Synchronize the `User` model with the database for the current schema
        // This will create the table if it doesn't exist
        await userModel.sync();

       // Creating a fake user
        const userFake = await userModel.create({
            name: faker.person.firstName(),
            email: faker.internet.email(),
        });

        res.json(userFake);
    } catch (error) {
        console.error('Erro ao criar usuário:', error);
        res.status(500).send('Erro ao criar usuário');
    }
});



initialize();
