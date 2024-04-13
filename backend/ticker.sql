\echo 'Delete and recreate ticker db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE ticker;
CREATE DATABASE ticker;
\connect ticker

\i ticker-schema.sql
\i ticker-seed.sql

\echo 'Delete and recreate ticker_test db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE ticker_test;
ls
\connect ticker_test

\i ticker-schema.sql
