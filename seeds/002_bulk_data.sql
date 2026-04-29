-- BULK SEED: Realistic campus event volume
-- 20+ reservations across 3 months

-- Additional organizations
INSERT INTO organizations (name, type, contact_email, status) VALUES
('International Student Association', 'club', 'isa@truman.edu', 'active'),
('Gaming Club', 'club', 'gaming@truman.edu', 'active'),
('Debate Society', 'club', 'debate@truman.edu', 'inactive'),
('Truman Media', 'department', 'media@truman.edu', 'active');

-- Additional locations
INSERT INTO locations (name, type, address) VALUES
('Kirk Memorial', 'on_campus', '100 E Normal Ave'),
('Ruth W. Towne Museum', 'on_campus', 'McClain Hall'),
('Off-Campus Storage B', 'off_campus', '200 W Lafayette St');

-- Additional items
INSERT INTO items (name, category, current_location_id, status) VALUES
('Canon DSLR Camera', 'Audio/Visual', 1, 'available'),
('PA System (JBL)', 'Audio/Visual', 1, 'available'),
('Folding Table (8ft)', 'Furniture', 1, 'checked_out'),
('Plastic Chairs (Set of 20)', 'Furniture', 3, 'available'),
('LED Stage Lights', 'Audio/Visual', 2, 'maintenance'),
('HDMI Cable (25ft)', 'Utilities', 1, 'available'),
('Podium', 'Furniture', 2, 'available'),
('Whiteboard on Wheels', 'Furniture', 1, 'available');

-- Bulk reservations (varied statuses, dates, orgs)
INSERT INTO reservations (organization_id, location_id, start_time, end_time, status) VALUES
(1, 1, '2026-01-10 09:00:00', '2026-01-10 12:00:00', 'completed'),
(2, 2, '2026-01-15 14:00:00', '2026-01-15 18:00:00', 'completed'),
(4, 1, '2026-01-20 10:00:00', '2026-01-20 16:00:00', 'completed'),
(5, 3, '2026-02-01 08:00:00', '2026-02-01 22:00:00', 'completed'),
(6, 1, '2026-02-05 12:00:00', '2026-02-05 15:00:00', 'cancelled'),
(1, 2, '2026-02-14 09:00:00', '2026-02-14 13:00:00', 'completed'),
(3, 1, '2026-02-20 10:00:00', '2026-02-20 14:00:00', 'completed'),
(4, 2, '2026-03-01 11:00:00', '2026-03-01 17:00:00', 'pending'),
(2, 1, '2026-03-05 08:00:00', '2026-03-05 20:00:00', 'pending'),
(5, 3, '2026-03-10 09:00:00', '2026-03-10 12:00:00', 'active'),
(6, 1, '2026-03-15 13:00:00', '2026-03-15 16:00:00', 'pending'),
(1, 2, '2026-03-20 10:00:00', '2026-03-20 18:00:00', 'pending');

-- Reservation items (mix of complete, partial, ghost returns)
INSERT INTO reservation_items (reservation_id, item_id, quantity_requested, quantity_returned) VALUES
-- Reservation 4: Namaste Nepal (completed, all returned)
(4, 2, 2, 2), (4, 5, 1, 1),
-- Reservation 5: SASU (completed, ghost return - extension cord)
(5, 1, 1, 1), (5, 3, 1, 1), (5, 4, 1, 0),
-- Reservation 6: ACM (pending - no returns yet)
(6, 2, 1, 0),
-- Reservation 7: ISA (completed, late return - table)
(7, 2, 3, 3), (7, 8, 1, 1),
-- Reservation 8: Gaming Club (completed, damaged item - mic)
(8, 1, 2, 2), (8, 6, 1, 1),
-- Reservation 9: Truman Media (cancelled - no items)
-- Reservation 10: Namaste Nepal (completed, wrong count)
(10, 3, 2, 1), (10, 9, 1, 1),
-- Reservation 11: SASU (completed, all good)
(11, 2, 1, 1), (11, 7, 1, 1),
-- Reservation 12: Debate Society (inactive org, completed)
(12, 1, 1, 1), (12, 10, 1, 1),
-- Reservation 13: Gaming Club (pending)
(13, 4, 2, 0), (13, 11, 1, 0),
-- Reservation 14: Truman Media (pending)
(14, 3, 1, 0), (14, 8, 2, 0),
-- Reservation 15: ISA (active - currently checked out)
(15, 2, 2, 0), (15, 6, 1, 0),
-- Reservation 16: Namaste Nepal (pending)
(16, 1, 3, 0), (16, 9, 1, 0);

-- Discrepancies (varied types)
INSERT INTO discrepancies (reservation_item_id, type, status, notes) VALUES
-- Ghost return (SASU, reservation 5)
(14, 'ghost_return', 'resolved', 'Extension cord never returned. Organization claims it was left at location.'),
-- Late return (ISA, reservation 7)
(17, 'late_return', 'resolved', 'Table returned 2 hours after deadline. No damage reported.'),
-- Damaged item (Gaming Club, reservation 8)
(20, 'damaged', 'flagged', 'Microphone has visible dent. Functionality untested.'),
-- Wrong count (Namaste Nepal, reservation 10)
(22, 'wrong_count', 'flagged', 'Only 1 projector returned out of 2 requested. Second unit unaccounted for.'),
-- Ghost return (Gaming Club, reservation 13 - pending)
(29, 'ghost_return', 'flagged', 'Items still checked out. Reservation active but past end time.');