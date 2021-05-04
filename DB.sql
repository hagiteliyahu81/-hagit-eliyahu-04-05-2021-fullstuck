-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema weather
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema weather
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `weather` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `weather` ;

-- -----------------------------------------------------
-- Table `weather`.`weatherlog`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `weather`.`weatherlog` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `city_id` INT NOT NULL,
  `temperature` DECIMAL(2,0) NOT NULL,
  `update_date` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `weather_icon` VARCHAR(45) NOT NULL,
  `weather_text` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE)
ENGINE = InnoDB
AUTO_INCREMENT = 19
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

USE `weather` ;

-- -----------------------------------------------------
-- procedure sp_get_last_temp
-- -----------------------------------------------------

DELIMITER $$
USE `weather`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_get_last_temp`(IN city_id int)
BEGIN
	select *
    from weather.weatherlog as w
    where 215854=w.city_id
    order by w.update_date desc
    limit 1;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure sp_get_last_temperature
-- -----------------------------------------------------

DELIMITER $$
USE `weather`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_get_last_temperature`(IN city_id int)
BEGIN
	select *
    from weather.weatherlog as w
    where city_id=w.city_id
    order by w.update_date desc
    limit 1;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure sp_insert
-- -----------------------------------------------------

DELIMITER $$
USE `weather`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_insert`(city_id int,temp int)
BEGIN
	INSERT INTO `weather`.`weatherlog` (`city_id`, `temp`) VALUES (city_id, temp);
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure sp_insert_temp
-- -----------------------------------------------------

DELIMITER $$
USE `weather`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_insert_temp`(city_id int,temp int)
BEGIN
	INSERT INTO `weather`.`weatherlog` (`city_id`, `temp`) VALUES (city_id, temp);
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure sp_insert_temperature
-- -----------------------------------------------------

DELIMITER $$
USE `weather`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_insert_temperature`(city_id int,temperature decimal(2),weather_icon int,weather_text varchar(50))
BEGIN
	INSERT INTO `weather`.`weatherlog` (`city_id`, `temperature`, `weather_icon`, `weather_text`) VALUES (city_id, temperature,weather_icon,weather_text);
END$$

DELIMITER ;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
