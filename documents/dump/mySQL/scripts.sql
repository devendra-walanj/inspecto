CREATE DATABASE inspectodb;

CREATE USER 'inspectodb'@'localhost' IDENTIFIED  WITH mysql_native_password BY 'inspectodb';

GRANT ALL PRIVILEGES ON *.* TO 'menagerie'@'localhost' ;

create table inspection (
    inspection_id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    venue ENUM('Home', 'Plot', 'Office', 'Vehicle') not null,
    city varchar(50) not null,
    location_latitude decimal(10, 6) not null,
    location_longitude decimal(10, 6) not null,
    status ENUM('pending', 'started', 'approved', 'rejected') not null default 'pending',
    ownername varchar(100) not null,
    owner_address varchar(1000),
    owner_phone bigint,
    finalreport varchar(4000) not null,
    PRIMARY KEY (inspection_id),
    UNIQUE(venue, city, location_latitude, location_longitude, ownername )
);
