CREATE DATABASE `mydb` /*!40100 DEFAULT CHARACTER SET utf8 */ /*!80016 DEFAULT ENCRYPTION='N' */;
CREATE TABLE `illnesses` (
  `illId` int NOT NULL AUTO_INCREMENT,
  `illType` int NOT NULL,
  `illDesc` varchar(60) NOT NULL,
  PRIMARY KEY (`illId`),
  UNIQUE KEY `Id_UNIQUE` (`illId`),
  KEY `ilnesseType_idx` (`illType`),
  CONSTRAINT `ilnesseType` FOREIGN KEY (`illType`) REFERENCES `illnessestypes` (`illTypeId`)
) ENGINE=InnoDB AUTO_INCREMENT=139 DEFAULT CHARSET=utf8;

CREATE TABLE `illnessestypes` (
  `illTypeId` int NOT NULL AUTO_INCREMENT,
  `illTypeName` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`illTypeId`),
  UNIQUE KEY `Id_UNIQUE` (`illTypeId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `notifications` (
  `notId` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `medicineName` varchar(45) DEFAULT NULL,
  `medicineFrequency` varchar(45) DEFAULT NULL,
  `illnessId` int DEFAULT NULL,
  `ifMedicine` tinyint DEFAULT NULL,
  `notDesc` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`notId`),
  KEY `userId_idx` (`userId`),
  KEY `illnessId_idx` (`illnessId`),
  CONSTRAINT `illnessId` FOREIGN KEY (`illnessId`) REFERENCES `illnesses` (`illId`),
  CONSTRAINT `userId` FOREIGN KEY (`userId`) REFERENCES `users` (`usId`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;

CREATE TABLE `questionnaireresults` (
  `id` int NOT NULL AUTO_INCREMENT,
  `creationDate` datetime NOT NULL,
  `userId` int NOT NULL,
  `description` varchar(150) NOT NULL,
  `healthLevel` varchar(45) NOT NULL,
  `medicineName` varchar(45) DEFAULT NULL,
  `temperature` varchar(45) DEFAULT NULL,
  `bloodPressure` varchar(45) DEFAULT NULL,
  `saturation` varchar(45) DEFAULT NULL,
  `pulse` varchar(45) DEFAULT NULL,
  `sympthoms` varchar(150) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userId_idx` (`userId`),
  CONSTRAINT `userId_healtcheck` FOREIGN KEY (`userId`) REFERENCES `users` (`usId`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;

CREATE TABLE `user_illness` (
  `usId` int NOT NULL,
  `illId` int NOT NULL,
  `Id` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `Id_UNIQUE` (`Id`),
  KEY `userId_idx` (`usId`),
  KEY `illId_idx` (`illId`),
  CONSTRAINT `illId` FOREIGN KEY (`illId`) REFERENCES `illnesses` (`illId`),
  CONSTRAINT `usId` FOREIGN KEY (`usId`) REFERENCES `users` (`usId`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8;

CREATE TABLE `users` (
  `usId` int NOT NULL AUTO_INCREMENT,
  `usFirstName` varchar(45) NOT NULL,
  `usLastName` varchar(45) NOT NULL,
  `usBirthDate` date NOT NULL,
  `usEmail` varchar(45) NOT NULL,
  `ifDoctor` tinyint DEFAULT NULL,
  `illnessesTypes` int DEFAULT NULL,
  `userDescription` varchar(150) DEFAULT NULL,
  `usPassword` longtext NOT NULL,
  PRIMARY KEY (`usId`),
  UNIQUE KEY `Id_UNIQUE` (`usId`),
  KEY `illnessesSpecialist_idx` (`illnessesTypes`),
  CONSTRAINT `illnessesSpecialist` FOREIGN KEY (`illnessesTypes`) REFERENCES `illnessestypes` (`illTypeId`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
