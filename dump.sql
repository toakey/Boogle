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
) ENGINE=InnoDB AUTO_INCREMENT=91 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `book`
--

LOCK TABLES `book` WRITE;
/*!40000 ALTER TABLE `book` DISABLE KEYS */;
INSERT INTO `book` VALUES
(1,'Hatchet','survival|perserverance|isolation','I liked Hatchet\'s themes surrounding perseverance, I also really liked the first person narration.|AHAHHHAHAHHHHH|',NULL,NULL,'',''),
(9,'Hunger Games','survival|science fiction|dystopia',NULL,NULL,NULL,'',''),
(15,'Harry Potter and the Sorcerer\'s Stone','Friendship|Good vs. Evil|Third Person Narration',NULL,'Contemporary Fantasy','Traditional Format','',''),
(16,'The Hobbit','Bravery|Overcoming Adversity|Old School',NULL,'Epic Fantasy','Traditional Format','',''),
(17,'Wizard of Oz','magic|fantasy|family',NULL,NULL,NULL,'',''),
(18,'The God of Small Things','love|family|colonialism','This book is sad.||Hi Mom!||I really like pee. The thing that is excreted from your body. When I think about exrections from the body, I think about an expo marker adnsd sdfoijdsf|review,new review,new review,new review',NULL,NULL,'',''),
(20,'Things Fall Apart','colonialism|religion|belonging','Review',NULL,NULL,'',''),
(29,'Stamped','Inequality|Overcoming Adversity|Good vs. Evil','','Our World (Nonfiction)','Traditional Format','',''),
(30,'Wonder','Overcoming Adversity|Identity and Self|School Experiences','','Our World (Fiction)','Traditional Format','',''),
(31,'George','Bravery|Identity and Self|School Experiences','','Our World (Fiction)','Traditional Format','',''),
(32,'Terror at Bottle Creek','Bravery|Overcoming Adversity|Perserverance and Persistance','','Wilderness Survival','Traditional Format','',''),
(33,'Shark Beneath the Reef','Perserverance and Persistance|Bravery|Growing Up','','Wilderness Survival','Traditional Format','',''),
(34,'The Wild Robot','Identity and Self|Overcoming Adversity|Bravery','','Wilderness Survival','Traditional Format','',''),
(35,'Julie of the Wolves','Loss and Grief|Overcoming Adversity|Family Relationships','','Our World (Fiction)','Traditional Format','',''),
(36,'My Side of the Mountain','Overcoming Adversity|Perserverance and Persistance|Growing Up','','Wilderness Survival','Traditional Format','',''),
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
(89,'The Bible','Good vs. Evil | Redemption | Old School','Hating god lol|Solid book! Really felt God in the pages.','Religion or Cultural Traditions','Novel-in-verse','Multiple authors','The sacred scriptures of Christians comprising the Old Testament and the New Testament.');
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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `unmoderated`
--

LOCK TABLES `unmoderated` WRITE;
/*!40000 ALTER TABLE `unmoderated` DISABLE KEYS */;
/*!40000 ALTER TABLE `unmoderated` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-05-11 14:25:03
