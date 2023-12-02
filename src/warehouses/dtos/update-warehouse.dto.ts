import { IsBoolean, IsLatitude, IsLongitude, IsOptional, IsString } from "class-validator";

export class UpdateWarehouseDto {
    @IsString({ message: 'адрес должен быть строкой' })
    @IsOptional()
    address?: string;

    @IsString({ message: 'имя должно быть строкой' })
    @IsOptional()
    name?: string;

    @IsString({ message: 'город должен быть строкой' })
    @IsOptional()
    city?: string;

    @IsLongitude({ message: 'долгота должна быть float' })
    @IsOptional()
    longitude?: number;

    @IsLatitude({ message: 'широта должна быть float' })
    @IsOptional()
    latitude?: number;

    @IsBoolean({ message: 'selected должен быть true или false' })
    @IsOptional()
    selected?: boolean = false;
}