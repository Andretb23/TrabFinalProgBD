-- 1. Inserindo Tipos de Usuário
INSERT INTO tipo_usuario (tipo) VALUES
    ('Administrador'),
    ('Garçom'),
    ('Cozinheiro'),
	('copeiro');

-- 2. Inserindo Usuários
INSERT INTO usuario (nome, login, senha, tipo_usuario, ativo) VALUES
    ('Admin', 'admin', 'admin1', 1, TRUE),
    ('João Garçom', 'jgarcom', 'garcom123', 2, TRUE),
    ('Maria Cozinheira', 'mcozinha', 'cozinha123', 3, TRUE),
	('Jorge Copeiro', 'jcopeiro', 'copa123', 4, TRUE);

-- 3. Inserindo Tipos de Item do Cardápio (Sem 'Sobremesa')
INSERT INTO tipo_item_cardapio (tipo) VALUES
    ('Bebida'),
    ('Comida');

-- 4. Inserindo Itens no Cardápio (Sem 'Sobremesa')
INSERT INTO item_cardapio (descricao_item, nome_item, tipo_item, preco) VALUES
    ('Refrigerante Coca-Cola em lata de 350ml, servido gelado.', 'Coca-Cola', 1, 5.00),
    ('Filé mignon grelhado com molho madeira, acompanhado de arroz branco e batatas fritas.', 'Filé Mignon ao Molho Madeira', 2, 30.00),
    ('Frango à parmegiana empanado e coberto com molho de tomate e queijo derretido, acompanhado de purê de batatas e arroz branco.', 'Frango à Parmegiana', 2, 25.00),
    ('Suco natural de laranja, servido em copo de 300ml, feito com frutas frescas e sem adição de açúcar.', 'Suco de Laranja', 1, 6.00),
    ('Lasanha de carne com molho bechamel, molho de tomate, carne moída e queijo gratinado.', 'Lasanha de Carne', 2, 28.00),
    ('Cerveja Pilsen em garrafa de 600ml, ideal para compartilhar e servir gelada.', 'Cerveja Pilsen', 1, 8.00);

-- 5. Inserindo Cardápio
INSERT INTO cardapio (descricao_cardapio, ativo) VALUES
    ('Cardápio Principal', TRUE);

-- 6. Relacionando Itens ao Cardápio (Sem 'Sobremesa')
INSERT INTO item_cardapio_cardapio (id_cardapio, id_item_cardapio) VALUES
    (1, 1),  -- Coca-Cola
    (1, 2),  -- Filé Mignon ao Molho Madeira
    (1, 3),  -- Frango à Parmegiana
    (1, 4),  -- Suco de Laranja
    (1, 5),  -- Lasanha de Carne
    (1, 6);  -- Cerveja Pilsen


-- 7. Inserindo Comandas
INSERT INTO comanda (nome_cliente, status) VALUES
    ('Carlos Silva', TRUE),
    ('Ana Pereira', TRUE);

-- 8. Inserindo Itens na Comanda (Com os novos pratos)
INSERT INTO item_comanda (id_comanda, item_comanda_cardapio) VALUES
    (1, 1),  -- Item Coca-Cola para Carlos Silva
    (1, 2),  -- Item Filé Mignon ao Molho Madeira para Carlos Silva
    (1, 4),  -- Item Suco de Laranja para Carlos Silva
    (2, 3),  -- Item Frango à Parmegiana para Ana Pereira
    (2, 5);  -- Item Lasanha de Carne para Ana Pereira

-- 9. Inserindo Ordem de Produção (Com os novos pratos)
INSERT INTO ordem_producao (data_pedido, id_item_comanda, status_producao) VALUES
    (CURRENT_TIMESTAMP, 1, 1),  -- Coca-Cola na comanda de Carlos Silva
    (CURRENT_TIMESTAMP, 2, 1),  -- Filé Mignon ao Molho Madeira na comanda de Carlos Silva
    (CURRENT_TIMESTAMP, 3, 1),  -- Suco de Laranja na comanda de Carlos Silva
    (CURRENT_TIMESTAMP, 4, 1),  -- Frango à Parmegiana na comanda de Ana Pereira
    (CURRENT_TIMESTAMP, 5, 1);  -- Lasanha de Carne na comanda de Ana Pereira






-- Inserindo mais comandas de exemplo sem o total
INSERT INTO comanda (nome_cliente, data_abertura, data_fechamento, status)
VALUES
    ('Ana Pereira', '2024-12-05 10:00:00', NULL, TRUE),  -- Comanda aberta
    ('Lucas Santos', '2024-12-05 10:30:00', '2024-12-05 11:30:00', FALSE),  -- Comanda fechada
    ('Juliana Costa', '2024-12-05 11:00:00', NULL, TRUE),  -- Comanda aberta
    ('Fernanda Rocha', '2024-12-05 11:30:00', '2024-12-05 12:15:00', FALSE),  -- Comanda fechada
    ('Rafael Martins', '2024-12-05 12:00:00', NULL, TRUE),  -- Comanda aberta
    ('Mariana Lima', '2024-12-05 12:45:00', '2024-12-05 13:45:00', FALSE),  -- Comanda fechada
    ('Paulo Almeida', '2024-12-05 13:00:00', NULL, TRUE),  -- Comanda aberta
    ('Larissa Souza', '2024-12-05 13:15:00', '2024-12-05 14:30:00', FALSE),  -- Comanda fechada
    ('Roberto Lima', '2024-12-05 14:00:00', NULL, TRUE),  -- Comanda aberta
    ('Sofia Martins', '2024-12-05 14:30:00', '2024-12-05 15:00:00', FALSE);  -- Comanda fechada


