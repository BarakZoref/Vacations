CREATE DATABASE  IF NOT EXISTS `vacations` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `vacations`;
-- MySQL dump 10.13  Distrib 8.0.27, for Win64 (x86_64)
--
-- Host: localhost    Database: vacations
-- ------------------------------------------------------
-- Server version	8.0.27

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `follows`
--

DROP TABLE IF EXISTS `follows`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `follows` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `vacation_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `vacation_id` (`vacation_id`),
  CONSTRAINT `follows_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `follows_ibfk_2` FOREIGN KEY (`vacation_id`) REFERENCES `vacations` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=58 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `follows`
--

LOCK TABLES `follows` WRITE;
/*!40000 ALTER TABLE `follows` DISABLE KEYS */;
INSERT INTO `follows` VALUES (1,3,1),(2,3,4),(3,4,4),(5,4,3),(13,20,3),(14,20,4),(29,28,1),(30,28,2),(38,28,3),(39,28,4),(42,28,12),(43,31,12),(44,3,33),(45,3,26),(46,3,25),(47,46,34),(48,46,33),(49,46,26),(50,46,24),(51,46,4),(52,23,32),(53,23,1),(54,23,3),(55,23,26),(56,23,12),(57,28,33);
/*!40000 ALTER TABLE `follows` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_name` varchar(45) NOT NULL,
  `first_name` varchar(45) NOT NULL,
  `last_name` varchar(45) DEFAULT NULL,
  `password` varchar(45) NOT NULL,
  `user_type` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_name_UNIQUE` (`user_name`)
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'admin@admin.com','Admin','','e2d2af960ada70e65297bec6a535e705','admin'),(3,'barak@gmail.com','Barak','Zoref','e2d2af960ada70e65297bec6a535e705','user'),(4,'maor@gmail.com','Maor','','e2d2af960ada70e65297bec6a535e705','user'),(20,'raz@gmail.com','Raz','David','e2d2af960ada70e65297bec6a535e705','user'),(23,'guy@gmail.com','Guy','Adiv','e2d2af960ada70e65297bec6a535e705','user'),(24,'moshe@gmail.com','Moshe','Levy','e2d2af960ada70e65297bec6a535e705','user'),(28,'roee@gmail.com','Roee','Cohen','e2d2af960ada70e65297bec6a535e705','user'),(30,'zach@gmail.com','Zach','Zoref','e2d2af960ada70e65297bec6a535e705','user'),(31,'meir@gmail.com','Meir','Zoref','e2d2af960ada70e65297bec6a535e705','user'),(32,'Asaf@gmail.com','Asaf','','e2d2af960ada70e65297bec6a535e705','user'),(46,'anat@gmail.com','anat','','e2d2af960ada70e65297bec6a535e705','user');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vacations`
--

DROP TABLE IF EXISTS `vacations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vacations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `destination` varchar(20) NOT NULL,
  `price` int NOT NULL,
  `beginning_date` varchar(20) NOT NULL,
  `ending_date` varchar(20) NOT NULL,
  `image` varchar(500) NOT NULL,
  `description` varchar(1000) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vacations`
--

LOCK TABLES `vacations` WRITE;
/*!40000 ALTER TABLE `vacations` DISABLE KEYS */;
INSERT INTO `vacations` VALUES (1,'Ibiza',600,'2023-04-23','2023-04-26','/uploads/vacations-images/Ibiza.jpg','Ibiza is often referred to as the “white island” and “party capital of the world” - a neat pair of monikers to describe the difference between day and night in this beautiful Spanish paradise. Ibiza is home to more than 60 beaches that attract visitors from all over the globe, and boasts some of the world’s best nightclubs, which keep partiers entertained from sundown until dawn.'),(2,'Maldives',1000,'2023-04-23','2023-05-23','/uploads/vacations-images/Maldives.jpg','This loose collection of coral atolls in the Indian Ocean is known around the world for its incredble lagoons and reefs. The tropical climate makes it the perfect place for travelers in search of relaxation, sunshine, and water. In the capital of Male, travelers will find a lively and extensive fish market with locals hocking fresh catches, restaurants and shops. Most everywhere else though, is quiet and laid back. Stay in one of the overwater beach huts or bungalows, go on a dive, take a yoga class, and relax in a hammock… be careful, though, you may never want to return.'),(3,'Rhodes',350,'2023-05-23','2023-05-26','/uploads/vacations-images/Rhodes.jpg','Also known as the “Knights’ island”, Rhodes has a rich historical past, which you can tell by its historical buildings and monuments. The atmosphere in Rhodes Old Town is simply unique! Strong walls, stone-paved alleys, elegant mansions, and a medieval castle create the illusion that you have time-traveled back to the age of the knights. Don’t be surprised if you believe you’re into a medieval fairy tale. Who knows? Maybe you were a knight or a princess in your past life!'),(4,'Costa-rica',700,'2023-04-23','2023-04-26','/uploads/vacations-images/Costa-Rica.jpg','To many, Costa Rica\'s charm lies in its lush rainforests, unspoiled beaches and abundance of wildlife. With breathtaking landscapes and a myriad of creatures – from toucans to monkeys to jaguars – it\'s easy to see why. Where else can you hike active volcanoes, zip line through cloud-covered rainforests and surf warm turquoise waters within the span of just a few days? In this compact but diverse tropical paradise, exhilarating outdoor activities are abundant. Nature-seekers will roam thick jungles while beachgoers will sprawl across the powdery sands. It\'s hard not to admire all the splendors this \"Rich Coast\" has to offer.'),(12,'Haifa',1100,'2023-06-10','2023-06-15','/uploads/vacations-images/Haifa.jpg','Haifa is Israel’s third largest city. It sits on the slopes of Mount Carmel facing the Mediterranean Sea. Some call it ‘Israel’s San Francisco’.  Although traditionally a working city, there are a number of great things to do in Haifa. Be sure to cross them off your Haifa bucket list. These include the Bahai Gardens and German Colony. It also houses a number of top museums. The city is also famous across Israel for its mixed population of Jews and Arabs. Here, they peacefully coexist. The result is some amazing fusions of Arabic and Jewish cultures across the city.'),(24,'Tel-Aviv',800,'2023-07-12','2023-07-17','/uploads/vacations-images/Tel-Aviv.jpg','Tel Aviv is one of the most vibrant cities in the world. Titled the ‘Mediterranean Capital of Cool’ by the New York Times, this is a 24 hour city with a unique pulse, combining sandy Mediterranean beaches with a world-class nightlife, a buzzing cultural scene, incredible food, UNESCO recognized architecture, and an international outlook. Don’t miss it!'),(25,'Paris',900,'2023-03-01','2023-03-08','/uploads/vacations-images/Paris.jpg','The capital of France seems to have been designed specifically for the enjoyment of its visitors. Its streets, squares, buildings, gardens and monuments beckon tourists to return, and indeed, many do.  Some of the most memorable things to do in Paris include visiting the Eiffel Tower, the Arc de Triomphe and Notre-Dame Cathedral. During the evening, experiencing one of the legendary Moulin Rouge cabaret shows, strolling through some of the most picturesque neighborhoods, like Montmartre, or climbing the Montparnasse Tower are a must.'),(26,'Lisbon',550,'2023-11-01','2023-11-08','/uploads/vacations-images/Lisbon.jpg','Often overlooked for its popular European cousins, Lisbon specializes in lulling tourists into its laid-back charm. Perched atop seven hills, its alleyways wind between colorful, centuries-old buildings. Fanciful St. George\'s Castle peeks out to the skyline, lending an Old World-mystery to the burgeoning cosmopolitan city. And despite the modern sleek buildings that are slowly rising throughout the city, village life holds strong.'),(32,'Thailand',250,'2023-05-02','2023-05-05','/uploads/vacations-images/Thailand.jpg',' Thailand is one of the prettiest South-Asian countries, which is why Thailand tourism has increased over time. Apart from the attractions of the country\'s capital city - Bangkok, Thailand is dotted with rainforests, pretty white sand beaches, amazing taverns, beautiful '),(33,'Jamaica',330,'2023-08-03','2023-08-08','/uploads/vacations-images/Jamaica.jpg','From each morning’s glorious sunrise until the sea swallows the sun at night, Jamaica presents a magnificent palette of experiences, a kaleidoscope of colors and sounds that make our island the most precious jewel in the Caribbean. We are a land of unique culture, engaging activities, breathtaking landscapes, and a warm, welcoming people.'),(34,'Cusco',150,'2023-12-01','2023-12-10','/uploads/vacations-images/Cusco.jpg','Cusco, known as the archaeological capital of the Americas, is home to a storied history that included the rise and fall of the Inca Empire followed by the invasion of Spanish conquistadors in the early 1500s. Today, remnants of both eras share the narrow city streets – from centuries-old baroque cathedrals to exquisite stone masonry – creating a rare collision of Andean and Spanish styles that makes Cusco like no other place on earth.');
/*!40000 ALTER TABLE `vacations` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-04-18 18:43:06
