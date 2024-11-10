-- Adminer 4.8.1 MySQL 8.3.0 dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

SET NAMES utf8mb4;

DROP DATABASE IF EXISTS `forum_db`;
CREATE DATABASE `forum_db` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `forum_db`;

DELIMITER ;;

CREATE DEFINER=`root`@`localhost` FUNCTION `calculate_average_comment_length`() RETURNS decimal(10,2)
    READS SQL DATA
BEGIN
    DECLARE avgLength DECIMAL(10,2);
    SELECT AVG(LENGTH(content)) INTO avgLength FROM comments;
    RETURN avgLength;
END;;

CREATE DEFINER=`root`@`localhost` FUNCTION `calculate_average_post_length`() RETURNS decimal(10,2)
    READS SQL DATA
BEGIN
    DECLARE avgLength DECIMAL(10,2);
    SELECT AVG(LENGTH(content)) INTO avgLength FROM posts;
    RETURN avgLength;
END;;

CREATE DEFINER=`root`@`localhost` FUNCTION `count_all_comments`() RETURNS int
    READS SQL DATA
BEGIN
    DECLARE commentCount INT;
    SELECT COUNT(*) INTO commentCount FROM comments;
    RETURN commentCount;
END;;

CREATE DEFINER=`root`@`localhost` FUNCTION `count_all_posts`() RETURNS int
    READS SQL DATA
BEGIN
    DECLARE postCount INT;
    SELECT COUNT(*) INTO postCount FROM posts;
    RETURN postCount;
END;;

CREATE DEFINER=`root`@`localhost` FUNCTION `count_post_comments`(postId INT) RETURNS int
    READS SQL DATA
BEGIN
    DECLARE commentCount INT;
    SELECT COUNT(*) INTO commentCount FROM comments WHERE post_id = postId;
    RETURN commentCount;
END;;

CREATE DEFINER=`root`@`localhost` FUNCTION `count_user_comments`(userId INT) RETURNS int
    READS SQL DATA
BEGIN
    DECLARE commentCount INT;
    SELECT COUNT(*) INTO commentCount FROM comments WHERE user_id = userId;
    RETURN commentCount;
END;;

CREATE DEFINER=`root`@`localhost` FUNCTION `count_user_posts`(userId INT) RETURNS int
    READS SQL DATA
BEGIN
    DECLARE postCount INT;
    SELECT COUNT(*) INTO postCount FROM posts WHERE user_id = userId;
    RETURN postCount;
END;;

CREATE DEFINER=`root`@`localhost` FUNCTION `get_post_category`(postId INT) RETURNS varchar(255) CHARSET utf8mb4
    READS SQL DATA
BEGIN
    DECLARE category VARCHAR(255);
    SELECT categories.name INTO category
    FROM categories
    JOIN posts ON posts.category_id = categories.id
    WHERE posts.id = postId;
    RETURN category;
END;;

CREATE DEFINER=`root`@`localhost` PROCEDURE `add_comment_with_transaction`(
    IN postId INT,
    IN userId INT,
    IN commentContent TEXT
)
BEGIN
    DECLARE commentId INT;

    -- Start transaction
    START TRANSACTION;

    -- Insert comment
    INSERT INTO comments (post_id, user_id, content) VALUES (postId, userId, commentContent);
    SET commentId = LAST_INSERT_ID();

    -- Commit transaction
    COMMIT;
END;;

CREATE DEFINER=`root`@`localhost` PROCEDURE `add_post_with_transaction`(IN `userId` int, IN `postTitle` varchar(255), IN `postContent` text, IN `postCategory_id` int)
BEGIN
    DECLARE postId INT;
    START TRANSACTION;
    INSERT INTO posts (user_id, title, content,category_id) VALUES (userId, postTitle, postContent,postCategory_id);
    SET postId = LAST_INSERT_ID();
    COMMIT;
END;;

