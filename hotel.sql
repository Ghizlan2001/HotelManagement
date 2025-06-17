-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : lun. 16 juin 2025 à 20:40
-- Version du serveur : 10.4.32-MariaDB
-- Version de PHP : 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `hotel`
--

-- --------------------------------------------------------

--
-- Structure de la table `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) NOT NULL,
  `value` mediumtext NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `guests`
--

CREATE TABLE `guests` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `phone_number` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `address` text NOT NULL,
  `identification_type` varchar(255) NOT NULL,
  `identification_number` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `guests`
--

INSERT INTO `guests` (`id`, `first_name`, `last_name`, `phone_number`, `email`, `address`, `identification_type`, `identification_number`, `created_at`, `updated_at`) VALUES
(1, 'John', 'Doe', '1234567890', 'john.doe@example.com', '123 Main St, Anytown, USA', 'Passport', 'A12345678', '2025-01-02 00:52:36', '2025-01-02 00:52:36'),
(2, 'Jane', 'Smith', '0987654321', 'jane.smith@example.com', '456 Elm St, Othertown, USA', 'Driver License', 'B98765432', '2025-01-02 00:52:36', '2025-01-02 00:52:36'),
(3, 'Alice', 'Johnson', '5551234567', 'alice.johnson@example.com', '789 Oak St, Sometown, USA', 'ID Card', 'C12398765', '2025-01-02 00:52:36', '2025-01-02 00:52:36'),
(4, 'Bob', 'Brown', '4449876543', 'bob.brown@example.com', '321 Pine St, Anycity, USA', 'Passport', 'D45678901', '2025-01-02 00:52:36', '2025-01-02 00:52:36'),
(5, 'Charlie', 'Davis', '3334567890', 'charlie@example.com', '654 Maple St, Othercity, USA', 'Driver License', 'E78901234', '2025-01-02 00:52:36', '2025-06-16 17:25:20'),
(6, 'Ghizlane', 'Amlal', '08765432', 'something@gmail.com', 'hajeb tikiouine agadir morocco', 'card id', 'j93847', '2025-02-18 01:13:06', '2025-02-18 01:13:06'),
(13, 'fatima zahra', 'aboutaleb', '0615497463', 'fati@gmail.com', 'hay el houda agadir', 'card id', 'J67675', '2025-03-13 02:28:25', '2025-03-13 03:09:21'),
(14, 'fati', 'abou', '0612345678', 'fatiabou@gmail.com', 'hay salam agadir', 'Passport', 'D123567', '2025-06-15 18:01:12', '2025-06-16 17:27:43');

-- --------------------------------------------------------

--
-- Structure de la table `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `queue` varchar(255) NOT NULL,
  `payload` longtext NOT NULL,
  `attempts` tinyint(3) UNSIGNED NOT NULL,
  `reserved_at` int(10) UNSIGNED DEFAULT NULL,
  `available_at` int(10) UNSIGNED NOT NULL,
  `created_at` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `job_batches`
--

CREATE TABLE `job_batches` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `total_jobs` int(11) NOT NULL,
  `pending_jobs` int(11) NOT NULL,
  `failed_jobs` int(11) NOT NULL,
  `failed_job_ids` longtext NOT NULL,
  `options` mediumtext DEFAULT NULL,
  `cancelled_at` int(11) DEFAULT NULL,
  `created_at` int(11) NOT NULL,
  `finished_at` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '0001_01_01_000000_create_users_table', 1),
(2, '0001_01_01_000001_create_cache_table', 1),
(3, '0001_01_01_000002_create_jobs_table', 1),
(4, '2024_12_26_010000_guests', 1),
(5, '2024_12_26_010009_rooms', 1),
(6, '2024_12_26_010058_reservations', 1),
(7, '2024_12_26_010116_payments', 1),
(8, '2024_12_26_010135_services', 1),
(9, '2024_12_26_010158_service_requests', 1),
(11, '2024_12_26_010242_room_types', 1),
(12, '2024_12_26_022923_create_personal_access_tokens_table', 1),
(13, '2024_12_26_162941_add_room_type_id_to_rooms_table', 1),
(14, '2024_12_26_010220_room_maintenances', 2),
(15, '2024_12_26_010220_room_maintenance', 3);

-- --------------------------------------------------------

--
-- Structure de la table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `payments`
--

CREATE TABLE `payments` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `reservation_id` bigint(20) UNSIGNED NOT NULL,
  `payment_date` date NOT NULL,
  `payment_method` varchar(255) NOT NULL,
  `amount_paid` decimal(10,2) NOT NULL,
  `payment_status` varchar(255) NOT NULL DEFAULT 'Successful',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `payments`
--

