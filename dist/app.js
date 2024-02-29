"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const faker_1 = require("@faker-js/faker");
const User_1 = __importDefault(require("./models/User"));
const database_1 = __importDefault(require("./database"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
const port = 3000;
// Função para garantir que os schemas existam
function ensureSchemaExists(schemaName) {
    return __awaiter(this, void 0, void 0, function* () {
        yield database_1.default.createSchema(schemaName, { logging: false }).catch(err => console.log(`Schema ${schemaName} já existe ou não pode ser criado.`));
    });
}
// Garante a existência dos schemas antes de iniciar o servidor
function initialize() {
    return __awaiter(this, void 0, void 0, function* () {
        yield ensureSchemaExists('user_1');
        yield ensureSchemaExists('user_2');
        // Inicia o servidor após a verificação dos schemas
        app.listen(port, () => {
            console.log(`servidor rodando em http://localhost:${port}`);
        });
    });
}
app.get('/users', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { schema } = req.query;
    if (!schema || (schema !== 'user_1' && schema !== 'user_2')) {
        return res.status(400).send('Schema inválido ou não fornecido.');
    }
    try {
        // Selecionando o schema dinamicamente
        const userModel = User_1.default.schema(schema);
        // Buscando todos os usuários no schema especificado
        const users = yield userModel.findAll();
        res.json(users);
    }
    catch (error) {
        console.error('Erro ao buscar usuários:', error);
        res.status(500).send('Erro ao buscar usuários');
    }
}));
app.post('/create-user', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { schema, name, email } = req.body;
    if (!schema || (schema !== 'user_1' && schema !== 'user_2')) {
        return res.status(400).send('Schema inválido ou não fornecido.');
    }
    try {
        // Selecionando o schema dinamicamente
        const userModel = User_1.default.schema(schema);
        // Tentando criar um usuário com os dados fornecidos
        const userFake = yield userModel.create({ name, email });
        res.json(userFake);
    }
    catch (error) {
        console.error('Erro ao criar usuário:', error);
        res.status(500).send('Erro ao criar usuário');
    }
}));
app.post('/create-user', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { schema, name, email } = req.body;
    if (!schema || (schema !== 'user_1' && schema !== 'user_2')) {
        return res.status(400).send('Schema inválido ou não fornecido.');
    }
    try {
        // Selecionando o schema dinamicamente
        const userModel = User_1.default.schema(schema);
        // Sincroniza o modelo `User` com o banco de dados para o schema atual
        // Isso criará a tabela se ela não existir
        yield userModel.sync();
        // Criando um usuário falso
        const userFake = yield userModel.create({
            name: faker_1.faker.person.firstName(),
            email: faker_1.faker.internet.email(),
        });
        res.json(userFake);
    }
    catch (error) {
        console.error('Erro ao criar usuário:', error);
        res.status(500).send('Erro ao criar usuário');
    }
}));
initialize();
