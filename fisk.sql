-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Vært: 127.0.0.1
-- Genereringstid: 22. 06 2018 kl. 11:21:54
-- Serverversion: 10.1.30-MariaDB
-- PHP-version: 7.2.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `fisk`
--

-- --------------------------------------------------------

--
-- Struktur-dump for tabellen `farver`
--

CREATE TABLE `farver` (
  `farve_id` int(11) NOT NULL,
  `farve_navn` varchar(16) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Data dump for tabellen `farver`
--

INSERT INTO `farver` (`farve_id`, `farve_navn`) VALUES
(1, 'gul'),
(2, 'rød'),
(3, 'sort'),
(4, 'blå');

-- --------------------------------------------------------

--
-- Struktur-dump for tabellen `fisk`
--

CREATE TABLE `fisk` (
  `fisk_id` int(11) NOT NULL,
  `fisk_navn` varchar(32) NOT NULL,
  `fisk_koen` varchar(8) NOT NULL,
  `fk_farve_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Data dump for tabellen `fisk`
--

INSERT INTO `fisk` (`fisk_id`, `fisk_navn`, `fisk_koen`, `fk_farve_id`) VALUES
(1, 'Gubbi', 'han', 4),
(2, 'Snubbi500', 'han', 3),
(7, 'david', 'hun', 3),
(8, 'lotte', 'hun', 2),
(13, 'Jack', 'han', 3);

--
-- Begrænsninger for dumpede tabeller
--

--
-- Indeks for tabel `farver`
--
ALTER TABLE `farver`
  ADD PRIMARY KEY (`farve_id`);

--
-- Indeks for tabel `fisk`
--
ALTER TABLE `fisk`
  ADD PRIMARY KEY (`fisk_id`),
  ADD KEY `farve_fk_id` (`fk_farve_id`);

--
-- Brug ikke AUTO_INCREMENT for slettede tabeller
--

--
-- Tilføj AUTO_INCREMENT i tabel `farver`
--
ALTER TABLE `farver`
  MODIFY `farve_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Tilføj AUTO_INCREMENT i tabel `fisk`
--
ALTER TABLE `fisk`
  MODIFY `fisk_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- Begrænsninger for dumpede tabeller
--

--
-- Begrænsninger for tabel `fisk`
--
ALTER TABLE `fisk`
  ADD CONSTRAINT `fisk_ibfk_1` FOREIGN KEY (`fk_farve_id`) REFERENCES `farver` (`farve_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
