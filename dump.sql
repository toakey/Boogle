-- MariaDB dump 10.19  Distrib 10.7.3-MariaDB, for osx10.14 (x86_64)
--
-- Host: localhost    Database: main
-- ------------------------------------------------------
-- Server version	10.7.3-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `main`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `main` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;

USE `main`;

--
-- Table structure for table `book`
--

DROP TABLE IF EXISTS `book`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `book` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `themes` text DEFAULT NULL,
  `reviews` text DEFAULT NULL,
  `genre` text DEFAULT NULL,
  `format` text DEFAULT NULL,
  `author` text DEFAULT NULL,
  `description` text DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=116 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `book`
--

LOCK TABLES `book` WRITE;
/*!40000 ALTER TABLE `book` DISABLE KEYS */;
INSERT INTO `book` VALUES
(29,'Stamped','Inequality|Overcoming Adversity|Good vs. Evil','','Our World (Nonfiction)','Traditional Format','',''),
(30,'Wonder','Overcoming Adversity|Identity and Self|School Experiences','','Our World (Fiction)','Traditional Format','',''),
(31,'George','Bravery|Identity and Self|School Experiences','','Our World (Fiction)','Traditional Format','',''),
(32,'Terror at Bottle Creek','Bravery|Overcoming Adversity|Perserverance and Persistance','','Wilderness Survival','Traditional Format','',''),
(33,'Shark Beneath the Reef','Perserverance and Persistance|Bravery|Growing Up','','Wilderness Survival','Traditional Format','',''),
(34,'The Wild Robot','Identity and Self|Overcoming Adversity|Bravery','','Wilderness Survival','Traditional Format','',''),
(35,'Julie of the Wolves','Loss and Grief|Overcoming Adversity|Family Relationships','','Our World (Fiction)','Traditional Format','',''),
(36,'My Side of the Mountain','Overcoming Adversity|Perserverance and Persistance|Growing Up','|I really liked this book—was a really fun read! Especially liked the scene at the lake.|I was an overall fan of the book, but there were certain chapters I felt were a bit slow. I wish there were more action scenes, like the scene with the bear or the scene with the snake. Overall, though, I think the author spoke very fluently through his character.|I thought this book told a great story of removal from modern society and interesting self reflection. My favorite scene was the scene where he has a dream of going home, but it\'s more of a nightmare as he comes to love nature more than the city.|','Wilderness Survival','Traditional Format','Jean Craighead George','My Side of the Mountain is a middle grade adventure novel written and illustrated by American writer Jean Craighead George published by E. P. Dutton in 1959. It features a boy who learns courage, independence, and the need for companionship while attempting to live in the Catskill Mountains of New York State.'),
(37,'Island: Book One: Shipwreck','Bravery|Overcoming Adversity|Perserverance and Persistance','It was ok ig|','Wilderness Survival','Traditional Format','',''),
(38,'Island: Book Two: Survival','Overcoming Adversity|Perserverance and Persistance|Bravery','','Wilderness Survival','Traditional Format','',''),
(39,'Island: Book Three: Escape','Bravery|Perserverance and Persistance|Overcoming Adversity','','Wilderness Survival','Traditional Format','',''),
(42,'Island of the Blue Dolphins','Bravery|Overcoming Adversity|Perserverance and Persistance','','Wilderness Survival','Traditional Format','',''),
(43,'Stay Alive: Cave-In','Bravery|Overcoming Adversity|Perserverance and Persistance','','Wilderness Survival','Traditional Format','',''),
(44,'The Cruisers','Inequality|School Experiences|Good vs. Evil','','Our World (Fiction)','Traditional Format','',''),
(45,'The Rock and the River','Inequality|Family Relationships|Identity and Self','','Our World (Fiction)','Traditional Format','',''),
(46,'The Circuit','Inequality|Overcoming Adversity|Perserverance and Persistance','','Our World (Nonfiction)','Traditional Format','',''),
(47,'Stargirl','School Experiences|\'Fitting In\' vs. Belonging|Identity and Self','','Our World (Fiction)','Traditional Format','',''),
(48,'The Outsiders','\'Fitting In\' vs. Belonging|Identity and Self|Friendship','','Our World (Fiction)','Traditional Format','',''),
(49,'Sounder','Friendship|Growing Up|Third Person Narration','','Animals (Realistic Fiction)','Traditional Format','',''),
(50,'Old Yeller','Friendship|Growing Up|Old School','','Animals (Realistic Fiction)','Traditional Format','',''),
(51,'The Wind in the Willows','Friendship|Good vs. Evil|Old School','','Animals (Fantasy)','Traditional Format','',''),
(52,'Mr. Revere and I','Good vs. Evil|Overcoming Adversity|Old School','','Animals (Fantasy)','Traditional Format','',''),
(53,'Rascal','Change|Friendship|Conversational (Narrator Talking With Reader)','','Animals (Nonfiction)','Traditional Format','',''),
(54,'Mrs. Frisby and the Rats of NIMH','Bravery|Perserverance and Persistance|Old School','','Animals (Fantasy)','Traditional Format','',''),
(55,'The Trumpet of the Swan','Identity and Self|Overcoming Adversity|Old School','','Animals (Realistic Fiction)','Traditional Format','',''),
(56,'The Underdogs','Overcoming Adversity|Perserverance and Persistance|Third Person Narration','','Sports (Nonfiction)','Traditional Format','',''),
(57,'Patina','Friendship|Perserverance and Persistance|Conversational (Narrator Talking With Reader)','','','','',''),
(58,'Ghost','Bravery|Identity and Self|Cliffhangers|Identity and Self|Overcoming Adversity|Conversational (Narrator Talking With Reader)','|','Sports (Fiction)','Traditional Format','',''),
(59,'Sunny','Family Relationships|Identity and Self|Conversational (Narrator Talking With Reader)','','Sports (Fiction)','','',''),
(60,'Lu','Identity and Self|Perserverance and Persistance|Conversational (Narrator Talking With Reader)','','Sports (Fiction)','Traditional Format','',''),
(61,'Code Talker','Identity and Self|Inequality|First Person Narration','','War (Fiction)','Traditional Format','',''),
(62,'Unstoppable','Bravery|Loss and Grief|Third Person Narration','','Sports (Fiction)','Traditional Format','',''),
(63,'The Ruins of Gorlan','Bravery|Good vs. Evil|Third Person Narration','','Adventure','Traditional Format','',''),
(64,'Kane Chronicles: The Red Pyramid','Friendship|Good vs. Evil|Multiple Narrators','','Contemporary Fantasy','Traditional Format','',''),
(65,'The Lion, the Witch, and Wardrobe','Bravery|Good vs. Evil|Multiple Narrators','','Epic Fantasy','Traditional Format','',''),
(66,'Miss Peregrine\'s Home for Peculiar Children','Friendship|Bravery|First Person Narration','','Contemporary Fantasy','Traditional Format','',''),
(67,'Redwall','Growing Up|Good vs. Evil|Old School','','Animals (Fantasy)','Traditional Format','',''),
(68,'The Copernicus Legacy: The Forbidden Stone','Bravery|Friendship|Quick Cuts','','Adventure','Traditional Format','',''),
(69,'Over Sea, Under Stone','Friendship|Good vs. Evil|Old School','','Contemporary Fantasy','Traditional Format','',''),
(70,'Septimus Heap: Magyk','Good vs. Evil|Identity and Self|Third Person Narration','','Epic Fantasy','Traditional Format','',''),
(71,'Pendragon: The Merchant of Death','Good vs. Evil|Bravery|Third Person Narration','','Contemporary Fantasy','Traditional Format','',''),
(72,'The Unwanteds','Identity and Self|','','Epic Fantasy','Traditional Format','',''),
(73,'Artemis Fowl','Identity and Self|Perserverance and Persistance|Third Person Narration','','Contemporary Fantasy','Traditional Format','',''),
(114,'Lagoon','Family Relationships|Romance|Silly','Goofy ahh','Chills and Thrills','Poetry','',''),
(115,'ghost','Overcoming Adversity|Identity and Self|Conversational (Narrator Talking With Reader)','','Our World (Fiction)','Traditional Format','','');
/*!40000 ALTER TABLE `book` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `unmoderated`
--

DROP TABLE IF EXISTS `unmoderated`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `unmoderated` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `themes` text DEFAULT NULL,
  `genre` text DEFAULT NULL,
  `format` text DEFAULT NULL,
  `reviews` text DEFAULT NULL,
  `user` text DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=54 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `unmoderated`
--

LOCK TABLES `unmoderated` WRITE;
/*!40000 ALTER TABLE `unmoderated` DISABLE KEYS */;
/*!40000 ALTER TABLE `unmoderated` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` text DEFAULT NULL,
  `themes` text DEFAULT NULL,
  `format` text DEFAULT NULL,
  `genre` text DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES
(15,'toakey22@students.stab.org','Overcoming Adversity|Identity and Self|Conversational (Narrator Talking With Reader)|Overcoming Adversity|Perserverance and Persistance|Third Person Narration|Overcoming Adversity|Perserverance and Persistance|Third Person Narration','Traditional Format|Traditional Format|Traditional Format','Our World (Fiction)|Wilderness Survival|Wilderness Survival');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-05-13  8:42:56