INSERT INTO `payments` (`id`, `reservation_id`, `payment_date`, `payment_method`, `amount_paid`, `payment_status`, `created_at`, `updated_at`) VALUES
(1, 1, '2024-12-02', 'Credit Card', 400.00, 'Completed', '2025-01-02 01:11:40', '2025-01-02 01:11:40'),
(2, 2, '2024-12-11', 'PayPal', 750.00, 'Pending', '2025-01-02 01:11:40', '2025-01-02 01:11:40'),
(3, 3, '2024-12-21', 'Credit Card', 1250.00, 'Completed', '2025-01-02 01:11:40', '2025-01-02 01:11:40'),
(4, 4, '2024-12-06', 'Bank Transfer', 500.00, 'Refunded', '2025-01-02 01:11:40', '2025-01-02 01:11:40'),
(5, 5, '2024-12-16', 'Credit Card', 750.00, 'Pending', '2025-01-02 01:11:40', '2025-01-02 01:11:40');

-- --------------------------------------------------------

--
-- Structure de la table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `reservations`
--

CREATE TABLE `reservations` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `guest_id` bigint(20) UNSIGNED NOT NULL,
  `room_id` bigint(20) UNSIGNED NOT NULL,
  `check_in_date` date NOT NULL,
  `check_out_date` date NOT NULL,
  `number_of_guests` int(11) NOT NULL,
  `reservation_status` varchar(255) NOT NULL DEFAULT 'Confirmed',
  `total_amount` decimal(10,2) NOT NULL,
  `payment_status` varchar(255) NOT NULL DEFAULT 'Pending',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `reservations`
--

INSERT INTO `reservations` (`id`, `guest_id`, `room_id`, `check_in_date`, `check_out_date`, `number_of_guests`, `reservation_status`, `total_amount`, `payment_status`, `created_at`, `updated_at`) VALUES
(1, 1, 1, '2024-12-01', '2024-12-05', 1, 'Confirmed', 400.00, 'Paid', '2025-01-02 01:09:49', '2025-01-02 01:09:49'),
(2, 2, 2, '2024-12-10', '2024-12-15', 2, 'Confirmed', 750.00, 'Pending', '2025-01-02 01:09:49', '2025-01-02 01:09:49'),
(3, 3, 3, '2024-12-20', '2024-12-25', 4, 'Confirmed', 1250.00, 'Paid', '2025-01-02 01:09:49', '2025-01-02 01:09:49'),
(4, 4, 4, '2024-12-05', '2024-12-10', 1, 'Cancelled', 500.00, 'Refunded', '2025-01-02 01:09:49', '2025-01-02 01:09:49'),
(5, 5, 5, '2024-12-15', '2024-12-20', 2, 'Confirmed', 750.00, 'Pending', '2025-01-02 01:09:49', '2025-01-02 01:09:49'),
(6, 1, 2, '2025-02-18', '2025-02-20', 2, 'Confirmed', 300.00, 'Pending', '2025-02-18 00:24:34', '2025-02-18 00:24:34'),
(7, 3, 1, '2025-02-20', '2025-02-21', 1, 'Pending', 100.00, 'Pending', '2025-02-18 00:59:54', '2025-02-18 00:59:54'),
(8, 4, 4, '2025-02-25', '2025-02-28', 2, 'Confirmed', 300.00, 'Completed', '2025-02-18 01:05:49', '2025-02-18 01:05:49'),
(9, 4, 3, '2025-02-27', '2025-03-01', 1, 'Confirmed', 1000.00, 'Completed', '2025-02-27 00:25:04', '2025-02-27 00:25:04'),
(11, 6, 4, '2025-03-17', '2025-03-19', 1, 'Confirmed', 200.00, 'Pending', '2025-03-06 02:57:29', '2025-03-06 02:57:29'),
(12, 2, 2, '2025-03-13', '2025-03-14', 1, 'Confirmed', 100.00, 'Completed', '2025-03-13 01:29:10', '2025-03-13 03:05:23'),
(13, 14, 2, '2025-06-15', '2025-06-19', 1, 'Pending', 600.00, 'Pending', '2025-06-15 18:01:12', '2025-06-15 18:01:12');

-- --------------------------------------------------------

--
-- Structure de la table `rooms`
--

