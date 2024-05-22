import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '@/modules/user/entities/user.entity';
import SignupDto from '@/modules/auth/dto/signup.dto';
import UpdateUserDto from '@/modules/user/dto/update-user.dto';

@Injectable()
export default class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  public async create(userDto: SignupDto): Promise<User> {
    const { nome, email, celular, cep, cidade, estado, password, roles } =
      userDto;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = this.userRepository.create({
      nome,
      email,
      celular,
      cep,
      cidade,
      estado,
      password: hashedPassword,
      reset_password_token: null,
      reset_password_expires: null,
      roles,
    });

    await this.userRepository.save(user);

    return user;
  }

  public async update(id: string, data: UpdateUserDto): Promise<User> {
    const user = await this.findById(id);

    if (!user) {
      throw new NotFoundException();
    }

    const updatedUser = this.userRepository.merge(user, data);

    return await this.userRepository.save(updatedUser);
  }

  public async findById(id: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { id } });
  }

  public async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email } });
  }

  public async getAllUsers(): Promise<User[]> {
    return this.userRepository.find();
  }
  public async findByResetPasswordToken(token: string): Promise<User | null> {
    return this.userRepository.findOne({
      where: { reset_password_token: token },
    });
  }
}
