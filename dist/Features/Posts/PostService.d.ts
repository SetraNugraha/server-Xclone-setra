import { CreateNewPost } from "../../types/Posts.type";
declare const _default: {
    getAllPosts: () => Promise<{
        id: string;
        userId: string;
        body: string;
        postImage: string | null;
        created_at: Date;
        updated_at: Date;
    }[] | undefined>;
    getPostByUserId: (userId: string) => Promise<{
        id: string;
        userId: string;
        body: string;
        postImage: string | null;
        created_at: Date;
        updated_at: Date;
    }[]>;
    createNewPost: (reqBody: CreateNewPost) => Promise<{
        id: string;
        userId: string;
        body: string;
        postImage: string | null;
        created_at: Date;
        updated_at: Date;
    }>;
    deletePost: (userId: string, postId: string) => Promise<{
        id: string;
        userId: string;
        body: string;
        postImage: string | null;
        created_at: Date;
        updated_at: Date;
    }>;
};
export default _default;
