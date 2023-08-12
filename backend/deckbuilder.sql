\echo 'Delete and recreate deckbuilder db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE deckbuilder;
CREATE DATABASE deckbuilder;
\connect deckbuilder;

\i deckbuilder-schema.sql
\i deckbuilder-seed.sql

\echo 'Delete and recreate deckbuilder_test db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE deckbuilder_test;
CREATE DATABASE deckbuilder_test;
\connect deckbuilder_test

\i deckbuilder-schema.sql
\i deckbuilder-test-seed.sql