-- Inserindo mais pratos no cardápio
-- Inserindo mais pratos no cardápio com descrições dentro do limite de caracteres
INSERT INTO item_cardapio (descricao_item, nome_item, tipo_item, preco)
VALUES
    ('Bife de contrafilé grelhado, acompanhado de arroz à piamontese e batatas coradas.', 'Bife de Contrafilé', 2, 32.00),
    ('Filé de peixe grelhado, servido com purê de mandioquinha e legumes salteados.', 'Filé de Peixe Grelhado', 2, 28.00),
    ('Frango grelhado com molho de mostarda e mel, acompanhado de arroz branco e salada verde.', 'Frango Grelhado ao Molho de Mostarda', 2, 22.00),
    ('Strogonoff de carne com creme de leite, servido com arroz branco e batatas palha.', 'Strogonoff de Carne', 2, 30.00),
    ('Peito de frango recheado com queijo e presunto, servido com arroz de brócolis e batatas fritas.', 'Frango Recheado', 2, 27.00),
    ('Arroz de pato com linguiça calabresa, ervilhas e temperos especiais.', 'Arroz de Pato', 2, 32.00),
    ('Costela de porco assada, acompanhada de arroz, feijão tropeiro e farofa.', 'Costela de Porco Assada', 2, 40.00),
    ('Lombo de porco assado com molho agridoce, acompanhado de arroz branco e legumes grelhados.', 'Lombo de Porco Assado', 2, 34.00);

-- Inserindo bebidas no cardápio
INSERT INTO item_cardapio (descricao_item, nome_item, tipo_item, preco)
VALUES
    ('Suco natural de abacaxi com hortelã, servido gelado em copo de 300ml.', 'Suco de Abacaxi com Hortelã', 1, 7.00),
    ('Refrigerante de guaraná em lata de 350ml, refrescante e gelado.', 'Guaraná', 1, 5.50),
    ('Água tônica em garrafa de 300ml, perfeita para acompanhar petiscos.', 'Água Tônica', 1, 6.00),
    ('Cerveja Heineken em garrafa de 600ml, ideal para momentos de descontração.', 'Cerveja Heineken', 1, 12.00),
    ('Cerveja Budweiser em lata de 350ml, leve e refrescante.', 'Cerveja Budweiser', 1, 9.00),
    ('Refrigerante de laranja em lata de 350ml, servido gelado.', 'Refrigerante de Laranja', 1, 5.50),
    ('Suco de morango natural, servido gelado em copo de 300ml.', 'Suco de Morango', 1, 8.00),
    ('Cerveja Corona em garrafa de 355ml, com sabor leve e refrescante.', 'Cerveja Corona', 1, 14.00),
    ('Chá gelado de limão, preparado com chá verde e limão, servido em copo de 300ml.', 'Chá Gelado de Limão', 1, 6.50),
    ('Refrigerante Pepsi em lata de 350ml, com sabor clássico e refrescante.', 'Pepsi', 1, 5.50);


-- Inserindo os itens restantes na tabela de relacionamento com id_cardapio = 1
INSERT INTO item_cardapio_cardapio (id_cardapio, id_item_cardapio)
VALUES
    (1, 7),  -- Bife de Contrafilé
    (1, 8),  -- Filé de Peixe Grelhado
    (1, 9),  -- Frango Grelhado ao Molho de Mostarda
    (1, 10), -- Strogonoff de Carne
    (1, 11), -- Frango Recheado
    (1, 12), -- Arroz de Pato
    (1, 13), -- Costela de Porco Assada
    (1, 14), -- Lombo de Porco Assado
    (1, 15), -- Suco de Abacaxi com Hortelã
    (1, 16), -- Guaraná
    (1, 17), -- Água Tônica
    (1, 18), -- Cerveja Heineken
    (1, 19), -- Cerveja Budweiser
    (1, 20), -- Refrigerante de Laranja
    (1, 21), -- Suco de Morango
    (1, 22), -- Cerveja Corona
    (1, 23), -- Chá Gelado de Limão
    (1, 24); -- Pepsi


-- Inserindo itens nas comandas
INSERT INTO item_comanda (id_comanda, item_comanda_cardapio)
VALUES
    (1, 1),  -- Coca-Cola (id_item_cardapio_card = 1)
    (1, 2),  -- Filé Mignon ao Molho Madeira (id_item_cardapio_card = 2)
    (1, 3),  -- Frango à Parmegiana (id_item_cardapio_card = 3)
    (2, 4),  -- Suco de Laranja (id_item_cardapio_card = 4)
    (2, 5),  -- Lasanha de Carne (id_item_cardapio_card = 5)
    (2, 6),  -- Cerveja Pilsen (id_item_cardapio_card = 6)
    (3, 17), -- Bife de Contrafilé (id_item_cardapio_card = 17)
    (3, 18), -- Filé de Peixe Grelhado (id_item_cardapio_card = 18)
    (3, 19), -- Frango Grelhado ao Molho de Mostarda (id_item_cardapio_card = 19)
    (4, 20), -- Strogonoff de Carne (id_item_cardapio_card = 20)
    (5, 21), -- Frango Recheado (id_item_cardapio_card = 21)
    (5, 22), -- Arroz de Pato (id_item_cardapio_card = 22)
    (6, 23), -- Costela de Porco Assada (id_item_cardapio_card = 23)
    (6, 24); -- Lombo de Porco Assado (id_item_cardapio_card = 24)



