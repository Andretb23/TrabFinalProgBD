-- 1. Tabela de Usuário
CREATE TABLE usuario (
    id_usuario SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    login VARCHAR(50) NOT NULL UNIQUE, --alterado
    senha VARCHAR(50) NOT NULL,
    tipo_usuario INT NOT NULL,
    ativo BOOLEAN NOT NULL DEFAULT TRUE
);

-- 2. Tabela de Tipo de Usuário
CREATE TABLE tipo_usuario (
    id_tipo_usuario SERIAL PRIMARY KEY,
    tipo VARCHAR(20) NOT NULL
);

-- 3. Tabela de Item do Cardápio
CREATE TABLE item_cardapio (
    id_item_cardapio SERIAL PRIMARY KEY,
    descricao_item VARCHAR(255),
    nome_item VARCHAR(100) NOT NULL UNIQUE, --alterado
    tipo_item INT NOT NULL,
    preco NUMERIC(10, 2) NOT NULL
);

-- 4. Tabela de Cardápio
CREATE TABLE cardapio (
    id_cardapio SERIAL PRIMARY KEY,
    descricao_cardapio VARCHAR(255) NOT NULL UNIQUE, --alterado
    ativo BOOLEAN NOT NULL DEFAULT TRUE
);

-- 5. Tabela de Relacionamento entre Item e Cardápio
CREATE TABLE item_cardapio_cardapio (
    id_item_cardapio_card SERIAL PRIMARY KEY,
    id_cardapio INT NOT NULL,
    id_item_cardapio INT NOT NULL,
    FOREIGN KEY (id_cardapio) REFERENCES cardapio (id_cardapio),
    FOREIGN KEY (id_item_cardapio) REFERENCES item_cardapio (id_item_cardapio)
);

-- 6. Tabela de Tipo de Item do Cardápio
CREATE TABLE tipo_item_cardapio (
    id_tipo_item_card SERIAL PRIMARY KEY,
    tipo VARCHAR(20) NOT NULL 
);

-- 7. Tabela de Comanda
CREATE TABLE comanda (
    id_comanda SERIAL PRIMARY KEY,
    nome_cliente VARCHAR(100) NOT NULL,
    data_abertura TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    data_fechamento TIMESTAMP,
    status BOOLEAN NOT NULL DEFAULT TRUE
);

-- 8. Tabela de Itens da Comanda
CREATE TABLE item_comanda (
    id_item_comanda SERIAL PRIMARY KEY,
    id_comanda INT NOT NULL,
    item_comanda_cardapio INT NOT NULL,
    FOREIGN KEY (id_comanda) REFERENCES comanda (id_comanda),
    FOREIGN KEY (item_comanda_cardapio) REFERENCES item_cardapio_cardapio (id_item_cardapio_card)
);


-- 9. Tabela de Ordem de Produção
CREATE TABLE ordem_producao (
    id_ordem_producao SERIAL PRIMARY KEY,
    data_pedido TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    id_item_comanda INT,
    status_producao INT NOT NULL,
    FOREIGN KEY (id_item_comanda) REFERENCES item_comanda (id_item_comanda) 
);


--Alteração
ALTER TABLE comanda
ADD COLUMN total NUMERIC(10, 2);
