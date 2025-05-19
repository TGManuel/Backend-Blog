import Post from "../post/post.model.js";
import Course from "../course/course.model.js";

export const validatePost = async (req, res, next) => {
    try {
        const { title, content, course } = req.body;

        if (!title || !content || !course) {
            return res.status(400).json({
                message: 'Faltan datos obligatorios'
            });
        }

        const courseExists = await Course.findOne({ name: course});

        if (!courseExists) {
            return res.status(404).json({
                message: 'Curso no encontrado'
            });
        }

        next();
    } catch (error) {
        res.status(500).json({
            message: 'Error al validar el post',
            error: error.message
        });
    }
}