import { AbstractDocument } from "@app/common";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Product extends AbstractDocument {
    @Prop()
    name: string;

    @Prop()
    description: string;

    @Prop()
    price: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);