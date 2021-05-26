import { Request, Response } from 'express';
import Post from '../models/post';
import User from '../models/user';

export const createPost = async (req: Request, res: Response) => {

    const { body } = req;

    const verifyUser = await User.findOne({
        where: {
            id: body.userId
        }
    });

    if(!verifyUser) {
        return res.status(404).json({
            msg: `No existe ningun usuario con el codigo ${body.userId}`
        })
    }

    try {

        const post = Post.build(body);
        await post.save();

        res.json(post);

    } catch (error) {

        console.log(error);
        res.status(500).json({
            msg: 'Error 505 de base de datos (createUser)'
        })

    }
}

export const updatePost = async (req: Request, res: Response) => {

    const { id } = req.params;
    const { body } = req;

    try {

        const post = await Post.findByPk(id);
        if (!post) {
            return res.status(404).json({
                msg: `No existe un post con el id ${id}`
            });
        }

        await post.update(body);

        res.json(post);

    } catch (error) {

        console.log(error);
        res.status(505).json({
            msg: 'Error con la base de datos (updateUser)'
        })

    }

}

export const deletePost = async(req: Request, res: Response) => {

    const { id } = req.params;

    const post = await Post.findByPk(id);
    if(!post) {
        return res.status(404).json({
            msg: `No existe un post con el id ${id}`
        })
    }

    await post.destroy();

    res.json(post)
}

export const getPostByTitle = async (req: Request, res: Response) => {

    const { body } = req;

    const verifyPost = await Post.findOne({
        where: {
            titulo: body.titulo
        }
    });

    if(!verifyPost) {
        return res.status(404).json({
            msg: `No existe un post con el titulo ${body.titulo}`
        })
    }

    try {

        res.json(verifyPost)
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error 505 de base de datos (getPostByTitle)'
        })
    }
}

export const getPostByUsername = async (req: Request, res: Response) => {

    const { body } = req;

    const catchUser = await User.findOne({
        where: {
            nombre: body.nombre
        }
    });

    if(!catchUser) {
        return res.status(404).json({
            msg: `No existe el usuario ${body.nombre}`
        })
    }

    const userId = catchUser?.get('id');

    const verifyPost = await Post.findOne({
        where: {
            userId: userId
        }
    });

    if(!verifyPost) {
        return res.status(404).json({
            msg: `No existen post para el usuario ${catchUser?.get('nombre')}`
        })
    }

    try {

        res.json(verifyPost)
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error 505 de base de datos (getPostByTitle)'
        })
    }
}

export const getPostByCreatedDate = async (req: Request, res: Response) => {

    const { body } = req;

    const verifyPost = await Post.findOne({
        where: {
            createdAt: body.createdAt
        }
    });

    if(!verifyPost) {
        return res.status(404).json({
            msg: `No existe un post con la fecha ${body.createdAt}`
        })
    }

    try {

        res.json(verifyPost)
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error 505 de base de datos (getPostByTitle)'
        })
    }
}