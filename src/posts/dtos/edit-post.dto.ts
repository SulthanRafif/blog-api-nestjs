import { IsNotEmpty } from 'class-validator';

export class EditPostDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  body: string;

  @IsNotEmpty()
  userId: number;
}
