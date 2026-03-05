import { HttpException, HttpStatus } from '@nestjs/common';
import { HTTP_CODE_METADATA } from '@nestjs/common/constants';

export const ExistUserException = (): never => {
  throw new HttpException(
    'This username was already used by another user',
    HttpStatus.BAD_REQUEST,
  );
};

export const UserNotFoundException = (): never => {
  throw new HttpException('User not found', HttpStatus.NOT_FOUND);
};

export const InValidDataException = (): never => {
  throw new HttpException(
    'InCorrect username or password',
    HttpStatus.BAD_REQUEST,
  );
};

export const UsersNotFoundException = (): never => {
  throw new HttpException('Users not found', HttpStatus.NOT_FOUND);
};
