INSERT INTO users (username, email, password)
VALUES ('user1', 'user1@email.com', '$2b$04$cDH97oSh5QxH4FHf7dxtc.BqWmQeFPYH3.kkUInoHUIZ.rj5r7/ou'),
       ('user2', 'user2@email.com', '$2b$04$cDH97oSh5QxH4FHf7dxtc.BqWmQeFPYH3.kkUInoHUIZ.rj5r7/ou'),
       ('user3', 'user3@email.com', '$2b$04$cDH97oSh5QxH4FHf7dxtc.BqWmQeFPYH3.kkUInoHUIZ.rj5r7/ou'),
       ('user4', 'user4@email.com', '$2b$04$cDH97oSh5QxH4FHf7dxtc.BqWmQeFPYH3.kkUInoHUIZ.rj5r7/ou');

INSERT INTO matches (username_1, username_2, winner)
VALUES ('user1', 'user2', 'user2'),
       ('user2', 'user3', 'user3'),
       ('user3', 'user4', 'user3'),
       ('user4', 'user1', 'user1'),
       ('user1', 'user3', 'user1'),
       ('user2', 'user4', 'user4'),
       ('user3', 'user1', 'user1'),
       ('user2', 'user3', 'user2');