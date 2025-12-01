CREATE TABLE Members (
	member_id		SERIAL,
	first_name		varchar(255)			NOT NULL,
	last_name		varchar(255)			NOT NULL,
	email			varchar(255)	 UNIQUE NOT NULL,
	date_of_birth 	DATE					NOT NULL,
	gender			varchar(25)				NOT NULL,
	phone_number 	varchar(12)				NOT NULL,
	weight 			decimal(5, 2)			NOT NULL,
	height 			decimal(5, 2)			NOT NULL,
	heart_rate 		int						NOT NULL,
	weight_goal 	decimal(5, 2)			NOT NULL,
	PRIMARY KEY (member_id)
);

CREATE TABLE Trainer (
	trainer_id		SERIAL,
	first_name		varchar(255)			NOT NULL,
	last_name		varchar(255)			NOT NULL,
	email			varchar(255)	 UNIQUE NOT NULL,
	PRIMARY KEY (trainer_id)
);

CREATE TABLE Administrator (
	admin_id		SERIAL,
	first_name		varchar(255)			NOT NULL,
	last_name		varchar(255)			NOT NULL,
	email			varchar(255)	 UNIQUE NOT NULL,
	PRIMARY KEY (admin_id)
);

CREATE TABLE Room (
	room_id		SERIAL,
	PRIMARY KEY (room_id)
);

CREATE TABLE Availability (
	availability_id	SERIAL,
	start_time		timestamp				NOT NULL,
	end_time		timestamp	 			NOT NULL,
	trainer_id		int,
	PRIMARY KEY (availability_id),
	FOREIGN KEY (trainer_id)
		REFERENCES Trainer (trainer_id)
);


CREATE TABLE FitnessClass (
	class_id		SERIAL,
	class_name		varchar(255)			NOT NULL,
	capacity		int	 					NOT NULL,
	availability_id	int,
	room_id			int,
	PRIMARY KEY (class_id),
	FOREIGN KEY (availability_id)
		REFERENCES Availability (availability_id),
	FOREIGN KEY (room_id)
		REFERENCES Room (room_id)
);

CREATE TABLE PTSession (
	session_id		SERIAL,
	room_id			int,
	member_id		int,
	availability_id	int,
	PRIMARY KEY (session_id),
	FOREIGN KEY (room_id)
		REFERENCES Room (room_id),
	FOREIGN KEY (member_id)
		REFERENCES Members (member_id),
	FOREIGN KEY (availability_id)
		REFERENCES Availability (availability_id)
);

CREATE TABLE Registers (
	member_id	int,
	class_id	int,
	PRIMARY KEY (member_id, class_id),
	FOREIGN KEY (member_id)
		REFERENCES Members (member_id),
	FOREIGN KEY (class_id)
		REFERENCES FitnessClass (class_id)
);