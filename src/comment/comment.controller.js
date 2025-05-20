import Comment from "./comment.model.js";
import Post from "../post/post.model.js";

export const createComment = async (req, res) => {
    try {
        const { author, content, post } = req.body;

        
        const newComment = new Comment({
            author,
            content,
            post: post
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

export const updateComment = async (req, res) => {
    try {
        const { id } = req.params;
        const { author, content } = req.body;

        const updatedComment = await Comment.findByIdAndUpdate(id, {
            author,
            content
        }, { new: true });

        if (!updatedComment) {
            return res.status(404).json({
                message: 'Comentario no encontrado'
            });
        }

        res.status(200).json({
            message: 'Comentario actualizado exitosamente',
            comment: updatedComment
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error al actualizar el comentario',
            error: error.message
        });
    }
}

export const deleteComment = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedComment = await Comment.findByIdAndDelete(id);

        if (!deletedComment) {
            return res.status(404).json({
                message: 'Comentario no encontrado'
            });
        }

        res.status(200).json({
            message: 'Comentario eliminado exitosamente',
            comment: deletedComment
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error al eliminar el comentario',
            error: error.message
        });
    }
}
