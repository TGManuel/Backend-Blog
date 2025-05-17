import Course from './course.model.js';

export const initCourses = async () => {
  try {
    const cursos = [
      {
        name: 'Taller III',
        description: 'El curso de Taller III pretende implementar proyectos y actividades que enfoquen al alumno a un ambiente práctico de la programación. '
      },
      {
        name: 'Tecnologia III',
        description: 'El curso de Tecnología III pretende llevarlo por la teoría de cada tema a aplicar durante la clase de taller, siendo la teoría lo primero a entender, para luego proceder a la práctica.'
      },
      {
        name: 'Practica Supervisada',
        description: 'El curso de Práctica supervisada pretende conjuntar las áreas de Taller III y Tecnología III, dándole un enfoque más externo, y acercando a la realidad de la industria de la tecnología.'
      }
    ];

    for (const curso of cursos) {
      const exists = await Course.findOne({ name: curso.name });
      if (exists) {
        console.log(` Curso "${curso.name}" ya está activo.`);
      } else {
        await Course.create(curso);
        console.log(` Curso "${curso.name}" creado.`);
      }
    }

  } catch (error) {
    console.error(' Error al inicializar cursos:', error.message);
  }
};

export const getCoursesByName = async (req, res) => {
  try {
    const courses = await Course.find({ name: req.params.name });
    if (courses.length === 0) {
      return res.status(404).json({ message: 'No se encontraron cursos con ese nombre.' });
    }
    res.status(200).json({
        message: 'Cursos encontrados',
        courses
    });

  } catch (error) {
    res.status(500).json({
        message: 'Error al buscar cursos',
        error: error.message
    });
  }
}
