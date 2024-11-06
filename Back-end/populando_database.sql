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

