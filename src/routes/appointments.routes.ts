import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import { parseISO } from 'date-fns';

import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../service/CreateAppointmentService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

//Este arquivo ele precisa ser responsavel somente por, chamar outro arquivo,
//da aplicação e devolver uma resposta

const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.get('/', async (request, response) => {
    console.log(request.user);

    const appointmentsRepository = getCustomRepository(AppointmentsRepository);
    const appointments = await appointmentsRepository.find();

    return response.json(appointments);
});


appointmentsRouter.post('/', async (request, response) => {
    try {
    const { barbeiro_id, date } = request.body;

    const parsedDate = parseISO(date);

    const createAppointment = new CreateAppointmentService();

    const appointment = await createAppointment.execute({
        date: parsedDate,
        barbeiro_id,
    });

    return response.json(appointment);
}   catch (err) {
    return response.status(400).json({ error: err.message});
    }
});

export default appointmentsRouter;
