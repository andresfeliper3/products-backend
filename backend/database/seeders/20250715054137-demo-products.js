'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Products', [
      {
        name: 'Paracetamol 500mg',
        description: 'Analgésico y antipirético comúnmente usado para aliviar dolores leves y reducir fiebre.',
        price: 8.99,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Ibuprofeno 400mg',
        description: 'Antiinflamatorio no esteroideo (AINE) que alivia el dolor, fiebre e inflamación.',
        price: 12.50,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Amoxicilina 500mg',
        description: 'Antibiótico de amplio espectro usado en infecciones bacterianas.',
        price: 18.75,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Loratadina 10mg',
        description: 'Antihistamínico de segunda generación para tratar alergias.',
        price: 10.00,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Omeprazol 20mg',
        description: 'Inhibidor de la bomba de protones utilizado para tratar reflujo y úlceras.',
        price: 9.50,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Metformina 850mg',
        description: 'Medicamento oral para tratar la diabetes tipo 2.',
        price: 13.90,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Atorvastatina 20mg',
        description: 'Usado para reducir los niveles de colesterol LDL.',
        price: 16.30,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Salbutamol Inhalador',
        description: 'Broncodilatador utilizado en el tratamiento del asma.',
        price: 22.00,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Clonazepam 0.5mg',
        description: 'Medicamento ansiolítico y anticonvulsivante.',
        price: 7.80,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Diclofenaco 50mg',
        description: 'Antiinflamatorio para dolores musculares o articulares.',
        price: 6.75,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Aspirina 100mg',
        description: 'Analgésico y anticoagulante en dosis baja.',
        price: 5.90,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Azitromicina 500mg',
        description: 'Antibiótico usado para tratar diversas infecciones.',
        price: 19.20,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Prednisolona 5mg',
        description: 'Corticoide utilizado para inflamaciones severas.',
        price: 14.10,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Cetirizina 10mg',
        description: 'Antihistamínico para tratar síntomas de alergias.',
        price: 8.20,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Ranitidina 150mg',
        description: 'Inhibidor de ácido estomacal (uso actualmente restringido).',
        price: 11.30,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Fluoxetina 20mg',
        description: 'Antidepresivo inhibidor selectivo de recaptación de serotonina (ISRS).',
        price: 17.60,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Loperamida 2mg',
        description: 'Tratamiento para la diarrea.',
        price: 5.00,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Naproxeno 500mg',
        description: 'Antiinflamatorio para dolor crónico o agudo.',
        price: 12.00,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Levofloxacina 500mg',
        description: 'Antibiótico para infecciones bacterianas graves.',
        price: 21.00,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Acetaminofén Infantil',
        description: 'Analgésico y antipirético en jarabe para niños.',
        price: 9.50,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Ibuprofeno Infantil',
        description: 'Suspensión oral para reducir fiebre y aliviar el dolor en niños.',
        price: 7.80,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Vitamina C 500mg',
        description: 'Suplemento antioxidante que contribuye al sistema inmunológico.',
        price: 6.50,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Calcio + Vitamina D3',
        description: 'Suplemento para mantener huesos y dientes fuertes.',
        price: 12.90,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Hierro Polimaltosado',
        description: 'Tratamiento para la anemia ferropénica.',
        price: 11.60,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Suero Oral',
        description: 'Solución para la rehidratación en casos de diarrea o vómito.',
        price: 3.50,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Melatonina 3mg',
        description: 'Suplemento para ayudar a regular el sueño.',
        price: 9.30,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Aciclovir 400mg',
        description: 'Antiviral utilizado para tratar infecciones por herpes.',
        price: 13.20,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Desloratadina 5mg',
        description: 'Antihistamínico para rinitis y urticaria.',
        price: 10.70,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Enalapril 10mg',
        description: 'Medicamento antihipertensivo.',
        price: 6.90,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Losartán 50mg',
        description: 'Tratamiento para presión arterial alta.',
        price: 8.10,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Furosemida 40mg',
        description: 'Diurético para eliminar exceso de líquidos.',
        price: 5.40,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Sal de Rehidratación Oral',
        description: 'Sustitución de electrolitos y líquidos en deshidratación.',
        price: 2.80,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Vitamina B12 Inyectable',
        description: 'Suplemento para deficiencia de cobalamina.',
        price: 15.90,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Multivitamínico Adulto',
        description: 'Fórmula completa de vitaminas y minerales.',
        price: 13.50,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Multivitamínico Infantil',
        description: 'Vitaminas en gomitas o jarabe para niños.',
        price: 11.00,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Clorfenamina 4mg',
        description: 'Antihistamínico de primera generación.',
        price: 4.90,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Alprazolam 0.25mg',
        description: 'Ansiolítico del grupo de las benzodiazepinas.',
        price: 8.60,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Miconazol Óvulos',
        description: 'Antifúngico para infecciones vaginales.',
        price: 14.30,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Ketoconazol Shampoo',
        description: 'Tratamiento para la caspa y dermatitis seborreica.',
        price: 16.00,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Lidocaína Gel',
        description: 'Anestésico local en forma de gel para uso tópico.',
        price: 9.40,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Metoclopramida 10mg',
        description: 'Antiemético y procinético para problemas digestivos.',
        price: 6.60,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Clindamicina 300mg',
        description: 'Antibiótico para infecciones bacterianas graves.',
        price: 18.80,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Espironolactona 25mg',
        description: 'Diurético ahorrador de potasio para tratar hipertensión.',
        price: 10.50,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Carbamazepina 200mg',
        description: 'Anticonvulsivante y estabilizador del ánimo.',
        price: 17.00,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Lorazepam 1mg',
        description: 'Ansiolítico usado para el tratamiento de la ansiedad.',
        price: 9.10,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Sertralina 50mg',
        description: 'Antidepresivo ISRS para trastornos de ansiedad y depresión.',
        price: 18.40,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Valproato de Sodio 500mg',
        description: 'Antiepiléptico usado en trastorno bipolar y epilepsia.',
        price: 20.60,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Propranolol 40mg',
        description: 'Betabloqueador para taquicardias e hipertensión.',
        price: 7.70,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Risperidona 1mg',
        description: 'Antipsicótico atípico para trastornos mentales.',
        price: 16.80,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Budesonida Inhalador',
        description: 'Corticoide inhalado para enfermedades respiratorias crónicas.',
        price: 24.00,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Products', null, {});
  }
};