CREATE DEFINER=`root`@`localhost` PROCEDURE `delete_post_and_related_comments`(
    IN postId INT
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        -- Rollback the transaction in case of error
        ROLLBACK;
        SELECT 'Error occurred, transaction rolled back.' AS ErrorMessage;
    END;
    
    START TRANSACTION;

    -- Attempt to delete comments associated with the post
    DELETE FROM comments WHERE post_id = postId;
    SELECT ROW_COUNT() AS DeletedComments;
    
    -- Attempt to delete the post
    DELETE FROM posts WHERE id = postId;
    SELECT ROW_COUNT() AS DeletedPosts;
    
    COMMIT;
    
    -- Confirm successful completion
    SELECT 'Transaction committed successfully.' AS SuccessMessage;
END;;

CREATE DEFINER=`root`@`localhost` PROCEDURE `delete_user_and_related_data`(
    IN userId INT
)
BEGIN
    DECLARE exitError BOOLEAN DEFAULT 0; -- Flag to indicate error

    -- Error handler for SQLSTATE '45000' (unhandled exception)
    DECLARE CONTINUE HANDLER FOR SQLSTATE '45000'
    BEGIN
        ROLLBACK;
        SET exitError = 1;
        SELECT 'Error: Unhandled exception occurred.' AS ErrorMessage;
    END;

    START TRANSACTION;

    -- Step 1: Delete comments made by the user
    DELETE FROM comments WHERE user_id = userId;
    IF ROW_COUNT() > 0 THEN
        SELECT CONCAT('Deleted ', ROW_COUNT(), ' comments.') AS InfoMessage;
    END IF;

    -- Step 2: Delete posts made by the user
    DELETE FROM posts WHERE user_id = userId;
    IF ROW_COUNT() > 0 THEN
        SELECT CONCAT('Deleted ', ROW_COUNT(), ' posts.') AS InfoMessage;
    END IF;

    -- Step 3: Delete the user
    DELETE FROM users WHERE id = userId;
    IF ROW_COUNT() > 0 THEN
        SELECT CONCAT('Deleted the user with ID ', userId, '.') AS InfoMessage;
    END IF;

    -- Commit or rollback based on error flag
    IF exitError THEN
        ROLLBACK;
    ELSE
        COMMIT;
        SELECT 'Transaction committed successfully.' AS SuccessMessage;
    END IF;
END;;

CREATE DEFINER=`root`@`localhost` PROCEDURE `GetCommentsForPost`(IN postId INT)
BEGIN
    SELECT 
        c.id AS comment_id, 
        c.post_id, 
        c.user_id, 
        u.username AS user_name, 
        c.content, 
        c.created_at
    FROM 
        comments c
    JOIN 
        users u ON c.user_id = u.id
    WHERE 
        c.post_id = postId;
END;;

CREATE DEFINER=`root`@`localhost` PROCEDURE `get_comments_for_user`(
    IN userId INT
)
BEGIN
    SELECT 
        c.id AS comment_id, 
        c.post_id, 
        c.user_id, 
        u.username AS user_name, 
        c.content AS comment_content, 
        c.created_at AS comment_created_at
    FROM 
        comments c
    JOIN 
        users u ON c.user_id = u.id
    WHERE 
        c.user_id = userId;
END;;

CREATE DEFINER=`root`@`localhost` PROCEDURE `get_posts_by_category`(
    IN categoryId INT
)
BEGIN
    SELECT 
        p.id AS post_id, 
        p.user_id, 
        u.username AS user_name, 
        p.title AS post_title, 
        p.content AS post_content, 
        p.category_id AS post_category_id, 
        p.created_at AS post_created_at
    FROM 
        posts p
    JOIN 
        users u ON p.user_id = u.id
    WHERE 
        p.category_id = categoryId
    ORDER BY 
        p.created_at DESC;
END;;

CREATE DEFINER=`root`@`localhost` PROCEDURE `get_posts_for_user`(
    IN userId INT
)
BEGIN
    SELECT 
        p.id AS post_id, 
        p.user_id, 
        u.username AS user_name, 
        p.title AS post_title, 
        p.content AS post_content, 
        p.category_id AS post_category_id, 
        p.created_at AS post_created_at
    FROM 
        posts p
    JOIN 
        users u ON p.user_id = u.id
    WHERE 
        p.user_id = userId;
END;;

CREATE DEFINER=`root`@`localhost` PROCEDURE `get_posts_sorted_by_comment_count`()
BEGIN
    SELECT 
        p.id AS post_id, 
        p.user_id, 
        u.username AS user_name, 
        p.title AS post_title, 
        p.content AS post_content, 
        p.category_id AS post_category_id, 
        p.created_at AS post_created_at,
        COUNT(c.id) AS comment_count
    FROM 
        posts p
    LEFT JOIN 
        comments c ON p.id = c.post_id
    JOIN 
        users u ON p.user_id = u.id
    GROUP BY 
        p.id, 
        p.user_id, 
        u.username, 
        p.title, 
        p.content, 
        p.category_id, 
        p.created_at
    ORDER BY 
        comment_count DESC;
END;;

CREATE DEFINER=`root`@`localhost` PROCEDURE `get_posts_sorted_by_date`()
BEGIN
    SELECT 
        p.id AS post_id, 
        p.user_id, 
        u.username AS user_name, 
        p.title AS post_title, 
        p.content AS post_content, 
        p.category_id AS post_category_id, 
        p.created_at AS post_created_at
    FROM 
        posts p
    JOIN 
        users u ON p.user_id = u.id
    ORDER BY 
        p.created_at DESC;
END;;

CREATE DEFINER=`root`@`localhost` PROCEDURE `get_post_by_id`(
    IN postId INT
)
BEGIN
    -- Declare variables to store post data
    DECLARE post_id INT;
    DECLARE user_id INT;
    DECLARE post_title VARCHAR(255);
    DECLARE post_content TEXT;
    DECLARE post_category_id INT;
    DECLARE post_created_at TIMESTAMP;
    DECLARE username VARCHAR(255);

    -- Fetch post data
    SELECT
        p.id AS post_id,
        p.user_id,
        u.username,
        p.title AS post_title,
        p.content AS post_content,
        p.category_id AS post_category_id,
        p.created_at AS post_created_at
    INTO
        post_id,
        user_id,
        username,
        post_title,
        post_content,
        post_category_id,
        post_created_at
    FROM
        posts p
    JOIN
        users u ON p.user_id = u.id
    WHERE
        p.id = postId;

    -- Return the fetched post data
    SELECT
        post_id,
        user_id,
        username,
        post_title,
        post_content,
        post_category_id,
        post_created_at;
END;;

CREATE DEFINER=`root`@`localhost` PROCEDURE `get_summary_stats`()
BEGIN
    DECLARE avgCommentLength DECIMAL(10,2);
    DECLARE avgPostLength DECIMAL(10,2);
    DECLARE totalComments INT;
    DECLARE totalPosts INT;

    SET avgCommentLength = calculate_average_comment_length();
    SET avgPostLength = calculate_average_post_length();
    SET totalComments = count_all_comments();
    SET totalPosts = count_all_posts();

    SELECT 
        avgCommentLength AS average_comment_length,
        avgPostLength AS average_post_length,
        totalComments AS total_comments,
        totalPosts AS total_posts;
END;;

CREATE DEFINER=`root`@`localhost` PROCEDURE `update_post_with_transaction`(IN `postId` int, IN `newTitle` varchar(255), IN `newContent` text, IN `categoryId` text)
BEGIN
    START TRANSACTION;
    UPDATE posts SET title = newTitle, content = newContent, category_id = categoryId WHERE id = postId;
    COMMIT;
END;;

CREATE DEFINER=`root`@`localhost` EVENT `clean_old_logs` ON SCHEDULE EVERY 1 DAY STARTS '2024-06-19 05:42:02' ON COMPLETION NOT PRESERVE ENABLE DO BEGIN
    DELETE FROM old_logs WHERE log_date < NOW() - INTERVAL 30 DAY;
END;;

DELIMITER ;

DROP TABLE IF EXISTS `archived_comments`;
CREATE TABLE `archived_comments` (
  `id` int NOT NULL,
  `post_id` int DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `content` text,
  `created_at` timestamp NULL DEFAULT NULL,
  `deleted_by_user_id` int DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `post_id` (`post_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `archived_posts`;
CREATE TABLE `archived_posts` (
  `id` int NOT NULL,
  `user_id` int DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `content` text,
  `category_id` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `deleted_by_user_id` int DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `archived_users`;
CREATE TABLE `archived_users` (
  `id` int NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `deleted_by_user_id` int DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `categories`;
CREATE TABLE `categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `categories` (`id`, `name`) VALUES
(1,	'blog'),
(2,	'poradnik'),
(3,	'pytanie');

DROP TABLE IF EXISTS `comments`;
CREATE TABLE `comments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `post_id` int DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `content` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `post_id` (`post_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `comments_ibfk_22` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `comments_ibfk_23` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `comments` (`id`, `post_id`, `user_id`, `content`, `created_at`) VALUES
(34,	41,	6,	'konie xd',	'2024-06-20 13:36:29'),
(35,	41,	6,	'go',	'2024-06-21 06:31:31'),
(36,	41,	6,	'fajnie- admin',	'2024-06-21 06:42:43'),
(37,	42,	4,	'OK',	'2024-06-21 06:45:36'),
(38,	43,	4,	'f  bro',	'2024-06-21 06:45:52'),
(39,	41,	6,	'konie3',	'2024-06-21 06:46:03'),
(40,	42,	4,	'ejjjjjjjjjjjj',	'2024-06-21 06:48:24'),
(41,	41,	6,	'konie wygryw',	'2024-06-21 06:48:37'),
(42,	45,	9,	'user3 - nie',	'2024-06-21 06:48:54');

DELIMITER ;;

CREATE TRIGGER `after_comments_insert` AFTER INSERT ON `comments` FOR EACH ROW
BEGIN
    INSERT INTO logs (table_name, operation_type, record_id, user_id)
    VALUES ('comments', 'INSERT', NEW.id, NEW.user_id);
END;;

CREATE TRIGGER `after_comments_update` AFTER UPDATE ON `comments` FOR EACH ROW
BEGIN
    INSERT INTO logs (table_name, operation_type, record_id, user_id)
    VALUES ('comments', 'UPDATE', NEW.id, NEW.user_id);
END;;

CREATE TRIGGER `before_comment_delete` BEFORE DELETE ON `comments` FOR EACH ROW
BEGIN
    INSERT INTO archived_comments (
        id, post_id, user_id, content, created_at,  deleted_at
    ) 
    VALUES (
        OLD.id, OLD.post_id, OLD.user_id, OLD.content, OLD.created_at,  CURRENT_TIMESTAMP
    );
END;;

CREATE TRIGGER `after_comments_delete` AFTER DELETE ON `comments` FOR EACH ROW
BEGIN
    INSERT INTO logs (table_name, operation_type, record_id, user_id)
    VALUES ('comments', 'DELETE', OLD.id, OLD.user_id);
END;;

DELIMITER ;

DROP TABLE IF EXISTS `logs`;
CREATE TABLE `logs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `table_name` varchar(255) DEFAULT NULL,
  `operation_type` varchar(50) DEFAULT NULL,
  `record_id` int DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `operation_timestamp` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `posts`;
CREATE TABLE `posts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `content` text,
  `category_id` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `posts_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `posts` (`id`, `user_id`, `title`, `content`, `category_id`, `created_at`) VALUES
(41,	6,	'Konie',	'Przodkowie i genetyka konia\n Osobny artykuł: Ewolucja koniowatych.\nPrzodkami koni orientalnych, od których pochodzą konie gorącokrwiste, były prawdopodobnie koń Przewalskiego (Equus przewalskii) i tarpan dziki (Equus ferus); konie zimnokrwiste pochodzą natomiast od konia leśnego z Północnej Europy. Koń Przewalskiego jest obecnie jedynym przedstawicielem gatunku koni dzikich. Rasa konik polski wykazuje bardzo duże podobieństwo do tarpana dzikiego, lecz nie jest genetycznie tym samym (chociaż poza Polską koniki polskie bywają określane mianem tarpan)[2]. W styczniu 2007 zespół naukowców z Massachusetts Institute of Technology i Uniwersytetu Harvarda poinformował, że stworzył wstępną mapę genomu konia.',	1,	'2024-06-20 13:36:17'),
(42,	4,	'Słuchowiska radiowe',	'Administrator – cykl krótkich humorystycznych słuchowisk radiowych z lat 70. XX wieku, których autorem jest Adam Kreczmar[1].\n\nDo mieszkania zwykłego „szarego” człowieka, emeryta – Pana Dziamdziaka (Jerzy Dębski) borykającego się z problemami w swym (socjalistycznie zbudowanym) mieszkaniu, przychodzi czasem Pan Administrator (Jan Kaczmarek) – cham, „pan i władca”. Lokator płaszczy się i poniża przed administracją, chcąc uzyskać zgodę na remont lub inną sprawę. Czasem dialog kończy się zrujnowaniem całego mieszkania lokatora.',	1,	'2024-06-21 06:42:23'),
(43,	4,	'Administrator',	'Do typowych zadań administratora należy nadzorowanie pracy powierzonych systemów, zarządzanie kontami i uprawnieniami użytkowników, konfiguracja systemów, instalowanie i aktualizacja oprogramowania, dbanie o bezpieczeństwo systemu i danych w systemach, nadzorowanie, wykrywanie i eliminowanie nieprawidłowości, asystowanie i współpraca z zewnętrznymi specjalistami przy pracach instalacyjnych, konfiguracyjnych i naprawczych, dbanie o porządek (dotyczy w szczególności forów internetowych) itp. Ważnym elementem jest też tworzenie dokumentacji zmian wprowadzanych w systemach mających bezpośredni wpływ na jego funkcjonalność[2].\n\nZe względu na zakres obowiązków, specjalistyczna wiedza typowego administratora może wykraczać poza znajomość administracji powierzonego mu oprogramowania lub sieci, i dotyczyć pogranicza takich kategorii jak m.in.: elektronika, znajomość wielu różnych języków programowania, kryptografia i kryptoanaliza.\n\nZ racji wykonywanych obowiązków i dostępu do danych wrażliwych administrator w swojej pracy powinien kierować się zasadami zgodnymi z etyką i obowiązującym prawem telekomunikacyjnym[3].',	2,	'2024-06-21 06:43:25'),
(44,	9,	'Jaka książka?',	'Książka – dokument piśmienniczy, zapis myśli ludzkiej, raczej obszerny, w postaci publikacji wielostronicowej o określonej liczbie stron, o charakterze trwałym.\n\nDzisiejsza postać książki wywodzi się od kodeksu, czyli kartek połączonych grzbietem, które wraz z upowszechnieniem pergaminu zastąpiły poprzednią formę dokumentu piśmienniczego, czyli zwój. W różnych krajach na świecie 23 kwietnia obchodzony jest Światowy Dzień Książki i Praw Autorskich[1]. Święto zostało ustanowione przez UNESCO w 1925 roku i ma na celu promowanie czytelnictwa i literatury oraz zwrócenie uwagi na ochronę praw autorskich[2].\n\nKryteria\nZa książkę uważa się:\n\nwydawnictwo zwarte[3][4] – przeciwieństwo czasopisma, może to być duży utwór literacki, zbiór mniejszych utworów, leksykon, podręcznik, poradnik, praca naukowa, kalendarz, dokument lub zbiór dokumentów, album, atlas itp.\nwydawnictwo dziełowe – przeciwieństwo akcydensu[5]\nutwór prozatorski, synonim powieści – utwór obszerniejszy niż opowiadanie, nowela czy esej\nzbiór mniejszych utworów prozatorskich, o określonej myśli przewodniej i wspólnej kompozycji, powiązanych w całość redakcyjną, także zbiór myśli, zapisków, notatek, artykułów\nzbindowany lub oprawiony wydruk elektronicznej wersji publikacji (np. z pliku PDF).\nw terminologii bibliotekarskiej:\npublikację powyżej 48 stron[6] – publikacja mniejsza określana jest wtedy jako broszura[7]\nkażdą pozycję biblioteczną w oprawie twardej – także np. nuty, mapy, oprawione zszywki czasopism itp.',	3,	'2024-06-21 06:45:27'),
(45,	9,	'Ryba - jak zrobić ',	'Ryby – tradycyjna nazwa zmiennocieplnych, pierwotnie wodnych kręgowców, oddychających skrzelami i poruszających się za pomocą płetw. Obejmuje bezżuchwowce krągłouste (Cyclostomata) oraz mające szczęki ryby właściwe (Pisces).\n\nRyby stanowią najliczniejszą i najbardziej zróżnicowaną grupę współcześnie żyjących kręgowców (ponad połowę). Różnią się od siebie pod względem budowy zewnętrznej i wewnętrznej, ubarwienia oraz przystosowania do warunków środowiska. Ponad 32 tysiące współcześnie żyjących gatunków opisano naukowo, a co roku naukowcy opisują 100–150 nowych gatunków morskich i nieco więcej słodkowodnych[1]. Szacuje się, że nie odkryto jeszcze co najmniej 5000 gatunków, głównie ryb głębinowych ze strefy klimatu tropikalnego[1]. W Polsce występuje około 120 gatunków.\n\n Osobny artykuł: Ryby Polski.\nDział zoologii zajmujący się rybami to ichtiologia.',	2,	'2024-06-21 06:46:40'),
(46,	10,	'Jaka lampa LED ?',	'Lampa LED – źródło światła oparte na diodach elektroluminescencyjnych (ang. light-emitting diodes, LEDs), często umieszczone w obudowie pozwalającej zastosować je w oprawie oświetleniowej przeznaczonej dla żarówek.\n\nŹródłem światła w lampach LED jest biała dioda elektroluminescencyjna, która składa się zwykle z niebieskiej diody elektroluminescencyjnej i luminoforu. Niebieska dioda elektroluminescencyjna emituje światło o długości fali około 450 nm. Światło niebieskie pobudza do świecenia luminofor umieszczony w obudowie diody. Luminofor, np. YAG:Ce, emituje światło żółtozielone, które zmieszane ze światłem niebieskim diody daje światło białe. W zależności od rodzaju luminoforu, można uzyskać biały kolor o różnej temperaturze barwnej. W 2014 ogłoszono skonstruowanie białej LED o wydajności 303 lumenów na wat mocy elektrycznej zasilającej lampę – jest to znacznie więcej niż osiągane przeciętnie 84 lm/W w lampach będących w ofercie handlowej[2]. Dodatkowo efektywność układu obniża zasilacz, którego sprawność nie przekracza 95%.\n\nProste konstrukcje, służące głównie jako kontrolki przeznaczone do zastępowania miniaturowych żaróweczek w tablicach synoptycznych lub samochodowych tablicach wskaźników, zawierają tylko diodę świecącą w dowolnym kolorze oraz opornik i pracują przy napięciach 6–24 V.\n\nLampy diodowe służące do oświetlania mają cokół, np. E14 lub E27, który pozwala umieścić je w oprawie dla żarówek 230 V, ale też znormalizowane przyłącza bagnetowe albo igiełkowe. Niskie napięcie konieczne do zasilania diod świecących białych lub ciepłych białych (Warm White) jest w nich wytwarzane przez przetwornicę impulsową. W lampach LED stosuje się zarówno diody klasyczne (okrągłe, coraz rzadziej), jak i diody montowane powierzchniowo (SMD) o szerszym kącie świecenia oraz większej trwałości.\n\nZalety',	3,	'2024-06-21 06:48:06'),
(47,	10,	'Blog o niczym',	'serio nic',	1,	'2024-06-21 06:49:21');

DELIMITER ;;

CREATE TRIGGER `after_posts_insert` AFTER INSERT ON `posts` FOR EACH ROW
BEGIN
    INSERT INTO logs (table_name, operation_type, record_id, user_id)
    VALUES ('posts', 'INSERT', NEW.id, NEW.user_id);
END;;

CREATE TRIGGER `after_posts_update` AFTER UPDATE ON `posts` FOR EACH ROW
BEGIN
    INSERT INTO logs (table_name, operation_type, record_id, user_id)
    VALUES ('posts', 'UPDATE', NEW.id, NEW.user_id);
END;;

CREATE TRIGGER `before_post_delete` BEFORE DELETE ON `posts` FOR EACH ROW
BEGIN
    INSERT INTO archived_posts (
        id, user_id, title, content, category_id, created_at,  deleted_at
    ) 
    VALUES (
        OLD.id, OLD.user_id, OLD.title, OLD.content, OLD.category_id, OLD.created_at,  CURRENT_TIMESTAMP
    );
END;;

CREATE TRIGGER `after_posts_delete` AFTER DELETE ON `posts` FOR EACH ROW
BEGIN
    INSERT INTO logs (table_name, operation_type, record_id, user_id)
    VALUES ('posts', 'DELETE', OLD.id, OLD.user_id);
END;;

DELIMITER ;

DROP VIEW IF EXISTS `user_posts_info`;
CREATE TABLE `user_posts_info` (`post_id` int, `post_user_id` int, `user_username` varchar(255), `user_email` varchar(255), `post_title` varchar(255), `post_content` text, `post_category_id` int, `post_created_at` timestamp);


DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `users` (`id`, `username`, `password`, `email`) VALUES
(4,	'admin',	'admin',	'cos'),
(6,	'test',	'test',	'test'),
(9,	'user_1',	't',	'test'),
(10,	'user_2',	'u',	'r');

DELIMITER ;;

CREATE TRIGGER `after_users_insert` AFTER INSERT ON `users` FOR EACH ROW
BEGIN
    INSERT INTO logs (table_name, operation_type, record_id, user_id)
    VALUES ('users', 'INSERT', NEW.id, NEW.id);
END;;

CREATE TRIGGER `after_users_update` AFTER UPDATE ON `users` FOR EACH ROW
BEGIN
    INSERT INTO logs (table_name, operation_type, record_id, user_id)
    VALUES ('users', 'UPDATE', NEW.id, NEW.id);
END;;

CREATE TRIGGER `before_user_delete` BEFORE DELETE ON `users` FOR EACH ROW
BEGIN
    INSERT INTO archived_users (
        id, username, password, email,  deleted_at
    ) 
    VALUES (
        OLD.id, OLD.username, OLD.password, OLD.email,  CURRENT_TIMESTAMP
    );
END;;

CREATE TRIGGER `after_users_delete` AFTER DELETE ON `users` FOR EACH ROW
BEGIN
    INSERT INTO logs (table_name, operation_type, record_id, user_id)
    VALUES ('users', 'DELETE', OLD.id, OLD.id);
END;;

DELIMITER ;

DROP VIEW IF EXISTS `view_post_statistics`;
CREATE TABLE `view_post_statistics` (`id` int, `title` varchar(255), `comment_count` bigint, `average_post_length` decimal(13,4));


DROP VIEW IF EXISTS `view_posts_with_categories`;
CREATE TABLE `view_posts_with_categories` (`post_id` int, `title` varchar(255), `category_name` varchar(255));


DROP TABLE IF EXISTS `user_posts_info`;
CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `user_posts_info` AS select `p`.`id` AS `post_id`,`p`.`user_id` AS `post_user_id`,`u`.`username` AS `user_username`,`u`.`email` AS `user_email`,`p`.`title` AS `post_title`,`p`.`content` AS `post_content`,`p`.`category_id` AS `post_category_id`,`p`.`created_at` AS `post_created_at` from (`posts` `p` join `users` `u` on((`p`.`user_id` = `u`.`id`)));

DROP TABLE IF EXISTS `view_post_statistics`;
CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `view_post_statistics` AS select `p`.`id` AS `id`,`p`.`title` AS `title`,count(`c`.`id`) AS `comment_count`,avg(char_length(`p`.`content`)) AS `average_post_length` from (`posts` `p` left join `comments` `c` on((`p`.`id` = `c`.`post_id`))) group by `p`.`id`;

DROP TABLE IF EXISTS `view_posts_with_categories`;
CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `view_posts_with_categories` AS select `p`.`id` AS `post_id`,`p`.`title` AS `title`,`c`.`name` AS `category_name` from (`posts` `p` join `categories` `c` on((`p`.`category_id` = `c`.`id`)));

-- give privileges to api_user to database
GRANT ALL PRIVILEGES ON forum_db.* TO 'api_user'@'%';
FLUSH PRIVILEGES;

-- 2024-06-21 06:50:57
