-- -----------------------------------------------------
-- Table `unida_evento3`.`tipoPersona`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `unida_evento3`.`tipoPersona` (
  `idTipoPersona` INT NOT NULL AUTO_INCREMENT,
  `descripcionTipoPersona` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`idTipoPersona`),
  UNIQUE INDEX `idTipoPersona_UNIQUE` (`idTipoPersona` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `unida_evento3`.`persona`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `unida_evento3`.`persona` (
  `idPersona` INT NOT NULL AUTO_INCREMENT,
  `nombreCompletoPersona` VARCHAR(255) NOT NULL,
  `cedulaPersona` VARCHAR(45) NOT NULL,
  `sexoPersona` ENUM('F', 'M') NOT NULL,
  `idTipoPersona` INT NOT NULL,
  PRIMARY KEY (`idPersona`),
  UNIQUE INDEX `cedulaPersona_UNIQUE` (`cedulaPersona` ASC),
  UNIQUE INDEX `idPersona_UNIQUE` (`idPersona` ASC),
  INDEX `fk_persona_tipoPersona1_idx` (`idTipoPersona` ASC),
  CONSTRAINT `fk_persona_tipoPersona1`
    FOREIGN KEY (`idTipoPersona`)
    REFERENCES `unida_evento3`.`tipoPersona` (`idTipoPersona`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `unida_evento3`.`participante`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `unida_evento3`.`participante` (
  `idParticipante` INT NOT NULL AUTO_INCREMENT,
  `matriculaParticipante` VARCHAR(45) NOT NULL,
  `nombreCompletoParticipante` VARCHAR(255) NOT NULL,
  `carreraParticipante` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`idParticipante`),
  UNIQUE INDEX `matricula_UNIQUE` (`matriculaParticipante` ASC),
  UNIQUE INDEX `idAlumno_UNIQUE` (`idParticipante` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `unida_evento3`.`lugar`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `unida_evento3`.`lugar` (
  `idLugar` INT NOT NULL AUTO_INCREMENT,
  `nombreLugar` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`idLugar`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `unida_evento3`.`ubicacion`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `unida_evento3`.`ubicacion` (
  `idUbicacion` INT NOT NULL AUTO_INCREMENT,
  `nombreUbicacion` VARCHAR(100) NOT NULL,
  `descripcionUbicacion` VARCHAR(255) NULL,
  `idLugar` INT NOT NULL,
  PRIMARY KEY (`idUbicacion`),
  INDEX `fk_ubicacion_lugar1_idx` (`idLugar` ASC),
  CONSTRAINT `fk_ubicacion_lugar1`
    FOREIGN KEY (`idLugar`)
    REFERENCES `unida_evento3`.`lugar` (`idLugar`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `unida_evento3`.`evento`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `unida_evento3`.`evento` (
  `idEvento` INT NOT NULL AUTO_INCREMENT,
  `nombreEvento` VARCHAR(255) NOT NULL,
  `fechaEvento` DATE NOT NULL,
  `idUbicacion` INT NOT NULL,
  `horarioDesdeEvento` DATETIME NOT NULL,
  `horarioHastaEvento` DATETIME NOT NULL,
  `estadoEvento` ENUM('proximamente', 'en proceso', 'terminado') NOT NULL,
  PRIMARY KEY (`idEvento`),
  UNIQUE INDEX `idEvento_UNIQUE` (`idEvento` ASC),
  INDEX `fk_evento_ubicacion1_idx` (`idUbicacion` ASC),
  CONSTRAINT `fk_evento_ubicacion1`
    FOREIGN KEY (`idUbicacion`)
    REFERENCES `unida_evento3`.`ubicacion` (`idUbicacion`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `unida_evento3`.`pulsera`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `unida_evento3`.`pulsera` (
  `idPulsera` INT NOT NULL AUTO_INCREMENT,
  `codigoPulsera` VARCHAR(25) NOT NULL,
  `estadoPulsera` ENUM('disponible', 'entregado') NOT NULL,
  `PulseraGanador` TINYINT NOT NULL DEFAULT 0,
  PRIMARY KEY (`idPulsera`),
  UNIQUE INDEX `codigoPulsera_UNIQUE` (`codigoPulsera` ASC),
  UNIQUE INDEX `idPulsera_UNIQUE` (`idPulsera` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `unida_evento3`.`asistenciaEvento`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `unida_evento3`.`asistenciaEvento` (
  `idAsistenciaEvento` INT NOT NULL AUTO_INCREMENT,
  `idPersona` INT NOT NULL,
  `idPulsera` INT NOT NULL,
  `idEvento` INT NOT NULL,
  `fechaHoraCreacion` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`idAsistenciaEvento`),
  INDEX `fk_asistenciaEvento_persona_idx` (`idPersona` ASC),
  INDEX `fk_asistenciaEvento_pulsera1_idx` (`idPulsera` ASC),
  INDEX `fk_asistenciaEvento_evento1_idx` (`idEvento` ASC),
  UNIQUE INDEX `id_UNIQUE` (`idAsistenciaEvento` ASC),
  CONSTRAINT `fk_asistenciaEvento_persona`
    FOREIGN KEY (`idPersona`)
    REFERENCES `unida_evento3`.`persona` (`idPersona`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_asistenciaEvento_pulsera1`
    FOREIGN KEY (`idPulsera`)
    REFERENCES `unida_evento3`.`pulsera` (`idPulsera`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_asistenciaEvento_evento1`
    FOREIGN KEY (`idEvento`)
    REFERENCES `unida_evento3`.`evento` (`idEvento`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `unida_evento3`.`eventoSecundario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `unida_evento3`.`eventoSecundario` (
  `idEventoSecundario` INT NOT NULL AUTO_INCREMENT,
  `nombreEventoSecundario` VARCHAR(100) NOT NULL,
  `descripcionEventoSecundario` TEXT NOT NULL,
  `idEvento` INT NOT NULL,
  `estadoEventoSecundario` ENUM('proximamente', 'en proceso', 'terminado') NOT NULL,
  `horarioDesdeEventoSecundario` DATETIME NOT NULL,
  `horarioHastaEventoSecundario` DATETIME NOT NULL,
  PRIMARY KEY (`idEventoSecundario`),
  INDEX `fk_subEvento_evento1_idx` (`idEvento` ASC),
  UNIQUE INDEX `idSubEvento_UNIQUE` (`idEventoSecundario` ASC),
  CONSTRAINT `fk_subEvento_evento1`
    FOREIGN KEY (`idEvento`)
    REFERENCES `unida_evento3`.`evento` (`idEvento`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `unida_evento3`.`grupo`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `unida_evento3`.`grupo` (
  `idGrupo` INT NOT NULL AUTO_INCREMENT,
  `nombreGrupo` VARCHAR(45) NOT NULL,
  `estadoPago` ENUM('pagado', 'pendiente') NOT NULL DEFAULT 'pendiente',
  `grupocol` VARCHAR(45) NULL,
  PRIMARY KEY (`idGrupo`),
  UNIQUE INDEX `idGrupo_UNIQUE` (`idGrupo` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `unida_evento3`.`administrador`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `unida_evento3`.`administrador` (
  `idAdministrador` INT NOT NULL AUTO_INCREMENT,
  `nombreCompletoAdministrador` VARCHAR(200) NOT NULL,
  `rolAdministrador` ENUM('operador', 'supervisor', 'administrador') NOT NULL,
  `correoAdministrador` VARCHAR(200) NOT NULL,
  `passwordAdministrador` VARCHAR(200) NOT NULL,
  PRIMARY KEY (`idAdministrador`),
  UNIQUE INDEX `idAdministrador_UNIQUE` (`idAdministrador` ASC),
  UNIQUE INDEX `correoAdministrador_UNIQUE` (`correoAdministrador` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `unida_evento3`.`alumno`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `unida_evento3`.`alumno` (
  `idAlumno` INT NOT NULL AUTO_INCREMENT,
  `matriculaAlumno` INT NOT NULL,
  `nombreCompletoAlumno` VARCHAR(255) NOT NULL,
  `carreraAlumno` VARCHAR(100) NOT NULL,
  `sexoAlumno` ENUM('F', 'M') NOT NULL,
  `cedulaAlumno` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idAlumno`),
  UNIQUE INDEX `maticulaAlumno_UNIQUE` (`matriculaAlumno` ASC),
  UNIQUE INDEX `idAlumno_UNIQUE` (`idAlumno` ASC),
  UNIQUE INDEX `cedulaAlumno_UNIQUE` (`cedulaAlumno` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `unida_evento3`.`tutor`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `unida_evento3`.`tutor` (
  `idTutor` INT NOT NULL AUTO_INCREMENT,
  `nombreCompletoTutor` VARCHAR(255) NOT NULL,
  `cedulaTutor` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idTutor`),
  UNIQUE INDEX `cedulaTutor_UNIQUE` (`cedulaTutor` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `unida_evento3`.`eventoSecundarioDetalle`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `unida_evento3`.`eventoSecundarioDetalle` (
  `idEventoSecundario` INT NOT NULL,
  `idGrupo` INT NOT NULL,
  PRIMARY KEY (`idEventoSecundario`, `idGrupo`),
  INDEX `fk_eventoSecundario_has_grupo_grupo1_idx` (`idGrupo` ASC),
  INDEX `fk_eventoSecundario_has_grupo_eventoSecundario1_idx` (`idEventoSecundario` ASC),
  CONSTRAINT `fk_eventoSecundario_has_grupo_eventoSecundario1`
    FOREIGN KEY (`idEventoSecundario`)
    REFERENCES `unida_evento3`.`eventoSecundario` (`idEventoSecundario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_eventoSecundario_has_grupo_grupo1`
    FOREIGN KEY (`idGrupo`)
    REFERENCES `unida_evento3`.`grupo` (`idGrupo`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `unida_evento3`.`tutoria`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `unida_evento3`.`tutoria` (
  `idTutor` INT NOT NULL,
  `idGrupo` INT NOT NULL,
  PRIMARY KEY (`idTutor`, `idGrupo`),
  INDEX `fk_tutor_has_grupo_grupo1_idx` (`idGrupo` ASC),
  INDEX `fk_tutor_has_grupo_tutor1_idx` (`idTutor` ASC),
  CONSTRAINT `fk_tutor_has_grupo_tutor1`
    FOREIGN KEY (`idTutor`)
    REFERENCES `unida_evento3`.`tutor` (`idTutor`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_tutor_has_grupo_grupo1`
    FOREIGN KEY (`idGrupo`)
    REFERENCES `unida_evento3`.`grupo` (`idGrupo`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `unida_evento3`.`participacion`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `unida_evento3`.`participacion` (
  `idParticipante` INT NOT NULL,
  `idGrupo` INT NOT NULL,
  PRIMARY KEY (`idParticipante`, `idGrupo`),
  INDEX `fk_participante_has_grupo_grupo1_idx` (`idGrupo` ASC),
  INDEX `fk_participante_has_grupo_participante1_idx` (`idParticipante` ASC),
  CONSTRAINT `fk_participante_has_grupo_participante1`
    FOREIGN KEY (`idParticipante`)
    REFERENCES `unida_evento3`.`participante` (`idParticipante`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_participante_has_grupo_grupo1`
    FOREIGN KEY (`idGrupo`)
    REFERENCES `unida_evento3`.`grupo` (`idGrupo`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

