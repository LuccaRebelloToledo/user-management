import { container } from 'tsyringe';
import IUsersRepository from '../../../modules/users/repositories/IUsersRepository';
import UsersRepository from '../../../modules/users/infra/typeorm/repositories/UsersRepository';
import BCryptHashProvider from '../../../modules/users/providers/hash-provider/implementations/BCryptHashProvider';
import IHashProvider from '../../../modules/users/providers/hash-provider/models/IHashProvider';

container.registerSingleton<IUsersRepository>(
    'UsersRepository',
    UsersRepository,
  );

  container.registerSingleton<IHashProvider>(
    'HashProvider',
    BCryptHashProvider,
  );