CREATE TABLE `rooms` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `room_number` varchar(255) NOT NULL,
  `room_status` varchar(255) NOT NULL DEFAULT 'Available',
  `price_per_night` decimal(8,2) NOT NULL,
  `max_occupancy` int(11) NOT NULL,
  `description` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `room_type_id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `rooms`
--

INSERT INTO `rooms` (`id`, `room_number`, `room_status`, `price_per_night`, `max_occupancy`, `description`, `created_at`, `updated_at`, `room_type_id`) VALUES
(1, '101', 'Available', 100.00, 1, 'A cozy single room with a comfortable bed.', '2025-01-02 00:57:45', '2025-01-02 00:57:45', 1),
(2, '102', 'Occupied', 150.00, 2, 'A spacious double room with two beds.', '2025-01-02 00:57:45', '2025-01-02 00:57:45', 2),
(3, '103', 'Available', 250.00, 4, 'A luxurious suite with a living area and a king-size bed.', '2025-01-02 00:57:45', '2025-01-02 00:57:45', 3),
(4, '104', 'Maintenance', 100.00, 1, 'A single room currently under maintenance.', '2025-01-02 00:57:45', '2025-01-02 00:57:45', 4),
(5, '105', 'Available', 150.00, 2, 'A double room with a beautiful view.', '2025-01-02 00:57:45', '2025-03-13 02:58:28', 5);

-- --------------------------------------------------------

--
-- Structure de la table `room_maintenance`
--

CREATE TABLE `room_maintenance` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `room_id` bigint(20) UNSIGNED NOT NULL,
  `issue_description` text NOT NULL,
  `maintenance_status` varchar(255) NOT NULL DEFAULT 'Pending',
  `maintenance_date` date NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `room_maintenance`
--

INSERT INTO `room_maintenance` (`id`, `room_id`, `issue_description`, `maintenance_status`, `maintenance_date`, `created_at`, `updated_at`) VALUES
(1, 1, 'Air conditioning not working', 'Pending', '2024-12-03', '2025-01-02 02:08:31', '2025-03-13 02:58:04'),
(2, 2, 'Leaky faucet in bathroom', 'In Progress', '2024-12-05', '2025-01-02 02:08:31', '2025-01-02 02:08:31'),
(3, 3, 'Broken window', 'Completed', '2024-12-10', '2025-01-02 02:08:31', '2025-01-02 02:08:31'),
(4, 4, 'Stained carpet', 'Pending', '2024-12-15', '2025-01-02 02:08:31', '2025-01-02 02:08:31'),
(5, 5, 'Malfunctioning TV', 'Completed', '2024-12-20', '2025-01-02 02:08:31', '2025-01-02 02:08:31'),
(6, 5, 'Air conditioning not working', 'In Progress', '2025-01-02', '2025-03-14 14:17:05', '2025-03-14 14:17:05');

-- --------------------------------------------------------

--
-- Structure de la table `room_types`
--

CREATE TABLE `room_types` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `room_type_name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `base_price` decimal(10,2) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `room_types`
--

INSERT INTO `room_types` (`id`, `room_type_name`, `description`, `base_price`, `created_at`, `updated_at`) VALUES
(1, 'Single', 'A room assigned to one person. May have one or more beds.', 100.00, '2025-01-02 00:57:19', '2025-01-02 00:57:19'),
(2, 'Double', 'A room assigned to two people. May have one or more beds.', 150.00, '2025-01-02 00:57:19', '2025-01-02 00:57:19'),
(3, 'Suite', 'A room with one or more bedrooms and a separate living space.', 250.00, '2025-01-02 00:57:19', '2025-01-02 00:57:19'),
(4, 'Deluxe', 'A room with luxurious amenities and a higher price.', 300.00, '2025-01-02 00:57:19', '2025-01-02 00:57:19'),
(5, 'Family', 'A room suitable for a family, often with multiple beds.', 200.00, '2025-01-02 00:57:19', '2025-01-02 00:57:19');

-- --------------------------------------------------------

--
-- Structure de la table `services`
--

CREATE TABLE `services` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `service_name` varchar(255) NOT NULL,
  `service_description` text DEFAULT NULL,
  `price` decimal(8,2) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `services`
--

INSERT INTO `services` (`id`, `service_name`, `service_description`, `price`, `created_at`, `updated_at`) VALUES
(1, 'Room Cleaning', 'Daily room cleaning service', 20.00, '2025-01-02 01:13:48', '2025-01-02 01:13:48'),
(2, 'Laundry', 'Laundry service for clothes and linens', 15.00, '2025-01-02 01:13:48', '2025-01-02 01:13:48'),
(3, 'Spa & Wellness', 'Access to the hotel spa and wellness center', 50.00, '2025-01-02 01:13:48', '2025-01-02 01:13:48'),
(4, 'Room Service', 'In-room dining service', 30.00, '2025-01-02 01:13:48', '2025-01-02 01:13:48'),
(5, 'Airport Shuttle', 'Transportation to and from the airport', 40.00, '2025-01-02 01:13:48', '2025-01-02 01:13:48'),
(7, 'Gourmet Restaurant', 'Experience exquisite dining with our award-winning chefs and carefully curated menus featuring local and international cuisine.', 30.00, NULL, NULL),
(8, 'Rooftop Pool', 'Enjoy breathtaking city views while relaxing at our infinity pool with premium cocktail service.', 40.00, NULL, NULL);

