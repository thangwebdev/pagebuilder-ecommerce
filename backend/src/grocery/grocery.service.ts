import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Page } from 'src/schemas/page.schema';
import { UserGroup } from 'src/schemas/user-group.schema';
import { GroceryModelType } from 'src/types';

@Injectable()
export class GroceryService {
  constructor(
    @InjectModel(UserGroup.name) private userGroupModel: Model<UserGroup>,
    @InjectModel(Page.name) private pageModel: Model<Page>,
  ) {}

  async findAll(obj: {
    grocery: GroceryModelType;
    page: number;
    limit: number;
    query?: any;
  }) {
    const { grocery, page, limit, query } = obj;
    const skip = (page - 1) * limit;

    const result = await this[grocery].find(query).skip(skip).limit(limit);
    const totalItems = await this.userGroupModel.find(query).countDocuments();
    let totalPage = Math.floor(totalItems / limit);
    if (totalItems % limit !== 0) {
      totalPage += 1;
    }

    return {
      current_page: page,
      total_page: totalPage,
      item_per_page: limit,
      current_items: result.length || 0,
      total_items: totalItems,
      data: result,
    };
  }

  async findById(obj: { grocery: GroceryModelType; id: string }) {
    const { grocery, id } = obj;
    const record = await this[grocery].findById(id);
    if (!record) {
      throw new HttpException(`${id} is not exist`, HttpStatus.NOT_FOUND);
    }
    return record;
  }

  async findOne(obj: { grocery: GroceryModelType; query: any }) {
    const { query, grocery } = obj;
    const record = await this[grocery].findOne(query);
    if (!record) {
      throw new HttpException('Object is not found', HttpStatus.NOT_FOUND);
    }
    return record;
  }

  async create(obj: { data: any; grocery: GroceryModelType }) {
    const { data, grocery } = obj;
    if (!data.code) {
      throw new HttpException(
        'Code is missing in body',
        HttpStatus.BAD_REQUEST,
      );
    }
    const existedRecord = await this[grocery].findOne({ code: data.code });

    if (existedRecord) {
      throw new HttpException(
        `Code '${data.code}' is existed`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const record = await this[grocery].create(data);
    return record;
  }

  async update(obj: { id: string; data: any; grocery: GroceryModelType }) {
    const { id, data, grocery } = obj;
    const recordExisted = await this[grocery].findById(id);
    if (!recordExisted) {
      throw new HttpException(`${id} is not exist`, HttpStatus.NOT_FOUND);
    }
    await this[grocery].updateOne({ _id: id }, data);
    const recordUpdated = await this[grocery].findById(id);
    return recordUpdated;
  }

  async deleteById(obj: { grocery: GroceryModelType; id: string }) {
    const { grocery, id } = obj;
    const recordExisted = await this[grocery].findById(id);
    if (!recordExisted) {
      throw new HttpException(`${id} is not exist`, HttpStatus.NOT_FOUND);
    }
    await this[grocery].deleteOne({ _id: id });
    return recordExisted;
  }

  async deleteMany(obj: { grocery: GroceryModelType; ids: string[] }) {
    const { grocery, ids } = obj;
    const records = await this[grocery].find({ _id: { $in: ids } });
    await this[grocery].deleteMany({ _id: { $in: ids } });
    return records;
  }
}
