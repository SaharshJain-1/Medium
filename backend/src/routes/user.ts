import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign, verify } from 'hono/jwt'
import { signinInput, signupInput } from "@sunjain35/medium-common";

export const userRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string
        JWT_SECRET: string
    }
}>();

userRouter.post('/signup', async (c) => {
    const body = await c.req.json();
    const { success } = signupInput.safeParse(body);
    if(!success) {
      c.status(411);
      return c.json({
        message: "Invalid inputs"
      })
    }

    const prisma = new PrismaClient({
      //@ts-ignore
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
  
    try {
      const user = await prisma.user.create({
        data: {
          email: body.email,
          password: body.password,
          name: body.name,
        }
      });
  
      //@ts-ignore
      const token = await sign({id: user.id}, c.env.JWT_SECRET)
  
      return c.json({
        jwt: token
      })
    } catch (e) {
        c.status(411)
        return c.json('Invalid')
    }
  })
  
  userRouter.post('/signin', async (c) => {
    const body = await c.req.json();
    const { success } = signinInput.safeParse(body);
    if(!success) {
      c.status(411);
      return c.json({
        message: "Invalid inputs"
      })
    }

    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
  
    const user = await prisma.user.findFirst({
      where: {
        email: body.email,
        password: body.password,
      }
    });
  
    if (!user) {
          c.status(403);
          return c.json({ error: "user not found" });
      }
  
      const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
      return c.json({ jwt });
  })

  userRouter.get('/', async (c) => {
    const prisma = new PrismaClient({
          datasourceUrl: c.env.DATABASE_URL,
        }).$extends(withAccelerate());
    try {
      const authHeader = c.req.header("authorization") || "";
      const token = authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : authHeader;
  
      const user = await verify(token, c.env.JWT_SECRET);
      
      const userId = user?.id;
      if (!userId) {
        throw new Error('Invalid user ID');
      }
  
      const userMain = await prisma.user.findFirst({
        where: { id: userId },
        select: {
          id: true,
          email: true,
          name: true,
          password: true,
        }
      });
  
      if (!userMain) {
        throw new Error('User not found');
      }
  
      return c.json({ userMain });
    } catch (e: unknown) {
      console.error(e);  // Log the error for debugging
  
      // Check if `e` is an instance of Error
      if (e instanceof Error) {
        c.status(401);  // Unauthorized status code
        return c.json({ error: e.message || "Error while fetching user details" });
      }
  
      // In case `e` is not an instance of Error
      c.status(500);  // Internal Server Error status code
      return c.json({ error: "An unexpected error occurred" });
    }
  });
  