import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import Appointment from '../models/Appointments';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import AppointmentRepository from '../repositories/AppointmentsRepository';


/*
O arquivo de service, ele nunca pode ter acesso a, requisição e
resposta, ele vai trabalhar diretamente com os dados que recebe,
e com o erro que vai mostrar para o usuario caso exista alguma
regra na função.
*/

interface RequestDTO {
    barbeiro_id: string;
    date: Date;
}

class CreateAppointmentService {
    public async execute({ date, barbeiro_id }:RequestDTO): Promise <Appointment> {
        const appointmentsRepository = getCustomRepository(AppointmentsRepository);

        const appointmentDate = startOfHour(date);


    const findAppointmentInSameDate = await appointmentsRepository.findByDate(
        appointmentDate,
    );

    if (findAppointmentInSameDate) {
        throw Error('Este horario ja esta reservado');
    }

const appointment = appointmentsRepository.create({
    barbeiro_id,
    date: appointmentDate,
 });

    await appointmentsRepository.save(appointment);

    return appointment;

    }
}

    export default CreateAppointmentService;
