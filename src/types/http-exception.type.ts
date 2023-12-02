import { ApiProperty } from '@nestjs/swagger';

export class HttpExceptionType {
  @ApiProperty({
    type: String,
    description: 'Возвращаемый ответ',
    example: 'selected должен быть булевым значением',
  })
  response: string;

  @ApiProperty({
    type: Number,
    description: 'Статус ответа',
    example: 400,
  })
  status: number;

  @ApiProperty({
    type: String,
    description: 'Сообщение ответа',
    example: 'selected должен быть булевым значением',
  })
  message: string;

  @ApiProperty({
    type: String,
    description: "Наименование handler'а",
    example: 'HttpException',
  })
  @ApiProperty()
  name: string;
}
