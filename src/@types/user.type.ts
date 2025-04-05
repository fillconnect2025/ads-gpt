type UserIdentity = {
  identity_id: string;
  id: string;
  user_id: string;
  identity_data: {
    email: string;
    email_verified: boolean;
    name: string;
    phone_verified: boolean;
    sub: string;
  };
  provider: string;
  last_sign_in_at: string;
  created_at: string;
  updated_at: string;
  email: string;
};

type UserMetadata = {
  email: string;
  email_verified: boolean;
  name: string;
  phone_verified: boolean;
  sub: string;
};

type AppMetadata = {
  provider: string;
  providers: string[];
};

export type IUser = {
  id: string;
  aud: string;
  role: string;
  email: string;
  phone: string;
  confirmation_sent_at: string;
  app_metadata: AppMetadata;
  user_metadata: UserMetadata;
  identities: UserIdentity[];
  created_at: string;
  updated_at: string;
  is_anonymous: boolean;
};
