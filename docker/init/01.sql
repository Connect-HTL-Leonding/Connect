CREATE DATABASE IF NOT EXISTS `keycloak`;
CREATE USER 'keycloak'@'localhost' IDENTIFIED BY 'password';
GRANT ALL ON `keycloak`.* TO 'keycloak'@'localhost';