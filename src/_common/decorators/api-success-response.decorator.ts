import { applyDecorators, Type } from '@nestjs/common';
import {
  ApiExtraModels,
  ApiOkResponse,
  ApiCreatedResponse,
  getSchemaPath,
} from '@nestjs/swagger';
import { SuccessResponseDto } from 'src/_common/dtos/generic-response.dto';

export const ApiSuccessResponse = <TModel extends Type<any>>(
  model: TModel,
  options: { isArray?: boolean; status?: 200 | 201 } = {},
) => {
  const status = options.status || 200;
  const ResponseDecorator = status === 201 ? ApiCreatedResponse : ApiOkResponse;

  return applyDecorators(
    ApiExtraModels(SuccessResponseDto, model),
    ResponseDecorator({
      schema: {
        allOf: [
          { $ref: getSchemaPath(SuccessResponseDto) },
          {
            properties: {
              data: options.isArray
                ? { type: 'array', items: { $ref: getSchemaPath(model) } }
                : { $ref: getSchemaPath(model) },
            },
          },
        ],
      },
    }),
  );
};
