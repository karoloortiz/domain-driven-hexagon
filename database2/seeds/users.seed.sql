TRUNCATE users;
INSERT INTO users
  (
    id,
    created_at,
    updated_at,
    email,
    country,
    postal_code,
    street,
    role
  )
VALUES
  (
    '1',
    now(),
    now(),
    'john@gmail.com',
    'England',
    '24312',
    'Road Avenue',
    'guest'
  );