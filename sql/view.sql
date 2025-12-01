CREATE OR replace VIEW MemberSchedule AS
SELECT r.member_id, a.start_time, a.end_time
FROM Registers r
JOIN FitnessClass fc ON r.class_id = fc.class_id
JOIN Availability a ON fc.availability_id = a.availability_id

UNION ALL

SELECT pts.member_id, a.start_time, a.end_time
FROM PTSession pts
JOIN Availability a ON pts.availability_id = a.availability_id;

SELECT * FROM MemberSchedule;

SELECT * FROM Members;
SELECT * FROM Trainer;
SELECT * FROM Registers;
SELECT * FROM FitnessClass;
SELECT * FROM Administrator;