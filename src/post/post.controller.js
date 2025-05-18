import Post from "./post.model.js";
import Course from "../course/course.model.js";

export const createPost = async (req, res) => {
    try {
        const { title, content, img, course } = req.body;
        if (!title || !content || !course) {
            return res.status(400).json({
                message: 'Todos los campos son obligatorios'
            });
        }
        const existCourse = await Course.findOne({ name: course });
        if (!existCourse) {
            return res.status(404).json({
                message: 'El curso no existe'
            });
        }

        const newPost = new Post({ title, content, img, course });
        await newPost.save();

        res.status(201).json({
            message: 'Post creado exitosamente',
            post: newPost
        });

    } catch (error) {

        res.status(500).json({
            message: 'Error al crear el post',
            error: error.message
        });
    }
}

export const getPosts = async (req, res) => {
    try {
        const posts = await Post.find({ status: true })
            .sort({ createdAt: -1 });
        res.status(200).json({
            message: 'Posts encontrados',
            posts
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error al buscar los posts',
            error: error.message
        });
    }
}

export const getPostById = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await Post.findById(id)
        .sort({ createdAt: -1 });

        if (!post) {
            return res.status(404).json({
                message: 'Post no encontrado'
            });
        }
        res.status(200).json({
            message: 'Post encontrado',
            post
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error al buscar el post',
            error: error.message
        });
    }
}

export const updatePost = async (req, res) => {
    try {
        const { id } = req.params;

        const data = req.body;

        const post = await Post.findByIdAndUpdate(id, data, { new: true });

        if (!post) {
            return res.status(404).json({
                message: 'Post no encontrado'
            });
        }

        res.status(200).json({
            message: 'Post actualizado exitosamente',
            post
        });

    } catch (error) {
        res.status(500).json({
            message: 'Error al actualizar el post',
            error: error.message
        });
    }
}

export const deletePost = async (req, res) => {
    try {
        const { id } = req.params;

        const post = await Post.findByIdAndUpdate(id, { status: false }, { new: true });

        if (!post) {
            return res.status(404).json({
                message: 'Post no encontrado'
            });
        }

        res.status(200).json({
            message: 'Post eliminado exitosamente',
            post
        });

    } catch (error) {
        res.status(500).json({
            message: 'Error al eliminar el post',
            error: error.message
        });
    }
}

export const getPostsByCourse = async (req, res) => {
    try {
        const { courseId } = req.params;
        const posts = await Post.find({ course: courseId })
            .sort({ createdAt: -1 });
        if (posts.length === 0) {
            return res.status(404).json({
                message: 'No se encontraron posts para este curso'
            });
        }
        res.status(200).json({
            message: 'Posts encontrados',
            posts
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Error al buscar los posts',
            error: error.message
        });
    }
}