import express, { Request, Response } from 'express';
import { faker } from '@faker-js/faker';
import User from './models/User';
import sequelize from './database';

const app = express();
app.use(express.json());
const port = 3000;

// Função para garantir que os schemas existam
async function ensureSchemaExists(schemaName: any) {
    await sequelize.createSchema(schemaName, { logging: false }).catch(err => console.log(`Schema ${schemaName} já existe ou não pode ser criado.`));
}

// Garante a existência dos schemas antes de iniciar o servidor
async function initialize() {
    await ensureSchemaExists('user_1');
    await ensureSchemaExists('user_2');

    // Inicia o servidor após a verificação dos schemas
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
        // Selecionando o schema dinamicamente
        const userModel = User.schema(schema);

        // Buscando todos os usuários no schema especificado
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
        // Selecionando o schema dinamicamente
        const userModel = User.schema(schema);

        // Tentando criar um usuário com os dados fornecidos
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
        // Selecionando o schema dinamicamente
        const userModel = User.schema(schema);

        // Sincroniza o modelo `User` com o banco de dados para o schema atual
        // Isso criará a tabela se ela não existir
        await userModel.sync();

        // Criando um usuário falso
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