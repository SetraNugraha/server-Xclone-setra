import { CreateNewPost } from "../../types/Posts.type";
declare const _default: {
    selectAllPosts: () => Promise<{
        id: string;
        userId: string;
        body: string;
        postImage: string | null;
        created_at: Date;
        updated_at: Date;
    }[]>;
    selectPostByUserId: (userId: string) => Promise<{
        id: string;
        userId: string;
        body: string;
        postImage: string | null;
        created_at: Date;
        updated_at: Date;
    }[]>;
    selectPostById: (postId: string) => Promise<{
        id: string;
        userId: string;
        body: string;
        postImage: string | null;
        created_at: Date;
        updated_at: Date;
    } | null>;
    insertNewPost: (reqBody: CreateNewPost) => Promise<{
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
