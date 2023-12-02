import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from "mongoose";

export type WarehouseDocument = HydratedDocument<Warehouse>;

@Schema()
export class Warehouse {
    @Prop({ type: Number, min: 1, required: true })
    id: number;

    @Prop({ type: String, required: true })
    address: string;
    
    @Prop({ type: String, required: true })
    name: string;

    @Prop({ type: String, required: true })
    city: string;

    @Prop({ type: Number, required: true })
    longitude: number;

    @Prop({ type: Number, required: true })
    latitude: number;

    @Prop({ type: Boolean, default: false })
    selected: boolean;
}

export const WarehouseSchema = SchemaFactory.createForClass(Warehouse); 