-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema bancomestrado
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema bancomestrado
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `bancomestrado` DEFAULT CHARACTER SET utf8 ;
USE `bancomestrado` ;

-- -----------------------------------------------------
-- Table `bancomestrado`.`usuarios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bancomestrado`.`usuarios` (
  `id_usuario` INT NOT NULL,
  `nome_usuario` VARCHAR(45) NULL,
  `cargo_usuario` VARCHAR(45) NULL,
  `identificador_usuario` VARCHAR(45) NULL,
  `senha_usuario` VARCHAR(45) NULL,
  `datacad_usuario` DATE NULL,
  `status_usuario` VARCHAR(45) NULL,
  PRIMARY KEY (`id_usuario`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `bancomestrado`.`frutas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bancomestrado`.`frutas` (
  `id_fruta` INT NOT NULL,
  `nome_fruta` VARCHAR(45) NULL,
  `cultivar_fruta` VARCHAR(45) NULL,
  `lote_fruta` VARCHAR(45) NULL,
  `safra_fruta` DATE NULL,
  `colheita_fruta` DATE NULL,
  `datacad_fruta` DATE NULL,
  `status_fruta` VARCHAR(45) NULL,
  PRIMARY KEY (`id_fruta`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `bancomestrado`.`camaras`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bancomestrado`.`camaras` (
  `id_camara` INT NOT NULL,
  `posicao_camara` VARCHAR(45) NULL,
  `tamanho_camara` VARCHAR(45) NULL,
  `datacad_camara` DATE NULL,
  `status_camara` VARCHAR(45) NULL,
  PRIMARY KEY (`id_camara`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `bancomestrado`.`atividades`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bancomestrado`.`atividades` (
  `id_atividade` INT NOT NULL,
  `nome_atividade` VARCHAR(45) NULL,
  `modoop_atividade` VARCHAR(45) NULL,
  `setpointO2_atividade` VARCHAR(45) NULL,
  `setpointCO2_atividade` VARCHAR(45) NULL,
  `datainicial_atividade` DATETIME NULL,
  `datafinal_atividade` DATETIME NULL,
  `datacad_atividade` DATETIME NULL,
  `status_atividade` VARCHAR(45) NULL,
  `frutas_id_fruta` INT NOT NULL,
  `camaras_id_camara` INT NOT NULL,
  `usuarios_id_usuario` INT NOT NULL,
  PRIMARY KEY (`id_atividade`),
  INDEX `fk_atividades_frutas1_idx` (`frutas_id_fruta` ASC),
  INDEX `fk_atividades_camaras1_idx` (`camaras_id_camara` ASC),
  INDEX `fk_atividades_usuarios1_idx` (`usuarios_id_usuario` ASC),
  CONSTRAINT `fk_atividades_frutas1`
    FOREIGN KEY (`frutas_id_fruta`)
    REFERENCES `bancomestrado`.`frutas` (`id_fruta`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_atividades_camaras1`
    FOREIGN KEY (`camaras_id_camara`)
    REFERENCES `bancomestrado`.`camaras` (`id_camara`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_atividades_usuarios1`
    FOREIGN KEY (`usuarios_id_usuario`)
    REFERENCES `bancomestrado`.`usuarios` (`id_usuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `bancomestrado`.`qualidades`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bancomestrado`.`qualidades` (
  `id_qualidade` INT NOT NULL,
  `acidez_qualiade` FLOAT NULL,
  `iiodoamido_qualidade` FLOAT NULL,
  `datacad_qualidade` DATE NULL,
  `atividades_id_atividade` INT NOT NULL,
  PRIMARY KEY (`id_qualidade`),
  INDEX `fk_qualidades_atividades1_idx` (`atividades_id_atividade` ASC),
  CONSTRAINT `fk_qualidades_atividades1`
    FOREIGN KEY (`atividades_id_atividade`)
    REFERENCES `bancomestrado`.`atividades` (`id_atividade`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `bancomestrado`.`sensores`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bancomestrado`.`sensores` (
  `id_sensor` INT NOT NULL,
  `nome_sensor` VARCHAR(45) NULL,
  `tipo_sensor` VARCHAR(45) NULL,
  `datadac_sensor` DATE NULL,
  PRIMARY KEY (`id_sensor`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `bancomestrado`.`dados`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bancomestrado`.`dados` (
  `id_dado` INT NOT NULL,
  `valor_dado` VARCHAR(45) NULL,
  `datacad_dado` DATETIME NULL,
  `status_dado` VARCHAR(45) NULL,
  `sensores_id_sensor` INT NOT NULL,
  `atividades_id_atividade` INT NOT NULL,
  PRIMARY KEY (`id_dado`),
  INDEX `fk_dados_sensores1_idx` (`sensores_id_sensor` ASC),
  INDEX `fk_dados_atividades1_idx` (`atividades_id_atividade` ASC),
  CONSTRAINT `fk_dados_sensores1`
    FOREIGN KEY (`sensores_id_sensor`)
    REFERENCES `bancomestrado`.`sensores` (`id_sensor`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_dados_atividades1`
    FOREIGN KEY (`atividades_id_atividade`)
    REFERENCES `bancomestrado`.`atividades` (`id_atividade`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `bancomestrado`.`saidas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bancomestrado`.`saidas` (
  `id_saida` INT NOT NULL,
  `rele1_saida` INT NULL,
  `rele2_saida` INT NULL,
  `rele3_saida` INT NULL,
  `rele4_saida` INT NULL,
  `rele5_saida` INT NULL,
  `rele6_saida` INT NULL,
  `rele7_saida` INT NULL,
  `rele8_saida` INT NULL,
  `rele9_saida` INT NULL,
  `rele10_saida` INT NULL,
  `rele11_saida` INT NULL,
  `rele12_saida` INT NULL,
  `rele13_saida` INT NULL,
  `rele14_saida` INT NULL,
  `rele15_saida` INT NULL,
  `rele16_saida` INT NULL,
  `rele17_saida` INT NULL,
  `rele18_saida` INT NULL,
  `rele19_saida` INT NULL,
  `rele20_saida` INT NULL,
  `rele21_saida` INT NULL,
  `data_saida` DATETIME NULL,
  PRIMARY KEY (`id_saida`))
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
