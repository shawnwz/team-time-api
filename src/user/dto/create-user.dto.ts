export class CreateUserDto {
  email: string;
  firstName: string | null;
  lastName: string | null;
  photo: string | null;
  country: string;
  timezone: string;
}
