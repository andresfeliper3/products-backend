import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Plus } from 'lucide-react';
import { Product } from '../services/productService';

interface ProductFormProps {
  onSubmit: (product: Omit<Product, 'id'>) => Promise<void>;
}

const productSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'El nombre del producto debe tener al menos 2 caracteres')
    .max(100, 'El nombre del producto debe tener menos de 100 caracteres')
    .matches(
      /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s\-_.,()&!?'"]+$/,
      'El nombre del producto contiene caracteres no válidos'
    )
    .required('El nombre del producto es obligatorio'),
  description: Yup.string()
    .min(10, 'La descripción debe tener al menos 10 caracteres')
    .max(500, 'La descripción debe tener menos de 500 caracteres')
    .matches(
      /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s\-_.,()&!?'"]+$/,
      'La descripción contiene caracteres no válidos'
    )
    .required('La descripción es obligatoria'),
  price: Yup.number()
    .min(0.01, 'El precio debe ser mayor que 0')
    .max(999999.99, 'El precio debe ser menor a 1.000.000')
    .required('El precio es obligatorio')
    .typeError('El precio debe ser un número válido'),
});

const ProductForm: React.FC<ProductFormProps> = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={{
        name: '',
        description: '',
        price: '',
      }}
      validationSchema={productSchema}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        try {
          await onSubmit({
            name: values.name.trim(),
            description: values.description.trim(),
            price: parseFloat(values.price),
          });
          resetForm();
        } catch (error) {
          console.error('Error al enviar el formulario:', error);
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ isSubmitting, errors, touched }) => (
        <Form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Nombre del producto */}
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-semibold text-gray-700">
                Nombre del producto *
              </Label>
              <Field
                as={Input}
                id="name"
                name="name"
                placeholder="Ingrese el nombre del producto"
                className={`transition-all duration-200 ${
                  errors.name && touched.name
                    ? 'border-red-500 focus:border-red-500 focus:ring-red-200'
                    : 'focus:border-blue-500 focus:ring-blue-200'
                }`}
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-sm text-red-600 mt-1"
              />
            </div>

            {/* Precio */}
            <div className="space-y-2">
              <Label htmlFor="price" className="text-sm font-semibold text-gray-700">
                Precio ($) *
              </Label>
              <Field
                as={Input}
                id="price"
                name="price"
                type="number"
                step="0.01"
                min="0"
                placeholder="0.00"
                className={`transition-all duration-200 ${
                  errors.price && touched.price
                    ? 'border-red-500 focus:border-red-500 focus:ring-red-200'
                    : 'focus:border-blue-500 focus:ring-blue-200'
                }`}
              />
              <ErrorMessage
                name="price"
                component="div"
                className="text-sm text-red-600 mt-1"
              />
            </div>
          </div>

          {/* Descripción */}
          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-semibold text-gray-700">
              Descripción *
            </Label>
            <Field
              as={Textarea}
              id="description"
              name="description"
              placeholder="Ingrese la descripción del producto"
              rows={4}
              className={`transition-all duration-200 resize-none ${
                errors.description && touched.description
                  ? 'border-red-500 focus:border-red-500 focus:ring-red-200'
                  : 'focus:border-blue-500 focus:ring-blue-200'
              }`}
            />
            <ErrorMessage
              name="description"
              component="div"
              className="text-sm text-red-600 mt-1"
            />
          </div>

          {/* Botón de envío */}
          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-2 rounded-lg transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Agregando...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Agregar producto
                </div>
              )}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default ProductForm;
