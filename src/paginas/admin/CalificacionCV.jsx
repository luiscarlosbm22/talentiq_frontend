import React, { useState, useEffect } from 'react';
import * as tf from '@tensorflow/tfjs';
import useEmpleos from '../../hooks/useEmpleos';

const CalificacionCV = () => {
    const [modeloCargado, setModeloCargado] = useState(false);
    const [modelo, setModelo] = useState(null);
    const [resultados, setResultados] = useState({});
    const { empleosPublic } = useEmpleos();

    useEffect(() => {
        const cargarModelo = async () => {
            try {
                const modelo = await tf.loadLayersModel('models/model.json');
                setModelo(modelo);
                setModeloCargado(true);
            } catch (error) {
                console.error('Error cargando el modelo:', error);
            }
        };

        cargarModelo();
    }, []);

    const preprocesarCV = (cv) => {
        if (cv && cv.length) {
            // Aquí puedes implementar tu lógica de preprocesamiento específica
            // Por ejemplo, contar palabras, analizar estructura, etc.
            return cv.length; // Ejemplo simple: devolver la longitud del CV
        } else {
            return 0;
        }
    };

    useEffect(() => {
        const calificarAutomaticamente = async () => {
            if (modeloCargado) {
                empleosPublic.forEach(empleo => {
                    empleo.postulantes.forEach(async postulante => {
                        if (postulante.cv_text) {
                            const longitudCV = preprocesarCV(postulante.cv_text);
                            const tensorCV = tf.tensor2d([[longitudCV]]);
                            const prediccion = await modelo.predict(tensorCV).data();
                            setResultados(prevState => ({
                                ...prevState,
                                [postulante._id]: prediccion[0]
                            }));
                        } else {
                            setResultados(prevState => ({
                                ...prevState,
                                [postulante._id]: null
                            }));
                        }
                    });
                });
            } else {
                console.warn('El modelo no ha sido cargado aún.');
            }
        };

        calificarAutomaticamente();
    }, [modeloCargado, empleosPublic]);

    return (
        <div className="container mx-auto px-4 mt-8">
            <h2 className="text-2xl font-bold mb-4">Calificación y Análisis de CV</h2>
            {empleosPublic.map((empleo) => (
                <div key={empleo._id} className="mb-8">
                    <h3 className="text-xl font-semibold mb-2">{empleo.titulo}</h3>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Nombre
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Email
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Calificación
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Estado
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {empleo.postulantes.map((postulante) => (
                                    <tr key={postulante._id}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {postulante.nombres} {postulante.apellidos}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {postulante.email}
                                        </td>
                                        <td className={`px-6 py-4 whitespace-nowrap text-sm ${resultados[postulante._id] !== undefined
                                                ? resultados[postulante._id] <= 30
                                                    ? 'bg-red-500 text-white'
                                                    : resultados[postulante._id] <= 60
                                                        ? 'bg-yellow-500 text-gray-900'
                                                        : 'bg-green-500 text-white'
                                                : 'bg-gray-200 text-gray-500'
                                            }`}>
                                            {resultados[postulante._id] !== undefined ? (
                                                resultados[postulante._id].toFixed(2) + ' puntos'
                                            ) : (
                                                'No calificado'
                                            )}
                                        </td>

                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {postulante.cv_text ? (
                                                resultados[postulante._id] !== undefined ? (
                                                    <span className="text-green-500 font-semibold">Calificado</span>
                                                ) : (
                                                    <span className="text-gray-500">Calificando...</span>
                                                )
                                            ) : (
                                                <span className="text-gray-500">Sin CV</span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CalificacionCV;
