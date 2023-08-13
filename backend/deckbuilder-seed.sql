INSERT INTO users (username, email, password)
VALUES ('user1', 'user1@email.com', '$2b$14$12Lj0P1.6DVPY4AVPGMpcewReK1G2cGtMADtB8KrHeGCcmoOU5DMa'),
       ('user2', 'user2@email.com', '$2b$14$12Lj0P1.6DVPY4AVPGMpcewReK1G2cGtMADtB8KrHeGCcmoOU5DMa'),
       ('user3', 'user3@email.com', '$2b$14$12Lj0P1.6DVPY4AVPGMpcewReK1G2cGtMADtB8KrHeGCcmoOU5DMa'),
       ('user4', 'user4@email.com', '$2b$14$12Lj0P1.6DVPY4AVPGMpcewReK1G2cGtMADtB8KrHeGCcmoOU5DMa');

INSERT INTO matches (username_1, username_2, winner)
VALUES ('user1', 'user2', 'user2'),
       ('user2', 'user3', 'user3'),
       ('user3', 'user4', 'user3'),
       ('user4', 'user1', 'user1'),
       ('user1', 'user3', 'user1'),
       ('user2', 'user4', 'user4'),
       ('user3', 'user1', 'user1'),
       ('user2', 'user3', 'user2');