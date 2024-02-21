import { Module } from '@nestjs/common';
import { GroceryService } from './grocery.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserGroup, UserGroupSchema } from 'src/schemas/user-group.schema';
import { GroceryController } from './grocery.controller';
import { Page, PageSchema } from 'src/schemas/page.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserGroup.name, schema: UserGroupSchema },
      { name: Page.name, schema: PageSchema },
    ]),
  ],
  providers: [GroceryService],
  controllers: [GroceryController],
})
export class GroceryModule {}
