export class CreateUserDto {
  email: string;
  name: string | null;
  photo: string | null;
  country: string;
  timezone: string;
}
