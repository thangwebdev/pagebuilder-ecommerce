import {
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Post,
  Put,
  Req,
  Res,
} from '@nestjs/common';
import { GroceryService } from './grocery.service';
import { Request, Response } from 'express';
import { GroceryModelType } from 'src/types';

const groceries: Record<string, GroceryModelType> = {
  usergroup: 'userGroupModel',
  page: 'pageModel',
};

@Controller('v1/grocery/:grocery')
export class GroceryController {
  constructor(@Inject(GroceryService) private groceryService: GroceryService) {}

  @Get()
  async getAll(@Req() req: Request, @Res() res: Response) {
    try {
      const grocery = req.params.grocery;
      const limit: number = Number(req.query.limit) || 12;
      const page: number = Number(req.query.page) || 1;
      const query = req.query.q ? JSON.parse(req.query.q as any) : {};

      if (!grocery || !groceries[grocery]) {
        throw new HttpException(
          `Grocery '${grocery}' is not exist`,
          HttpStatus.NOT_FOUND,
        );
      }
      const result = await this.groceryService.findAll({
        grocery: groceries[grocery],
        page,
        limit,
        query,
      });
      return res.status(HttpStatus.OK).json(result);
    } catch (error) {
      throw new HttpException(error.response, error.status);
    }
  }

  @Get('query')
  async findOne(@Req() req: Request, @Res() res: Response) {
    try {
      const { grocery } = req.params;

      const query = req.query.q ? JSON.parse(req.query.q as any) : {};
      if (!grocery || !groceries[grocery]) {
        throw new HttpException(
          `Grocery '${grocery}' is not exist`,
          HttpStatus.NOT_FOUND,
        );
      }
      const record = await this.groceryService.findOne({
        grocery: groceries[grocery],
        query,
      });
      return res.status(HttpStatus.OK).json(record);
    } catch (error) {
      throw new HttpException(error.response, error.status);
    }
  }

  @Get(':id')
  async findById(@Req() req: Request, @Res() res: Response) {
    try {
      const { grocery, id } = req.params;
      if (!grocery || !groceries[grocery]) {
        throw new HttpException(
          `Grocery '${grocery}' is not exist`,
          HttpStatus.NOT_FOUND,
        );
      }
      if (!id) {
        throw new HttpException('Missing id in url', HttpStatus.BAD_REQUEST);
      }
      const record = await this.groceryService.findById({
        grocery: groceries[grocery],
        id,
      });
      return res.status(HttpStatus.OK).json(record);
    } catch (error) {
      throw new HttpException(error.response, error.status);
    }
  }

  @Post()
  async create(@Req() req: Request, @Res() res: Response) {
    try {
      const grocery = req.params.grocery;
      if (!grocery || !groceries[grocery]) {
        throw new HttpException(
          `Grocery '${grocery}' is not exist`,
          HttpStatus.NOT_FOUND,
        );
      }
      const record = await this.groceryService.create({
        grocery: groceries[grocery],
        data: req.body,
      });
      return res.status(HttpStatus.OK).json(record);
    } catch (error) {
      throw new HttpException(error.response, error.status);
    }
  }

  @Put(':id')
  async update(@Req() req: Request, @Res() res: Response) {
    try {
      const { grocery, id } = req.params;
      if (!grocery || !groceries[grocery]) {
        throw new HttpException(
          `Grocery '${grocery}' is not exist`,
          HttpStatus.NOT_FOUND,
        );
      }
      if (!id) {
        throw new HttpException('Missing id in url', HttpStatus.BAD_REQUEST);
      }
      const recordUpdated = await this.groceryService.update({
        id,
        grocery: groceries[grocery],
        data: req.body,
      });
      return res.status(HttpStatus.OK).json(recordUpdated);
    } catch (error) {
      throw new HttpException(error.response, error.status);
    }
  }

  @Delete(':id')
  async deleteOne(@Req() req: Request, @Res() res: Response) {
    try {
      const { grocery, id } = req.params;
      if (!grocery || !groceries[grocery]) {
        throw new HttpException(
          `Grocery '${grocery}' is not exist`,
          HttpStatus.NOT_FOUND,
        );
      }
      if (!id) {
        throw new HttpException('Missing id in url', HttpStatus.BAD_REQUEST);
      }
      const recordDeleted = await this.groceryService.deleteById({
        grocery: groceries[grocery],
        id,
      });
      return res.status(HttpStatus.OK).json(recordDeleted);
    } catch (error) {
      throw new HttpException(error.response, error.status);
    }
  }

  @Delete()
  async deleteMany(@Req() req: Request, @Res() res: Response) {
    try {
      const { grocery } = req.params;
      const { ids } = req.body;
      if (!grocery || !groceries[grocery]) {
        throw new HttpException(
          `Grocery '${grocery}' is not exist`,
          HttpStatus.NOT_FOUND,
        );
      }
      if (!ids || !Array.isArray(ids)) {
        throw new HttpException(
          'Ids in body is invalid',
          HttpStatus.BAD_REQUEST,
        );
      }
      const deletedRecords = await this.groceryService.deleteMany({
        grocery: groceries[grocery],
        ids,
      });
      return res.status(HttpStatus.OK).json(deletedRecords);
    } catch (error) {
      throw new HttpException(error.response, error.status);
    }
  }
}
