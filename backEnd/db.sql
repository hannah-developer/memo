DROP TABLE IF EXISTS `memo`; ## 테스트를 몇번할 지 모르니 중복의 경우 삭제
CREATE TABLE `memo` (
  `id` int NOT NULL AUTO_INCREMENT,
  `color` varchar(20) NOT NULL,
  `pageX` smallint NOT NULL,
  `pageY` smallint NOT NULL,
  `text` text,
  `userID` smallint DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci


INSERT INTO memo (id, color, pageX, pageY, text, userID) VALUES ##insert문은 한번만!
(6, 'blue', 573, 337, '234234324', 7),
(11, 'lightpink', 234, 11, 'sdfdfsdfsdf', 44),
(12, 'brightred', 220, 430, 'asdasdads', 22),
(49, 'lightblue', -3, 385, null, null);


DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `userID` smallint NOT NULL,
  `username` varchar(15) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`userID`),
  UNIQUE KEY `user_username_uindex` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci

INSERT INTO user (userID, username, password) VALUES
(0, 'aaa', '111'),
(1, 'bbb', '222'),
(2, 'ccc', '333');