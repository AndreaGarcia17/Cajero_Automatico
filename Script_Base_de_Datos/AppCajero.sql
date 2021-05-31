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
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cliente`
--

LOCK TABLES `cliente` WRITE;
/*!40000 ALTER TABLE `cliente` DISABLE KEYS */;
INSERT INTO `cliente` VALUES (1,'Diego','Abarca','Rodriguez'),(2,'Jose Emmanuel','Navarrete','Garcia'),(3,'Andrea','Garcia','Lugo'),(4,'Fulano','tal','tal'),(5,'Juan','Perez','R'),(6,'Jose','Perez','R'),(7,'Pedro','Lopez','R'),(13,'prueba3','A','C'),(15,'prueba','A','C');
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
  `saldo` int(20) NOT NULL,
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
INSERT INTO `cuenta` VALUES (111111111,'2025-12-18',1234,26370,3,1),(121212120,'2021-06-05',4321,500000,13,1),(121212121,'2025-07-23',1234,1000,13,1),(123456789,'2024-05-17',1234,14387,1,1),(222222222,'0000-00-00',1234,1000,4,1),(333333333,'2021-05-28',1234,1000,5,1),(414141414,'2021-05-28',1234,1000,15,1),(444444444,'2021-05-28',1234,1000,6,1),(555555555,'2021-07-09',1234,0,7,3),(987654321,'2023-06-10',1234,15500,2,1);
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
) ENGINE=InnoDB AUTO_INCREMENT=6965 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cuentaoperacion`
--

LOCK TABLES `cuentaoperacion` WRITE;
/*!40000 ALTER TABLE `cuentaoperacion` DISABLE KEYS */;
INSERT INTO `cuentaoperacion` VALUES (6944,271,123456789),(6945,270,123456789),(6946,269,123456789),(6947,268,123456789),(6948,267,123456789),(6949,266,123456789),(6950,265,123456789),(6951,274,987654321),(6952,273,987654321),(6953,272,987654321),(6954,277,123456789),(6955,276,123456789),(6956,275,123456789),(6957,278,123456789),(6962,284,123456789),(6963,283,123456789),(6964,285,123456789);
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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=286 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `operacion`
--

LOCK TABLES `operacion` WRITE;
/*!40000 ALTER TABLE `operacion` DISABLE KEYS */;
INSERT INTO `operacion` VALUES (265,'2021-05-27 04:11:38','Efectuó una consulta de saldo'),(266,'2021-05-27 04:11:52','Efectuó un deposito a su cuenta'),(267,'2021-05-27 04:12:11','Efectuó una transferencia'),(268,'2021-05-27 04:12:33','Efectuó un retiro a su cuenta'),(269,'2021-05-27 04:12:43','Cambio de PIN'),(270,'2021-05-27 04:12:51','Cambio de PIN'),(271,'2021-05-27 04:12:58','Consultó su estado cuenta'),(272,'2021-05-27 04:13:44','Efectuó una consulta de saldo'),(273,'2021-05-27 04:13:51','Efectuó un retiro a su cuenta'),(274,'2021-05-27 04:13:55','Consultó su estado cuenta'),(275,'2021-05-27 04:14:43','Efectuó una consulta de saldo'),(276,'2021-05-27 04:14:50','Efectuó un deposito a su cuenta'),(277,'2021-05-27 04:14:56','Consultó su estado cuenta'),(278,'2021-05-27 05:14:22','Consultó su estado cuenta'),(279,'2021-05-28 17:39:56','Efectuó una consulta de saldo'),(280,'2021-05-28 17:40:05','Efectuó un retiro a su cuenta'),(281,'2021-05-28 17:40:17','Efectuó una transferencia'),(282,'2021-05-28 17:40:24','Consultó su estado cuenta'),(283,'2021-05-29 02:38:44','Efectuó una consulta de saldo'),(284,'2021-05-29 02:38:50','Consultó su estado cuenta'),(285,'2021-05-29 02:42:33','Consultó su estado cuenta');
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

-- Dump completed on 2021-05-30 22:37:29
