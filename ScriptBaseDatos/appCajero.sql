-- MySQL dump 10.13  Distrib 8.0.25, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: appcajero
-- ------------------------------------------------------
-- Server version	5.7.34-log

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
-- Table structure for table `administrador`
--

DROP TABLE IF EXISTS `administrador`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `administrador` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(30) NOT NULL,
  `password` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `administrador`
--

LOCK TABLES `administrador` WRITE;
/*!40000 ALTER TABLE `administrador` DISABLE KEYS */;
INSERT INTO `administrador` VALUES (1,'Cuenta1','12345'),(2,'Cuenta2','12345'),(3,'Cuenta3','12345');
/*!40000 ALTER TABLE `administrador` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cliente`
--

DROP TABLE IF EXISTS `cliente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cliente` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(30) NOT NULL,
  `apellido_paterno` varchar(30) NOT NULL,
  `apellido_materno` varchar(30) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cliente`
--

LOCK TABLES `cliente` WRITE;
/*!40000 ALTER TABLE `cliente` DISABLE KEYS */;
INSERT INTO `cliente` VALUES (1,'Diego','Abarca','Rodriguez'),(2,'Jose Emmanuel','Navarrete','Garcia'),(3,'Andrea','Garcia','Lugo'),(4,'Fulano','tal','tal'),(6,'Diego','Abarca','Rodriguez'),(7,'Pedro','Lopez','R'),(15,'prueba','A','C'),(16,'Prueba5','A','C');
/*!40000 ALTER TABLE `cliente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cuenta`
--

DROP TABLE IF EXISTS `cuenta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cuenta` (
  `NumeroTarjeta` int(60) NOT NULL,
  `FechaExpiracion` date NOT NULL,
  `pin` int(4) NOT NULL,
  `saldo` float(22,2) NOT NULL,
  `clienteId` int(11) NOT NULL,
  `administradorId` int(11) NOT NULL,
  PRIMARY KEY (`NumeroTarjeta`),
  KEY `clienteId` (`clienteId`),
  KEY `administradorId` (`administradorId`),
  CONSTRAINT `administrador_FK` FOREIGN KEY (`administradorId`) REFERENCES `administrador` (`id`) ON DELETE CASCADE,
  CONSTRAINT `cliente_FK` FOREIGN KEY (`clienteId`) REFERENCES `cliente` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cuenta`
--

LOCK TABLES `cuenta` WRITE;
/*!40000 ALTER TABLE `cuenta` DISABLE KEYS */;
INSERT INTO `cuenta` VALUES (111111111,'2025-12-18',1234,1646819.00,3,1),(123456780,'2021-06-04',1234,1000.00,16,1),(123456789,'2029-10-01',1234,99848336.00,1,1),(222222222,'0000-00-00',1234,1000.00,4,1),(414141414,'2021-05-28',1234,1000.00,15,1),(444444444,'2029-11-22',4321,1000.00,6,1),(555555555,'2021-07-09',1234,0.00,7,3),(987654321,'2021-06-30',1234,5000000000.00,2,1);
/*!40000 ALTER TABLE `cuenta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cuentaoperacion`
--

DROP TABLE IF EXISTS `cuentaoperacion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cuentaoperacion` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `operacionId` int(11) NOT NULL,
  `cuentaId` int(60) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `operacionId` (`operacionId`),
  KEY `cuentaId` (`cuentaId`),
  CONSTRAINT `cuenta_FK` FOREIGN KEY (`cuentaId`) REFERENCES `cuenta` (`NumeroTarjeta`) ON DELETE CASCADE,
  CONSTRAINT `operacion_FK` FOREIGN KEY (`operacionId`) REFERENCES `operacion` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=199 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cuentaoperacion`
--

LOCK TABLES `cuentaoperacion` WRITE;
/*!40000 ALTER TABLE `cuentaoperacion` DISABLE KEYS */;
INSERT INTO `cuentaoperacion` VALUES (94,433,123456789),(95,432,123456789),(96,431,123456789),(97,434,123456789),(98,435,123456789),(99,436,123456789),(100,437,123456789),(101,438,987654321),(102,439,987654321),(103,442,987654321),(104,441,987654321),(105,440,987654321),(106,446,123456789),(107,445,123456789),(108,444,123456789),(109,443,123456789),(110,447,123456789),(111,448,123456789),(112,449,123456789),(113,448,123456789),(114,450,123456789),(115,451,123456789),(116,450,123456789),(117,452,123456789),(118,453,987654321),(119,452,987654321),(120,454,987654321),(121,453,987654321),(122,455,123456789),(123,454,123456789),(124,456,123456789),(125,455,123456789),(126,458,987654321),(127,457,987654321),(128,459,987654321),(129,458,987654321),(130,460,123456789),(131,459,123456789),(132,461,123456789),(133,460,123456789),(134,463,123456789),(135,462,123456789),(136,464,987654321),(137,465,987654321),(138,466,123456789),(139,468,987654321),(140,467,987654321),(141,469,987654321),(142,468,987654321),(143,471,123456789),(144,472,123456789),(145,473,123456789),(146,474,987654321),(147,475,123456789),(148,476,123456789),(149,477,123456789),(150,479,111111111),(151,478,111111111),(152,480,123456789),(153,481,111111111),(154,482,111111111),(155,483,123456789),(156,484,123456789),(157,485,111111111),(158,486,123456789),(159,487,123456789),(160,488,123456789),(161,489,111111111),(162,490,111111111),(163,491,123456789),(164,492,123456789),(165,493,111111111),(166,494,987654321),(167,495,111111111),(168,496,123456789),(169,497,111111111),(170,498,123456789),(171,499,111111111),(172,500,123456789),(173,501,111111111),(174,502,123456789),(175,503,111111111),(176,504,123456789),(177,505,111111111),(178,506,123456789),(179,507,123456789),(180,508,111111111),(181,510,123456789),(182,509,123456789),(183,512,123456789),(184,511,123456789),(185,514,123456789),(186,513,123456789),(187,515,123456789),(188,519,111111111),(189,518,111111111),(190,517,111111111),(191,516,111111111),(192,520,123456789),(193,521,123456789),(194,522,123456789),(195,523,123456789),(196,525,123456789),(197,527,987654321),(198,526,987654321);
/*!40000 ALTER TABLE `cuentaoperacion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `operacion`
--

DROP TABLE IF EXISTS `operacion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `operacion` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fecha` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `accion` varchar(40) NOT NULL,
  `nuevoSaldo` float(22,2) DEFAULT NULL,
  `saldoRetirar` float(22,2) DEFAULT NULL,
  `saldoDepositar` float(22,2) DEFAULT NULL,
  `Nombre_T` varchar(30) DEFAULT NULL,
  `ApellidoP_T` varchar(30) DEFAULT NULL,
  `ApellidoM_T` varchar(30) DEFAULT NULL,
  `Fecha_T` datetime DEFAULT NULL,
  `pinAnterior` int(4) DEFAULT NULL,
  `pinNuevo` int(4) DEFAULT NULL,
  `folio` varchar(11) DEFAULT NULL,
  `CuentaTransferir` int(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `folio` (`folio`)
) ENGINE=InnoDB AUTO_INCREMENT=528 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `operacion`
--

LOCK TABLES `operacion` WRITE;
/*!40000 ALTER TABLE `operacion` DISABLE KEYS */;
INSERT INTO `operacion` VALUES (431,'2021-06-08 03:11:33','Efectu?? una consulta de saldo',99977872.00,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(432,'2021-06-08 03:11:53','Efectu?? un retiro a su cuenta',99975872.00,2000.00,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'0.sqejnh91z',NULL),(433,'2021-06-08 03:11:57','Consult?? su estado de cuenta',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(434,'2021-06-08 03:12:08','Consult?? su estado de cuenta',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(435,'2021-06-08 03:12:43','Consult?? su estado de cuenta',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(436,'2021-06-08 03:14:42','Consult?? su estado de cuenta',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(437,'2021-06-08 03:14:50','Consult?? su estado de cuenta',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(438,'2021-06-08 03:15:16','Consult?? su estado de cuenta',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(439,'2021-06-08 03:15:19','Consult?? su estado de cuenta',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(440,'2021-06-08 03:15:23','Efectu?? una consulta de saldo',49012000.00,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(441,'2021-06-08 03:15:40','Cambio de PIN',NULL,NULL,NULL,NULL,NULL,NULL,NULL,1234,4321,NULL,NULL),(442,'2021-06-08 03:15:50','Consult?? su estado de cuenta',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(443,'2021-06-08 03:19:19','Efectu?? una consulta de saldo',99975872.00,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(444,'2021-06-08 03:19:27','Cambio de PIN',NULL,NULL,NULL,NULL,NULL,NULL,NULL,4321,1234,NULL,NULL),(445,'2021-06-08 03:19:27','Cambio de PIN',NULL,NULL,NULL,NULL,NULL,NULL,NULL,4321,1234,NULL,NULL),(446,'2021-06-08 03:19:31','Consult?? su estado de cuenta',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(447,'2021-06-08 05:50:57','Consult?? su estado de cuenta',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(448,'2021-06-08 05:51:06','Consult?? su estado de cuenta',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(449,'2021-06-08 05:58:38','Consult?? su estado de cuenta',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(450,'2021-06-08 05:58:53','Consult?? su estado de cuenta',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(451,'2021-06-08 06:04:37','Consult?? su estado de cuenta',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(452,'2021-06-08 06:04:46','Consult?? su estado de cuenta',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(453,'2021-06-08 06:14:27','Consult?? su estado de cuenta',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(454,'2021-06-08 06:24:12','Consult?? su estado de cuenta',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(455,'2021-06-08 06:29:24','Consult?? su estado de cuenta',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(456,'2021-06-08 06:31:40','Consult?? su estado de cuenta',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(457,'2021-06-08 06:35:43','Realiz?? una transferencia',50000.00,200.00,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'dvdvdvfv',111111111),(458,'2021-06-08 06:36:58','Consult?? su estado de cuenta',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(459,'2021-06-08 06:37:50','Consult?? su estado de cuenta',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(460,'2021-06-08 06:46:09','Consult?? su estado de cuenta',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(461,'2021-06-08 06:48:57','Consult?? su estado de cuenta',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(462,'2021-06-08 06:55:17','Realiz?? una transferencia',99970288.00,2000.00,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'0.jhnh3rnqj',987654321),(463,'2021-06-08 06:55:22','Consult?? su estado de cuenta',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(464,'2021-06-08 18:59:30','Consult?? su estado de cuenta',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(465,'2021-06-08 18:59:41','Consult?? su estado de cuenta',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(466,'2021-06-08 19:01:56','Consult?? su estado de cuenta',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(467,'2021-06-08 19:02:29','Realiz?? una transferencia',49015100.00,2000.00,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'0.27jaq14dh',123456789),(468,'2021-06-08 19:02:35','Consult?? su estado de cuenta',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(469,'2021-06-08 23:54:10','Realiz?? una transferencia',48515100.00,500000.00,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'0.4m5ae0b3h',123456789),(470,'2021-06-08 23:54:17','Consult?? su estado de cuenta',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(471,'2021-06-08 23:54:37','Consult?? su estado de cuenta',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(472,'2021-06-09 00:01:20','Consult?? su estado de cuenta',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(473,'2021-06-09 00:06:12','Realiz?? una transferencia',100470288.00,2000.00,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'0.uw6kwktbv',987654321),(474,'2021-06-09 00:06:54','Consult?? su estado de cuenta',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(475,'2021-06-09 00:09:40','Realiz?? una transferencia',100468288.00,2000.00,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'0.44heh4rzn',987654321),(476,'2021-06-09 00:22:20','Realiz?? una transferencia',100466288.00,2000.00,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'0.t40eetvta',987654321),(477,'2021-06-09 00:22:43','Consult?? su estado de cuenta',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(478,'2021-06-09 00:27:19','Realiz?? una transferencia',24870.00,2000.00,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'0.tnc36psoy',123456789),(479,'2021-06-09 00:27:26','Consult?? su estado de cuenta',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(480,'2021-06-09 00:29:54','Consult?? su estado de cuenta',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(481,'2021-06-09 00:30:49','Realiz?? una transferencia',24770.00,100.00,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'0.3jn7733td',123456789),(482,'2021-06-09 00:32:46','Realiz?? una transferencia',22770.00,2000.00,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'0.50wkdb4oe',123456789),(483,'2021-06-09 00:40:08','Realiz?? una transferencia',100420384.00,50000.00,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'0.lh2he99bp',111111111),(484,'2021-06-09 00:40:52','Consult?? su estado de cuenta',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(485,'2021-06-09 00:41:35','Consult?? su estado de cuenta',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(486,'2021-06-09 00:47:50','Realiz?? una transferencia',100418384.00,2000.00,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'0.2k3ieqbpj',111111111),(487,'2021-06-09 00:50:20','Realiz?? una transferencia',99862928.00,555454.00,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'0.1ub6u0f93',111111111),(488,'2021-06-09 00:56:47','Realiz?? una transferencia',99862880.00,45.00,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'0.y1g5qtbhw',111111111),(489,'2021-06-09 00:57:16','Consult?? su estado de cuenta',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(490,'2021-06-09 00:57:24','Consult?? su estado de cuenta',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(491,'2021-06-09 01:00:51','Realiz?? una transferencia',99860880.00,2000.00,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'0.y4szspme3',111111111),(492,'2021-06-09 01:05:29','Realiz?? una transferencia',99858880.00,2000.00,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'0.inriebcqq',111111111),(493,'2021-06-09 01:06:08','Consult?? su estado de cuenta',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(494,'2021-06-09 01:10:14','Realiz?? una transferencia',47521100.00,1000000.00,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'0.6v2s5in19',111111111),(495,'2021-06-09 01:10:44','Consult?? su estado de cuenta',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(496,'2021-06-09 01:29:51','Realiz?? una transferencia',99856880.00,2000.00,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'0.v203w8x4f',111111111),(497,'2021-06-09 01:30:22','Consult?? su estado de cuenta',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(498,'2021-06-09 01:34:06','Realiz?? una transferencia',99854880.00,2000.00,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'0.x7bh3mwtf',111111111),(499,'2021-06-09 01:34:46','Consult?? su estado de cuenta',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(500,'2021-06-09 01:36:41','Realiz?? una transferencia',99854832.00,50.00,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'0.thcrh6b69',111111111),(501,'2021-06-09 01:40:16','Consult?? su estado de cuenta',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(502,'2021-06-09 03:10:28','Realiz?? una transferencia',99852832.00,2000.00,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'0.2uxxlqrb4',111111111),(503,'2021-06-09 03:10:54','Consult?? su estado de cuenta',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(504,'2021-06-09 03:19:57','Realiz?? una transferencia',99850832.00,2000.00,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'0.w0qhrv4w6',111111111),(505,'2021-06-09 03:20:34','Consult?? su estado de cuenta',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(506,'2021-06-09 03:45:50','Realiz?? una transferencia',99849832.00,1000.00,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'0.abwr1ariv',111111111),(507,'2021-06-09 04:27:06','Realiz?? una transferencia',99847832.00,2000.00,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'0.ao8hi78b6',111111111),(508,'2021-06-09 04:29:19','Consult?? su estado de cuenta',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(509,'2021-06-09 04:57:31','Efectu?? una consulta de saldo',99847832.00,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(510,'2021-06-09 04:57:34','Consult?? su estado de cuenta',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(511,'2021-06-09 04:57:47','Efectu?? un deposito a su cuenta',99848336.00,NULL,500.00,NULL,NULL,NULL,NULL,NULL,NULL,'0.qrjn394kf',NULL),(512,'2021-06-09 04:57:50','Consult?? su estado de cuenta',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(513,'2021-06-09 05:02:48','Efectu?? una consulta de saldo',99848336.00,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(514,'2021-06-09 05:02:50','Consult?? su estado de cuenta',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(515,'2021-06-09 05:03:50','Consult?? su estado de cuenta',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(516,'2021-06-09 05:13:51','Efectu?? una consulta de saldo',1645319.00,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(517,'2021-06-09 05:13:55','Efectu?? un retiro a su cuenta',1644819.00,500.00,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'0.3by4mwe8b',NULL),(518,'2021-06-09 05:14:00','Efectu?? un deposito a su cuenta',1646819.00,NULL,2000.00,NULL,NULL,NULL,NULL,NULL,NULL,'0.pvqvb9o9g',NULL),(519,'2021-06-09 05:14:06','Consult?? su estado de cuenta',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(520,'2021-06-09 05:15:26','Consult?? su estado de cuenta',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(521,'2021-06-09 07:18:15','Consult?? su estado de cuenta',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(522,'2021-06-10 00:20:49','Consult?? su estado de cuenta',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(523,'2021-06-10 00:46:20','Consult?? su estado de cuenta',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(524,'2021-06-10 00:46:28','Efectu?? una consulta de saldo',99848336.00,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(525,'2021-06-10 00:47:39','Efectu?? una consulta de saldo',99848336.00,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(526,'2021-06-10 01:28:32','Efectu?? una consulta de saldo',5000000000.00,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(527,'2021-06-10 01:28:43','Consult?? su estado de cuenta',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `operacion` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-06-09 20:40:22
