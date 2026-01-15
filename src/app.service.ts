import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Welcome to the Chatbot Clone API for the Turing Technologies hiring test!';
  }
}
