import { IsBoolean, IsEmpty, IsInt, IsLatitude, IsLongitude, IsNotEmpty, IsString, Min } from "class-validator";

export class CreateWarehouseDto {
    @IsInt({ message: 'id должен быть числом' })
    @IsNotEmpty({ message: 'по id нет данных' })
    @Min(0, { message: 'id должен быть больше одного' })
    id: number;

    @IsString({ message: 'адрес должен быть строкой' })
    @IsNotEmpty({ message: 'по адресу нет данных' })
    address: string;

    @IsString({ message: 'имя должно быть строкой' })
    @IsNotEmpty({ message: 'по имени нет данных' })
    name: string;

    @IsString({ message: 'город должен быть строкой' })
    @IsNotEmpty({ message: 'по городу нет данных' })
    city: string;

    @IsLongitude({ message: 'долгота должна быть float' })
    longitude: number;

    @IsLatitude({ message: 'широта должна быть float' })
    latitude: number;

    @IsBoolean({ message: 'selected должен быть true или false' })
    selected?: boolean = false;
}