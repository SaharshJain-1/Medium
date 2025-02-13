import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { verify } from "hono/jwt";
import { createBlogInput, updateBlogInput } from "@sunjain35/medium-common";
export const blogRouter = new Hono();
blogRouter.use('/*', async (c, next) => {
    const authHeader = c.req.header("authorization") || "";
    const token = authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : authHeader;
    try {
        const user = await verify(token, c.env.JWT_SECRET);
        if (user) {
            //@ts-ignore
            c.set("userId", user.id);
            await next();
        }
        else {
            c.status(403);
            return c.json({
                message: "You are not logged in"
            });
        }
    }
    catch (e) {
        c.status(403);
        return c.json({
            msg: "jwt incorrect"
        });
    }
});
// the middleware is the place where u take the token from the user and actually extract teh userID from it and pass it from the middleware to the actual route handler
blogRouter.post('/', async (c) => {
    const body = await c.req.json();
    const { success } = createBlogInput.safeParse(body);
    if (!success) {
        c.status(411);
        return c.json({
            message: "Invalid inputs"
        });
    }
    const authorId = c.get("userId");
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const blog = await prisma.blog.create({
        data: {
            title: body.title,
            content: body.content,
            authorId: authorId
        }
    });
    return c.json({
        id: blog.id
    });
});
blogRouter.put('/', async (c) => {
    const body = await c.req.json();
    const { success } = updateBlogInput.safeParse(body);
    if (!success) {
        c.status(411);
        return c.json({
            message: "Invalid inputs"
        });
    }
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const blog = await prisma.blog.update({
        where: {
            id: body.id
        },
        data: {
            title: body.title,
            content: body.content,
        }
    });
    return c.json({
        id: blog.id
    });
});
blogRouter.get('/bulk', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());
    const blogs = await prisma.blog.findMany();
    return c.json({
        blogs
    });
});
blogRouter.get('/:id', async (c) => {
    const id = c.req.param("id");
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());
    try {
        const blog = await prisma.blog.findFirst({
            where: {
                id: id
            },
        });
        return c.json({
            blog
        });
    }
    catch (e) {
        c.status(411);
        return c.json({
            error: "Error while fetching blog post"
        });
    }
});
