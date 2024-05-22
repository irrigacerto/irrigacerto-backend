-- MariaDB dump 10.19-11.0.2-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: db_irrigation_management_prod
-- ------------------------------------------------------
-- Server version	11.0.2-MariaDB-1:11.0.2+maria~ubu2004

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
-- Table structure for table `calc`
--

DROP TABLE IF EXISTS `calc`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `calc` (
  `id_calc` int(11) NOT NULL AUTO_INCREMENT,
  `armazenamento_inicial_primeiro_dia` float DEFAULT NULL,
  `total_dias_estagio` float DEFAULT NULL,
  `armazenamento_final_dia_anterior` float DEFAULT NULL,
  `lamina_liquida_previa_dia_anterior` float DEFAULT NULL,
  `percentual_area_sombreada_previa` float DEFAULT NULL,
  `percentual_area_sombreada_corrigida` float DEFAULT NULL,
  `ponto_murcha_calculado` float DEFAULT NULL,
  `capacidade_campo_calculado` float DEFAULT NULL,
  `umidade_critica_percentual` float DEFAULT NULL,
  `umidade_critica` float DEFAULT NULL,
  `disponibilidade_total_agua` float DEFAULT NULL,
  `lamina_armazenamento` float DEFAULT NULL,
  `lamina_armazenada` float DEFAULT NULL,
  `ks` float DEFAULT NULL,
  `kc_ajustado` float DEFAULT NULL,
  `kc_limite` float DEFAULT NULL,
  `etc_dia_atual_cultura` float DEFAULT NULL,
  `etc_dia_atual_cultura_corrigida` float DEFAULT NULL,
  `lamina_liquida_sem_correcao` float DEFAULT NULL,
  `lamina_liquida` float DEFAULT NULL,
  `lamina_bruta` float DEFAULT NULL,
  `intensidade_aplicacao` float DEFAULT NULL,
  `tempo_irrigacao` float DEFAULT NULL,
  `lamina_total` float DEFAULT NULL,
  `agua_facilmente_disponivel` float DEFAULT NULL,
  `armazenamento_inicial_dia_atual` float DEFAULT NULL,
  `armazenamento_final_dia_atual` float DEFAULT NULL,
  `excesso_deficit` float DEFAULT NULL,
  `quantidade_total_agua` float DEFAULT NULL,
  `volume_aplicado_area_total` float DEFAULT NULL,
  `volume_aplicado_setor` float DEFAULT NULL,
  `tempo_irrigacao_sugerido_area_total` varchar(45) DEFAULT NULL,
  `tempo_irrigacao_sugerido_area_setor` varchar(45) DEFAULT NULL,
  `created_at` date DEFAULT NULL,
  `primeiro_calculo` tinyint(4) DEFAULT NULL,
  `decisao` varchar(45) DEFAULT NULL,
  `tipo_calculo` varchar(100) DEFAULT NULL,
  `calc_id` int(11) DEFAULT NULL,
  `id_cultura` int(11) NOT NULL,
  PRIMARY KEY (`id_calc`),
  KEY `fk_calculo_cultura1_idx` (`id_cultura`),
  CONSTRAINT `fk_calculo_cultura1` FOREIGN KEY (`id_cultura`) REFERENCES `cultura` (`id_cultura`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `cultura`
--

DROP TABLE IF EXISTS `cultura`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cultura` (
  `id_cultura` int(11) NOT NULL AUTO_INCREMENT,
  `nome_cultura` varchar(45) NOT NULL,
  `data_plantio` date NOT NULL,
  `area_plantio` float NOT NULL,
  `estagio_colheita` int(11) NOT NULL,
  `status_cultura` tinyint(4) DEFAULT 1,
  `id_dados_cultura` int(11) NOT NULL,
  `id_propriedade` int(11) NOT NULL,
  `id_sistema_irrigacao` int(11) NOT NULL,
  `id_motobomba` int(11) NOT NULL,
  `id_solo` int(11) NOT NULL,
  PRIMARY KEY (`id_cultura`),
  KEY `fk_cultura_dados_cultura` (`id_dados_cultura`),
  KEY `fk_cultura_sistema_irrigacao1` (`id_sistema_irrigacao`),
  KEY `fk_cultura_motobomba1` (`id_motobomba`),
  KEY `fk_cultura_solo1` (`id_solo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'IGNORE_SPACE,STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`user_irrigation_management_prod`@`%`*/ /*!50003 TRIGGER `cultura_AFTER_INSERT` AFTER INSERT ON `cultura` FOR EACH ROW
BEGIN
    DECLARE data_plantio DATE;
    DECLARE dias_ate_hoje INT;

    SET data_plantio = NEW.data_plantio;
    SET dias_ate_hoje = DATEDIFF(CURDATE(), data_plantio);

    INSERT INTO calc (id_cultura, primeiro_calculo, created_at, total_dias_estagio, tipo_calculo, decisao)
    VALUES (NEW.id_cultura, 1, CURDATE(), dias_ate_hoje, 'visualization', 'Não Irrigar');
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `dados_cultura`
--

DROP TABLE IF EXISTS `dados_cultura`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `dados_cultura` (
  `id_dados_cultura` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(45) DEFAULT NULL,
  `segmento` varchar(45) DEFAULT NULL,
  `perene` tinyint(4) DEFAULT NULL,
  `temporaria` tinyint(4) DEFAULT NULL,
  `profundidade_sistema_radicular` float DEFAULT NULL,
  `fator` float DEFAULT NULL,
  `estagio1` float DEFAULT NULL,
  `duracao_estagio1` int(11) DEFAULT NULL,
  `estagio2` float DEFAULT NULL,
  `duracao_estagio2` int(11) DEFAULT NULL,
  `estagio3` float DEFAULT NULL,
  `duracao_estagio3` int(11) DEFAULT NULL,
  `estagio4` float DEFAULT NULL,
  `duracao_estagio4` int(11) DEFAULT NULL,
  `image_url` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id_dados_cultura`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `eto`
--

DROP TABLE IF EXISTS `eto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `eto` (
  `id_eto` int(11) NOT NULL AUTO_INCREMENT,
  `eto_dia_atual` float DEFAULT NULL,
  `eto_dia_anterior` float DEFAULT NULL,
  `created_at` date DEFAULT NULL,
  `id_propriedade` int(11) NOT NULL,
  PRIMARY KEY (`id_eto`),
  KEY `fk_eto_propriedade1_idx` (`id_propriedade`),
  CONSTRAINT `fk_eto_propriedade1` FOREIGN KEY (`id_propriedade`) REFERENCES `propriedade` (`id_propriedade`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `motobomba`
--

DROP TABLE IF EXISTS `motobomba`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `motobomba` (
  `id_motobomba` int(11) NOT NULL AUTO_INCREMENT,
  `fabricante` varchar(45) DEFAULT NULL,
  `potencia` varchar(45) DEFAULT NULL,
  `vazao_maxima` float DEFAULT NULL,
  `ativada` tinyint(4) DEFAULT NULL,
  `id_propriedade` int(11) NOT NULL,
  PRIMARY KEY (`id_motobomba`),
  KEY `fk_motobomba_propriedade1` (`id_propriedade`),
  CONSTRAINT `fk_motobomba_propriedade1` FOREIGN KEY (`id_propriedade`) REFERENCES `propriedade` (`id_propriedade`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `propriedade`
--

DROP TABLE IF EXISTS `propriedade`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `propriedade` (
  `id_propriedade` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(45) NOT NULL,
  `latitude` varchar(45) NOT NULL,
  `longitude` varchar(45) NOT NULL,
  `cidade` varchar(45) NOT NULL,
  `estado` varchar(45) NOT NULL,
  `cep` varchar(45) NOT NULL,
  `area_propriedade` float NOT NULL,
  `precipitacao` float NOT NULL,
  `id_user` int(11) NOT NULL,
  PRIMARY KEY (`id_propriedade`),
  KEY `fk_propriedade_users1` (`id_user`),
  CONSTRAINT `fk_propriedade_users1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `sistema_irrigacao`
--

DROP TABLE IF EXISTS `sistema_irrigacao`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sistema_irrigacao` (
  `id_sistema_irrigacao` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(45) NOT NULL,
  `quantidade_setores` int(11) NOT NULL,
  `tipo_irrigacao` int(11) NOT NULL,
  `area_irrigada` float NOT NULL,
  `espacamento_linha` float NOT NULL,
  `coeficiente_uniformidade` float NOT NULL,
  `eficiencia_sistema` float NOT NULL,
  `vazao_asperssor` float DEFAULT NULL,
  `espacamento_asperssor` float DEFAULT NULL,
  `vazao_emissor` float DEFAULT NULL,
  `espacamento_emissor` float DEFAULT NULL,
  `percentual_area_molhada` float DEFAULT NULL,
  `percentual_area_sombreada` float DEFAULT NULL,
  `ativo` tinyint(4) DEFAULT NULL,
  `id_propriedade` int(11) NOT NULL,
  PRIMARY KEY (`id_sistema_irrigacao`),
  KEY `fk_sistema_irrigacao_propriedade1` (`id_propriedade`),
  CONSTRAINT `fk_sistema_irrigacao_propriedade1` FOREIGN KEY (`id_propriedade`) REFERENCES `propriedade` (`id_propriedade`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `solo`
--

DROP TABLE IF EXISTS `solo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `solo` (
  `id_solo` int(11) NOT NULL AUTO_INCREMENT,
  `tipo_solo` varchar(45) DEFAULT NULL,
  `capacidade_campo` float DEFAULT NULL,
  `ponto_murcha` float DEFAULT NULL,
  `densidade` float DEFAULT NULL,
  `id_propriedade` int(11) NOT NULL,
  PRIMARY KEY (`id_solo`),
  KEY `fk_solo_propriedade1` (`id_propriedade`),
  CONSTRAINT `fk_solo_propriedade1` FOREIGN KEY (`id_propriedade`) REFERENCES `propriedade` (`id_propriedade`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `celular` varchar(45) DEFAULT NULL,
  `cep` varchar(45) DEFAULT NULL,
  `cidade` varchar(45) DEFAULT NULL,
  `estado` varchar(45) DEFAULT NULL,
  `password` varchar(250) NOT NULL,
  `reset_password_token` varchar(255) DEFAULT NULL,
  `reset_password_expires` timestamp NULL DEFAULT NULL,
  `roles` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`roles`)),
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping routines for database 'db_irrigation_management_prod'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-05-04  8:58:00
