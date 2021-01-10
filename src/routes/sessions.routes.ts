//Este arquivo ele precisa ser responsavel somente por, chamar outro arquivo,
//da aplicação e devolver uma resposta


//regras de negocio, nao pode ter email duplicado, é necessario criptografar a senha do usuario,
// pois é constra as regras armazenar a senha do usuario, por conta de um ataque hacker por exemplo.


import { Router } from 'express';

import  AuthenticateUsersService from '../service/AuthenticateUsersService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  try {
        const { email, password } = request.body;

        const authenticateUser = new AuthenticateUsersService();

        const { user, token } = await authenticateUser.execute({
            email,
            password,


        });


        const userWithoutPassword = {
            id: user.id,
            name: user.name,
            email: user.email,
            created_at: user.created_at,
            updated_at: user.update_at,
          };

          return response.json({ user: userWithoutPassword, token });


  }

  catch (err) {
    return response.status(400).json({ error: err.message });

  }
});

export default sessionsRouter;
