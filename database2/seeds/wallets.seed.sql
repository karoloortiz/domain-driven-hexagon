TRUNCATE wallets;
INSERT INTO
  wallets (id, created_at, updated_at, balance, user_id)
VALUES
  (
    '1',
    now(),
    now(),
    0,
    '1'
  );