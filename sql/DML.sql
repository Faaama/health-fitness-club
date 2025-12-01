-- Members
insert into Members (first_name, last_name, email, date_of_birth, gender, phone_number, weight, height, heart_rate, weight_goal) values
		('Nanako', 'Dojima', 'nanako.dojima@fitness.com', '2004-10-04', 'Female', '111-111-1111', 60.00, 120.00, 90, 65.00),
	 	('Yu', 'Narukami', 'yu.narukami@fitness.com', '1994-07-10', 'Male', '222-222-2222', 140.00, 180.00, 80, 145.00),
	 	('Akihiko', 'Sanada', 'akihiko.sanada@fitness.com', '1991-09-22', 'Male', '333-333-3333', 160.00, 175.00, 90, 170.00),
	 	('Kanji', 'Tatsumi', 'kanji.tatsumi@fitness.com', '1996-01-19', 'Male', '444-444-4444', 143.00, 180.00, 95, 148.00),
	 	('Chie', 'Satonaka', 'chie.satonaka@fitness.com', '1994-10-30', 'Female', '555-555-5555', 135.00, 158.00, 85, 130.00);

-- Trainers
insert into Trainer (first_name, last_name, email) values 
		('Will', 'Metaphor', 'will.metaphor@fitness.com'),
		('Strohl', 'Haliaetus', 'strohl.haliaetus@fitness.com'),
		('Eiselin', 'Hulkenberg', 'eiselin.hulkenberg@fitness.com'),
		('Heismay', 'Noctule', 'heismay.noctule@fitness.com'),
		('Basilio', 'Magnus', 'basilio.magnus@fitness.com');

-- Administrator
insert into Administrator (first_name, last_name, email) values 
		('Herlock', 'Sholmes', 'herlock.sholmes@fitness.com'),
		('Iris', 'Wilson', 'iris.wilson@fitness.com'),
		('Susato', 'Mikotoba', 'susato.mikotoba@fitness.com'),
		('Ryunosuke', 'Naruhodo', 'ryunosuke.naruhodo@fitness.com'),
		('Kazuma', 'Asogi', 'kazuma.asogi@fitness.com');

-- Room
insert into Room default values;
insert into Room default values;
insert into Room default values;
insert into Room default values;
insert into Room default values;

-- Availability
insert into Availability (start_time, end_time, trainer_id) values 
		('2025-12-01 13:00:00', '2025-12-01 14:00:00', 1),
		('2025-12-03 15:00:00', '2025-12-03 16:00:00', 2),
		('2025-12-03 15:00:00', '2025-12-03 16:00:00', 3),
		('2025-12-07 18:00:00', '2025-12-07 19:00:00', 4),
		('2025-12-05 14:00:00', '2025-12-05 15:00:00', 5),
		('2025-12-02 14:00:00', '2025-12-02 15:00:00', 1),
		('2025-12-02 16:00:00', '2025-12-02 17:00:00', 2),
		('2025-12-04 13:00:00', '2025-12-04 14:00:00', 3),
		('2025-12-06 15:00:00', '2025-12-06 16:00:00', 4),
		('2025-12-07 15:00:00', '2025-12-07 16:00:00', 1);

-- Fitness Class
insert into FitnessClass (class_name, capacity, availability_id, room_id) values 
		('Yoga', 5, 1, 1),
		('Boxing', 2, 2, 2),
		('Cycling', 10, 3, 3),
		('Dance', 15, 5, 4),
		('HIIT', 6, 4, 5);

-- PT Session
insert into PTSession (room_id, member_id, availability_id) values 
		(1, 1, 6),
		(2, 2, 7),
		(3, 3, 8),
		(4, 4, 9),
		(5, 5, 10);


-- Registers
insert into Registers values (1, 4);
insert into Registers values (2, 1);
insert into Registers values (3, 2);
insert into Registers values (4, 3);
insert into Registers values (5, 5);
