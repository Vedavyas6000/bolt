-- SQL script to create the events table for storing event posters and details

CREATE TABLE events (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    image TEXT NOT NULL,
    event_datetime DATETIME NOT NULL,
    location VARCHAR(255) NOT NULL,
    host VARCHAR(255) NOT NULL,
    registration_link VARCHAR(500) NOT NULL,
    views INT DEFAULT 0,
    registrations INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
