import Comment from "./comment.model.js";
import Post from "../post/post.model.js";

export const createComment = async (req, res) => {
    try {
        const { content, post } = req.body;

        if (!content || !post) {
            return res.status(400).json({
                message: 'Contenido y post son requeridos'
            });
        }
        const postExists = await Post.findById(post);
        if (!postExists) {
            return res.status(404).json({
                message: 'Post no encontrado'
            });
        }
        const newComment = new Comment({
            content,
            post
        });

        const savedComment = await newComment.save();

        res.status(201).json({
            message: 'Comentario creado exitosamente',
            comment: savedComment
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error al crear el comentario',
            error: error.message
        });
    }
}

export const getComments = async (req, res) => {
    try {
        const comments = await Comment.find()
            .sort({ createdAt: -1 });

        res.status(200).json({
            message: 'Comentarios encontrados',
            comments
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error al buscar los comentarios',
            error: error.message
        });
    }
}

export const getCommentById = async (req, res) => {
    try {
        const { id } = req.params;
        const comment = await Comment.findById(id)
            .sort({ createdAt: -1 });
        if (!comment) {
            return res.status(404).json({
                message: 'Comentario no encontrado'
            });
        }   
        res.status(200).json({
            message: 'Comentario encontrado',
            comment
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Error al buscar el comentario',
            error: error.message
        });
    }
}

export const getCommentsByPostId = async (req, res) => {
    try {
        const { postId } = req.params;
        const comments = await Comment.find({ post: postId })
            .sort({ createdAt: -1 });

        if (comments.length === 0) {
            return res.status(404).json({
                message: 'No se encontraron comentarios para este post'
            });
        }

        res.status(200).json({
            message: 'Comentarios encontrados',
            comments
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error al buscar los comentarios',
            error: error.message
        });
    }
}

