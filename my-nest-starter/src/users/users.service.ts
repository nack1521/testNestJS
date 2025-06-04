import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {User, UserDocument} from './schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OrdersService } from '../orders/orders.service'; // Import the OrdersService

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private ordersService: OrdersService, // Inject the OrdersService
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const orderResult = await this.ordersService.findOne(
      createUserDto.orderId,
    );
    if (!orderResult) {
      throw new NotFoundException('Order not found');
    }
    const result = new this.userModel(createUserDto);
    return result.save();
  }

  async findAll() : Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(id: string): Promise<User | null> {
    const user = await this.userModel
      .findById(id)
      .populate({
        path: 'orderId',
        populate: {
          path: 'productId', // Populate the products inside the order
        },
      })
      .exec();
    return user;
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    const result = this.userModel.findByIdAndUpdate(
      id, updateUserDto, { new: true }
    ).exec();
    if (!result) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return result;
  }

  remove(id: string) {
    const result = this.userModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return { message: `User deleted successfully` };
  }
}