-- --------------------------------------------------------

--
-- Structure de la table `service_requests`
--

CREATE TABLE `service_requests` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `guest_id` bigint(20) UNSIGNED NOT NULL,
  `service_id` bigint(20) UNSIGNED NOT NULL,
  `request_date` date NOT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'Pending',
  `total_cost` decimal(10,2) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `service_requests`
--

INSERT INTO `service_requests` (`id`, `guest_id`, `service_id`, `request_date`, `status`, `total_cost`, `created_at`, `updated_at`) VALUES
(1, 1, 1, '2024-12-02', 'Completed', 20.00, '2025-01-02 01:14:09', '2025-01-02 01:14:09'),
(2, 2, 2, '2024-12-11', 'Pending', 15.00, '2025-01-02 01:14:09', '2025-01-02 01:14:09'),
(3, 3, 3, '2024-12-21', 'Completed', 50.00, '2025-01-02 01:14:09', '2025-01-02 01:14:09'),
(4, 4, 4, '2024-12-06', 'Cancelled', 30.00, '2025-01-02 01:14:09', '2025-01-02 01:14:09'),
(5, 5, 5, '2024-12-16', 'Pending', 40.00, '2025-01-02 01:14:09', '2025-01-02 01:14:09');

-- --------------------------------------------------------

--
-- Structure de la table `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `payload` longtext NOT NULL,
  `last_activity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`);

--
-- Index pour la table `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`);

--
-- Index pour la table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Index pour la table `guests`
--
ALTER TABLE `guests`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `guests_email_unique` (`email`),
  ADD UNIQUE KEY `guests_identification_number_unique` (`identification_number`);

--
-- Index pour la table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- Index pour la table `job_batches`
--
ALTER TABLE `job_batches`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Index pour la table `payments`
--
ALTER TABLE `payments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `payments_reservation_id_foreign` (`reservation_id`);

--
-- Index pour la table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Index pour la table `reservations`
--
ALTER TABLE `reservations`
  ADD PRIMARY KEY (`id`),
  ADD KEY `reservations_guest_id_foreign` (`guest_id`),
  ADD KEY `reservations_room_id_foreign` (`room_id`);

--
-- Index pour la table `rooms`
--
ALTER TABLE `rooms`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `rooms_room_number_unique` (`room_number`),
  ADD KEY `rooms_room_type_id_foreign` (`room_type_id`);

--
-- Index pour la table `room_maintenance`
--
ALTER TABLE `room_maintenance`
  ADD PRIMARY KEY (`id`),
  ADD KEY `room_maintenance_room_id_foreign` (`room_id`);

--
-- Index pour la table `room_types`
--
ALTER TABLE `room_types`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `services`
--
ALTER TABLE `services`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `service_requests`
--
ALTER TABLE `service_requests`
  ADD PRIMARY KEY (`id`),
  ADD KEY `service_requests_guest_id_foreign` (`guest_id`),
  ADD KEY `service_requests_service_id_foreign` (`service_id`);

--
-- Index pour la table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `guests`
--
ALTER TABLE `guests`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT pour la table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT pour la table `payments`
--
ALTER TABLE `payments`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT pour la table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `reservations`
--
ALTER TABLE `reservations`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT pour la table `rooms`
--
ALTER TABLE `rooms`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT pour la table `room_maintenance`
--
ALTER TABLE `room_maintenance`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT pour la table `room_types`
--
ALTER TABLE `room_types`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT pour la table `services`
--
ALTER TABLE `services`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT pour la table `service_requests`
--
ALTER TABLE `service_requests`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `payments`
--
ALTER TABLE `payments`
  ADD CONSTRAINT `payments_reservation_id_foreign` FOREIGN KEY (`reservation_id`) REFERENCES `reservations` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `reservations`
--
ALTER TABLE `reservations`
  ADD CONSTRAINT `reservations_guest_id_foreign` FOREIGN KEY (`guest_id`) REFERENCES `guests` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `reservations_room_id_foreign` FOREIGN KEY (`room_id`) REFERENCES `rooms` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `rooms`
--
ALTER TABLE `rooms`
  ADD CONSTRAINT `rooms_room_type_id_foreign` FOREIGN KEY (`room_type_id`) REFERENCES `room_types` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `room_maintenance`
--
ALTER TABLE `room_maintenance`
  ADD CONSTRAINT `room_maintenance_room_id_foreign` FOREIGN KEY (`room_id`) REFERENCES `rooms` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `service_requests`
--
ALTER TABLE `service_requests`
  ADD CONSTRAINT `service_requests_guest_id_foreign` FOREIGN KEY (`guest_id`) REFERENCES `guests` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `service_requests_service_id_foreign` FOREIGN KEY (`service_id`) REFERENCES `services` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
