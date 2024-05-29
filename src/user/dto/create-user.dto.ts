export class CreateUserDto {
  email: string;
  name: string | null;
  photo: string | null;
  timezone: string;
  provider: string;
  provider_account_id: string;
}
