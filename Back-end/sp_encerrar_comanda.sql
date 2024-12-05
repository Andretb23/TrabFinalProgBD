CREATE OR REPLACE PROCEDURE encerrar_comanda(
    p_comanda_id INT
)
LANGUAGE plpgsql
AS $$
DECLARE
    v_total NUMERIC(10, 2);
BEGIN
    SELECT SUM(ica.preco)
    INTO v_total
    FROM item_comanda ico
    JOIN item_Cardapio_Cardapio icc ON icc.id_item_cardapio_card = ico.item_comanda_Cardapio
    JOIN item_Cardapio ica ON ica.id_item_cardapio = icc.id_item_cardapio
    WHERE ico.id_comanda = p_comanda_id;

    UPDATE comanda
    SET status = FALSE, data_fechamento = CURRENT_TIMESTAMP, total = v_total
    WHERE id_comanda = p_comanda_id;

END;
$$;
