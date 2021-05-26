import { Request, Response } from 'express';
import User from '../models/user';

export const getUsers = async (req: Request, res: Response) => {

    const users = await User.findAll();

    res.json({ users })
}

export const getUser = async (req: Request, res: Response) => {

    const { id } = req.params;

    const user = await User.findByPk(id);

    if (user) {
        res.json(user)
    } else {
        res.status(404).json({
            msg: `No existe el usuario de id ${id}`
        })
    }

    res.json({
        msg: 'getUser',
        id
    })
}

export const createUser = async (req: Request, res: Response) => {

    const { body } = req;

    const verifyEmail = await User.findOne({
        where: {
            email: body.email
        }
    });

    if(verifyEmail) {
        return res.status(404).json({
            msg: 'Ya existe un usuario con el email ' + body.email
        })
    }

    try {

        const user = new User(body);
        await user.save();

        res.json( user );

    } catch (error) {

        console.log(error);
        res.status(500).json({
            msg: 'Error 505 de base de datos (createUser)'
        })

    }
}

export const updateUser = async (req: Request, res: Response) => {

    const { id } = req.params;
    const { body } = req;

    try {
        
        const user = await User.findByPk( id );
        if(!user) {
            return res.status(404).json({
                msg: 'No existe un usuario con el id: ' + id
            });
        }

        await user.update( body );

        res.json( user );

    } catch (error) {

        console.log(error);
        res.status(505).json({
            msg: 'Error con la base de datos (updateUser)'
        })

    }

}

export const deleteUser = (req: Request, res: Response) => {

    const { id } = req.params;

    res.json({
        msg: 'deleteUsers',
        id
    })
}