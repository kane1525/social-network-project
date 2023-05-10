import { type } from "@testing-library/user-event/dist/type";

type WithId = {
  id: string;
};
type With_Id = {
  _id: string;
};

type UserBase = {
  firstName: string;
  lastName: string;
  login: string;
  email: string;
  avatar: string;
};

type Comment = WithId & {
  createAt: string;
  owner: CommentOwner;
  postId: string;
  text: string;
  isEdited: boolean;
};

export type Post = With_Id & {
  imgUrl: string;
  likes: Omit<UserBaseWith_Id, "email">[];
  ownerId: string;
  title: string;
};

type FollowersAndFollowingsCount = {
  followersCount: number;
  followingsCount: number;
};

type UserBaseWithId = UserBase & WithId;
export type UserBaseWith_Id = UserBase & With_Id;
type CommentOwner = Omit<UserBaseWithId, "email">;
export type UserWithFollowCount = UserBaseWithId & FollowersAndFollowingsCount;
export type UserWith_IdAndFollowCount = UserBaseWith_Id &
  FollowersAndFollowingsCount;

export interface LoginData {
  login: string;
  password: string;
}
export interface LoginResponse {
  access_token: string;
}

export interface RegisterData {
  login: string;
  email: string;
  password: string;
}
export interface RegisterResponse extends WithId {}

export interface GetCurrentUserResponse extends UserBaseWithId {
  posts: Post[];
  followers: UserWithFollowCount[];
  following: UserWithFollowCount[];
}

export interface GetUserByIdResponse extends UserWithFollowCount {
  posts: Post[];
}

export interface GetFollowersFollowingsResponse {
  followers: UserWithFollowCount[];
  following: UserWithFollowCount[];
}

export interface CreatePostData extends FormData {
  title: string;
  image: File;
}
export interface CreatePostResponse extends Post {}

export interface LikePostResponse {
  status: "liked" | "unliked";
}

export interface CreateCommentData {
  postId: string;
  text: string;
}
export interface CreateCommentResponse extends Comment {}

export interface UpdateUserData extends UserBase {}
export interface UpdateUserResponse extends UserBaseWithId {}

export interface UpdatePasswordData {
  password: string;
  confirmPassword: string;
}

export type GetCommentsByPostIdResponse = Comment[];

export type GetUsersResponse = (UserBaseWith_Id &
  FollowersAndFollowingsCount & { isFollow: boolean })[];
