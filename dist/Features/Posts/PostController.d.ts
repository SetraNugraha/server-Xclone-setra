import { Request, Response } from "express";
export declare const getAllPosts: (req: Request, res: Response) => Promise<void>;
export declare const getPostByUserId: (req: Request, res: Response) => Promise<void>;
export declare const createNewPost: (req: Request, res: Response) => Promise<void>;
export declare const deletePost: (req: Request, res: Response) => Promise<void>;
