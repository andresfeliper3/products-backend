-- Create the table
CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  price DECIMAL(10, 2) NOT NULL
);

-- Insert seed data
INSERT INTO products (name, description, price) VALUES
('Paracetamol 500mg', 'Analgésico y antipirético comúnmente usado para aliviar dolores leves y reducir fiebre.', 8.99),
('Ibuprofeno 400mg', 'Antiinflamatorio no esteroideo (AINE) que alivia el dolor, fiebre e inflamación.', 12.50),
('Amoxicilina 500mg', 'Antibiótico de amplio espectro usado en infecciones bacterianas.', 18.75),
('Loratadina 10mg', 'Antihistamínico de segunda generación para tratar alergias.', 10.00),
('Omeprazol 20mg', 'Inhibidor de la bomba de protones utilizado para tratar reflujo y úlceras.', 9.50),
('Metformina 850mg', 'Medicamento oral para tratar la diabetes tipo 2.', 13.90),
('Atorvastatina 20mg', 'Usado para reducir los niveles de colesterol LDL.', 16.30),
('Salbutamol Inhalador', 'Broncodilatador utilizado en el tratamiento del asma.', 22.00),
('Clonazepam 0.5mg', 'Medicamento ansiolítico y anticonvulsivante.', 7.80),
('Diclofenaco 50mg', 'Antiinflamatorio para dolores musculares o articulares.', 6.75),
('Aspirina 100mg', 'Analgésico y anticoagulante en dosis baja.', 5.90),
('Azitromicina 500mg', 'Antibiótico usado para tratar diversas infecciones.', 19.20),
('Prednisolona 5mg', 'Corticoide utilizado para inflamaciones severas.', 14.10),
('Cetirizina 10mg', 'Antihistamínico para tratar síntomas de alergias.', 8.20),
('Ranitidina 150mg', 'Inhibidor de ácido estomacal (uso actualmente restringido).', 11.30),
('Fluoxetina 20mg', 'Antidepresivo inhibidor selectivo de recaptación de serotonina (ISRS).', 17.60),
('Loperamida 2mg', 'Tratamiento para la diarrea.', 5.00),
('Naproxeno 500mg', 'Antiinflamatorio para dolor crónico o agudo.', 12.00),
('Levofloxacina 500mg', 'Antibiótico para infecciones bacterianas graves.', 21.00),
('Acetaminofén Infantil', 'Analgésico y antipirético en jarabe para niños.', 9.50);
