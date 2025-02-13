export interface CreateNewPost {
  userId: string
  body: string
  postImage: string | null
}

export interface CreateNewComment {
  userId: string
  postId: string
  body: string
}
